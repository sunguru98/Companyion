import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCompanies } from '../redux/actions/companyActions';

import '../styles/pages/LandingPage.scss';
import Spinner from '../components/Spinner';

const LandingPage = ({ companies, companyLoading, fetchCompanies }) => {
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
            <Link key={c._id} to={`/company/${c._id}`}>
              <div
                style={{
                  height: '100%',
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
            </Link>
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
