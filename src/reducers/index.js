import {combineReducers} from 'redux';
import username from './loginReducer';

const rootReducer = combineReducers({
  username,
});

export default rootReducer;