import fetch from 'isomorphic-fetch';
import config from '../configuration';

export function loadOrganizations(organizations) {
  return { type: 'ORGANIZATIONS_LOADED', payload: { organizations }};
}

export function fetchOrganizations() {
  return async dispatch => {
    let response = await fetch(config.baseApiUrl + '/organizations', {
      method: 'GET',
      headers: {
        'Authorization': 'jwt ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
    });
    let json = await response.json();
    dispatch(loadOrganizations(json));
  }
}