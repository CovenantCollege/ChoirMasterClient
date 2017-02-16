import fetch from 'isomorphic-fetch';
import config from '../configuration';
import { changePage } from './page'
import * as actionTypes from '../constants/actionTypes'

export function authenticateUser(email, password, remember) {
  return async dispatch => {
    let response = await fetch(config.baseApiUrl + '/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    let json = await response.json();
    if(json.result === 'success') {
      if(remember) {
        localStorage.setItem('token', json.token);
      }
      dispatch(loginUser(json.token, email));
      changePage('dashboard');
    } else {
      dispatch(failAuthentication());
    }
  }
}

export function loginUser(token, email) {
  return { type: actionTypes.LOGIN_REQUESTED, payload: { token, email }};
}

export function logoutUser() {
  localStorage.removeItem('token');
  return { type: actionTypes.LOGOUT_REQUESTED };
}

export function failAuthentication() {
  return { type: actionTypes.AUTHENTICATION_FAILED };
}
