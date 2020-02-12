import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { createCompany } from '../redux/actions/companyActions';
import Spinner from '../components/Spinner';
import InputField from '../components/InputField';
import Helmet from 'react-helmet';

const CompanyCreatePage = ({ createCompany, companyLoading }) => {
  const [formState, setFormState] = useState({
    country: '',
    state: '',
    city: '',
    address: '',
    name: ''
  });

  const { name, address, city, state, country } = formState;

  const handleSubmit = e => {
    e.preventDefault();
    createCompany({ ...formState });
  };

  const handleChange = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section className='page'>
      <Helmet>
        <title>Companyion - Add Company</title>
        <meta name='description' content='Create page of R-Care' />
      </Helmet>
      <form className='Form' onSubmit={handleSubmit}>
        <h1>Create Company</h1>
        {companyLoading ? (
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
          </Fragment>
        )}
        <input
          className={`Button ${companyLoading ? 'disabled' : ''}`}
          disabled={companyLoading}
          type='submit'
          value='Create Company'
        />
      </form>
    </section>
  );
};

const mapStateToProps = ({ company: { companyLoading, errors } }) => ({
  companyLoading,
  errors
});

const mapDispatchToProps = { createCompany: createCompany };
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CompanyCreatePage);
