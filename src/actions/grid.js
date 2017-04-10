import fetch from 'isomorphic-fetch';
import config from '../configuration';
import * as actionTypes from '../constants/actionTypes'
import * as selectors from '../selectors/grid'

// This is completely front end at this point. This will need to be connected to 
// the database for persistance and having multiple grids. Should work all right
// for a quick demo though

/**
 * When dummy singers are loaded, update the store
 * @param  {rows: <rows>, cols: <cols>} The number of rows and cols in the grid
 */
export function loadGrid(grid) {
	return { type: actionTypes.GRID_LOADED, payload: { grid: grid } };
}

/**
 * This will only do this locally for now. Needs to be changed.
 */
export function updateGrid(grid) {
	return { type: actionTypes.GRID_UPDATED, payload: {grid: grid} };
}