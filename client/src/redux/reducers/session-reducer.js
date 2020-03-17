import { RECEIVE_USER_LOGOUT, RECEIVE_CURRENT_USER, RECEIVE_USER_SIGN_IN } from '../actions/session-actions';

const _nullUser = {
  id: null
};

const initialState = {
  isAuthenticated: false,
  user: _nullUser,
  errors: []
};
// user = {
//   name:
//   id:  
// }

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser
      };
    case 'RECEIVE_USER_LOGOUT':
      return {
        isAuthenticated: false,
        user: _nullUser
      };
    case RECEIVE_USER_SIGN_IN:
      return {
        ...state,
        isSignedIn: true
      }
    default:
      return state;
  }
}
