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

(defun blit-byte (byte image-data p)
  "Copy 8 bits from byte to 8 pixels in array"
  (dotimes (bit 8)
    (setf (aref image-data (+ p bit))
	  (if (logbitp (- 7 bit) byte) 
	      255 
	      0))))

(defun blit-char-cell (cell image-data p)
  "Blit char-cell of 8x8 bits into image array"
  (dotimes (i 8)
    (blit-byte (aref cell i) 
	       image-data 
	       (+ p (* 16 i)))))

(defun tile-png (stream tile)
  "Read tile bitmap from streams and create PNG"
  (let* ((png (make-instance 'zpng:png :color-type :grayscale
			     :width 16 :height 16))
	 (offsets (tile-offsets tile))
	 (png-offsets (list 0 8 (* 8 16) (+ (* 8 16) 8)))
	 (char-cell (make-array 8 :element-type '(unsigned-byte 8))))
    (dotimes (i 4)
      (file-position stream (nth i offsets))
      (read-sequence char-cell stream)
      (blit-char-cell char-cell 
		      (zpng:image-data png) 
		      (nth i png-offsets)))
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
