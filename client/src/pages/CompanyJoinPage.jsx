import React, { useState, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { joinCompany, fetchCompanies } from '../redux/actions/companyActions';
import Spinner from '../components/Spinner';
import SelectField from '../components/SelectField';
import Helmet from 'react-helmet';

const CompanyJoinPage = ({
  joinCompany,
  companyLoading,
  companies,
  fetchCompanies
}) => {
  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const [formState, setFormState] = useState({
    company: '',
    joinedAt: ''
  });

  const { company, joinedAt } = formState;

  const handleSubmit = e => {
    e.preventDefault();
    joinCompany(company, joinedAt);
  };

  const handleChange = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  console.log(companies);
  return (
    <section className='page'>
      <Helmet>
        <title>Companyion - Join Company</title>
        <meta name='description' content='Create page of R-Care' />
      </Helmet>
      <form className='Form' onSubmit={handleSubmit}>
        <h1>Join Company</h1>
        {companyLoading || !companies ? (
          <Spinner />
        ) : (
          <Fragment>
            <SelectField
              required
              onChange={handleChange}
              name='company'
              value={company}
              optionValues={[
                { text: 'Select a company', isDisabled: true, value: '' },
                ...companies.map(c => ({ text: c.name, value: c._id }))
              ]}
            />
            <input
              max={`${new Date().getFullYear()}-${
                new Date().getMonth() + 1 < 10
                  ? '0' + new Date().getMonth()
                  : new Date().getMonth()
              }-${
                new Date().getDate() < 10
                  ? '0' + new Date().getDate()
                  : new Date().getDate()
              }`}
              required
              style={{ marginTop: '3rem' }}
              type='date'
              value={joinedAt}
              onChange={handleChange}
              name='joinedAt'
              placeholder='Please select your joining date'
            />
            <input
              className={`Button ${companyLoading ? 'disabled' : ''}`}
              disabled={companyLoading}
              type='submit'
              value='Join Company'
            />
          </Fragment>
        )}
      </form>
    </section>
  );
};

const mapStateToProps = ({ company: { companyLoading, companies } }) => ({
  companyLoading,
  companies
});

const mapDispatchToProps = { joinCompany, fetchCompanies };
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CompanyJoinPage);
