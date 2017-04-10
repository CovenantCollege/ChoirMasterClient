import { combineReducers } from 'redux';
import user from './user';
import organizations from './organizations'
import dummySingers from './dummySingers'
import failedRequests from './failedRequests'
import grid from './grid'
import modal from './modal'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  organizations,
  failedRequests,
  modal,
  dummySingers,
  grid
});

export default rootReducer;
