let should = require('chai').should();
let Student = require('../../dist/models/student');

describe('Student Model', function() {
  let student;
  before(function() {
    student = new Student({
      id: 1,
      firstname: 'firstName',
      lastname: 'lastName',
      age: '15',
      hobbies: ['singing', 'treking', 'football'],
      class: 5,
      gender: 'Male',
    });
  });

  describe('isValid', function() {
    it('Should return true if firstname and lastname is present', () => {
      let isValid = student.isValid();
      isValid.should.equal(true);
    });
    it('Should return false if firstname is missing', () => {
      let student = new Student({ lastname: 'asdf' });
      let isValid = student.isValid();
      isValid.should.equal(false);
    });
    it('Should return false if lastname is missing', () => {
      let student = new Student({ firstname: 'firstname' });
      let isValid = student.isValid();
      isValid.should.equal(false);
    });
  });
});
