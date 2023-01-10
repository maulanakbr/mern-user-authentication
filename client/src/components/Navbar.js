import React, { useState } from "react";
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authService from "../services/auth";
import axios from "axios";
import { authActions } from "../store";

axios.defaults.withCredentials = true;

const Navbar = () => {
  const [value, setValue] = useState(0);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const dispatch = useDispatch();

  const handleLogout = () => {
    authService.logout().then(() => dispatch(authActions.logout()));
  };

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h3">AUTH</Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <Tabs
              indicatorColor="secondary"
              onChange={(e, val) => setValue(val)}
              textColor="inherit"
              value={value}
            >
              <Tab to="/" LinkComponent={Link} label="Home" />
              {!isLoggedIn && (
                <>
                  <Tab to="/signup" LinkComponent={Link} label="Signup" />
                  <Tab to="/login" LinkComponent={Link} label="Login" />
                </>
              )}
              {isLoggedIn && (
                <Tab
                  onClick={handleLogout}
                  to="/"
                  LinkComponent={Link}
                  label="Logout"
                />
              )}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
