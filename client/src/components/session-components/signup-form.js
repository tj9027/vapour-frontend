import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { signup } from '../../redux/actions/session-actions';

export const SignupForm = props => {
  const dispatch = useDispatch();
  const errs = useSelector( state =>  state.errors.session)

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {},
  });

  useEffect( () => {
    setFormState(errors => errs)
  }, [formState.errors])
  
  
  const update = field => {
    return e => setFormState({
      [field]: e.currentTarget.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      name: formState.name,
      email: formState.email,
      password: formState.password,
      password2: formState.password2
    };

    dispatch(signup(user)); 
  }

  const renderErrors = () => {
    return (
      <ul>
        {Object.keys(formState.errors).map((error, i) => (
          <li key={`error-${i}`}>{formState.errors[error]}</li>
        ))}
      </ul>
    );
  };
      
  return (
    <div className="signup-form-container">
      <form onSubmit={handleSubmit}>
        <div className="signup-form">
          <br/>
            <input type="text"
              value={formState.name}
              onChange={update('name')}
              placeholder="Name"
            />
          <br/>
            <input type="text"
              value={formState.email}
              onChange={update('email')}
              placeholder="Email"
            />
          <br/>
            <input type="password"
              value={formState.password}
              onChange={update('password')}
              placeholder="Password"
            />
          <br/>
            <input type="password"
              value={formState.password2}
              onChange={update('password2')}
              placeholder="Confirm Password"
            />
          <br/>
          <input type="submit" value="Submit" />
          {renderErrors()}
        </div>
      </form>
    </div>
  );


}

