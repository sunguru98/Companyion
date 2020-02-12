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
    country: '',
    state: '',
    city: '',
    address: '',
    name: '',
    cPassword: ''
  });

  const {
    email,
    password,
    name,
    cPassword,
    address,
    city,
    state,
    country
  } = formState;
  const handleSubmit = e => {
    e.preventDefault();
    if (password !== cPassword) return alert('Passwords do not match');
    registerEmployee({
      email,
      password,
      name,
      country,
      city,
      address,
      state
    });
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
              placeholder='Country'
              isTextArea={false}
              type='text'
              required
              name='country'
              value={country}
              onChange={handleChange}
            />
            <InputField
              placeholder='State'
              isTextArea={false}
              type='text'
              required
              name='state'
              value={state}
              onChange={handleChange}
            />
            <InputField
              placeholder='City'
              isTextArea={false}
              type='text'
              required
              name='city'
              value={city}
              onChange={handleChange}
            />
            <InputField
              placeholder='Address'
              isTextArea={false}
              type='text'
              required
              name='address'
              value={address}
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

const mapStateToProps = ({ employee: { user, userLoading } }) => ({
  user,
  userLoading
});
const mapDispatchToProps = { registerEmployee };
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LoginPage);
