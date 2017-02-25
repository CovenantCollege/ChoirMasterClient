import { combineReducers } from 'redux';
import user from './user';
import organizations from './organizations'
import failedRequests from './failedRequests'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  organizations,
  failedRequests
});

export default rootReducer;