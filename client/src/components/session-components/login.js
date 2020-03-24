import React, { useState } from 'react';
import ErrorMessage from './login-error';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../../styles/session-styles/login-form.css';

function Login () {
  const isAuth = useSelector(({loginReducer}) =>loginReducer.isAuth)
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const post = {
      email,
      password,
    }
    fetch('http://localhost:4000/users/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(post)
    })
      .then(res => res.status < 400 ? res : Promise.reject(res))
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.message) {
          setError(data.message);
        }
        else if (data.user) {
          dispatch({ type: 'AUTHENTICATE', user: data.user })
        }
      });
  }

  return (
    <div>
      {!isAuth &&
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <div className="card card-body login-container">
              <h1 className="text-center mb-3"><i className="fas fa-sign-in-alt"></i> Login</h1>
              {(error.length > 0) &&
                <ErrorMessage
                  error={error}
                />
              }
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" className="form-control" placeholder="Enter Email" onChange={onEmailChange}
                    value={email} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" name="password" className="form-control" placeholder="Enter Password" onChange={onPasswordChange}
                    value={password} />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
              </form>
              <p className="lead mt-4">
                No Account? <Link to={"/register"}>Register</Link>
              </p>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Login;