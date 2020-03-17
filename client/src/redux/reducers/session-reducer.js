import { RECEIVE_USER_LOGOUT, RECEIVE_CURRENT_USER } from '../actions/session-actions';

const _nullUser = {
  id: null
};

const initialState = {
  isAuthenticated: false,
  user: _nullUser,
  errors: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      const { id } = action.currentUser;
      return {
        isAuthenticated: false,
        user: _nullUser
      };
    default:
      return state;
  }
}
