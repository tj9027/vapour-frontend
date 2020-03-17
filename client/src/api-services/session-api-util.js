import axios from 'axios';
const postHeaders = new Headers();
postHeaders.append('Content-Type', 'application/json')

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const signup = (userData) => {
  return axios.post('/users/register', userData);
};


export const login = (userData) => {

  return fetch("http://localhost:4000/users/api/login", {
    method: 'POST',
    headers: postHeaders,
    mode: 'cors',
    body: JSON.stringify(userData),
    redirect: 'follow'
  }); 
};