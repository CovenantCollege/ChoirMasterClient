export function addSinger(singer) {
  return { type: 'SINGER_ADDED', payload: { singer }};
}

export function openAddSingerModal() {
  return { type: 'ADD_SINGER_MODAL_OPENED' };
}

export function closeAddSingerModal() {
  return { type: 'ADD_SINGER_MODAL_CLOSED' };
}