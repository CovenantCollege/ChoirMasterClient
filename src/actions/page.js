import { hashHistory } from 'react-router'
import * as actionTypes from '../constants/actionTypes'

export function changePage(page) {
  hashHistory.push(page);
  return { type: actionTypes.FAILED_REQUESTS_CLEARED }
}