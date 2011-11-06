var _6510 = (function() {
  var A;
  var Y;
  var X;
  function TAX() {
    X = A;
  }
  function TAY() {
    Y = A;
  }
  function TXA() {
    A = X;
  }
  function TYA() {
    A = Y;
  }
  return {
    TAX: TAX,
    TAY: TAY,
    TXA: TXA,
    TYA: TYA,
    dbgSetA: function(v) { A = v; },
    dbgSetY: function(v) { Y = v; },
    dbgSetX: function(v) { X = v; },
    dbgGetA: function() { return A; },
    dbgGetY: function() { return Y; },
    dbgGetX: function() { return X; },
    dbgReset: function() {
      _6510.dbgSetA(0x00);
      _6510.dbgSetY(0x00);
      _6510.dbgSetX(0x00);
    }
  };
})();