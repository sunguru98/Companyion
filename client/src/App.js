import React, { useEffect } from 'react';
import Axios from 'axios';
import { Switch, Route, Redirect } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RouteUpdatePage from './pages/CompanyDetailPage';
import DashboardPage from './pages/DashboardPage';
import CompanyCreatePage from './pages/CompanyCreatePage';
import CompanyJoinPage from './pages/CompanyJoinPage';

import { connect } from 'react-redux';
import history from './redux/createHistory';
import store from './redux/store';

const App = ({ accessToken }) => {
  useEffect(() => {
    if (accessToken) {
    }
    Axios.defaults.headers.common['Authorization'] = accessToken;
  });
  Axios.interceptors.response.use(
    res => Promise.resolve(res),
    err => {
      if (err.response.data.statusCode === 403) {
        alert('Session Expired. Kindly login again');
        store.dispatch({ type: 'RESET_USER_STATE' });
        store.dispatch({ type: 'RESET_COMPANY_STATE' });
        history.push('/login');
      } else throw err;
    }
  );
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <PrivateRoute exact path='/company/new' component={CompanyCreatePage} />
        <PrivateRoute exact path='/company/join' component={CompanyJoinPage} />
        <Route exact path='/company/:companyId' component={RouteUpdatePage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegisterPage} />
        <PrivateRoute exact path='/dashboard' component={DashboardPage} />
        <Redirect to='/' />
      </Switch>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  accessToken: state.employee.accessToken
});

const connector = connect(mapStateToProps);

export default connector(App);
