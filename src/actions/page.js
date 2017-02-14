import { hashHistory } from 'react-router'

export function changePage(page) {
  hashHistory.push(page);
  return { type: 'FAILED_REQUESTS_CLEARED' }
}