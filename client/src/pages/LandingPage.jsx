import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { fetchCompanies } from '../redux/actions/companyActions';

import '../styles/pages/LandingPage.scss';
import Spinner from '../components/Spinner';

const LandingPage = ({ companies, companyLoading, fetchCompanies }) => {
  console.log(fetchCompanies);
  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);
  return (
    <section style={{ padding: '1rem' }} className='LandingPage page'>
      <Helmet>
        <title>R-Care Home</title>
        <meta name='description' content='Home page of R-Care' />
      </Helmet>
      {companyLoading || !companies ? (
        <Spinner />
      ) : (
        <div
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridAutoRows: 'minmax(30rem, 1fr)',
            gridGap: '2rem'
          }}>
          {companies.map(c => (
            <div
              style={{
                color: 'white',
                cursor: 'pointer',
                flexDirection: 'column',
                background: '#7232DB',
                borderRadius: '.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <p>{c.name}</p>
              <p>{c.country}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

const mapStateToProps = ({ company: { companies, companyLoading } }) => ({
  companies,
  companyLoading
});
const mapDispatchToProps = { fetchCompanies: fetchCompanies };
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LandingPage);
