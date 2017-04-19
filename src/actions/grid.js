import fetch from 'isomorphic-fetch';
import config from '../configuration';
import * as actionTypes from '../constants/actionTypes'
import * as selectors from '../selectors/grid'

/**
 * When dummy singers are loaded, update the store
 * @param  {rows: <rows>, cols: <cols>} The number of rows and cols in the grid
 */
export function loadGrid(grid) {
	return { type: actionTypes.GRID_LOADED, payload: {grid:grid} };
}

/**
 * This will only do this locally for now. Needs to be changed.
 */
export function updateGrid(grid) {
	return { type: actionTypes.GRID_UPDATED, payload: { grid } };
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

function shouldFetchGrid(state) {
	return state.grid.singersList == null && !state.isFetchingGrid;
}

export function fetchGridIfNeeded(token, orgId, performanceId) {
	return (dispatch, getState) => {
		if (shouldFetchGrid(getState())) {
			return dispatch(fetchGrid(token, orgId, performanceId));
		}
	};
}
