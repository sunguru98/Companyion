import React from 'react';
import CompaniesListItem from './CompaniesListItem';

const RouteList = ({ companies }) => {
  return (
    <div style={{ marginTop: '2rem', overflow: 'scroll', maxHeight: '62vh' }}>
      {companies.map(company => (
        <CompaniesListItem key={company._id} company={company.company} />
      ))}
    </div>
  );
};

export default RouteList;
