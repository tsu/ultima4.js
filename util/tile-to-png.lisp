#!/usr/local/bin/sbcl --script
;;;; Read U4 tile and convert it to PNG  file

;; Quiclisp setup, normally in .sbclrc, which is not read with --script
#-quicklisp
(let ((quicklisp-init (merge-pathnames "quicklisp/setup.lisp"
                                       (user-homedir-pathname))))
  (when (probe-file quicklisp-init)
    (load quicklisp-init)))

(ql:quickload "zpng")

;; Default palette of C64 colors used by VICE
(defvar *palette* #((#x00 #x00 #x00)     ; 0 black
		    (#xFD #xFE #xFC)     ; 1 white
		    (#xBE #x1A #x24)     ; 2 red
		    (#x30 #xE6 #xC6)     ; 3 cyan
		    (#xB4 #x1A #xE2)     ; 4 purple
		    (#x1F #xD2 #x1E)     ; 5 green
		    (#x21 #x1B #xAE)     ; 6 blue
		    (#xDF #xF6 #x0A)     ; 7 yellow
		    (#xB8 #x41 #x04)     ; 8 orange
		    (#x6A #x33 #x04)     ; 9 brown
		    (#xFE #x4A #x57)     ; A light red
		    (#x42 #x45 #x40)     ; B dark grey
		    (#x70 #x74 #x6F)     ; C grey
		    (#x59 #xFE #x59)     ; D light green
		    (#x5F #x53 #xFE)     ; E light blue
		    (#xA4 #xA7 #xA2)))   ; F light grey

(defun tile-offsets (tile)
  "Convert tile-id into list of offsets into d64-file"
  (let ((base (+ (* 256 359)
		 (* tile 8 2))))
    (list base 
	  (+ base 8)
	  (+ base 4096)
	  (+ base 4096 8))))

(defun color-offset (tile)
  "Color offset for tile"
  (+ 78000 tile))

(defun blit-byte (byte image-data p colors)
  "Copy 8 bits from byte to 8 pixels in array"
  (dotimes (bit 8)
    (let ((rgb (if (logbitp (- 7 bit) byte) 
		   (nth 1 colors)
		   (nth 0 colors))))
      (dotimes (i 3)
	(setf (aref image-data (+ p (* bit 3) i)) 
	      (nth i rgb))))))


(defun blit-char-cell (cell image-data p colors)
  "Blit char-cell of 8x8 bits into image array"
  (dotimes (i 8)
    (blit-byte (aref cell i) 
	       image-data 
	       (+ p (* 16 3 i))
	       colors)))

(defun tile-png (stream tile)
  "Read tile bitmap from streams and create PNG"
  (file-position stream (color-offset tile))
  (let* ((png (make-instance 'zpng:png :color-type :truecolor
			     :width 16 :height 16))
	 (offsets (tile-offsets tile))
	 (color-byte (read-byte stream))
	 (colors (list (aref *palette* (logand color-byte #xF))
		       (aref *palette* (ash color-byte -4))))
	 (png-offsets (list 0 (* 8 3) (* 8 16 3) (+ (* 8 16 3) (* 8 3))))
	 (char-cell (make-array 8 :element-type '(unsigned-byte 8))))
    (dotimes (i 4)
      (file-position stream (nth i offsets))
      (read-sequence char-cell stream)
      (blit-char-cell char-cell 
		      (zpng:image-data png) 
		      (nth i png-offsets)
		      colors))
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
