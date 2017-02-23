import * as actionTypes from '../constants/actionTypes'

export default function dummySingers(state = { dummySingersList: [], fetchingDummySingers: false }, action) {
	switch (action.type) {
		case actionTypes.DUMMY_SINGERS_FETCHED:
			return {...state, fetchingDummySingers: true};
		case actionTypes.DUMMY_SINGERS_LOADED:
			console.log("Payload: " + action.payload.dummySingersList);
			return {...state, dummySingersList: action.payload.dummySingersList, fetchingDummySingers: false};
		default:
		  return state;
	};
}