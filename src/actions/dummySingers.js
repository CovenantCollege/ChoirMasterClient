import fetch from 'isomorphic-fetch';
import config from '../configuration';
import * as actionTypes from '../constants/actionTypes'

export function loadDummySingers(dummySingers) {
	return { type: actionTypes.DUMMY_SINGERS_LOADED, payload: { dummySingersList: dummySingers }};
}

export function fetchDummySingers() {
  return async dispatch => {
    dispatch({ type: actionTypes.DUMMY_SINGERS_FETCHED });
    let dummySingersResponse = await fetch(config.baseApiUrl + '/dummy-choir', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let dummySingersJSON = await dummySingersResponse.json();
    console.log("Dummy Singers: " + dummySingersJSON);
    dispatch(loadDummySingers(dummySingersJSON));
  }
}