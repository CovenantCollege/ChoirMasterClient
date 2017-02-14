import { combineReducers } from 'redux';
import user from './user';
import organizations from './organizations'
import failedRequests from './failedRequests'

const rootReducer = combineReducers({
  user,
  organizations,
  failedRequests
});

export default rootReducer;