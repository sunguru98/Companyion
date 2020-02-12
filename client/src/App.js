import React, { useEffect } from 'react';
import Axios from 'axios';
import { Switch, Route, Redirect } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RouteUpdatePage from './pages/RouteUpdatePage';
import DashboardPage from './pages/DashboardPage';
import RouteCreatePage from './pages/RouteCreatePage';
import RouteBatchUploadPage from './pages/RouteBatchUploadPage';

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
        <Route exact path='/company/:companyId' component={RouteUpdatePage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegisterPage} />
        <PrivateRoute exact path='/dashboard' component={DashboardPage} />
        <PrivateRoute exact path='/route/create' component={RouteCreatePage} />
        <PrivateRoute
          exact
          path='/route/create/multi'
          component={RouteBatchUploadPage}
        />
        <PrivateRoute
          exact
          path='/route/edit/:routeId'
          component={RouteUpdatePage}
        />
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
