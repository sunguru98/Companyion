import React, { useState } from 'react';
import { connect } from 'react-redux';

import Spinner from '../components/Spinner';
import { fetchCompanyById } from '../redux/actions/companyActions';
import Helmet from 'react-helmet';

const CompanyDetailPage = ({
  match,
  companyLoading,
  company,
  fetchCompanyById
}) => {
  const companyId = match.params.companyId;
  useState(() => {
    fetchCompanyById(companyId);
  }, []);
  return (
    <section className='page'>
      <Helmet>
        <title>Companyion Update Route</title>
        <meta name='description' content='Update Route page of Companyion' />
      </Helmet>
      {companyLoading || !company ? (
        <Spinner />
      ) : (
        <div
          style={{
            fontSize: '2rem',
            textAlign: 'left',
            background: '#7232DB',
            borderRadius: '1.2rem',
            padding: '1rem',
            width: '80%',
            height: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            color: 'white',
            fontWeight: 'bold'
          }}>
          <p>Name: {company.name}</p>
          <p>Country: {company.country}</p>
          <p>State: {company.state}</p>
          <p>City: {company.city}</p>
          <p>Address: {company.address}</p>
          <ul style={{ marginTop: '2rem' }}>
            Employees:{' '}
            {[
              ...company.pastEmployees.map(e => <li key={e._id}>{e.name}</li>),
              ...company.presentEmployees.map(e => (
                <li key={e._id}>{e.name}</li>
              ))
            ]}
          </ul>
        </div>
      )}
    </section>
  );
};

const mapStateToProps = ({ company: { companyLoading, company } }) => ({
  companyLoading,
  company
});

const connector = connect(mapStateToProps, { fetchCompanyById });

export default connector(CompanyDetailPage);
