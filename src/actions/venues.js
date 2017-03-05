import fetch from 'isomorphic-fetch';
import config from '../configuration';
import { changePage } from './page'
import * as actionTypes from '../constants/actionTypes'

export function selectVenue(orgId, venueId) {
  changePage('organizations/' + orgId + '/venues/' + venueId);
  return { type: actionTypes.VENUE_SELECTED, payload: { orgId, venueId } };
}

export function loadVenue(venue) {
  return { type: actionTypes.VENUE_ADDED, payload: { venue } };
}

function failAddVenue(error) {
  return { type: actionTypes.ADD_VENUE_FAILED, payload: { error } };
}

export function clearAddVenueFailed() {
  return { type: actionTypes.ADD_VENUE_FAILED_CLEARED };
}

export function addVenue(token, orgId, venue) {
  return async dispatch => {
    let response = await fetch(config.baseApiUrl + '/organizations/' + orgId + '/venues', {
      method: 'POST',
      headers: {
        'Authorization': 'jwt ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': venue.name
      })
    });
    let json = await response.json();
    if(response.status === 201) {
      dispatch(loadVenue(json));
    } else {
      dispatch(failAddVenue(json.error));
    }
  }
}
