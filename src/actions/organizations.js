import fetch from 'isomorphic-fetch';
import config from '../configuration';
import { changePage } from './page'
import * as actionTypes from '../constants/actionTypes'

export function selectOrganization(orgId) {
  changePage('organizations/' + orgId);
  return { type: actionTypes.ORGANIZATION_SELECTED, payload: { orgId } };
}

export function loadOrganization(organization) {
  return { type: actionTypes.ORGANIZATION_ADDED, payload: { organization } };
}

export function loadOrganizations(organizations) {
  return { type: actionTypes.ORGANIZATIONS_LOADED, payload: { organizations } };
}

function failAddOrganization(error) {
  return { type: actionTypes.ADD_ORGANIZATION_FAILED, payload: { error } };
}

export function clearAddOrganizationFailed() {
  return { type: actionTypes.ADD_ORGANIZATION_FAILED_CLEARED };
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
    if(response.status === 201) {
      dispatch(loadOrganization(json));
    } else {
      dispatch(failAddOrganization(json.error));
    }
  }
}

function requestOrganizations() {
  return { type: actionTypes.ORGANIZATIONS_REQUESTED };
}

function receiveOrganizations(organizations) {
  return { type: actionTypes.ORGANIZATIONS_RECEIVED, payload: { organizations } };
}

function fetchOrganizations(token) {
  return async dispatch => {
    dispatch(requestOrganizations());
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
    let organizationsJSONWithSingersAndChoirs = await Promise.all(organizationsJSONWithSingers.map(async organization => {
      let choirsResponse = await fetch(config.baseApiUrl + '/organizations/' + organization.orgId + '/choirs', {
        method: 'GET',
        headers: {
          'Authorization': 'jwt ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      });
      let choirsJSON = await choirsResponse.json();
      organization.choirs = choirsJSON;
      return organization;
    }));
    dispatch(receiveOrganizations(organizationsJSONWithSingersAndChoirs));
  }
}

function shouldFetchOrganizations(state) {
  const organizations = state.organizations;
  return organizations.organizationsList.length === 0 && organizations.isFetching === false;
}

export function fetchOrganizationsIfNeeded(token) {
  return (dispatch, getState) => {
    if(shouldFetchOrganizations(getState())) {
      return dispatch(fetchOrganizations(token));
    }
  }
}
