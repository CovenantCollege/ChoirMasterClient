import fetch from 'isomorphic-fetch';
import config from '../configuration';
import { changePage } from './page'

export function openAddOrganizationModal() {
  return { type: 'ADD_ORGANIZATION_MODAL_OPENED' };
}

export function closeAddOrganizationModal() {
  return { type: 'ADD_ORGANIZATION_MODAL_CLOSED' };
}

export function selectOrganization(orgId) {
  changePage('organizations/' + orgId);
  return { type: 'ORGANIZATION_SELECTED', payload: { orgId }};
}

export function loadOrganization(organization) {
  return { type: 'ORGANIZATION_ADDED', payload: { organization }};
}

export function loadOrganizations(organizations) {
  return { type: 'ORGANIZATIONS_LOADED', payload: { organizations }};
}

export function failAddOrganization(error) {
  return { type: 'ADD_ORGANIZATION_FAILED', payload: { error }};
}

export function clearAddOrganizationFailed() {
  return { type: 'ADD_ORGANIZATION_FAILED_CLEARED' };
}

export function addOrganization(token, organization) {
  return async dispatch => {
    let response = await fetch(config.baseApiUrl + '/organizations', {
      method: 'POST',
      headers: {
        'Authorization': 'jwt ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': organization.name
      })
    });
    let json = await response.json();
    if(json.error) {
      dispatch(failAddOrganization(json.error));
    } else {
      dispatch(loadOrganization(json));
    }
  }
}

export function fetchOrganizations(token) {
  return async dispatch => {
    dispatch({ type: 'ORGANIZATIONS_FETCHED' });
    let organizationsResponse = await fetch(config.baseApiUrl + '/organizations', {
      method: 'GET',
      headers: {
        'Authorization': 'jwt ' + token,
        'Content-Type': 'application/json'
      }
    });
    let organizationsJSON = await organizationsResponse.json();
    let organizationsJSONWithSingers = await Promise.all(organizationsJSON.map(async organization => {
      let singersResponse = await fetch(config.baseApiUrl + '/organizations/' + organization.orgId + '/singers', {
        method: 'GET',
        headers: {
          'Authorization': 'jwt ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      });
      let singersJSON = await singersResponse.json();
      organization.singers = singersJSON;
      return organization;
    }));
    dispatch(loadOrganizations(organizationsJSONWithSingers));
  }
}