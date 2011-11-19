#!/usr/local/bin/sbcl --script
;;;; generate ultima4 map data from d64 disk image
;; Example
;;   ./generate-map-data.lisp ../c64u4/ULTIMA4C.D64 hex

;; Quiclisp setup, normally in .sbclrc, which is not read with --script
#-quicklisp
(let ((quicklisp-init (merge-pathnames "quicklisp/setup.lisp"
                                       (user-homedir-pathname))))
  (when (probe-file quicklisp-init)
    (load quicklisp-init)))

(ql:quickload "cl-base64")

(defun read-worldmap (filename)
  "Read worl map (tile codes) from file into array"
  (when (probe-file filename)
    (with-open-file (in filename :element-type '(unsigned-byte 8))
      (file-position in 256)
      (let ((map (make-array (* 256 256) :element-type '(unsigned-byte 8))))
	(dotimes (blk 256)
	  (let* ((bx (mod blk 16))
		 (by (floor blk 16))
		 (p (+ (* by 16 256) 
		       (* bx 16))))
	    (dotimes (i 16)
	      (read-sequence map in :start (+ p (* i 256)) :end (+ p (* i 256) 16)))))
	map))))


;;; Startup from command line
(let ((argv sb-ext:*posix-argv*))
  (if (> (length argv) 2)
      (let* ((disk-name (nth 1 argv))
	     (data (read-worldmap disk-name))
	     (frmt (nth 2 argv)))
	(if data
	    (cond
	      ((string= frmt "hex")
	       (dotimes (y 256)
		 (format t "~{~2,'0X~}~%" (coerce (subseq data 
							  (* y 256) 
							  (+ (* y 256) 256)) 
						  'list))))
	      ((string= frmt "base64")
	       (format t "~A~%"
		       (cl-base64:usb8-array-to-base64-string data :columns 76)))	       	       
	      (t
	       (format t "error: unknown format: ~A~%" frmt)))
	    (format t "error: could not read data from file: ~A~%" disk-name)))
      (format t "usage: generate-map-data.lisp <britannia-disk> <format>~%~{~A~%~}"
	      '("where <format> is:"
		"      hex      hex codes with two digits per byte, 256 bytes per line"
		"      base64   base64 encoded bytes, 76 chars per line"))))

