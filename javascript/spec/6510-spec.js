describe("6510", function() {
  describe("carry flag", function() {
    it("should be set with sec", function() {
      _6510.flags = 0x00;
      _6510.sec();
      expect(_6510.flags & 0x01).toEqual(0x01);
    });
    it("should be unset with clc", function() {
      _6510.flags = 0xff;
      _6510.clc();
      expect(_6510.flags & 0x01).toEqual(0x00);
    });
  });
});