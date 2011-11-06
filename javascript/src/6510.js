var _6510 = (function() {
  var A;
  var Y;
  var X;
  var S;
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
    S = X;
  }
  function TSX() {
    X = S;
  }
  function TYA() {
    A = Y;
  }
  return {
    TAX: TAX,
    TAY: TAY,
    TSX: TSX,
    TXA: TXA,
    TXS: TXS,
    TYA: TYA,
    dbgSetA: function(v) { A = v; },
    dbgSetY: function(v) { Y = v; },
    dbgSetX: function(v) { X = v; },
    dbgSetS: function(v) { S = v; },
    dbgGetA: function() { return A; },
    dbgGetY: function() { return Y; },
    dbgGetX: function() { return X; },
    dbgGetS: function() { return S; },
    dbgReset: function() {
      _6510.dbgSetA(0x00);
      _6510.dbgSetY(0x00);
      _6510.dbgSetX(0x00);
      _6510.dbgSetS(0x00);
    }
  };
})();