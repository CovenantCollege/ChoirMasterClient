import * as actionTypes from '../constants/actionTypes'

export default function grid(state = { rows: 4, cols: 6, isFetchingGrid: [] }, action) {
	switch (action.type) {
		case actionTypes.GRID_LOADED:
			return { ...state, rows: action.payload.grid.rows, cols: action.payload.grid.cols };
		case actionTypes.GRID_UPDATED:
			return { ...state, rows: action.payload.grid.rows, cols: action.payload.grid.cols };
		case actionTypes.GRID_REQUESTED:
			return {
				...state,
				isFetchingGrid: state.isFetchingGrid.concat(action.payload.performanceId)
			};
		case actionTypes.GRID_RECEIVED:
			return {
				...state,
				isFetchingGrid: state.isFetchingGrid.splice(state.isFetchingGrid.findIndex(performanceId => performanceId === action.payload.performanceId), 1),
				singerLists: {
					...state.singerLists,
					[action.payload.performanceId]: action.payload.singerList
				}
			};
		default:
		  return state;
	};
}
