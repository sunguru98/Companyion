import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import Spinner from '../components/Spinner';
import LeftSideContent from '../components/LeftSideContent';
import Onboarding from '../components/Onboarding';

const DashboardPage = ({ employee, companyLoading }) => {
  console.log(employee);
  return (
    <section className='page horizontal'>
      <Helmet>
        <title>R-Care Dashboard</title>
        <meta name='description' content='Dashboard page of R-Care' />
      </Helmet>
      {!companyLoading && employee.companies ? (
        employee.companies.length ? (
          <LeftSideContent companies={employee.companies} />
        ) : (
          <Onboarding />
        )
      ) : (
        <Spinner />
      )}
    </section>
  );
};

const mapStateToProps = state => ({
  employee: state.employee.user,
  companyLoading: state.company.companyLoading
});

const connector = connect(mapStateToProps);

export default connector(DashboardPage);
