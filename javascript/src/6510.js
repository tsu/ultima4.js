var _6510 = new function() {
  this.flags = 0x00,
  this.sec = function() {
    this.flags |= 0x01;
  };
  this.clc = function() {
    this.flags ^= 0x01;
  };
};