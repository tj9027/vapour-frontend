import { combineReducers } from 'redux';
import loginReducer from './login-reducer'
import currentUser from './current-user-reducer'

const rootReducer = combineReducers({
    loginReducer,
    currentUser
  });
  
  export default rootReducer;
  