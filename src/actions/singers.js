import fetch from 'isomorphic-fetch';
import config from '../configuration';
import * as actionTypes from '../constants/actionTypes'

export function openAddSingerModal() {
  return { type: actionTypes.ADD_SINGER_MODAL_OPENED };
}

export function closeAddSingerModal() {
  return { type: actionTypes.ADD_SINGER_MODAL_CLOSED };
}

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
    if(json.error) {
      dispatch(failAddSinger(json.error));
    } else {
      dispatch(loadSinger(json));
    }
  }
}

export function fetchSingers(token, orgId) {
  return async dispatch => {
    let response = await fetch(config.baseApiUrl + '/organizations/' + orgId + '/singers', {
      method: 'GET',
      headers: {
        'Authorization': 'jwt ' + token,
        'Content-Type': 'application/json'
      }
    });
    let json = await response.json();
    dispatch(loadSingers(json));
  }
}
