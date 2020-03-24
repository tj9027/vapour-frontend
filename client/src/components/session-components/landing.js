import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import "../../styles/session-styles/landing.css";
function Landing() {
  return (
    <div className="landing__container">
      <div className="logo__container">
        <img className="logo" src={logo} alt="logo" />
        <h1 className="landing__title">Vapour</h1>
      </div>
      <div>
        <p className="landing__text">Create an account or login</p>
        <div className="landing__button-container">
          <div className="landing__button">
            <Link to={"/register"} className="button ">
              Register
            </Link>
          </div>
          <div className="landing__button">
            <Link to={"/login"} className="button">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
