import Axios from 'axios';
import history from '../createHistory';

export const signInEmployee = credentials => async dispatch => {
  try {
    dispatch({ type: 'SET_USER_LOADING', payload: true });
    const {
      data: { employee, accessToken }
    } = await Axios.post('/employee/login', credentials);
    Axios.defaults.headers.common['Authorization'] = accessToken;
    dispatch({ type: 'SET_USER', payload: employee });
    dispatch({ type: 'SET_ACCESS_TOKEN', payload: accessToken });
    alert('Signin successful');
    history.push('/dashboard');
  } catch (err) {
    const message = err.response.data.message;
    if (message) alert(message);
    else alert(err.message);
  } finally {
    dispatch({ type: 'SET_USER_LOADING', payload: false });
  }
};

export const registerEmployee = employeeObj => async dispatch => {
  try {
    dispatch({ type: 'SET_USER_LOADING', payload: true });
    const {
      data: { employee, accessToken }
    } = await Axios.post('/employee/signup', employeeObj);
    Axios.defaults.headers.common['Authorization'] = accessToken;
    dispatch({ type: 'SET_USER', payload: employee });
    dispatch({ type: 'SET_ACCESS_TOKEN', payload: accessToken });
    alert('Registration successful');
    history.push('/dashboard');
  } catch (err) {
    const message = err.response.data.message;
    if (message) alert(message);
    else if (Array.isArray(message)) {
      dispatch({ type: 'SET_USER_ERRORS', payload: JSON.parse(message) });
    } else alert(err.message);
  } finally {
    dispatch({ type: 'SET_USER_LOADING', payload: false });
  }
};

export const logOutEmployee = () => async dispatch => {
  try {
    dispatch({ type: 'RESET_COMPANY_STATE' });
    dispatch({ type: 'RESET_USER_STATE' });
    history.push('/');
    Axios.delete('/employee/logout');
  } catch (err) {
    const message = err.response.data.message;
    if (message) alert(message);
    else alert(err.message);
  } finally {
    dispatch({
      type: 'SET_USER_LOADING',
      payload: false
    });
  }
};
