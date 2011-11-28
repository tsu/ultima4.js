#!/usr/local/bin/sbcl --script
;;;; generate ultima4 location (town, castle, dungeon, ...) data from memory dump file
;; exxample:
;;    ./generate-location-data.lisp ../data/c64-memdump-u4-worldmap.dat 

(defun read-data (in pos n)
  "Reads n bytes from stream in, starting at pos. Returns a list."
  (let ((data (make-array n :element-type '(unsigned-byte 8))))
    (file-position in pos)
    (read-sequence data in)
    (coerce data 'list)))

(defun decode-raw-names (names)
  "Decodes raw names data into list of strings"
  (let ((lst)
        (buf))
    (dolist (c names)
      (push (logand c #x7F) buf)
      (when (< c 127)
        (push (coerce (mapcar #'code-char (nreverse buf)) 'string) lst)
        (setf buf nil)))
    (nreverse lst)))

(defun insert-row-numbers (lst)
  "Insert row numbers at the car of each element in the lst"
  (let ((i -1)
        res)
    (dolist (e lst)
      (push (push (incf i) e) res))
    (nreverse res)))

;;; Startup from command line
(let ((argv sb-ext:*posix-argv*))
  (if (> (length argv) 1)
      (let ((file (nth 1 argv)))
	(if (probe-file file)
            (with-open-file (in file :element-type '(unsigned-byte 8))
              (let ((x-coords (read-data in #x519A 32))
                    (y-coords (read-data in #x51BA 32))
                    (names-raw (mapcar #'(lambda (x) 
                                           (if (= x (logior #x80 13)) (logior #x80 9) x)) 
                                       (read-data in #x1EB6 259))))
                (format t "~{~{id: ~A, x: ~A, y: ~A, name: \"~A\"~}~%~}" 
                        (insert-row-numbers (mapcar #'list 
                                                    x-coords y-coords (decode-raw-names names-raw))))))))
      (format t "usage: generate-location-data.lisp <u4-memory-dump>~%")))

