export default function singers(state = { singersList: [] }, action) {
  console.log(action);
  switch (action.type) {
    case 'SINGER_ADDED':
      return { ...state, singersList: state.singersList.concat(action.payload.singer) };
    default:
      return state;
  }
}