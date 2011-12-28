#!/usr/local/bin/sbcl --script
;;;; generate ultima4 game data from d64 disk images

;; Examples
;;   ./generate-game-data.lisp ../c64u4 world hex
;;   ./generate-game-data.lisp ../c64u4 town lzw-base64
;;   ./generate-game-data.lisp ../c64u4 font lzw-base64 
;;   ./generate-game-data.lisp ../c64u4 inhabitant lzw-base64  
;;   ./generate-game-data.lisp ../c64u4 talk lzw-base64

;;; RLE encoding
;;     - if 7th bit is 0, then whole byte is the tile code
;;     - if 7th bit is 1, then
;;          bits 3..6  is the count 0..15
;;               if count == 0, then count is in the next byte (16..255)
;;               if next (2nd) byte is 0, then count=1 and code=3rd byte
;;          bits 0..2  is the tile code 0..7

;;;; Histogram of tile codes in ultima4 world map, which leads to run lenght 
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

;; Notes on LZW compression and bit packing 
;; (bit-vector-list (reduce #'(lambda (a b) (concatenate 'bit-vector a b)) (mapcar #'(lambda (a) (int-bit-vector (char-code a) 13)) (coerce "TOBEORNOTTOBEORTOBEORNOT" 'list))))


;; Quiclisp setup, normally in .sbclrc, which is not read with --script
#-quicklisp
(let ((quicklisp-init (merge-pathnames "quicklisp/setup.lisp"
                                       (user-homedir-pathname))))
  (when (probe-file quicklisp-init)
    (load quicklisp-init)))

(let ((*standard-output* *error-output*))
  (ql:quickload "cl-base64"))

;; D64-image file names
(defvar *program-disk* "ULTIMA4A.D64")
(defvar *towne-disk* "ULTIMA4B.D64")
(defvar *britannia-disk* "ULTIMA4C.D64")
(defvar *underworld-disk* "ULTIMA4D.D64")

(defun flatten (lst)
  "Flatten list"
  (if lst
      (if (atom lst)
          (list lst)
          (append (flatten (car lst)) 
                  (flatten (cdr lst))))))

(defun hash-table-list (ht &aux res)
  "Converts hash table into list list ((k1 v1) (k2 v2) ... (kn vn))"
  (maphash (lambda (k v) (push (list k v) res)) ht)
  res)


(defun int-bit-vector (i n)
  "Convert integer i to bit vector of n bits"
  (let ((res (make-array n :element-type 'bit)))
    (dotimes (b n res)
      (setf (bit res b) 
            (logand (ash i (- b (1- n))) 1)))))

(defun bit-vector-int (bv)
  "Convert bit vector to integer"
  (reduce #'(lambda (a b) (+ (ash a 1) b)) 
          bv))

(defun bit-vector-list (bv &optional (n 8))
  "Convert bit-vector to list of integers (with n bits). Length of bv must be multiple of n."
  (if (zerop (mod (length bv) n))
      (let ((res))
        (dotimes (i (/ (length bv) n) (nreverse res))
          (push (bit-vector-int (subseq bv (* i n) (* (1+ i) n))) 
                res)))))

(defun bit-vector-push (bv-src bv-dest)
  "Push bits from bc-src to bv-dest. Returns bc-dest"
  (map nil #'(lambda (x) (vector-push-extend x bv-dest)) bv-src)
  bv-dest)

(defun lzw-encode (lst &optional (dict-initial-size 256))
  "LZW encode byte values in list. Returns a list."
  (let ((dict (make-hash-table :test 'equal))
        (res)
        (cur))
    (dotimes (i dict-initial-size)
      (setf (gethash (list i) dict) i))
    (dolist (val lst)
      (when (and cur
                 (not (gethash (cons val cur) dict)))
        (setf (gethash (cons val cur) dict) 
              (hash-table-count dict))
        (push (gethash cur dict) res)
        (setf cur nil))
      (push val cur))
    (push (gethash cur dict) res)
    (nreverse res)))
      
        
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

(defun read-town-maps (filename)
  "Read all towne maps from file into array"
  (with-open-file (in filename :element-type '(unsigned-byte 8))
    (let ((maps (make-array (* 256 4 17) :element-type '(unsigned-byte 8))))
      (dotimes (town 17)
        (file-position in (* (+ 257 (* town 5)) 256))
        (read-sequence maps in :start (* 256 4 town) :end (+ (* 256 4 town) 1024)))
      maps)))

(defun read-font (filename)
  "Read font data"
  (with-open-file (in filename :element-type '(unsigned-byte 8))
    (file-position in (* 256 246))
    (let ((data (make-array 1024 :element-type '(unsigned-byte 8))))
      (read-sequence data in)
      data)))

(defun read-inhabitant (filename)
  "Read town inhabitant data"
  (with-open-file (in filename :element-type '(unsigned-byte 8))
    (let ((data (make-array (* 256 17) :element-type '(unsigned-byte 8))))
      (dotimes (town 17)
        (file-position in (+ (* 256 (+ 257 4 (* 5 town)))))
        (dotimes (j 8) 
          (dotimes (i 32)
            (setf (aref data (+ (* 256 town) (* i 8) j)) 
                  (read-byte in)))))
      data)))

(defun read-talk (filename)
  "Read talk data from towne disk"
  (with-open-file (in filename :element-type '(unsigned-byte 8))
    (file-position in 256)
    (let ((data (make-array (* 256 256) :element-type '(unsigned-byte 8))))
      (read-sequence data in)
      data)))

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

(defun encode-data (data fmt dict-size)
  "Encode data in byte array with format fmt. Returns string"
  (ecase fmt
    (hex  
     (format nil "~{~2,'0X~}" (coerce data  'list)))
    (base64
     (cl-base64:usb8-array-to-base64-string data))
    (rle-base64
     (cl-base64:usb8-array-to-base64-string (rle-encode data)))
    (lzw-base64
     (let ((bv (make-array 1024 :element-type 'bit :adjustable t :fill-pointer 0)))
       (map nil #'(lambda (x) (bit-vector-push x bv))
            (mapcar #'(lambda (a) (int-bit-vector a dict-size))
                    (lzw-encode (coerce data 'list))))
       (dotimes (i (- 8 (mod (length bv) 8)))
         (bit-vector-push #*0 bv))
       (cl-base64:usb8-array-to-base64-string 
                         (coerce (bit-vector-list bv) 'vector))))))

;;; Startup from command line
(let ((argv sb-ext:*posix-argv*))
  (if (> (length argv) 3)
      (handler-case 
          (let* ((disk-dir (nth 1 argv))
                 (type (intern (string-upcase (nth 2 argv))))
                 (frmt (intern (string-upcase (nth 3 argv))))
                 (disk-name (concatenate 
                             'string disk-dir "/"
                             (ecase type
                               (world *britannia-disk*)
                               (town *towne-disk*)
                               (font *program-disk*)
                               (inhabitant *towne-disk*)
                               (talk *towne-disk*)))))
            (write-line
             (ecase type
               (world      (encode-data (read-worldmap disk-name) frmt 13))
               (town       (encode-data (read-town-maps disk-name) frmt 12))
               (font       (encode-data (read-font disk-name) frmt 10))
               (inhabitant (encode-data (read-inhabitant disk-name) frmt 11))
               (talk       (encode-data (read-talk disk-name) frmt 15)))))
        (error (e) (format t "error: ~A~%" e)))
      (format t "~%~{~A~%~}"
              '("usage: generate-game-data.lisp <d64-directory> [ world | town | font | inhabitant | talk ] <format>"
                "where <format> is:"
                "      hex         hex codes with two digits per byte"
                "      base64      base64 encoded bytes"
                "      rle-base64  run length  + base64 encoded"
                "      lzw-base64  LZW + base64 encoded"))))
