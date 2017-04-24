import fetch from 'isomorphic-fetch';
import config from '../configuration';
import * as actionTypes from '../constants/actionTypes'
import { getPerformanceId } from '../selectors/path'

export function updateGrid(grid) {
  return { type: actionTypes.GRID_UPDATED, payload: { grid } };
}

export function updateSingerList(singerList, performanceId) {
  return { type: actionTypes.SINGER_LIST_UPDATED, payload: { singerList, performanceId }};
}

export function moveSinger(sourceX, sourceY, targetX, targetY, sourceSingerId, targetSingerId, performanceId) {
  return { type: actionTypes.SINGER_MOVED, payload: { sourceX, sourceY, targetX, targetY, sourceSingerId, targetSingerId, performanceId }};
}

export function saveGrid(token, orgId, performanceId, gridSingers) {
  return async dispatch => {
    dispatch(requestGrid(performanceId));
    let response = await fetch(config.baseApiUrl + '/organizations/' + orgId + '/performances/' + performanceId + '/grid/singers', {
      method: 'PUT',
      headers: {
        'Authorization': 'jwt ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(gridSingers)
    });
    let json = await response.json();
    if (response.status != 200) {
      console.log('failed to save grid');
    }
  };
}

// export function fetchGridSize(token, orgId, performanceId) {
//   return async dispatch => {
//     dispatch(requestGrid(performanceId));
//     let response = await fetch(config.baseApiUrl + '/organizations/' + orgId + '/performances/' + performanceId + '/grid/singers', {
//       method: 'GET',
//       headers: {
//         'Authorization': 'jwt ' + token,
//         'Content-Type': 'application/json'
//       }
//     });
//     let json = await response.json();
//     if (response.status == 200) {
//       dispatch(receiveGridSize(orgId, performanceId, json));
//     } else {
//       // TODO error handling
//     }
//   };
// }
//
// function receiveGridSize(orgId, performanceId, gridSize) {
//   return { type: actionTypes.GRID_SIZE_RECEIVED, payload: { orgId, performanceId, gridSize } };
// }

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
  return (dispatch, getState) => {
    const state = getState();
    const performanceId = performanceId !== undefined ? performanceId : getPerformanceId(state);
    if (shouldFetchGrid(state, performanceId)) {
      return dispatch(fetchGrid(token, orgId, performanceId));
    }
  };
}

export function arrangeSingers(token, orgId, performanceId) {
  return async dispatch => {
    let response = await fetch(config.baseApiUrl + '/organizations/' + orgId + '/performances/' + performanceId + '/grid/singers/algorithm', {
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
  }
}
