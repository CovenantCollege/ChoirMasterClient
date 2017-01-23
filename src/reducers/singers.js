export default function singers(state = {
  singersList: [
    { name: 'Josh Humpherys', height: '5\' 7"' },
    { name: 'Abby Hynson', height: '5\' 3"' },
    { name: 'Nathan Bierema', height: '6\' 1"' },
    { name: 'David Reed', height: '5\' 11"' }
  ]
}, action) {
  switch (action.type) {
    case 'SINGER_ADDED':
      return { ...state, singersList: state.singersList.concat(action.payload.singer), addSingerModalOpen: false };
    case 'ADD_SINGER_MODAL_OPENED':
      return { ...state, addSingerModalOpen: true };
    case 'ADD_SINGER_MODAL_CLOSED':
      return { ...state, addSingerModalOpen: false };
    default:
      return state;
  }
}