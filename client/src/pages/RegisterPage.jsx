import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { registerEmployee } from '../redux/actions/userActions';
import InputField from '../components/InputField';
import Spinner from '../components/Spinner';
import Helmet from 'react-helmet';

const LoginPage = ({ user, registerEmployee, userLoading }) => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    name: '',
    cPassword: ''
  });

  const { email, password, name, cPassword } = formState;
  const handleSubmit = e => {
    e.preventDefault();
    if (password !== cPassword) return alert('Passwords do not match');
    registerEmployee({ email, password, name });
  };

  const handleChange = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  if (user) return <Redirect to='/dashboard' />;

  return (
    <section className='page'>
      <Helmet>
        <title>R-Care Register</title>
        <meta name='description' content='Register page of R-Care' />
      </Helmet>
      <form className='Form' onSubmit={handleSubmit}>
        <h1>{!userLoading ? 'Join us' : 'Please wait'}</h1>
        {userLoading ? (
          <Spinner />
        ) : (
          <Fragment>
            <InputField
              placeholder='Name'
              isTextArea={false}
              type='text'
              required
              name='name'
              value={name}
              onChange={handleChange}
            />
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
            <InputField
              placeholder='Confirm password'
              isTextArea={false}
              type='password'
              required
              name='cPassword'
              value={cPassword}
              onChange={handleChange}
            />
            <input className='Button' type='submit' value='Register' />
          </Fragment>
        )}
      </form>
    </section>
  );
};

const mapStateToProps = ({ user: { user, userLoading } }) => ({
  user,
  userLoading
});
const mapDispatchToProps = { registerEmployee };
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LoginPage);
