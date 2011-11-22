#!/usr/local/bin/sbcl --script
;; Convert text strings in U4-memory-format to ASCII by clearin 7th bit. Reads from stdin, writes to stdout.
;;
;; Example:  ./u4mf-to-ascii.lisp < vice-memory-dump.vsf | strings
   
(do ((c (read-byte *STANDARD-INPUT*) (read-byte *STANDARD-INPUT*)))
    ((null c))
  (write-byte (logand c #x7f)
              *STANDARD-OUTPUT*))