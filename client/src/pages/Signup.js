import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Notification from "../components/Notification";

const Signup = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      fullname,
      username,
      email,
      password,
    };

    try {
      const { data } = await axios.post("api/auth/signup", user);

      localStorage.setItem("authToken", data.token);

      navigate("/");
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center border text-[13px] text-black-licorice">
      <form
        className="flex w-[30%] flex-col justify-center rounded-2xl border p-6 shadow-md"
        onSubmit={handleSubmit}
      >
        <h5 className="mb-4 text-center font-semibold">Create New Account</h5>
        <div className="flex w-full gap-3">
          <div className="my-2 w-[50%]">
            <label htmlFor="fullname" className="mb-2 block tracking-wide">
              Fullname
            </label>
            <input
              className="h-9 w-full rounded-2xl border bg-gray-platinum px-5 text-[14px] shadow-sm focus:border-green-malachite focus:bg-white-bone-white focus:outline-none focus:ring-1 focus:ring-green-malachite"
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div className="my-2 w-[50%]">
            <label htmlFor="username" className="mb-2 block tracking-wide">
              Username
            </label>
            <input
              className="h-9 w-full rounded-2xl border bg-gray-platinum px-5 text-[14px] shadow-sm focus:border-green-malachite focus:bg-white-bone-white focus:outline-none focus:ring-1 focus:ring-green-malachite"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className="my-2">
          <label htmlFor="email" className="mb-2 block tracking-wide">
            Email
          </label>
          <input
            className="h-9 w-full rounded-2xl border bg-gray-platinum px-5 text-[14px] shadow-sm focus:border-green-malachite focus:bg-white-bone-white focus:outline-none focus:ring-1 focus:ring-green-malachite"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-2 mb-2">
          <label htmlFor="password" className="mb-2 block tracking-wide">
            Password
          </label>
          <div className="relative flex items-center justify-between">
            <input
              className="h-9 w-full rounded-2xl border bg-gray-platinum px-5 text-[14px] shadow-sm focus:border-green-malachite focus:bg-white-bone-white focus:outline-none focus:ring-1 focus:ring-green-malachite"
              type={visible ? "text" : "password"}
              value={password}
              autoComplete={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute right-0 cursor-pointer px-5"
              onClick={() => setVisible(!visible)}
            >
              {visible ? (
                <AiOutlineEye size={18} />
              ) : (
                <AiOutlineEyeInvisible size={18} />
              )}
            </div>
          </div>
        </div>
        {error && <Notification error={error} />}
        <button
          className="text my-4 h-9 rounded-2xl bg-green-mint-green tracking-wider hover:border-green-malachite hover:ring-2 hover:ring-green-malachite"
          type="submit"
        >
          Create Account
        </button>
        <div className="mt-2 text-center">
          Already a member?{" "}
          <span className="text-green-malachite hover:text-green-mint-green">
            <Link to="/">Sign In</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signup;
