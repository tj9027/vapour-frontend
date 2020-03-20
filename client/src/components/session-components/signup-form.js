import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { signup } from '../../redux/actions/session-actions';
import { Link } from 'react-router-dom';
import '../../styles/session-styles/signup-form.css';
import logo from '../../assets/images/logo.svg';

export const SignupForm = props => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const [name, setName]  = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  useEffect(() => {
    // console.log('currentUser', currentUser.id)
  }, [currentUser])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      name: name,
      email: email,
      password: password,
      password2: password2
    };

    dispatch(signup(user));
  }

     
  return (
    <div className="signup__container">
      <div className="signup-form__logo-container">
        <img src={logo} alt="logo" />
        <p>Vapour</p>
      </div>
      <form className="signup-form" onSubmit={handleSubmit}>

        <br />
        <input
          className="signup-form__input"
          type="text"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <br />
        <input
          className="signup-form__input"
          type="text"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <br />
        <input
          className="signup-form__input"
          type="password"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <br />
        <input
          className="signup-form__input"
          type="password"
          value={password2 || ""}
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="Confirm Password"
        />
        <br />
        <input
          className="signup-form__button button"
          type="submit" value="Submit" />
        <Link className="signup-form__link button" to="/login" >already have an account? click here</Link>

      </form>
    </div>
  );


}

