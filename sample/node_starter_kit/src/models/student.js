let Student = function(args) {
  this.isValid = function() {
    if (args.firstname && args.lastname) {
      return true;
    }

    return false;
  };

  this.firstName = args.firstname || '';
  this.lastName = args.lastname || '';
  this.age = args.age || 0;
  this.gender = args.gender || 'male';
  this.class = args.class || 0;
  this.hobbies = args.hobbies || [];
};

module.exports = Student;
