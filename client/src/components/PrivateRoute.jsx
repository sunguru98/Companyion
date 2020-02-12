import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ user, component: Component, ...rest }) => {
  return user ? (
    <Route {...rest} component={Component} />
  ) : (
    <Redirect to='/login' />
  );
};

const mapStateToProps = ({ user: { user } }) => ({ user });
const connector = connect(mapStateToProps);

export default connector(PrivateRoute);
