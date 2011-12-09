#!/usr/local/bin/sbcl --script
;;;; generate ultima4 map data from d64 disk image
;; Examples
;;   ./generate-map-data.lisp ../c64u4/ULTIMA4C.D64 world hex
;;   ./generate-map-data.lisp ../c64u4/ULTIMA4C.D64 world base64
;;   ./generate-map-data.lisp ../c64u4/ULTIMA4B.D64 town rle-base64

;;; Histogram of tile codes in ultima4 world map, which leads to run lenght 
;;; encoding
;;     - if 7th bit is 0, then whole byte is the tile code
;;     - if 7th bit is 1, then
;;          bits 3..6  is the count 0..15
;;               if count == 0, then count is in the next byte (16..255)
;;               if next (2nd) byte is 0, then count=1 and code=3rd byte
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


(defun seq-slice (seq n)
  "Slices sequence in slices with length of n. Returns a list of slices"
  (let ((res))
    (dotimes (i (ceiling (/ (length seq) n)))
      (push (subseq seq (* i n) 
                    (min (* (1+ i) n) (length seq)))
            res))
    (nreverse res)))
      
(defun quad-encode (data x y n &optional ht)
  "Encode 2d array data in quad-tree format"
  (if ht
      (flet ((code (val)
               (if (gethash val ht)
                   (gethash val ht)
                   (setf (gethash val ht) (1+ (hash-table-count ht))))))
        (if (= n 1)
            (code (aref data y x))
            (let ((m (/ n 2)))
              (code (list (quad-encode data x y m ht)
                          (quad-encode data (+ x m) y m ht)
                          (quad-encode data x (+ y m) m ht)
                          (quad-encode data (+ x m) (+ y m) m ht))))))
      (let ((table (make-hash-table :test 'equal)))
        (quad-encode data x y n table)
        table)))

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

(defun read-town-maps (filename)
  "Read all towne maps from file into array"
  (when (probe-file filename)
    (with-open-file (in filename :element-type '(unsigned-byte 8))
      (let ((maps (make-array (* 256 4 17) :element-type '(unsigned-byte 8))))
	(dotimes (town 17)
          (file-position in (* (+ 257 (* town 5)) 256))
          (read-sequence maps in :start (* 256 4 town) :end (+ (* 256 4 town) 1024)))
        maps))))
  
(defun rle-encode-byte (byte n)
  "Encode one run of n bytes. Returns a list of encoded bytes"
  (if (> (logand byte #x80) 0)
      (list (ash 1 7) 0 byte)
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
        (t (error "illegal data for encoding: ~A ~A" byte n)))))
    
(defun rle-encode (data &optional (maxlen 255))
  "RLE encodes data in array and returns new array"
    (let ((buf (make-array (length data) :element-type '(unsigned-byte 8) :fill-pointer 0))
	  (count 1)
	  (prev nil))
      (flet ((emit (byte n)
               (map nil #'(lambda (b) (vector-push b buf))
                    (rle-encode-byte byte n))
               (setf count 1)))
        (dolist (byte (coerce data 'list))
          (when (and prev
                     (<= 0 byte 7)
                     (= prev byte))
	    (incf count))
          (when prev
            (if (= prev byte)
                (if (<= 0 byte 7)
                    (when (> count maxlen)
                      (emit prev (1- count)))
                    (emit prev count))
                (emit prev count)))
          (setf prev byte))
        (emit prev count)
        buf)))
		  
(defun do-world-map (disk-name fmt)
  "Read world map data from disk and output data in format fmt"
  (let ((data (read-worldmap disk-name)))
    (cond
      ((string= fmt "hex")
       (dotimes (y 256)
         (format t "~{~2,'0X~}~%" 
                 (coerce (subseq data 
                                 (* y 256) 
                                 (+ (* y 256) 256)) 
                         'list))))
      ((string= fmt "base64")
       (format t "~A~%"
               (cl-base64:usb8-array-to-base64-string data :columns 76)))
      ((string= fmt "rle-base64")
       (format t "~A~%"
               (cl-base64:usb8-array-to-base64-string (rle-encode data) :columns 76)))
      (t (error "unknown format: ~A" fmt)))))

(defun do-town-maps (disk-name fmt)
  "Read town maps data from disk and output data in format fmt"
  (let ((data (read-town-maps disk-name)))
    (cond
      ((string= fmt "hex")
       (format t "~{~2,'0X~}~%" 
               (coerce data 'list)))
      ((string= fmt "base64")
       (format t "~A~%"
               (cl-base64:usb8-array-to-base64-string data :columns 76)))
      ((string= fmt "rle-base64")
       (format t "~A~%"
               (cl-base64:usb8-array-to-base64-string (rle-encode data) :columns 76)))
      (t (error "unknown format: ~A" fmt)))))


;;; Startup from command line
(let ((argv sb-ext:*posix-argv*))
  (if (> (length argv) 3)
      (let* ((disk-name (nth 1 argv))
             (type (nth 2 argv))
             (frmt (nth 3 argv)))
        (cond 
          ((not (probe-file disk-name))
           (format t "error: no such file: ~A~%" disk-name))
          ((and (string/= frmt "hex")
                (string/= frmt "base64")
                (string/= frmt "rle-base64"))
           (format t "error: unknown format: ~A~%" frmt))
           (t
            (cond
              ((string= type "world")
               (do-world-map disk-name frmt))
              ((string= type "town")
               (do-town-maps disk-name frmt))
              (t 
               (format t "error: uknown type (not world or town): ~A~%" type))))))
      (format t "usage: generate-map-data.lisp <britannia/towne-disk> [world|town] <format>~%~{~A~%~}"
              '("where <format> is:"
                "      hex         hex codes with two digits per byte, 256 bytes per line"
                "      base64      base64 encoded bytes, 76 chars per line"
                "      rle-base64  run length encoded + base64 encodede"))))

