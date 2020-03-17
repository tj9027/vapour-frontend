import React from "react";
import ReactDOM from "react-dom";
import jwt_decode from 'jwt-decode';
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./redux/store/store";
import { AuthRoute, ProtectedRoute } from './utils/route-util';
import { Provider } from "react-redux";
import { HashRouter, Switch } from 'react-router-dom';
import { LoginForm } from './components/session-components/login-form';
import { SignupForm } from './components/session-components/signup-form';
import { setAuthToken } from './api-services/session-api-util'; // the session utility
import { logout } from './redux/actions/session-actions';

 
const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <Switch>
          <AuthRoute exact path="/login" component={LoginForm} />
          <AuthRoute exact path="/signup" component={SignupForm} />
          <ProtectedRoute exact path="/" component={App} />
      </Switch>
    </HashRouter>
  </Provider>
);

document.addEventListener("DOMContentLoaded", () => {
    let store;
  
    // If a returning user has a session token stored in localStorage
    if (localStorage.jwtToken) {
  
      // Set the token as a common header for all axios requests
      // TODO is there a way to do this with fetch, which actually works, unlike axios?
      setAuthToken(localStorage.jwtToken);
  
      // Get user info out of the token
      const decodedUser = jwt_decode(localStorage.jwtToken);
  
      const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };
  
      store = configureStore(preloadedState);
  
      const currentTime = Date.now() / 1000;

      // If the user's token has expired, log them out
      if (decodedUser.exp < currentTime) {
          store.dispatch(logout());
          window.location.href = '/login';
        } 
    } else {
      // If this is a first time user, start with an empty store
      store = configureStore({});
      }
      
      ReactDOM.render(<Root store={store} />, document.getElementById("root"));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
