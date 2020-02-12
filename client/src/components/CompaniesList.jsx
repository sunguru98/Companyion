import React from 'react';
import CompaniesListItem from './CompaniesListItem';

const RouteList = ({ routes }) => {
  return (
    <div style={{ marginTop: '2rem', overflow: 'scroll', maxHeight: '62vh' }}>
      {routes.map(route => (
        <CompaniesListItem key={route._id} routeObj={route} />
      ))}
    </div>
  );
};

export default RouteList;
