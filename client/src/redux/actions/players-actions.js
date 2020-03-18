import * as APIUtil from '../../api-services/session-api-util';

export const RECEIVE_USER_SIGN_IN = 'RECEIVE_USER_SIGN_IN';

// when user signs in
export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

// redirect the user to the login page upon signup
export const receiveUserSignIn = () => ({
  type: RECEIVE_USER_SIGN_IN
});

// dispatch this one to show authentication errors on the frontend
export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

// when user is logged out, dispatch this to set isAuthenticated to false
export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});


export const login = user => dispatch =>
  APIUtil.login(user)
    .then(res => res.json())
    .then(data => {
      const { token } = data;
      localStorage.setItem('jwtToken', token);
      APIUtil.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(receiveCurrentUser(decoded));
    })
    .catch(err => {
      console.log("can't login", err);
      // dispatch(receiveErrors(err.response));
    });
