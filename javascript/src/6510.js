var _6510 = (function() {
  var A;
  var Y;
  var X;
  var SP;
  var SR;
  var flags = {
    Z: 0x02
  };
  function CMP_i(v) {
    A === v ? (SR |= flags.Z) : (SR ^= flags.Z);
  }
  function LDA_i(v) {
    A = v;
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
    CMP_i: CMP_i,
    LDA_i: LDA_i,
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
    dbgGetA: function() { return A; },
    dbgGetY: function() { return Y; },
    dbgGetX: function() { return X; },
    dbgGetSP: function() { return SP; },
    dbgFlagSet: function(f) { return SR & f; },
    dbgReset: function() {
      _6510.dbgSetA(0x00);
      _6510.dbgSetY(0x00);
      _6510.dbgSetX(0x00);
      _6510.dbgSetSP(0x00);
    }
  };
})();