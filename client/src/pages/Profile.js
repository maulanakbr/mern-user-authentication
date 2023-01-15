import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const userToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (!userToken) {
      navigate("/");
    }

    const getUserData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      try {
        const { data } = await axios.get("/api/auth/user", config);
        setUser(data.user);
      } catch (err) {
        console.log(err);
      }
    };

    getUserData();
  }, [navigate, userToken]);

  return (
    <div className="flex h-screen w-full">
      <div className="m-auto h-[20rem] w-[50%] rounded-lg bg-green-malachite text-center text-white-bone-white outline-none">
        <h3>
          Welcome, <span className="block">{user?.fullname}</span>
        </h3>
        <p>@{user?.username}</p>
      </div>
    </div>
  );
};

export default Profile;
