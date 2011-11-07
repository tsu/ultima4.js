describe("6510 debug functionality", function() {
  it("should get and set the accumulator", function() {
    _6510.dbgSetA(0xfa);
    expect(_6510.dbgGetA()).toEqual(0xfa);
  });
  it("should get and set the index register y", function() {
    _6510.dbgSetY(0xfa);
    expect(_6510.dbgGetY()).toEqual(0xfa);
  });
  it("should get and set the index register x", function() {
    _6510.dbgSetX(0xfa);
    expect(_6510.dbgGetX()).toEqual(0xfa);
  });
  it("should get and set the stack pointer", function() {
    _6510.dbgSetSP(0xff);
    expect(_6510.dbgGetSP()).toEqual(0xfF);
  });
  it("should reset the 6510", function() {
    _6510.dbgSetA(0xf3);
    _6510.dbgSetY(0xa4);
    _6510.dbgSetX(0x87);
    _6510.dbgSetSP(0x11);
    _6510.dbgReset();
    expect(_6510.dbgGetA()).toEqual(0x00);
    expect(_6510.dbgGetY()).toEqual(0x00);
    expect(_6510.dbgGetX()).toEqual(0x00);
    expect(_6510.dbgGetSP()).toEqual(0x00);
  });
});
describe("in the 6510 instruction set", function() {
  beforeEach(_6510.dbgReset);
  describe("ADC", function() {
    it("should add memory to accumulator with carry", function() {
    });
  });
  describe("AND", function() {
    it("should binary and memory with accumulator", function() {
    });
  });
  describe("ASL", function() {
    it("should shift left one bit (memory or accumulator)", function() {
    });
  });
  describe("BCC", function() {
    it("should branch on carry clear", function() {
    });
  });
  describe("BCS", function() {
    it("should branch on carry set", function() {
    });
  });
  describe("BEQ", function() {
    it("should branch on result zero", function() {
    });
  });
  describe("BIT", function() {
    it("should test bits in memory with accumulator", function() {
    });
  });
  describe("BMI", function() {
    it("should branch on result minus", function() {
    });
  });
  describe("BNE", function() {
    it("should branch on result not zero", function() {
    });
  });
  describe("BPL", function() {
    it("should branch on result plus", function() {
    });
  });
  describe("BRK", function() {
    it("should force break", function() {
    });
  });
  describe("BVC", function() {
    it("should branch on overflow clear", function() {
    });
  });
  describe("BVS", function() {
    it("should branch on overflow set", function() {
    });
  });
  describe("CLC", function() {
    it("should clear carry flag", function() {
    });
  });
  describe("CLD", function() {
    it("should clear decimal mode", function() {
    });
  });
  describe("CLI", function() {
    it("should clear interrupt disable bit", function() {
    });
  });
  describe("CLV", function() {
    it("should clear overflow flag", function() {
    });
  });
  describe("CMP", function() {
    it("should set the Z flag if the given immediate value equals the value of the accumulator", function() {
      _6510.dbgSetA(0x34);
      _6510.CMP_i(0x34);
      expect(_6510.dbgFlagSet(_6510.flags.Z)).toBeTruthy();
      _6510.CMP_i(0xf2);
      expect(_6510.dbgFlagSet(_6510.flags.Z)).toBeFalsy();
    });
  });
  describe("CPX", function() {
    it("should compare memory and index x", function() {
    });
  });
  describe("CPY", function() {
    it("should compare memory and index y", function() {
    });
  });
  describe("DEC", function() {
    it("should decrement memory by one", function() {
    });
  });
  describe("DEX", function() {
    it("should decrement index x by one", function() {
    });
  });
  describe("DEY", function() {
    it("should decrement index y by one", function() {
    });
  });
  describe("EOR", function() {
    it("should binary xor memory with accumulator", function() {
    });
  });
  describe("INC", function() {
    it("should increment memory by one", function() {
    });
  });
  describe("INX", function() {
    it("should increment index x by one", function() {
    });
  });
  describe("INY", function() {
    it("should increment index y by one", function() {
    });
  });
  describe("JMP", function() {
    it("should jump to new location", function() {
    });
  });
  describe("JSR", function() {
    it("should jump to new location saving return address", function() {
    });
  });
  describe("LDA", function() {
    it("should load accumulator with memory", function() {
    });
  });
  describe("LDX", function() {
    it("should load index x with memory", function() {
    });
  });
  describe("LDY", function() {
    it("should load index y with memory", function() {
    });
  });
  describe("LSR", function() {
    it("should shift one bit right (memory or accumulator)", function() {
    });
  });
  describe("NOP", function() {
    it("should no operation", function() {
    });
  });
  describe("ORA", function() {
    it("should binary or memory with accumulator", function() {
    });
  });
  describe("PHA", function() {
    it("should push accumulator on stack", function() {
    });
  });
  describe("PHP", function() {
    it("should push processor status on stack", function() {
    });
  });
  describe("PLA", function() {
    it("should pull accumulator from stack", function() {
    });
  });
  describe("PLP", function() {
    it("should pull processor status from stack", function() {
    });
  });
  describe("ROL", function() {
    it("should rotate one bit left (memory or accumulator)", function() {
    });
  });
  describe("ROR", function() {
    it("should rotate one bit right (memory or accumulator)", function() {
    });
  });
  describe("RTI", function() {
    it("should return from interrupt", function() {
    });
  });
  describe("RTS", function() {
    it("should return from subroutine", function() {
    });
  });
  describe("SBC", function() {
    it("should substract memory from accumulator with borrow", function() {
    });
  });
  describe("SEC", function() {
    it("should set carry flag", function() {
    });
  });
  describe("SED", function() {
    it("should set decimal mode", function() {
    });
  });
  describe("SEI", function() {
    it("should set interrupt disable status", function() {
    });
  });
  describe("STA", function() {
    it("should store accumulator in memory", function() {
    });
  });
  describe("STY", function() {
    it("should store index y in memory", function() {
    });
  });
  describe("TAX", function() {
    it("should transfer accumulator to index x", function() {
      var v = 0x3f;
      _6510.dbgSetA(v);
      _6510.TAX();
      expect(_6510.dbgGetX()).toEqual(v);
      expect(_6510.dbgGetA()).toEqual(v);
      expect(_6510.dbgGetY()).toEqual(0x00);
      expect(_6510.dbgGetSP()).toEqual(0x00);
    });
  });
  describe("TAY", function() {
    it("should transfer accumulator to index y", function() {
      var v = 0x3f;
      _6510.dbgSetA(v);
      _6510.TAY();
      expect(_6510.dbgGetY()).toEqual(v);
      expect(_6510.dbgGetA()).toEqual(v);
      expect(_6510.dbgGetX()).toEqual(0x00);
      expect(_6510.dbgGetSP()).toEqual(0x00);
    });
  });
  describe("TSX", function() {
    it("should transfer stack pointer to index x", function() {
      var v = 0x4d;
      _6510.dbgSetSP(v);
      _6510.TSX();
      expect(_6510.dbgGetX()).toEqual(v);
      expect(_6510.dbgGetSP()).toEqual(v);
      expect(_6510.dbgGetY()).toEqual(0x00);
      expect(_6510.dbgGetA()).toEqual(0x00);
    });
  });
  describe("TXA", function() {
    it("should transfer index x to accumulator", function() {
      var v = 0x4d;
      _6510.dbgSetX(v);
      _6510.TXA();
      expect(_6510.dbgGetA()).toEqual(v);
      expect(_6510.dbgGetX()).toEqual(v);
      expect(_6510.dbgGetY()).toEqual(0x00);
      expect(_6510.dbgGetSP()).toEqual(0x00);
    });
  });
  describe("TXS", function() {
    it("should transfer index x to stack pointer", function() {
      var v = 0x4d;
      _6510.dbgSetX(v);
      _6510.TXS();
      expect(_6510.dbgGetSP()).toEqual(v);
      expect(_6510.dbgGetX()).toEqual(v);
      expect(_6510.dbgGetY()).toEqual(0x00);
      expect(_6510.dbgGetA()).toEqual(0x00);
    });
  });
  describe("TYA", function() {
    it("should transfer index y to accumulator", function() {
      var v = 0x4d;
      _6510.dbgSetY(v);
      _6510.TYA();
      expect(_6510.dbgGetA()).toEqual(v);
      expect(_6510.dbgGetY()).toEqual(v);
      expect(_6510.dbgGetX()).toEqual(0x00);
      expect(_6510.dbgGetSP()).toEqual(0x00);
    });
  });
});