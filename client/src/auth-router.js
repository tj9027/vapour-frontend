import React, { useEffect } from 'react';
import { SocketContext } from './utils/socket-context';
import Signup from './components/session-components/signup';
import Login from './components/session-components/login';
import Landing from './components/session-components/landing';
import App from './App';
import Loading from './components/session-components/loading';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatedSwitch } from 'react-router-transition';

function AuthRouter() {
  const isAuth = useSelector(({ loginReducer }) => loginReducer.isAuth);
  console.log(isAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch('http://localhost:4000/users', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: 'GET'
    })
      .then(res => (res.status < 400 ? res : Promise.reject(res)))
      .then(res => res.json())
      .then(data => {
        if (data.user) dispatch({ type: 'AUTHENTICATE', user: data.user });
        else dispatch({ type: 'FAILAUTHENTICATE' });
      });
  }, []);
  return (
    <Router>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="App switch-wrapper"
      >
        {/* <Switch> */}

        <Auth exact path="/landing" component={Landing} />
        <Auth exact path="/register" component={Signup} />
        <Auth exact path="/login" component={Login} />
        <SocketContext.Consumer>
          {socket => (
            <Protected
              path="/"
              component={() => <App socket={socket} />}
            />
          )}
        </SocketContext.Consumer>
        {/* </Switch> */}
      </AnimatedSwitch>
    </Router>
  );
}

const Auth = ({ component: Component, ...rest }) => {
  const isAuth = useSelector(({ loginReducer }) => loginReducer.isAuth);
  console.log('redirecting', isAuth);
  console.log({ ...rest });
  return (
    <Route
      {...rest}
      render={props => {
        return !isAuth ? (
          <Component {...props} />
        ) : (
          // Redirect to root if user is authenticated
          <Redirect to="/" />
        );
      }}
    />
  );
};

const Protected = ({ component: Component, ...rest }) => {
  console.log('redirecting');
  const isAuth = useSelector(({ loginReducer }) => loginReducer.isAuth);
  const isLoading = useSelector(({ loginReducer }) => loginReducer.isLoading);
  return (
    <Route
      {...rest}
      render={props => {
        if (isLoading) return <Loading />;
        return isAuth ? (
          <Component {...props} />
        ) : (
          // Redirect to the login page if the user is not authenticated
          <Redirect to="/landing" />
        );
      }}
    />
  );
};
export default AuthRouter;
