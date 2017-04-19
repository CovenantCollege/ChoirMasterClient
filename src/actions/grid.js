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