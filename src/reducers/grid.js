import * as actionTypes from '../constants/actionTypes'

export default function grid(state = { rows: 4, cols: 6, isFetchingGrid: [], singerLists: {} }, action) {
  let singerLists;
  switch (action.type) {
    case actionTypes.GRID_LOADED:
      return { ...state, rows: action.payload.grid.rows, cols: action.payload.grid.cols };
    case actionTypes.GRID_UPDATED:
      return { ...state, ...action.payload.grid };
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
    case actionTypes.SINGER_MOVED:
      singerLists = JSON.parse(JSON.stringify(state.singerLists));
      let singerList = singerLists[action.payload.performanceId];
      let getSingerToReplaceIndex = () => {
        return singerList.findIndex(gridSinger => gridSinger.x === action.payload.targetX && gridSinger.y === action.payload.targetY);
      };
      let singerToMoveIndex = singerList.findIndex(gridSinger => gridSinger.singerId === action.payload.singerId);
      if(singerToMoveIndex !== -1) {
        singerList.splice(singerToMoveIndex, 1);
        let singerToReplaceIndex = getSingerToReplaceIndex();
        if(singerToReplaceIndex !== -1) {
          let singerToReplaceId = singerList[singerToReplaceIndex].singerId;
          let singerToReplace = singerList.splice(singerToReplaceIndex, 1);
          singerList.push({ singerId: singerToReplaceId, x: action.payload.sourceX, y: action.payload.sourceY });
        }
      } else {
        let singerToReplaceIndex = getSingerToReplaceIndex();
        if(singerToReplaceIndex !== -1) {
          if (singerList[singerToReplaceIndex].x === action.payload.targetX && singerList[singerToReplaceIndex].y === action.payload.targetY) {
            return state;
          }
        }
      }
      singerList.push({ singerId: action.payload.singerId, x: action.payload.targetX, y: action.payload.targetY });
      singerLists[action.payload.performanceId] = singerList;
      return { ...state, singerLists };
      break;
    case actionTypes.SINGER_LIST_UPDATED:
      singerLists = JSON.parse(JSON.stringify(state.singerLists));
      singerLists[action.payload.performanceId] = action.payload.singerList;
      return { ...state, singerLists };
    case actionTypes.GRID_SIZE_RECEIVED:
      return { ...state, rows: action.payload.gridSize.height, cols: action.payload.gridSize.width };
    case actionTypes.GRID_SIZE_UPDATED:
      return { ...state, rows: action.payload.height, cols: action.payload.width };
    default:
      return state;
  }
}
