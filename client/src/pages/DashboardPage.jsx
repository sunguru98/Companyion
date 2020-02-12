import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import Spinner from '../components/Spinner';
import RightSideContent from '../components/RightSideContent';
import LeftSideContent from '../components/LeftSideContent';
import Onboarding from '../components/Onboarding';

const DashboardPage = ({ employee, companyLoading }) => {
  return (
    <section className='page horizontal'>
      <Helmet>
        <title>R-Care Dashboard</title>
        <meta name='description' content='Dashboard page of R-Care' />
      </Helmet>
      {!companyLoading && employee.companies ? (
        employee.companies.length ? (
          <Fragment>
            <LeftSideContent companies={employee.companies} />
            <RightSideContent />
          </Fragment>
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
  employee: state.employee.employee,
  companyLoading: state.company.companyLoading
});

const connector = connect(mapStateToProps, { fetchCompanies });

export default connector(DashboardPage);
