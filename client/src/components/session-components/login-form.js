import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/actions/session-actions";

export const LoginForm = props => {
  const dispatch = useDispatch();
  // const errs = useSelector( state =>  state.errors.session)
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  // useEffect( () => {
  //   setFormState(errors => errs)
  // }, [formState.errors])

  const handleSubmit = e => {
    e.preventDefault();

    let user = {
      email: email,
      password: pw,
    };

    dispatch(login(user));
  };

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
          {/* {renderErrors()} */}
        </div>
      </form>
    </div>
  );
};
