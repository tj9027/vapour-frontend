import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/session-actions";
import { Link, Redirect } from 'react-router-dom';
import '../../styles/session-styles/login-form.css';
import logo from '../../assets/images/logo.svg';


export const LoginForm = props => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    let user = {
      email: email,
      password: pw,
    };

    dispatch(login(user));
    // return <Redirect to="/" />

  };

  useEffect(() => {
    console.log('current user: ', props.currentUser);
  }, [props.currentUser])

  return (
    <div className="login__container">
      <div className="signup-form__logo-container">
        <img src={logo} alt="logo" />
        <p>Vapour</p>
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          className="login-form__input"
          type="text"
          name="email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <br />
        <input
          className="login-form__input"
          type="password"
          name="password"
          value={pw || ""}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Password"
        />
        <br />
        <input className="login-form__button button" type="submit" value="Sign In" />
        <br />
        <Link className="login-form__link button" to="/signup">No account yet? Please register</Link>

      </form>
    </div>
  );
};
