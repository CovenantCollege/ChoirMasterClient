import * as actionTypes from '../constants/actionTypes'

export default function dummySingers(state = { dummySingersList: [], fetchingDummySingers: false }, action) {
	switch (action.type) {
		case actionTypes.DUMMY_SINGERS_FETCHED:
			return {...state, fetchingDummySingers: true};
		case actionTypes.DUMMY_SINGERS_LOADED:
			return {...state, dummySingersList: action.payload.dummySingersList, fetchingDummySingers: false};
		case actionTypes.DUMMY_SINGERS_UPDATED:
			return {...state, dummySingersList: action.payload.dummySingersList};
		default:
		  return state;
	};
}