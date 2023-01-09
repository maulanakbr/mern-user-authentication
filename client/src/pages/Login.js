import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/user";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = async (e) => {
    try {
      e.preventDefault();

      const userObj = {
        username,
        password,
      };

      const res = await userService.login(userObj);
      localStorage.setItem("token", res.token);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const req = async () => {
      try {
        const res = await userService.userAuth;
        console.log(`from use effect: ${res}`);
      } catch (err) {
        console.log(err);
      }
    };

    req();
  }, []);

  return (
    <div className="w-[32rem] h-[20rem] m-4 border">
      <form onSubmit={loginHandler}>
        <h1 className="font-bold text-2xl mb-2">Login</h1>
        <div className="flex flex-col mt-2">
          <label>Username</label>
          <input
            className="w-48 h-12 border rounded-md mb-2"
            type="text"
            onChange={usernameHandler}
          ></input>
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input
            className="w-48 h-12 border rounded-md mb-2"
            type="password"
            autoComplete="on"
            onChange={passwordHandler}
          ></input>
        </div>
        <button className="w-20 h-8 border rounded-md mt-2" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
