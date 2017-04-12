import * as actionTypes from '../constants/actionTypes'

export default function grid(state = { rows: 1, cols: 1 }, action) {
	switch (action.type) {
		case actionTypes.GRID_LOADED:
			return {...state, rows: action.payload.grid.rows, cols: action.payload.grid.cols};
		case actionTypes.GRID_UPDATED:
			return {...state, rows: action.payload.grid.rows, cols: action.payload.grid.cols};
		default:
		  return state;
	};
}