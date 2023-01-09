import axios, { AxiosHeaders } from "axios";

const baseUrl = "http://localhost:3001/";

const login = async (newObj) => {
  try {
    const res = await axios.post(`${baseUrl}login`, newObj);
    return await res.data;
  } catch (err) {
    console.log(err);
  }
};

const register = async (newObj) => {
  try {
    const res = await axios.post(`${baseUrl}register`, newObj);
    return await res.data;
  } catch (err) {
    console.log(err);
  }
};

const userAuth = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${baseUrl}/login/isuserauth`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    return await res.data;
  } catch (err) {
    console.log(err);
  }
};

const module = { login, register, userAuth };
export default module;
