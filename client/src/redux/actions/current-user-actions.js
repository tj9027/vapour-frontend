const baseURL = 'http://localhost:4000/users/';

export const GET_CURRENT_USER = 'GET_CURRENT_USER';

export const receiveCurrentUser = currentUser => ({
  type: GET_CURRENT_USER,
  currentUser
});

export const getCurrentUser = _id => async dispatch => {
  return fetch(baseURL + `find-current?_id=${_id}`)
    .then(response => response.json())
    .then(currentUser => {
      dispatch(receiveCurrentUser(currentUser));
    })
    .catch(err => console.log('An error occurred.', err));
};