import React, { useState } from "react";
import userService from "../services/user";

const Login = () => {
  const [user, setUser] = useState({});
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fullnameHandler = (e) => {
    setFullname(e.target.value);
  };

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const user = {
        fullname,
        username,
        email,
        password,
      };

      setFullname("");
      setUsername("");
      setEmail("");
      setPassword("");

      return await userService.register(user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-[32rem] h-[32rem] m-4 border">
      <form onSubmit={registerHandler}>
        <h1 className="font-bold text-2xl mb-2">Register</h1>
        <div className="flex flex-col mt-2">
          <label>Fullname</label>
          <input
            className="w-48 h-12 border rounded-md mb-2"
            type="text"
            value={fullname}
            onChange={fullnameHandler}
          ></input>
        </div>
        <div className="flex flex-col mt-2">
          <label>Username</label>
          <input
            className="w-48 h-12 border rounded-md mb-2"
            type="text"
            value={username}
            onChange={usernameHandler}
          ></input>
        </div>
        <div className="flex flex-col mt-2">
          <label>Email</label>
          <input
            className="w-48 h-12 border rounded-md mb-2"
            type="email"
            value={email}
            onChange={emailHandler}
          ></input>
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input
            className="w-48 h-12 border rounded-md mb-2"
            type="password"
            value={password}
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
