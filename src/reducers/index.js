import { combineReducers } from 'redux';
import user from './user';
import organizations from './organizations'
import dummySingers from './dummySingers'
import failedRequests from './failedRequests'

const rootReducer = combineReducers({
  user,
  organizations,
  dummySingers,
  failedRequests
});

export default rootReducer;