import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { signInEmployee, registerEmployee } from '../redux/actions/userActions';
import { Redirect, Link } from 'react-router-dom';
import '../styles/pages/LandingPage.scss';

const LandingPage = ({ user }) => {
  return user ? (
    <Redirect to='/dashboard' />
  ) : (
    <section className='LandingPage page'>
      <Helmet>
        <title>R-Care Home</title>
        <meta name='description' content='Home page of R-Care' />
      </Helmet>
      <h1 className='LandingPage__title xl'>Easy route management.</h1>
      <p className='LandingPage__description'>
        Change the way you view routes and analyse their paths with R-Care.
      </p>
      <div className='LandingPage__buttons'>
        <Link className='Button' to='/login'>
          Login
        </Link>
        <Link className='Button inverted' to='/register'>
          Register
        </Link>
      </div>
    </section>
  );
};

const mapStateToProps = ({ user: { user } }) => ({ user });
const mapDispatchToProps = { signInEmployee, registerEmployee };
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LandingPage);
