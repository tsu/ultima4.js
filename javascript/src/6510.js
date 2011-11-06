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
  function dbgSetA(v) {
    A = v;
  }
  function dbgSetX(v) {
    X = v;
  }
  function dbgSetY(v) {
    Y = v;
  }
  function dbgGetA() {
    return A;
  }
  function dbgGetX() {
    return X;
  }
  function dbgGetY() {
    return Y;
  }
  return {
    TAX: TAX,
    TAY: TAY,
    dbgSetA: dbgSetA,
    dbgGetA: dbgGetA,
    dbgGetX: dbgGetX,
    dbgSetX: dbgSetX,
    dbgGetY: dbgGetY,
    dbgSetY: dbgSetY
  };
})();