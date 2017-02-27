import fetch from 'isomorphic-fetch';
import config from '../configuration';
import { changePage } from './page'
import * as actionTypes from '../constants/actionTypes'

export function selectChoir(orgId, choirId) {
  changePage('organizations/' + orgId + '/choirs/' + choirId);
  return { type: actionTypes.CHOIR_SELECTED, payload: { orgId, choirId } };
}

export function loadChoir(choir) {
  return { type: actionTypes.CHOIR_ADDED, payload: { choir } };
}

function choirEdited(orgId, choirId, selected) {
  return { type: actionTypes.CHOIR_EDITED, payload: { orgId, choirId, selectedSingerIds: selected } };
}

function failAddChoir(error) {
  return { type: actionTypes.ADD_CHOIR_FAILED, payload: { error } };
}

export function clearAddChoirFailed() {
  return { type: actionTypes.ADD_CHOIR_FAILED_CLEARED };
}

function failEditChoir(error) {
  return { type: actionTypes.EDIT_CHOIR_FAILED, payload: { error } };
}

export function clearEditChoirFailed() {
  return { type: actionTypes.EDIT_CHOIR_FAILED_CLEARED };
}

export function addChoir(token, orgId, choir) {
  return async dispatch => {
    let response = await fetch(config.baseApiUrl + '/organizations/' + orgId + '/choirs', {
      method: 'POST',
      headers: {
        'Authorization': 'jwt ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': choir.name
      })
    });
    let json = await response.json();
    if(response.status === 201) {
      dispatch(loadChoir(json));
    } else {
      dispatch(failAddChoir(json.error));
    }
  }
}

export function editChoir(token, orgId, choirId, selected) {
  return async dispatch => {
    let response = await fetch(config.baseApiUrl + '/organizations/' + orgId + '/choirs/' + choirId, {
      method: 'PUT',
      headers: {
        'Authorization': 'jwt ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'selectedSingerIds': selected
      })
    });
    if(response.status === 204) {
      dispatch(choirEdited(orgId, choirId, selected));
    } else {
      dispatch(failEditChoir());
    }
  }
}