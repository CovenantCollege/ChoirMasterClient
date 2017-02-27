import fetch from 'isomorphic-fetch';
import config from '../configuration';
import * as actionTypes from '../constants/actionTypes'
import * as selectors from '../selectors/dummySingers'

/**
 * When dummy singers are loaded, update the store
 * @param  {list[Singer]} dummySingers A list of singer objects loaded from the server
 */
export function loadDummySingers(dummySingers) {
	return { type: actionTypes.DUMMY_SINGERS_LOADED, payload: { dummySingersList: dummySingers } };
}

/**
 * Sets dummySingersFetched state to true, then tries to retrieve dummy singers from the server, and when it gets that response, it calls loadDummySingers with the date from the server.
 */
// export function fetchDummySingers() {
//   return async dispatch => {
//     dispatch({ type: actionTypes.DUMMY_SINGERS_FETCHED });
//     let dummySingersResponse = await fetch(config.baseApiUrl + '/dummy-choir', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     let dummySingersJSON = await dummySingersResponse.json();
//     console.log("Dummy Singers: " + dummySingersJSON);
//     dispatch(loadDummySingers(dummySingersJSON));
//   }
// }

/**
 * This will only do this locally for now. Needs to be changed.
 */
export function updateDummySingers(dummySingers) {
	return { type: actionTypes.DUMMY_SINGERS_UPDATED, payload: {dummySingersList: dummySingers} };
}