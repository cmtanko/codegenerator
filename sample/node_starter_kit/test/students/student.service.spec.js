let studentService = require('../../dist/students/student.service');

describe('studentService', function() {
  let students;
  before(function() {
    students = [
      {
        id: 1,
        firstname: 'Student ',
        lastname: '1',
        age: '30',
        hobbies: [
          'singing',
          'dancing',
          'painting',
          'cycling',
          'treking',
          'football',
        ],
        class: 1,
        gender: 'Male',
      },
      {
        id: 2,
        firstname: 'Student ',
        lastname: '2',
        age: '15',
        hobbies: ['singing', 'treking', 'football'],
        class: 5,
        gender: 'Male',
      },
      {
        id: 3,
        firstname: 'Student ',
        lastname: '3',
        age: '25',
        hobbies: ['football'],
        class: 3,
        gender: 'Male',
      },
      {
        id: 4,
        firstname: 'Student ',
        lastname: '4',
        age: '25',
        hobbies: ['painting', 'cycling', 'treking', 'football'],
        class: 5,
        gender: 'Male',
      },
    ];
  });

  describe('getStudentWithId', function() {
    it('Should return true if atleast one match is found', function() {
      studentService.getStudentWithId(students, 1).should.have.property('id');
    });
    it('Should return false if no match is found', function() {
      studentService.getStudentWithId(students, 5).should.be.false;
    });
  });
});
