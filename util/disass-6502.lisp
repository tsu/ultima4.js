;;;; Disassbmbler for 6502 binary files
;; Reads from stdout, or can be give a file from cmd line. 
;; Example: sbcl --script disass-6502.lisp foo.dat


;;; Definitions
;; Instruction = (Opcode AddresingMode Data)
;; Examples
;;   LDA        ; opcode
;;   Absolute   ; addresing mode
;;   45 67 A1   ; data (1..3 bytes) first one is the opcode

;; 6502 opcodes
(defvar *opcodes* 
  '((#x00 (BRK Implied))     (#x01 (ORA IndirectX)) (#x05 (ORA ZeroPage))
    (#x06 (ASL ZeroPage))    (#x08 (PHP Implied))   (#x09 (ORA Immediate))
    (#x0A (ASL Accumulator)) (#x0D (ORA Absolute))  (#x0E (ASL Absolute))
    (#x10 (BPL Relative))    (#x11 (ORA IndirectY)) (#x15 (ORA ZeroPageX))
    (#x16 (ASL ZeroPageX))   (#x18 (CLC Implied))   (#x19 (ORA AbsoluteY))
    (#x1D (ORA AbsoluteX))   (#x1E (ASL AbsoluteX)) (#x20 (JSR Absolute))
    (#x21 (AND IndirectX))   (#x24 (BIT ZeroPage))  (#x25 (AND ZeroPage))
    (#x26 (ROL ZeroPage))    (#x28 (PLP Implied))   (#x29 (AND Immediate))
    (#x2A (ROL Accumulator)) (#x2C (BIT Absolute))  (#x2D (AND Absolute))
    (#x2E (ROL Absolute))    (#x30 (BMI Relative))  (#x31 (AND IndirectY))
    (#x35 (AND ZeroPageX))   (#x36 (ROL ZeroPageX)) (#x38 (SEC Implied))
    (#x39 (AND AbsoluteY))   (#x3D (AND AbsoluteX)) (#x3E (ROL AbsoluteX))
    (#x40 (RTI Implied))     (#x41 (EOR IndirectX)) (#x45 (EOR ZeroPage))
    (#x46 (LSR ZeroPage))    (#x48 (PHA Implied))   (#x49 (EOR Immediate))
    (#x4A (LSR Accumulator)) (#x4C (JMP Absolute))  (#x4D (EOR Absolute))
    (#x4E (LSR Absolute))    (#x50 (BVC Relative))  (#x51 (EOR IndirectY))
    (#x55 (EOR ZeroPageX))   (#x56 (LSR ZeroPageX)) (#x58 (CLI Implied))
    (#x59 (EOR AbsoluteY))   (#x5D (EOR AbsoluteX)) (#x5E (LSR AbsoluteX))
    (#x60 (RTS Implied))     (#x61 (ADC IndirectX)) (#x65 (ADC ZeroPage))
    (#x66 (ROR ZeroPage))    (#x68 (PLA Implied))   (#x69 (ADC Immediate))
    (#x6A (ROR Accumulator)) (#x6C (JMP Indirect))  (#x6D (ADC Absolute))
    (#x6E (ROR Absolute))    (#x70 (BVS Relative))  (#x71 (ADC IndirectY))
    (#x75 (ADC ZeroPageX))   (#x76 (ROR ZeroPageX)) (#x78 (SEI Implied))
    (#x79 (ADC AbsoluteY))   (#x7D (ADC AbsoluteX)) (#x7E (ROR AbsoluteX))
    (#x81 (STA IndirectX))   (#x84 (STY ZeroPage))  (#x85 (STA ZeroPage))
    (#x86 (STX ZeroPage))    (#x88 (DEY Implied))   (#x8A (TXA Implied))
    (#x8C (STY Absolute))    (#x8D (STA Absolute))  (#x8E (STX Absolute))
    (#x90 (BCC Relative))    (#x91 (STA IndirectY)) (#x94 (STY ZeroPageX))
    (#x95 (STA ZeroPageX))   (#x96 (STX ZeroPageY)) (#x98 (TYA Implied))
    (#x99 (STA AbsoluteY))   (#x9A (TXS Implied))   (#x9D (STA AbsoluteX))
    (#xA0 (LDY Immediate))   (#xA1 (LDA IndirectX)) (#xA2 (LDX Immediate))
    (#xA4 (LDY ZeroPage))    (#xA5 (LDA ZeroPage))  (#xA6 (LDX ZeroPage))
    (#xA8 (TAY Implied))     (#xA9 (LDA Immediate)) (#xAA (TAX Implied))
    (#xAC (LDY Absolute))    (#xAD (LDA Absolute))  (#xAE (LDX Absolute))
    (#xB0 (BCS Relative))    (#xB1 (LDA IndirectY)) (#xB4 (LDY ZeroPageX))
    (#xB5 (LDA ZeroPageX))   (#xB6 (LDX ZeroPageY)) (#xB8 (CLV Implied))
    (#xB9 (LDA AbsoluteY))   (#xBA (TSX Implied))   (#xBC (LDY AbsoluteX))
    (#xBD (LDA AbsoluteX))   (#xBE (LDX AbsoluteY)) (#xC0 (CPX Immediate))
    (#xC1 (CMP IndirectX))   (#xC4 (CPX ZeroPage))  (#xC5 (CMP ZeroPage))
    (#xC6 (DEC ZeroPage))    (#xC8 (INY Implied))   (#xC9 (CMP Immediate))
    (#xCA (DEX Implied))     (#xCC (CPX Absolute))  (#xCD (CMP Absolute))
    (#xCE (DEC Absolute))    (#xD0 (BNE Relative))  (#xD1 (CMP IndirectY))
    (#xD5 (CMP ZeroPageX))   (#xD6 (DEC ZeroPageX)) (#xD8 (CLD Implied))
    (#xD9 (CMP AbsoluteY))   (#xDD (CMP AbsoluteX)) (#xDE (DEC AbsoluteX))
    (#xE0 (CPX Immediate))   (#xE1 (SBC IndirectX)) (#xE4 (CPX ZeroPage))
    (#xE5 (SBC ZeroPage))    (#xE6 (INC ZeroPage))  (#xE8 (INX Implied))
    (#xE9 (SBC Immediate))   (#xEA (NOP Implied))   (#xEC (CPX Absolute))
    (#xED (SBC Absolute))    (#xEE (INC Absolute))  (#xF0 (BEQ Relative))
    (#xF1 (SBC IndirectY))   (#xF5 (SBC ZeroPageX)) (#xF6 (INC ZeroPageX))
    (#xF8 (SED Implied))     (#xF9 (SBC AbsoluteY)) (#xFD (SBC AbsoluteX))
    (#xFE (INC AbsoluteX))))

(defvar *opcodes-ht* (make-hash-table))
(mapc #'(lambda (x) (setf (gethash (car x) *opcodes-ht*) (cadr x))) *opcodes*)

(defun byte-opcode (byte)
  "Give opcode for byte. Returns list."
  (let ((op (gethash byte *opcodes-ht*)))
    (if op
	op
	(list "???" 'Unknown))))

(defun addressing-mode-length (mode)
  "Number of data bytes used by addressing mode"
  (case mode
    ((Implied Unknown Accumulator) 0)
    ((Immediate ZeroPage ZeroPageX IndirectX IndirectY Relative) 1)
    ((Absolute AbsoluteX AbsoluteY Indirect) 2)))

(defun addr-data-string (mode data)
  "Addressing mode (with data) as string"
  (case mode
    ((Implied Unknown Accumulator) "")
    (Immediate (format nil "#$~2,'0x" (car data)))
    (Zeropage (format nil "$~2,'0x" (car data)))
    (ZeropageX (format nil "$~2,'0x,X" (car data)))
    (ZeropageY (format nil "$~2,'0x,Y" (car data)))
    (IndirectX (format nil "($~2,'0x,X)" (car data)))
    (IndirectY (format nil "($~2,'0x),Y" (car data)))
    (Relative (format nil "rel #$~2,'0x" (car data)))
    (Absolute (format nil "$~2,'0x~2,'0x" (cadr data) (car data)))
    (AbsoluteX (format nil "$~2,'0x~2,'0x,X" (cadr data) (car data)))
    (AbsoluteY (format nil "$~2,'0x~2,'0x,Y" (cadr data) (car data)))
    (Indirect (format nil "($~2,'0x~2,'0x)" (cadr data) (car data)))))

(defun read-next-opcode (stream)
  "Reads next 6502 opcode with data from stream. Returns list."
  (let ((b (read-byte stream nil)))
    (if b
	(let ((op (byte-opcode b))
	      (data))
	  (list b 
		op
		(dotimes (i (addressing-mode-length (cadr op)) data)
		  (push (read-byte stream nil) data)))))))


(defun disass (input output &key (size nil) (stop-on-rts t))
  "Read 6502 binary code from output and write disassembled opcoded to output"
  (do* ((prev nil (car op))
	(pc 0 (incf pc))
	(op (read-next-opcode input) (read-next-opcode input))
	(n 0 (incf n)))
      ((or (null op)
	   (and size (> n size))
	   (and stop-on-rts prev (= prev #x60)))
       t)
    (format output ".~4,'0x" pc)
    (format output "   ~2,'0x" (car op))
    (format output " ~{~2,'0x ~}" (caddr op))
    (format output " ~19T~A" (caadr op))
    (format output " ~A" (addr-data-string (cadadr op) (caddr op)))
    (format output "~%")))


;;; Startup from command line
(if (> (length sb-ext:*posix-argv*) 1)
    (with-open-file (in (cadr sb-ext:*posix-argv*) :element-type '(unsigned-byte 8))
      (disass in *standard-output* ))
    (disass *standard-input* *standard-output*))

