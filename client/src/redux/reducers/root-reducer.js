import { combineReducers } from 'redux';
import session from './session-reducer';
import currentUser from './current-user-reducer';

const RootReducer = combineReducers({
  currentUser,
  session
});

export default RootReducer;