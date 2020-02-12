import React from 'react';
import { Route } from '../types/redux/reducers/routeReducer.type';
import RouteListItem from './RouteListItem';

const RouteList = ({ routes }) => {
  return (
    <div style={{ marginTop: '2rem', overflow: 'scroll', maxHeight: '62vh' }}>
      {routes.map(route => (
        <RouteListItem key={route._id} routeObj={route} />
      ))}
    </div>
  );
};

export default RouteList;
