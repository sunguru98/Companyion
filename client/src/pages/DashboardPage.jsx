import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import Spinner from '../components/Spinner';
import RightSideContent from '../components/RightSideContent';
import LeftSideContent from '../components/LeftSideContent';
import Onboarding from '../components/Onboarding';

const DashboardPage = ({ routes, routeLoading, fetchRoutes }) => {
  useEffect(() => {
    setTimeout(fetchRoutes, 10);
  }, [fetchRoutes]);

  return (
    <section className='page horizontal'>
      <Helmet>
        <title>R-Care Dashboard</title>
        <meta name='description' content='Dashboard page of R-Care' />
      </Helmet>
      {!routeLoading && routes ? (
        routes.length ? (
          <Fragment>
            <LeftSideContent routes={routes} />
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
  companies: state.company.companies,
  companyLoading: state.company.companyLoading
});

// const mapDispatchToProps = {
//   fetchRoutes
// };

const connector = connect(mapStateToProps, {});

export default connector(DashboardPage);
