import fetch from 'isomorphic-fetch';
import config from '../configuration';
import * as actionTypes from '../constants/actionTypes'

export function loadSinger(singer, orgId) {
  return { type: actionTypes.SINGER_ADDED, payload: { singer, orgId }};
}

export function loadSingers(singers, orgId) {
  return { type: actionTypes.SINGERS_LOADED, payload: { singers, orgId }};
}

export function failAddSinger(error) {
  return { type: actionTypes.ADD_SINGER_FAILED, payload: { error }};
}

export function clearAddSingerFailed() {
  return { type: actionTypes.ADD_SINGER_FAILED_CLEARED };
}

export function singerDeletedFromOrganization({ singerId, orgId }) {
  return { type: actionTypes.SINGER_DELETED_FROM_ORGANIZATION, payload: { singerId, orgId } };
}

export function failDeleteSingerFromOrganization(error) {
  return { type: actionTypes.DELETE_SINGER_FROM_ORGANIZATION_FAILED };
}

export function addSinger(token, singer, orgId) {
  return async dispatch => {
    let response = await fetch(config.baseApiUrl + '/organizations/' + orgId + '/singers', {
      method: 'POST',
      headers: {
        'Authorization': 'jwt ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': singer.name,
        'height': singer.height,
        'voice': singer.voice,
        'gender': singer.gender
      })
    });
    let json = await response.json();
    if(response.status === 201) {
      dispatch(loadSinger(json));
    } else {
      dispatch(failAddSinger(json.error));
    }
  }
}

export function deleteSingerFromOrganization(token, orgId, singerId) {
  return async dispatch => {
    let response = await fetch(config.baseApiUrl + '/organizations/' + orgId + '/singers/' + singerId, {
      method: 'DELETE',
      headers: {
        'Authorization': 'jwt ' + token,
        'Content-Type': 'application/json'
      }
    });
    if(response.status === 204) {
      dispatch(singerDeletedFromOrganization({ singerId, orgId }));
    } else {
      dispatch(failDeleteSingerFromOrganization());
    }
  }
}

function requestSingers(choirId) {
  return { type: actionTypes.SINGERS_REQUESTED, payload: { choirId } };
}

function receiveSingers(orgId, choirId, singers) {
  return { type: actionTypes.SINGERS_RECEIVED, payload: { orgId, choirId, singers } };
}

function fetchSingers(token, orgId, choirId) {
  return async dispatch => {
    dispatch(requestSingers(choirId));
    let response = await fetch(config.baseApiUrl + '/organizations/' + orgId + '/choirs/' + choirId + '/singers', {
      method: 'GET',
      headers: {
        'Authorization': 'jwt ' + token,
        'Content-Type': 'application/json'
      }
    });
    let json = await response.json();
    dispatch(receiveSingers(orgId, choirId, json));
  }
}

function shouldFetchSingers(state, orgId, choirId) {
  const selectedOrganization = state.organizations.organizationsList.find(organization => organization.orgId === orgId);
  const selectedChoir = selectedOrganization.choirs.find(choir => choir.choirId === choirId);
  return selectedChoir.singers === undefined && state.organizations.isFetchingSingersForChoir.findIndex(c => c === choirId);
}

export function fetchSingersIfNeeded(token, orgId, choirId) {
  return (dispatch, getState) => {
    if(shouldFetchSingers(getState(), orgId, choirId)) {
      return dispatch(fetchSingers(token, orgId, choirId));
    }
  }
}
