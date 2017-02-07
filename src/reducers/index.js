import { combineReducers } from 'redux';
import singers from './singers';
import user from './user';
import organizations from './organizations'

const rootReducer = combineReducers({
  singers,
  user,
  organizations
});

export default rootReducer;