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
  return {
    TAX: TAX,
    TAY: TAY,
    dbgSetA: function(v) { A = v; },
    dbgSetY: function(v) { Y = v; },
    dbgSetX: function(v) { X = v; },
    dbgGetA: function() { return A; },
    dbgGetY: function() { return Y; },
    dbgGetX: function() { return X; }
  };
})();