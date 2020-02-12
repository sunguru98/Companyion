import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { joinCompany } from '../redux/actions/companyActions';
import Spinner from '../components/Spinner';
import SelectField from '../components/SelectField';
import Helmet from 'react-helmet';

const CompanyCreatePage = ({ joinCompany, companyLoading, companies }) => {
  const [formState, setFormState] = useState({
    company: '',
    joinedAt: null
  });

  const { company, joinedAt } = formState;

  const handleSubmit = e => {
    e.preventDefault();
    joinCompany({ ...formState });
  };

  const handleChange = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section className='page'>
      <Helmet>
        <title>Companyion - Join Company</title>
        <meta name='description' content='Create page of R-Care' />
      </Helmet>
      <form className='Form' onSubmit={handleSubmit}>
        <h1>Join Company</h1>
        {companyLoading ? (
          <Spinner />
        ) : (
          <Fragment>
            <SelectField
              onChange={handleChange}
              name='company'
              value={company}
              optionValues={[
                { text: 'Select a company', isDisabled: true, value: '' },
                companies.map(c => ({ text: c.name, value: c._id }))
              ]}
            />
            <input
              type='date'
              value={joinedAt}
              name='joinedAt'
              placeholder='Please select your joining date'
            />
            <input
              className={`Button ${companyLoading ? 'disabled' : ''}`}
              disabled={companyLoading}
              type='submit'
              value='Create Route'
            />
          </Fragment>
        )}
        <input
          className={`Button ${companyLoading ? 'disabled' : ''}`}
          disabled={companyLoading}
          type='submit'
          value='Create Route'
        />
      </form>
    </section>
  );
};

const mapStateToProps = ({ company: { companyLoading, companies } }) => ({
  companyLoading,
  companies
});

const mapDispatchToProps = { joinCompany: joinCompany };
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CompanyCreatePage);
