import React, { useEffect, useState } from "react";
import authService from "../services/auth";
import axios from "axios";

axios.defaults.withCredentials = true;
let firtsRender = true;

const Dashboard = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      const res = await authService.getUser().catch((err) => console.log(err));
      return res;
    };

    const refreshToken = async () => {
      const res = await authService
        .getRefreshToken()
        .catch((err) => console.log(err));
      return res;
    };

    if (firtsRender) {
      firtsRender = false;
      getUserData().then((data) => setUser(data.user));
    }

    let interval = setInterval(() => {
      refreshToken().then((data) => setUser(data.user));
    }, 1000 * 20);

    return () => clearInterval(interval);
  }, []);

  return <div>{user && <h1>{user.fullname}</h1>}</div>;
};

export default Dashboard;
