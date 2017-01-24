import fetch from 'isomorphic-fetch'

export function addSinger(singer) {
  return { type: 'SINGER_ADDED', payload: { singer }};
}

export function loadSingers(singers) {
  return { type: 'SINGERS_LOADED', payload: { singers }};
}

export function openAddSingerModal() {
  return { type: 'ADD_SINGER_MODAL_OPENED' };
}

export function closeAddSingerModal() {
  return { type: 'ADD_SINGER_MODAL_CLOSED' };
}

export function fetchSingers() {
  return async dispatch => {
    let response = await fetch('http://localhost:4567/singers', {
      method: 'GET',
      headers: {
        'Authorization': 'jwt fakejwtTODOimplementlogin',
        'Content-Type': 'application/json'
      },
    });
    let json = await response.json();
    dispatch(loadSingers(json));
  }
}