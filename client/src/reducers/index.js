import {combineReducers} from 'redux';
import order from './order';
import auth from './auth';


export default combineReducers({
  order,auth
});