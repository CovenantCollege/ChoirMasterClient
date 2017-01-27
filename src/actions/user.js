import fetch from 'isomorphic-fetch';
import { fetchSingers } from './singers';
import config from '../configuration';

export function authenticateUser(email, password) {
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
      localStorage.setItem('token', json.token);
      dispatch(loginUser(json.token, email));
      dispatch(fetchSingers());
    } else {
      dispatch(failAuthentication());
    }
  }
}

export function loginUser(token, email) {
  return { type: 'LOGIN_REQUESTED', payload: { token, email }};
}

export function logoutUser() {
  localStorage.removeItem('token');
  return { type: 'LOGOUT_REQUESTED' };
}

export function failAuthentication() {
  return { type: 'AUTHENTICATION_FAILED' };
}
