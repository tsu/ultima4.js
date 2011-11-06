var _6510 = (function() {
  var A = 0x00;
  var X = 0x00;
  function TAX() {
    X = A;
  }
  function dbgSetAccumulator(value) {
    A = value;
  }
  function dbgGetIndexRegisterX() {
    return X;
  }
  return {
    TAX: TAX,
    dbgSetAccumulator: dbgSetAccumulator,
    dbgGetIndexRegisterX: dbgGetIndexRegisterX
  };
})();