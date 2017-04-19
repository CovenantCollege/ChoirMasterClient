import * as actionTypes from '../constants/actionTypes'

export default function grid(state = { rows: 4, cols: 6, isFetchingGrid: [], singerLists: {} }, action) {
  switch (action.type) {
    case actionTypes.GRID_LOADED:
      return { ...state, rows: action.payload.grid.rows, cols: action.payload.grid.cols };
    case actionTypes.GRID_UPDATED:
      return { ...action.payload.grid };
    case actionTypes.GRID_REQUESTED:
      return {
        ...state,
        isFetchingGrid: state.isFetchingGrid.concat(action.payload.performanceId)
      };
    case actionTypes.GRID_RECEIVED:
      let updatedIsFetchingGrid = JSON.parse(JSON.stringify(state.isFetchingGrid));
      updatedIsFetchingGrid.splice(state.isFetchingGrid.findIndex(performanceId => performanceId === action.payload.performanceId), 1);
      return {
        ...state,
        isFetchingGrid: updatedIsFetchingGrid,
        singerLists: {
          ...state.singerLists,
          [action.payload.performanceId]: action.payload.singerList
        }
      };
    default:
      return state;
  };
}
