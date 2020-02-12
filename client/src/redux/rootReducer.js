import companyReducer from './reducers/companyReducer';
import employeeReducer from './reducers/employeeReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  employee: employeeReducer,
  company: companyReducer
});
