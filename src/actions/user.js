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
  if(typeof(Storage) !== 'undefined') {
    if (!(localStorage === undefined)) {
      localStorage.removeItem('token');
    }
  }
  return {type: actionTypes.LOGOUT_REQUESTED};
}

export function failAuthentication() {
  return { type: actionTypes.AUTHENTICATION_FAILED };
}

function passwordChanged(oldPassword, newPassword) {
  return { type: actionTypes.PASSWORD_CHANGED, payload: { oldPassword, newPassword } };
}

export function clearChangePasswordFailed() {
  return { type: actionTypes.CHANGE_PASSWORD_FAILED_CLEARED };
}

function failChangePassword(error) {
  return { type: actionTypes.CHANGE_PASSWORD_FAILED, payload: { error } };
}

export function changePassword(token, email, oldPassword, newPassword) {
  return async dispatch => {
    let response = await fetch(config.baseApiUrl + '/users/password', {
      method: 'PUT',
      headers: {
        'Authorization': 'jwt ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': email,
        'oldPassword': oldPassword,
        'newPassword': newPassword
      })
    });
    let json = await response.json();
    console.log(response.status);
    if(json.error) {
      dispatch(failChangePassword(json.error));
    } else {
      dispatch(passwordChanged(oldPassword, newPassword));
      dispatch(changePage('login'));
    }
  }
}
