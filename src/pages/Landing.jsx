import React from "react";
import Card from "../components/Common/Card/Card";
import { NavLink } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";
import Fetch from "../components/Fetch/Fetch";

const Landing = () => {
  const { loggedIn } = useAuthStatus();
  return (
    <div className="landing">
      <Card>
        {!loggedIn ? (
          <div className="landing-div">
            <h1>Welcome to the Social Network</h1>
            <h3>
              Please
              <NavLink className="links" to="/signup">
                Sign Up
              </NavLink>
              or
              <NavLink className="links" to="/login">
                Log In
              </NavLink>
            </h3>
          </div>
        ) : (
          <div className="landing-div">
            <Fetch />
          </div>
        )}
      </Card>
    </div>
  );
};

export default Landing;
