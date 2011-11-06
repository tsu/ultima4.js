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
  function dbgSetAccumulator(v) {
    A = v;
  }
  function dbgSetIndexRegisterX(v) {
    X = v;
  }
  function dbgSetIndexRegisterY(v) {
    Y = v;
  }
  function dbgGetIndexRegisterX() {
    return X;
  }
  function dbgGetIndexRegisterY() {
    return Y;
  }
  return {
    TAX: TAX,
    TAY: TAY,
    dbgSetAccumulator: dbgSetAccumulator,
    dbgGetIndexRegisterX: dbgGetIndexRegisterX,
    dbgSetIndexRegisterX: dbgSetIndexRegisterX,
    dbgGetIndexRegisterY: dbgGetIndexRegisterY,
    dbgSetIndexRegisterY: dbgSetIndexRegisterY
  };
})();