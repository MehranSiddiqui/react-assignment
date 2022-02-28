import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import logo192 from "../../../assets/png/logo192.png";
import "./header.css";
import ThemeContext from "../../../context/ThemeContext";
import useAuthStatus from "../../../hooks/useAuthStatus";
import { getAuth } from "firebase/auth";

const Header = () => {
  const navigate = useNavigate();
  const { toggleTheme } = useContext(ThemeContext);
  const { loggedIn } = useAuthStatus();
  const auth = getAuth();

  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };
  return (
    <div className="header">
      <div className="header-title">
        <Link to="/">
          <img src={logo192} alt="" className="headerTitleImage" />
        </Link>
      </div>
      {!loggedIn && (
        <div className="header-nav">
          <Link to="/signup" className="links">
            <Button variant="outlined">Signup</Button>
          </Link>
          <Button variant="outlined" onClick={handleLogin}>
            Login
          </Button>

          <button onClick={toggleTheme} className="links">
            Click Me
          </button>
        </div>
      )}
      {loggedIn && (
        <div className="header-nav">
          <Link to="/dash" className="links">
            <Button variant="outlined">Dashboard</Button>
          </Link>
          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
          <button onClick={toggleTheme} className="links">
            Click Me
          </button>
        </div>
      )}
    </div>
  );
};
export default Header;
