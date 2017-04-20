import fetch from 'isomorphic-fetch';
import config from '../configuration';
import * as actionTypes from '../constants/actionTypes'
import * as selectors from '../selectors/grid'
import { getPerformanceId } from '../selectors/path'

/**
 * When dummy singers are loaded, update the store
 * @param  {rows: <rows>, cols: <cols>} The number of rows and cols in the grid
 */
export function loadGrid(grid) {
  return { type: actionTypes.GRID_LOADED, payload: { grid} };
}

/**
 * This will only do this locally for now. Needs to be changed.
 */
export function updateGrid(grid) {
  return { type: actionTypes.GRID_UPDATED, payload: { grid } };
}

export function moveSinger(sourceX, sourceY, targetX, targetY, singerId, performanceId) {
  return { type: actionTypes.SINGER_MOVED, payload: { sourceX, sourceY, targetX, targetY, singerId, performanceId }};
}

function requestGrid(performanceId) {
  return { type: actionTypes.GRID_REQUESTED, payload: { performanceId } };
}

function receiveGrid(orgId, performanceId, json) {
  return { type: actionTypes.GRID_RECEIVED, payload: { performanceId, singerList: json } };
}

function fetchGrid(token, orgId, performanceId) {
  return async dispatch => {
    dispatch(requestGrid(performanceId));
    let response = await fetch(config.baseApiUrl + '/organizations/' + orgId + '/performances/' + performanceId + '/grid/singers', {
      method: 'GET',
      headers: {
        'Authorization': 'jwt ' + token,
        'Content-Type': 'application/json'
      }
    });
    let json = await response.json();
    if (response.status == 200) {
      dispatch(receiveGrid(orgId, performanceId, json));
    } else {
      // TODO: how to handle 404 errors?
    }
  };
}

function shouldFetchGrid(state, performanceId) {
  return (state.grid.singerLists === undefined || state.grid.singerLists[performanceId] === undefined) && performanceId !== undefined && state.grid.isFetchingGrid.findIndex(p => p === performanceId) === -1;
}

export function fetchGridIfNeeded(token, orgId, performanceId) {
  console.log('fetching grid if needed');
  return (dispatch, getState) => {
    const state = getState();
    const performanceId = performanceId !== undefined ? performanceId : getPerformanceId(state);
    if (shouldFetchGrid(state, performanceId)) {
      return dispatch(fetchGrid(token, orgId, performanceId));
    }
  };
}
