import axios from "axios";

const url = "https://bootcampspot.com/api/instructor/v1";

// login takes BCS email and password, then retrieves authToken needed for subsequent API calls
export const login = async (email, password) => {
  const {data} = await axios.post(url + "/login", {email, password});
  return data.authenticationInfo.authToken;
};

// getEnrollments takes in an authToken and returns array of courses the user is enrolled in.
export const getEnrollments = async authToken => {
  const {data} = await axios.get(url + "/me", {
    headers: {
      authToken,
      "Content-Type": "application/json"
    }
  });
  return data.enrollments;
};

const assignmentDetails = async (authToken, assignmentId) => {
  const {data} = await axios.post(url + "/assignmentDetail", {assignmentId}, {
    headers: {
      authToken,
      "Content-Type": "application/json"
    }
  });
  return data
};

export const getAssignments = async (authToken, enrollmentId) => {
  const {data} = await axios.post(url + "/assignments", {enrollmentId}, {
    headers: {
      authToken,
      "Content-Type": "application/json"
    }
  });
  const {calendarAssignments: assignments} = data;
  const mappedAssignments = assignments.map(async a => await assignmentDetails(authToken, a.id));
  return await Promise.all(mappedAssignments)
};


// getMe takes in an authToken and returns all info related to the user
export const getMe = async authToken => {
  const {data} = await axios.get(url + "/me", {
    headers: {
      authToken,
      "Content-Type": "application/json"
    }
  });
  return data
};

// login() {
//   axios.post(url + "/login", {email: this.email, password: this.password})
//     .then(({data}) => {
//       this.authToken = data.authenticationInfo.authToken;
//       this.getMe();
//     })
// },
// getMe() {
//   this.authToken && axios.get(url + "/me", {
//     headers: {
//       "Content-Type": "application/json",
//       "authToken": this.authToken
//     }
//   }).then(({data}) => {
//     console.log(data);
//     this.courses = data.enrollments
//   })
// },
// getAttendance() {
//   axios.post(url + "/attendance", {courseId: this.courses[1].courseId}, {
//     headers: {
//       "Content-Type": "application/json",
//       "authToken": this.authToken
//     }
//   }).then(({data}) => {
//     console.log("Attendance", data)
//   })
// },
// getGrades() {
//   axios.post(url + "/grades", {courseId: this.courses[1].courseId}, {
//     headers: {
//       "Content-Type": "application/json",
//       "authToken": this.authToken
//     }
//   }).then(({data}) => {
//     console.log("Grades", data);
//     console.log("Ungraded", data.filter(ass => !ass.submitted))
//   })
// },
// getAssignments() {
//   axios.post(url + "/assignments", {enrollmentId: this.courses[1].id}, {
//     headers: {
//       "Content-Type": "application/json",
//       "authToken": this.authToken
//     }
//   }).then(({data}) => {
//     console.log(data);
//     data.calendarAssignments.forEach(ass => this.getAssignmentDetails(ass.id))
//   })
// },
// getAssignmentDetails(assignmentId) {
//   axios.post(url + "/assignmentDetail", {assignmentId}, {
//     headers: {
//       "Content-Type": "application/json",
//       "authToken": this.authToken
//     }
//   }).then(({data}) => {
//     if (data.assignment.title === "16: Google Books React Search") console.log(data);
//     this.assignments.push(data)
//   })
// }
// },
