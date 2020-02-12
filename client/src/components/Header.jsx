import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOutEmployee } from '../redux/actions/userActions';
import '../styles/components/Header.scss';

const Header = ({ user, logOutEmployee }) => (
  <header className='Header'>
    <Link to={user ? '/dashboard' : '/'} className='Header__logo'>
      <span className='Header__logo purple'>Companyion</span>
    </Link>
    <div className='Header__buttons'>
      {!user ? (
        <Fragment>
          <Link className='Button' to='/login'>
            Login
          </Link>
          <Link className='Button inverted' to='/register'>
            Register
          </Link>
        </Fragment>
      ) : (
        <Fragment>
          <Link className='Button' to='/dashboard'>
            Dashboard
          </Link>
          <span
            role='button'
            className='Button inverted'
            onClick={logOutEmployee}>
            Logout
          </span>
        </Fragment>
      )}
    </div>
  </header>
);

const mapStateToProps = state => ({
  user: state.employee.user
});

const mapDispatchToProps = {
  logOutEmployee
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Header);
