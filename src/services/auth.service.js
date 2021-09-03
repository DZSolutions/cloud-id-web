import axios from "axios";

const API_URL = "http://localhost:8000/api/token-jwt/";

const login = (username, password) => {
  return (
    axios
      // .post(API_URL + "signin", {
      .post(API_URL, {
        username,
        password,
      })
      .then((response) => {
        const data = response.data;
        const jwt = parseJwt(data.access);
        const user_id = jwt.user_id;
        const role = jwt.role;
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("role", jwt.role);
        localStorage.setItem("username", username);
        // if (response.data.access) {
        //   localStorage.setItem("user", JSON.stringify(response.data));
        // }

        // return response.data;
        return { user_id, role };
      })
  );
};

const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
};

const getCurrentUser = () => {
  return localStorage.getItem("username");
};

async function getAccessToken() {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  if (accessToken == null && refreshToken == null) {
    return null;
  }
  if (accessToken == null && refreshToken != null) {
    return await doRefreshToken(refreshToken);
  } else if (accessToken != null && tokenNeedsRefresh(accessToken)) {
    if (refreshToken != null) {
      return await doRefreshToken(refreshToken);
    } else {
      return null;
    }
  }
  return accessToken;
}

function tokenNeedsRefresh(accessToken) {
  const d = new Date(0);
  d.setUTCSeconds(getTokenExp(accessToken));
  if (d.valueOf() < new Date().valueOf() + 10000) {
    // token expire in 10 sec
    return true;
  }
  return false;
}

function getTokenExp(accessToken) {
  const jwt = parseJwt(accessToken);
  return jwt.exp;
}

async function doRefreshToken(refreshToken) {
  const url = API_URL + "refresh/";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh: refreshToken,
    }),
  });
  if (res.status !== 200) {
    return null;
  }
  const data = await res.json();
  const accessToken = data.access;
  localStorage.setItem("accessToken", accessToken);
  return accessToken;
}

function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const payload = decodeURIComponent(escape(atob(base64)));
  return JSON.parse(payload);
}

const auth = {
  login,
  logout,
  getCurrentUser,
  getAccessToken,
};

export default auth;
