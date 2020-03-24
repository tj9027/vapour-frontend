import {
  GET_CURRENT_USER,
  UPDATE_MESSAGES,
  GET_MESSAGES,
  UPLOAD_AVATAR
} from "../actions/current-user-actions";

const initialState = {
  _id: "",
  name: "",
  messages: {}
};

export default function currentUser(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return { ...state, ...action.currentUser };
    //update messages handles POST new thread and GET messages methods.
    case UPDATE_MESSAGES:
      return { ...state, messages: action.messages };
    case GET_MESSAGES:
      return {
        ...state,
        messages: Object.assign(
          {},
          state.messages,
          action.messages[action.secondUser._id]
        )
      };
    case UPLOAD_AVATAR:
      return {
        ...state,
        ...action.uploadAvatar
      };
    default:
      return state;
  }
}
