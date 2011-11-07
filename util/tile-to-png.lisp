#!/usr/local/bin/sbcl --script
;;;; Read U4 tile and convert it to PNG  file

;; Quiclisp setup, normally in .sbclrc, which is not read with --script
#-quicklisp
(let ((quicklisp-init (merge-pathnames "quicklisp/setup.lisp"
                                       (user-homedir-pathname))))
  (when (probe-file quicklisp-init)
    (load quicklisp-init)))

(ql:quickload "zpng")

(defun tile-offsets (tile)
  "Convert tile-id into list of offsets into d64-file"
  (let ((base (+ (* 256 359)
		 (* tile 8 2))))
    (list base 
	  (+ base 8)
	  (+ base 4096)
	  (+ base 4096 8))))

(defun tile-png (stream tile)
  "Read tile bitmap from streams and create PNG"
  (let* ((png (make-instance 'zpng:png :color-type :grayscale
			    :width 16 :height 16))
	 (data (zpng:data-array png))
	 (dest-x 0)
	 (dest-y 0))
    (dolist (p (tile-offsets tile))
      (file-position stream p)
      (dotimes (y 8)
	(let ((b (read-byte stream nil)))
	  (dotimes (x 8)
	    (setf (aref data (+ dest-y y) (+ dest-x x) 0) 
		  (if (logbitp (- 7 x) b) 255 0)))))
      (incf dest-x 8)
      (when (>= dest-x 16)
	(incf dest-y 8)
	(setf dest-x 0)))
    png))

;;; Startup from command line
(let ((argv sb-ext:*posix-argv*))
  (if (> (length argv) 2)
      (let* ((filename (nth 1 argv))
	     (tile-id (parse-integer (nth 2 argv)))
	     (filename-out (format nil "tile-~D.png" tile-id)))
	(with-open-file (in filename :element-type '(unsigned-byte 8))
	  (zpng:write-png (tile-png in tile-id) filename-out))
	(format t "Wrote file ~A~%" filename-out))
      (format t "usage: tile-to-png.lisp <d64-file> <tile-id>~%")))
