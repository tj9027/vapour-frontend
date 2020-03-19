import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { signup } from '../../redux/actions/session-actions';

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
    <div className="signup-form-container">
      <form onSubmit={handleSubmit}>
        <div className="signup-form">
          <br/>
            <input type="text"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          <br/>
            <input type="text"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          <br/>
            <input type="password"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          <br/>
            <input type="password"
              value={password2 || ""}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="Confirm Password"
            />
          <br/>
          <input type="submit" value="Submit" />

        </div>
      </form>
    </div>
  );


}

