import { GET_CURRENT_USER } from '../actions/current-user-actions';

const initialState = {
  _id: '',
  name: '',
  messages: {}
};

export default function currentUser(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return { ...state, ...action.currentUser };
    //update messages handles POST new thread and GET messages methods.
    // case UPDATE_MESSAGES:
    //   return { ...state, messages: action.messages };
    // case GET_MESSAGES:
    //   return {
    //     ...state,
    //     messages: Object.assign(
    //       {},
    //       state.messages,
    //       action.messages[action.secondUser._id]
    //     )
    //   }
    default:
      return state;
  }
}