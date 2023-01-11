import axios from "axios";

axios.defaults.withCredentials = true;
const baseUrl = "http://localhost:3001/api/auth";

const createUser = async (db) => {
  const res = await axios
    .post(`${baseUrl}/signup`, db)
    .catch((err) => console.log(err.response.data));

  const data = await res.data;
  return data;
};

const login = async (db) => {
  const res = await axios
    .post(`${baseUrl}/login`, db)
    .catch((err) => console.log(err.response.data));

  const data = await res.data;
  return data;
};

const getUser = async () => {
  const res = await axios
    .get(`${baseUrl}/user`, { withCredentials: true })
    .catch((err) => console.log(err));

  const data = await res.data;
  return data;
};

const getRefreshToken = async () => {
  const res = await axios
    .get(`${baseUrl}/refresh`, { withCredentials: true })
    .catch((err) => console.log(err));

  const data = await res.data;
  return data;
};

const logout = async () => {
  const res = await axios
    .post(`${baseUrl}/logout`, null, { withCredentials: true })
    .catch((err) => console.log(err));

  if (res.status === 200) {
    return res;
  }

  return new Error("Unable to logout");
};

const module = { createUser, login, getUser, getRefreshToken, logout };

export default module;
