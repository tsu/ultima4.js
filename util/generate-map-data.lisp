#!/usr/local/bin/sbcl --script
;;;; generate ultima4 map data from d64 disk image
;; Examples
;;   ./generate-map-data.lisp ../c64u4/ULTIMA4C.D64 hex
;;   ./generate-map-data.lisp ../c64u4/ULTIMA4C.D64 base64

;;; Histogram of tile codes in ultima4 world map, which leads to run lenght 
;;; encoding
;;     - if 7th bit is 0, then whole byte is the tile code
;;     - if 7th bit is 1, then
;;          bits 3..6  is the count 0..15
;;               if count == 0, then count is in the next byte (16..255)
;;          bits 0..2  is the tile code 0..7
;;
;;   Rank Count Tile
;;     1  34014 00
;;     2  10336 01
;;     3   7159 04
;;     4   4924 05
;;     5   2328 07
;;     6   2304 06
;;     7   1933 02
;;     8   1745 08
;;     9    666 03
;;    10     70 4c
;;    11     17 17
;;    12      7 46
;;    13      7 1e
;;    14      7 0a
;;    15      7 09
;;    16      4 0c
;;    17      3 0b
;;    18      1 3d
;;    19      1 1d
;;    20      1 0f
;;    21      1 0e
;;    22      1 0d

;; Quiclisp setup, normally in .sbclrc, which is not read with --script
#-quicklisp
(let ((quicklisp-init (merge-pathnames "quicklisp/setup.lisp"
                                       (user-homedir-pathname))))
  (when (probe-file quicklisp-init)
    (load quicklisp-init)))

(let ((*standard-output* *error-output*))
  (ql:quickload "cl-base64"))


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

(defun rle-encode-byte (byte n)
  "Encode one run of n bytes. Returns a list of encoded bytes"
  (cond
    ((= n 1) 
     (list byte))
    ((and (<= 2 n 15)
          (<= 0 byte 7))
     (list (logior (ash 1 7)
                   (ash n 3)
                   byte)))
    ((<= 16 n 255)
     (list (logior (ash 1 7)
                   byte)
           n))
    (t (error "illegal data for encoding: ~A ~A" byte n))))
    

(defun rle-encode (data &optional (maxlen 255))
  "RLE encodes data in array and returns new array"
    (let ((buf (make-array (length data) :element-type '(unsigned-byte 8) :fill-pointer 0))
	  (count 1)
	  (prev nil))
      (dolist (byte (coerce data 'list))
	(when (and prev
		   (<= 0 byte 7)
		   (= prev byte))
	    (incf count))
	(when prev
	  (if (= prev byte)
	      (if (<= 0 byte 7)
		  (when (> count maxlen)
		    (setf buf (concatenate 'vector buf (rle-encode-byte prev (1- count))))
		    (setf count 1))
		  (progn
		    (setf buf (concatenate 'vector buf (rle-encode-byte prev count)))
		    (setf count 1)))
	      (progn
		(setf buf (concatenate 'vector buf (rle-encode-byte prev count)))
		(setf count 1))))	      
	(setf prev byte))
      (setf buf (concatenate 'vector buf (rle-encode-byte prev count)))
      buf))
		  
	  

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
	      ((string= frmt "rle-base64")
	       (format t "~A~%"
		       (cl-base64:usb8-array-to-base64-string (rle-encode data) :columns 76)))
	      (t
	       (format t "error: unknown format: ~A~%" frmt)))
	    (format t "error: could not read data from file: ~A~%" disk-name)))
      (format t "usage: generate-map-data.lisp <britannia-disk> <format>~%~{~A~%~}"
	      '("where <format> is:"
		"      hex         hex codes with two digits per byte, 256 bytes per line"
		"      base64      base64 encoded bytes, 76 chars per line"
		"      rle-base64  run length encoded + base64 encodede"))))

