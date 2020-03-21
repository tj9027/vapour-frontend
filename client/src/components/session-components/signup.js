import React, { Component } from 'react';
import ErrorMessage from './error';
import SuccessMessage from './success'
import {Link} from 'react-router-dom';
import '../../styles/session-styles/signup-form.css';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      success: '',
      errors: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange (event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit (e) {
    e.preventDefault();
    const post = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    }
    fetch('http://localhost:4000/users/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(post)
    })
      .then(res => res.status < 400 ? res : Promise.reject(res))
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          this.setState({ errors: data.error })
        }
        else if (data.success) {
          this.setState({ success: data.success })
          setTimeout(() => {
            this.props.history.push('/login');
          }, 2000);
        }
      });
  }


  render () {
    return (
      <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body signupbox">
            <h1 className="text-center mb-3">
              <i className="fas fa-user-plus"></i> Register
            </h1>
            {(this.state.errors.length > 0) &&
              this.state.errors.map(error => {
                return (
                  <div>
                    <ErrorMessage
                      error={error}
                    />
                  </div>
                )
              })
            }
            {(this.state.success.length > 0) &&
              <SuccessMessage
                success={this.state.success}
              />
            }
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="name" id="name" name="name" className="form-control" placeholder="Enter Name" onChange={this.onChange}
                  value={this.state.name} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" className="form-control" placeholder="Enter Email" onChange={this.onChange}
                  value={this.state.email} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" className="form-control" placeholder="Create Password" onChange={this.onChange}
                  value={this.state.password} />
              </div>
              <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input type="password" id="password2" name="password2" className="form-control" placeholder="Confirm Password" onChange={this.onChange}
                  value={this.state.password2} />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Register
        </button>
            </form>
            <p className="lead mt-4">Have An Account? <Link to={"/login"}>Login</Link></p>
          </div>
        </div>
      </div>
    )
  }
}

export default SignUp;