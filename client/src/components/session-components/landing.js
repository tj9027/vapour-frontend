
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';

function Landing () {
  return (
    <div className="row mt-5">
      <div className="col-md-6 m-auto">
        <div className="card card-body text-center landing-container">
          <div className="logo-container">
            <img className="logo" src={logo} alt="logo" />

          </div>
          <p>Create an account or login</p>
          <Link to={"/register"} className="btn btn-primary btn-block mb-2">Register</Link>
          <Link to={"/login"} className="btn btn-secondary btn-block">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Landing;