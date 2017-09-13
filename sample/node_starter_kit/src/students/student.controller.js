import studentService from './student.service';
import Student from '../models/student';

const studentController = () => {
  const getAllStudents = (req, res) => {
    const query = parseInt(req.query['q']) || undefined;
    try {
      if (query) {
        studentService.getStudent(query, (err, data) => {
          if (err) {
            res.send({
              success: false,
              results: 'Unable to get data' + err,
            });

            return;
          }

          let student = new Student(data);

          res.send({
            success: true,
            results: student,
          });
        });
      } else {
        studentService.getStudentList((err, data) => {
          if (err) {
            res.send({
              success: false,
              results: 'Unable to get data' + err,
            });

            return;
          }

          let students = [];
          data.forEach(function(s) {
            let student = new Student(s);
            students.push(student);
          }, this);

          res.send({
            success: true,
            results: students,
          });
        });
      }
    } catch (error) {
      res.send({
        success: false,
        message: 'Unable to get data ' + error,
      });
    }
  };

  return {
    getAllStudents: getAllStudents,
  };
};

export default studentController;
