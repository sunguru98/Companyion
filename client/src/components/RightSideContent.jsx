import React from 'react';
import { connect } from 'react-redux';
import CompanyDetail from './RouteDetail';

const RightSideContent = ({ company }) => {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
      {company && <CompanyDetail company={company} />}
    </div>
  );
};

const mapStateToProps = ({ company: { company } }) => ({ company });
const connector = connect(mapStateToProps);

export default connector(RightSideContent);
