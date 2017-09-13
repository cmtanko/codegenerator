let ###Service = require('./###.service');

describe('###Service', function() {
  describe('getSomethingOfId', function() {
    it('Should return true if atleast one match is found', function() {
      ###Service.getSomethingOfId(1).should.have.property('id');
    });
    it('Should return false if no match is found', function() {
      ###Service.getSomethingOfId(5).should.be.false;
    });
  });
});
