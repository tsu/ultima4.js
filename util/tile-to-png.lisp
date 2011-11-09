#!/usr/local/bin/sbcl --script
;;;; Read U4 tile and convert it to PNG  file
;; Examples
;;
;; Read and create a single tile
;;     util/tile-to-png.lisp c64u4/ULTIMA4A.D64 31
;;
;; Read and create sequence of 10 tiles starting from 31
;;     util/tile-to-png.lisp c64u4/ULTIMA4A.D64 31 10
;;
;; Read create world map
;;    util/tile-to-png.lisp c64u4/ULTIMA4A.D64 0 0 c64u4/ULTIMA4C.D64 

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

(defun blit-byte (byte image-data p colors &optional (pitch 3))
  "Copy 8 bits from byte to 8 pixels in array"
  (dotimes (bit 8)
    (let ((rgb (if (logbitp (- 7 bit) byte) 
		   (nth 1 colors)
		   (nth 0 colors))))
      (dotimes (i 3)
	(setf (aref image-data (+ p (* bit pitch) i)) 
	      (nth i rgb))))))


(defun blit-char-cell (cell image-data p colors &optional (pitch (* 16 3)))
  "Blit char-cell of 8x8 bits into image array"
  (dotimes (i 8)
    (blit-byte (aref cell i) 
	       image-data 
	       (+ p (* pitch i))
	       colors)))

(defun blit-tile (tile-data image-data p colors &optional (pitch (* 16 3)))
  "Blit tile data into image"
  (let ((png-offsets (list 0 (* 8 3) 
			   (* 8 pitch) (+ (* 8 pitch) (* 8 3)))))
    (dotimes (i 4)
      (blit-char-cell (subseq tile-data (* i 8))
		      image-data
		      (+ p (nth i png-offsets))
		      colors
		      pitch))))
  
(defun read-worldmap (filename)
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
      map)))
	    
(defun tile-png (stream tile png &optional (p 0))
  "Read tile bitmap from streams and write into png-image"
  (file-position stream (color-offset tile))
  (let* ((offsets (tile-offsets tile))
	 (color-byte (read-byte stream))
	 (colors (list (aref *palette* (logand color-byte #xF))
		       (aref *palette* (ash color-byte -4))))
	 (tile-data (make-array (* 4 8) :element-type '(unsigned-byte 8))))
    (file-position stream (nth 0 offsets))
    (read-sequence tile-data stream :start 0 :end 16)
    (file-position stream (nth 2 offsets))
    (read-sequence tile-data stream :start 16)
    (blit-tile tile-data
	       (zpng:image-data png) 
	       p
	       colors
	       (* (zpng:width png) 3))
    png))
  
;;; Startup from command line
(let ((argv sb-ext:*posix-argv*))
  (if (> (length argv) 2)
      (let* ((filename (nth 1 argv))
	     (tile-id (parse-integer (nth 2 argv)))
	     (count (if (> (length argv) 3)
			(parse-integer (nth 3 argv))
			1))
	     (map (if (> (length argv) 4)
		      (nth 4 argv))))
	(with-open-file (in filename :element-type '(unsigned-byte 8))
	  (if map
	      (let ((png (make-instance 'zpng:png :color-type :truecolor
					:width (* 256 16) :height (* 256 16)))
		    (map (read-worldmap map)))
		(dotimes (y 256)
		  (dotimes (x 256)
		    (let ((tile (aref map (+ (* y 256) x))))
		      (tile-png in tile png (+ (* y 256 16 16 3) (* x 16 3))))))
		(zpng:write-png png "map.png")
		(format t "Wrote file map.png~%"))
	      (dotimes (i count)
		(let ((filename-out (format nil "tile-~2,'0X.png" (+ tile-id i)))
		      (png (make-instance 'zpng:png :color-type :truecolor
					  :width 16 :height 16)))
		  (tile-png in (+ tile-id i) png)
		  (zpng:write-png png filename-out)
		  (format t "Wrote file ~A~%" filename-out))))))
      (format t "usage: tile-to-png.lisp <d64-file> <tile-id> [<count>=1] [<d64-map-disk>]~%")))
