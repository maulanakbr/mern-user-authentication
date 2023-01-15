import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("api/auth/forgotpassword", { email });

      if (!data) {
        setError("Data not found");
      }
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
        <h5 className="mb-2 text-center font-semibold">Forgot Password</h5>
        <p className="mx-2 mb-2 text-center text-[14px]">
          Enter your email and we'll send you a link to get back into your
          account.
        </p>
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
        <button
          className="text my-4 h-9 rounded-2xl bg-green-mint-green tracking-wider hover:border-green-malachite hover:ring-2 hover:ring-green-malachite"
          type="submit"
        >
          Send Reset Password
        </button>
        <div className="mt-2 block text-center">
          Back to{" "}
          <span className="inline-block cursor-pointer text-green-malachite hover:text-green-mint-green">
            <Link to="/signin">Sign In</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
