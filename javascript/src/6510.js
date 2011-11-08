var _6510 = (function() {
  var A;
  var Y;
  var X;
  var SP;
  var SR;
  var flags = {
    Z: 0x02
  };
  function compareImmediate(r) {
    return function(v) {
      ifTrueSetZ(r() === v);
    };
  }
  function ifTrueSetZ(test) {
     test ? (SR |= flags.Z) : (SR &= (0xff ^ flags.Z));
  }
  function loadImmediate(r) {
    return function(v) {
      ifZeroSetZ(v);
      r(v);
    };
  }
  function ifZeroSetZ(v) {
    ifTrueSetZ(v === 0);
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
    CMP_i: compareImmediate(function() { return A; }),
    CPX_i: compareImmediate(function() { return X; }),
    CPY_i: compareImmediate(function() { return Y; }),
    LDA_i: loadImmediate(function(v) { A = v; }),
    LDX_i: loadImmediate(function(v) { X = v; }),
    LDY_i: loadImmediate(function(v) { Y = v; }),
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