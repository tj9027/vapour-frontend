import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/session-actions";
import { Link } from 'react-router-dom';

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
  };

  useEffect(() => {
    console.log('current user: ', props.currentUser);
}, [props.currentUser])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="email"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <br />
          <input
            type="password"
            name="password"
            value={pw || ""}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Password"
          />
          <br />
          <input type="submit" value="Submit" />
          <br />
          <Link to="/signup">No account yet? Please register</Link>
        </div>
      </form>
    </div>
  );
};
