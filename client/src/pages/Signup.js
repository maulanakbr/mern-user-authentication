import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const db = {
      fullname: inputs.fullname,
      username: inputs.username,
      email: inputs.email,
      password: inputs.password,
    };

    const res = await authService
      .createUser(db)
      .catch((err) => console.log(err));

    if (res) return navigate("/login");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          marginLeft="auto"
          marginRight="auto"
          width={300}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h4">Signup</Typography>
          <TextField
            name="fullname"
            onChange={handleChange}
            autoComplete="fullname"
            value={inputs.fullname}
            variant="outlined"
            placeholder="Fullname"
            margin="normal"
          />
          <TextField
            name="username"
            onChange={handleChange}
            autoComplete="username"
            value={inputs.username}
            variant="outlined"
            placeholder="Username"
            margin="normal"
          />
          <TextField
            name="email"
            onChange={handleChange}
            type="email"
            autoComplete="email"
            value={inputs.email}
            variant="outlined"
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleChange}
            autoComplete="current-password"
            type="password"
            value={inputs.password}
            variant="outlined"
            placeholder="Password"
            margin="normal"
          />
          <Button variant="contained" type="submit">
            Signup
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Signup;
