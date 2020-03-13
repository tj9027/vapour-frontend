export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";


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



export const logout = () => dispatch => {

    //TODO: invalidate cookie somehow
    
    
    dispatch(logoutUser()) // Dispatch a logout action
};