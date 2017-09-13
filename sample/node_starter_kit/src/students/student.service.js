import _ from 'lodash';

let students = [
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

export const getStudentList = cb => {
  cb(null, students);
};

export const getStudent = (id, cb) => {
  let student = getStudentWithId(students, id);
  if (student) {
    cb(null, student);
  } else {
    cb('Unable to get Student with id =' + id, null);
  }
};

export const getStudentWithId = (students, id) => {
  return (
    _.find(students, s => {
      return s.id === id;
    }) || false
  );
};

export default {
  getStudentList,
  getStudent,
};
