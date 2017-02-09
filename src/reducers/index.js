import { combineReducers } from 'redux';
import user from './user';
import organizations from './organizations'

const rootReducer = combineReducers({
  user,
  organizations
});

export default rootReducer;