import * as actionTypes from '../constants/actionTypes'

export default function failedRequests(state = {}, action) {
  switch(action.type) {
    case actionTypes.ADD_SINGER_FAILED:
      return { ...state, addSingerFailed: true };
    case actionTypes.ADD_SINGER_FAILED_CLEARED:
      return { ...state, addSingerFailed: false };
    case actionTypes.ADD_ORGANIZATION_FAILED:
      return { ...state, addOrganizationFailed: true };
    case actionTypes.ADD_ORGANIZATION_FAILED_CLEARED:
      return { ...state, addOrganizationFailed: false };
    case actionTypes.FAILED_REQUESTS_CLEARED:
      return {};
    default:
      return state;
  }
}