import Axios from 'axios';
import history from '../createHistory';

export const fetchCompanies = () => async dispatch => {
  console.log('Hi there')
  try {
    dispatch({ type: 'SET_COMPANY_LOADING', payload: true });
    const {
      data: { companies }
    } = await Axios.get('/company');
    dispatch({ type: 'SET_COMPANIES', payload: companies });
  } catch (err) {
    const message = err.response.data.message;
    if (message) alert(message);
    else alert(err.message);
  } finally {
    dispatch({ type: 'SET_COMPANY_LOADING', payload: false });
  }
};

export const fetchCompanyById = companyId => async dispatch => {
  try {
    dispatch({ type: 'SET_COMPANY_LOADING', payload: true });
    const {
      data: { company }
    } = await Axios.get(`/company/${companyId}`);
    dispatch({ type: 'SET_COMPANY', payload: company });
  } catch (err) {
    const message = err.response.data.message;
    if (message) alert(message);
    else if (Array.isArray(message)) {
      dispatch({ type: 'SET_COMPANY_ERRORS', payload: message });
    } else alert(err.message);
  } finally {
    dispatch({ type: 'SET_COMPANY_LOADING', payload: false });
  }
};

export const createCompany = companyObj => async dispatch => {
  try {
    dispatch({ type: 'SET_COMPANY_LOADING', payload: true });
    const {
      data: { company }
    } = await Axios.post('/employee/company/create', companyObj);
    dispatch({ type: 'SET_COMPANY', payload: company });
  } catch (err) {
    const message = err.response.data.message;
    if (message) alert(message);
    else if (Array.isArray(message)) {
      dispatch({ type: 'SET_COMPANY_ERRORS', payload: message });
    } else alert(err.message);
  } finally {
    dispatch({ type: 'SET_COMPANY_LOADING', payload: false });
  }
};

export const joinCompany = (companyId, joinedAt) => async dispatch => {
  try {
    dispatch({ type: 'SET_COMPANY_LOADING', payload: true });
    await Axios.patch(`/company/${companyId}`, { joinedAt });
    alert('Company joined successfully');
    history.push('/');
  } catch (err) {
    const message = err.response.data.message;
    if (message) alert(message);
    else if (Array.isArray(message)) {
      dispatch({ type: 'SET_COMPANY_ERRORS', payload: message });
    } else alert(err.message);
  } finally {
    dispatch({ type: 'SET_COMPANY_LOADING', payload: false });
  }
};

export const quitCompany = (companyId, joinedAt) => async dispatch => {
  try {
    dispatch({ type: 'SET_COMPANY_LOADING', payload: true });
    await Axios.delete(`/company/${companyId}`, { joinedAt });
    alert('Company quit successfully');
    history.push('/');
  } catch (err) {
    const message = err.response.data.message;
    if (message) alert(message);
    else if (Array.isArray(message)) {
      dispatch({ type: 'SET_COMPANY_ERRORS', payload: message });
    } else alert(err.message);
  } finally {
    dispatch({ type: 'SET_COMPANY_LOADING', payload: false });
  }
};
