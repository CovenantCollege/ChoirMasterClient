import fetch from 'isomorphic-fetch';

export function openAddSingerModal() {
  return { type: 'ADD_SINGER_MODAL_OPENED' };
}

export function closeAddSingerModal() {
  return { type: 'ADD_SINGER_MODAL_CLOSED' };
}

export function loadSinger(singer) {
  return { type: 'SINGER_ADDED', payload: { singer }};
}

export function loadSingers(singers) {
  return { type: 'SINGERS_LOADED', payload: { singers }};
}

export function addSinger(singer) {
  return async dispatch => {
    let response = await fetch('singers', {
      method: 'POST',
      headers: {
        'Authorization': 'jwt ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': singer.name,
        'height': singer.height
      })
    });
    let json = await response.json();
    dispatch(loadSinger(json));
  }
}

export function fetchSingers() {
  return async dispatch => {
    let response = await fetch('singers', {
      method: 'GET',
      headers: {
        'Authorization': 'jwt ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
    });
    let json = await response.json();
    dispatch(loadSingers(json));
  }
}
