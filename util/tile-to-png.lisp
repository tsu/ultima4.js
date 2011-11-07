#!/usr/local/bin/sbcl --script
;;;; Read U4 tile and convert it to PNG  file

;(ql:quickload "zpng")

(defun tile-offsets (tile)
  "Convert tile-id into list of offsets into d64-file"
  (let ((base (+ (* 256 359)
		 (* tile 8 2))))
    (list base 
	  (+ base 8)
	  (+ base 4096)
	  (+ base 4096 8))))

;;; Startup from command line
(let ((argv sb-ext:*posix-argv*))
  (if (> (length argv) 2)
      (let ((filename (nth 1 argv))
	    (tile-id (parse-integer (nth 2 argv))))
	(with-open-file (in filename :element-type '(unsigned-byte 8))
	  (dolist (p (tile-offsets tile-id))
	    (file-position in p)
	    (dotimes (i 8)
	      (format t "~8,'0B~%" (read-byte in nil))))))
      (format t "usage: ~A: <d64-file> <tile-id>~%" (car argv))))
