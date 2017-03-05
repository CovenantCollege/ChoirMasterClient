import * as actionTypes from '../constants/actionTypes'

export function clearAllFailedRequests() {
  return { type: actionTypes.FAILED_REQUESTS_CLEARED };
}