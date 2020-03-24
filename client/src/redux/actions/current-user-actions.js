const baseURL = "http://localhost:4000/users/";

export const GET_CURRENT_USER = "GET_CURRENT_USER";
export const UPDATE_MESSAGES = "UPDATE_MESSAGES";
export const GET_MESSAGES = "GET_MESSAGES";
export const UPLOAD_AVATAR = "UPLOAD_AVATAR";

export const receiveCurrentUser = currentUser => ({
  type: GET_CURRENT_USER,
  currentUser
});

export const getCurrentUser = _id => dispatch => {
  return fetch(baseURL + `find-current?_id=${_id}`)
    .then(response => response.json())
    .then(currentUser => {
      console.log(currentUser);
      dispatch(receiveCurrentUser(currentUser));
    })
    .catch(err => console.log("An error occurred.", err));
};

export const uploadAvatar = (_id, src) => {
  console.log("called uploadAvatar");
  return dispatch => {
    console.log("upload avatar  line 26");
    return fetch(baseURL + `update-current?_id=${_id}`, {
      method: "PUT",
      body: JSON.stringify({
        avatar: src
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(currentUser => {
        console.log(currentUser);
        dispatch(receiveCurrentUser(currentUser));
      })
      .catch(err => console.log("An error occurred.", err));
  };
};
