import axios from "axios";

// const API_URL = "http://localhost:8080/api/auth/";
const API_URL = "http://localhost:8000/api/token-jwt/";

// const register = (username, email, password) => {
//   return axios.post(API_URL + "signup", {
//     username,
//     email,
//     password,
//   });
// };

// const login = (username, password) => {
//   return axios
//     // .post(API_URL + "signin", {
//     .post(API_URL, {
//       username,
//       password,
//     })
//     .then((response) => {
//       if (response.data.access) {
//         localStorage.setItem("user", JSON.stringify(response.data));
//       }

//       return response.data;
//     });
// };

// const logout = () => {
//   localStorage.removeItem("user");
// };

// const getCurrentUser = () => {
//   return JSON.parse(localStorage.getItem("user"));
// };

const login = (username, password) =>   { 
  return axios
    // .post(API_URL + "signin", {
    .post(API_URL, {
      username,
      password,
    })
    .then((response) => {
      const data = response.data;
      const jwt = parseJwt(data.access)
      const user_id = jwt.user_id;
      const role = jwt.role;
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      localStorage.setItem('role', jwt.role);
      localStorage.setItem('username', username);
      // if (response.data.access) {
      //   localStorage.setItem("user", JSON.stringify(response.data));
      // }

      // return response.data;
      return { user_id, role };
    });
};

const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
}

const getCurrentUser = () => {
  return localStorage.getItem("username");
};




function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const payload = decodeURIComponent(escape(atob(base64)));
  return JSON.parse(payload);
}


export default{
//   register,
  login,
  logout,
  getCurrentUser,
};
