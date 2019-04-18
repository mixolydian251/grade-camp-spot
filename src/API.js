import axios from "axios";

const url = "https://bootcampspot.com/api/instructor/v1";

const setHeaders = (authToken) => ({
  headers: {
    authToken,
    "Content-Type": "application/json"
  }
});

// login takes BCS email and password, then retrieves authToken needed for subsequent API calls
export const login = async (email, password) => {
  const {data} = await axios.post(url + "/login", {email, password});
  return data.authenticationInfo.authToken;
};

// getEnrollments takes in an authToken and returns array of courses the user is enrolled in.
export const getEnrollments = async authToken => {
  const {data} = await axios.get(url + "/me", setHeaders(authToken));
  return data;
};

const assignmentDetails = async (authToken, assignmentId) => {
  const {data} = await axios.post(url + "/assignmentDetail", {assignmentId}, setHeaders(authToken));
  return data
};

export const getAssignments = async (authToken, enrollmentId) => {
  const {data} = await axios.post(url + "/assignments", {enrollmentId}, setHeaders(authToken));
  const {calendarAssignments: assignments} = data;
  const mappedAssignments = assignments.map(async a => await assignmentDetails(authToken, a.id));
  return await Promise.all(mappedAssignments)
};

// getMe takes in an authToken and returns all info related to the user
export const getMe = async authToken => {
  const {data} = await axios.get(url + "/me", setHeaders(authToken));
  return data
};
