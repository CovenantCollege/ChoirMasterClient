import fetch from 'isomorphic-fetch'
import config from '../configuration'
import * as actionTypes from '../constants/actionTypes'

function performanceAdded(performance, orgId) {
  return { type: actionTypes.PERFORMANCE_ADDED, payload: { performance, orgId } };
}

function failAddPerformance(error) {
  return { type: actionTypes.ADD_PERFORMANCE_FAILED, payload: { error } };
}

function performanceGridSizeUpdated(orgId, performanceId, width, height) {
  return { type: actionTypes.PERFORMANCE_GRID_SIZE_UPDATED, payload: { performanceId, orgId, width, height } };
}

function gridSizeUpdated(width, height) {
  return { type: actionTypes.GRID_SIZE_UPDATED, payload: { width, height } };
}

export function addPerformance(token, orgId, venueId, performance) {
  return async dispatch => {
    let postResponse = await fetch(config.baseApiUrl + '/organizations/' + orgId + '/venues/' + venueId + '/performances/', {
      method: 'POST',
      headers: {
        'Authorization': 'jwt ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: performance.date,
        description: performance.description,
        width: performance.width,
        height: performance.height
      })
    });
    if(postResponse.status === 201) {
      let json = await postResponse.json();
      let putResponse = await fetch(config.baseApiUrl + '/organizations/' + orgId + '/performances/' + json.performanceId + '/choirs/', {
        method: 'PUT',
        headers: {
          'Authorization': 'jwt ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(performance.selected)
      });
      if(putResponse.status === 204) {
        dispatch(performanceAdded({...json, choirs: performance.selected}, orgId));
      }
    } else {
      dispatch(failAddPerformance(postResponse.error));
    }
  }
}

export function updatePerformanceGridSize(token, orgId, performanceId, width, height) {
  return async dispatch => {
    let response = await fetch(config.baseApiUrl + '/organizations/' + orgId + '/performances/' + performanceId + '/size', {
      method: 'PUT',
      headers: {
        'Authorization': 'jwt ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ width, height })
    });
    if(response.status === 200) {
      dispatch(performanceGridSizeUpdated(orgId, performanceId, width, height));
      dispatch(gridSizeUpdated(width, height));
    }
  }
}