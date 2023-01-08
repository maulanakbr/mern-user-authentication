import React, { useState } from "react";
import userService from "../services/user";

const Login = () => {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-[32rem] h-[20rem] m-4 border">
      <form onSubmit={loginHandler}>
        <h1 className="font-bold text-2xl mb-2">Login</h1>
        <div className="flex flex-col mt-2">
          <label>Email</label>
          <input
            className="w-48 h-12 border rounded-md mb-2"
            type="email"
            placeholder="Enter your email"
            onChange={emailHandler}
          ></input>
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input
            className="w-48 h-12 border rounded-md mb-2"
            type="password"
            placeholder="Enter your password"
            autoComplete="on"
            onChange={passwordHandler}
          ></input>
        </div>
        <button className="w-20 h-8 border rounded-md mt-2">Login</button>
      </form>
    </div>
  );
};

export default Login;
