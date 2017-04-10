import * as actionTypes from '../constants/actionTypes'

export default function grid(state = { rows: 1, cols: 1 }, action) {
	switch (action.type) {
		case actionTypes.GRID_LOADED:
			return {...state, grid: action.payload.grid};
		case actionTypes.GRID_UPDATED:
			return {...state, grid: action.payload.grid};
		default:
		  return state;
	};
}