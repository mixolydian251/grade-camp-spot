class assignments {
  constructor(assignments) {
    this.assignments = assignments;
    this.assignments.sort((a, b) =>
      new Date(a.assignment.dueDate) - new Date(b.assignment.dueDate));
    return this;
  }

  requiredOnly(required) {
    if (required) {
      this.assignments = this.assignments.filter(({assignment}) => assignment.required);
    }
    return this
  }

  unfinishedOnly(unfinishedOnly, selectedStudent) {
    if (unfinishedOnly && selectedStudent !== "All") {
      this.assignments = this.assignments.filter(({students}) => {
          const s = students.find(({student}) => {
            const {firstName, lastName} = student;
            return `${firstName} ${lastName}` === selectedStudent
          });
          const {submission, grade} = s;
          return !submission || !grade ||
            (grade && grade.grade === 'Incomplete')
        }
      );
    }
    return this
  }

  selected(selectedStudent) {
    if (selectedStudent !== "All") {
      this.assignments = this.assignments.map(({assignment, students}) => ({
          assignment,
          students: students.filter(({student}) => {
            const {firstName, lastName} = student;
            return `${firstName} ${lastName}` === selectedStudent
          })
        })
      );
    }
    return this
  }
}

export default assignments