import React from 'react';

import { Switch } from 'react-router-dom';

import App from '../../App';
import { LoginForm } from './login-form';
import { SignupForm } from './signup-form';

export const Landing = () => (
  <div>
    <Switch>
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
        <ProtectedRoute exact path="/" component={App} />
    </Switch>
  </div>
);