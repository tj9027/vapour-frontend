import {
    RECEIVE_SECOND_PLAYER
  } from "../actions/session-actions";
  
  const initialState = {
    secondPlayer: {}
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case RECEIVE_SECOND_PLAYER:
        return {
          ...state,
          secondPlayer: action.secondPlayer,
        };
      default:
        return state;
    }
  }
  