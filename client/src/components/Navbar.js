import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const auth = useSelector((state) => state.auth.value);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userToken = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.clear(userToken);
    navigate("/");
    dispatch(signOut());
  };

  return (
    <div className="relative flex w-full justify-center">
      <div className="fixed my-4 flex w-[70%] items-center justify-between border-b-[1.5px] text-[13px] font-normal tracking-wider text-black-licorice">
        <h4 className="my-1 cursor-pointer font-bold">MAY</h4>
        <ul className="my-1 flex cursor-pointer justify-end gap-12">
          {!auth && (
            <>
              <li className="p-2">
                <Link to="/">Sign In</Link>
              </li>
              <li className="p-2">
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
          {auth && (
            <>
              <li className="p-2" onClick={handleLogout}>
                Logout
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
