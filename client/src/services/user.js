import axios from "axios";

const baseUrl = "http://localhost:3001/";

const login = async (newObj) => {
  try {
    const res = await axios.post(baseUrl, newObj);
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

const module = { login, register };
export default module;
