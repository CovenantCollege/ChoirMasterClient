export default function singers(state = { singersList: [] }, action) {
  switch (action.type) {
    case 'SINGER_ADDED':
      return { ...state, singersList: state.singersList.concat(action.payload.singer), addSingerModalOpen: false };
    case 'SINGERS_LOADED':
      return { ...state, singersList: action.payload.singers };
    case 'ADD_SINGER_MODAL_OPENED':
      return { ...state, addSingerModalOpen: true };
    case 'ADD_SINGER_MODAL_CLOSED':
      return { ...state, addSingerModalOpen: false };
    default:
      return state;
  }
}