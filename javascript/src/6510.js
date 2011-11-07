var _6510 = (function() {
  var A;
  var Y;
  var X;
  var SP;
  var SR;
  var flags = {
    Z: 0x02
  };
  function compare_immediate(r) {
    return function(v) {
      r === v ? (SR |= flags.Z) : (SR ^= flags.Z);
    };
  }
  function LDA_i(v) {
    A = v;
  }
  function LDX_i(v) {
    X = v;
  }
  function LDY_i(v) {
    Y = v;
  }
  function TAX() {
    X = A;
  }
  function TAY() {
    Y = A;
  }
  function TXA() {
    A = X;
  }
  function TXS() {
    SP = X;
  }
  function TSX() {
    X = SP;
  }
  function TYA() {
    A = Y;
  }
  return {
    CMP_i: compare_immediate(A),
    CPX_i: compare_immediate(X),
    CPY_i: compare_immediate(Y),
    LDA_i: LDA_i,
    LDX_i: LDX_i,
    LDY_i: LDY_i,
    TAX: TAX,
    TAY: TAY,
    TSX: TSX,
    TXA: TXA,
    TXS: TXS,
    TYA: TYA,
    flags: flags,
    dbgSetA: function(v) { A = v; },
    dbgSetY: function(v) { Y = v; },
    dbgSetX: function(v) { X = v; },
    dbgSetSP: function(v) { SP = v; },
    dbgSetSR: function(v) { SR = v; },
    dbgGetA: function() { return A; },
    dbgGetY: function() { return Y; },
    dbgGetX: function() { return X; },
    dbgGetSP: function() { return SP; },
    dbgGetSR: function() { return SR; },
    dbgFlagSet: function(f) { return SR & f; },
    dbgReset: function() {
      _6510.dbgSetA(0x00);
      _6510.dbgSetY(0x00);
      _6510.dbgSetX(0x00);
      _6510.dbgSetSP(0x00);
      _6510.dbgSetSR(0x00);
    },
    dbgGetState: function() {
      return [
        _6510.dbgGetA(),
        _6510.dbgGetY(),
        _6510.dbgGetX(),
        _6510.dbgGetSP(),
        _6510.dbgGetSR()
      ];
    }
  };
})();