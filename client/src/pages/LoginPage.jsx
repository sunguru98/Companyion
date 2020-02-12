import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signInEmployee } from '../redux/actions/userActions';
import InputField from '../components/InputField';
import Spinner from '../components/Spinner';
import Helmet from 'react-helmet';

const LoginPage = ({ user, signInEmployee, userLoading }) => {
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formState;
  const handleSubmit = e => {
    e.preventDefault();
    signInEmployee({ email, password });
  };

  const handleChange = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  if (user) return <Redirect to='/dashboard' />;

  return (
    <section className='LoginPage page'>
      <Helmet>
        <title>R-Care Login</title>
        <meta name='description' content='Login page of R-Care' />
      </Helmet>
      <form className='Form' onSubmit={handleSubmit}>
        <h1>{!userLoading ? 'Welcome back' : 'Please wait'}</h1>
        {userLoading ? (
          <Spinner />
        ) : (
          <Fragment>
            <InputField
              placeholder='Email'
              isTextArea={false}
              type='email'
              required
              name='email'
              value={email}
              onChange={handleChange}
            />
            <InputField
              placeholder='Password'
              isTextArea={false}
              type='password'
              required
              name='password'
              value={password}
              onChange={handleChange}
            />
            <input
              className={`Button ${userLoading ? 'disabled' : ''}`}
              disabled={userLoading}
              type='submit'
              value='Login'
            />
          </Fragment>
        )}
      </form>
    </section>
  );
};

const mapStateToProps = ({ employee: { user, userLoading } }) => ({
  user,
  userLoading
});
const mapDispatchToProps = { signInEmployee };
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LoginPage);
