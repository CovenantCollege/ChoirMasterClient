import { combineReducers } from 'redux';
import singers from './singers';
import user from './user';

const rootReducer = combineReducers({
  singers,
  user
});

export default rootReducer;