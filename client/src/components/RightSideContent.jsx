import React from 'react';
import { connect } from 'react-redux';
import MapComponent from './MapComponent';
import RouteDetail from './RouteDetail';

const RightSideContent = ({ route }) => {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
      <MapComponent route={route} />
      {route && <RouteDetail route={route} />}
    </div>
  );
};

const mapStateToProps = ({ route: { route } }) => ({ route });
const connector = connect(mapStateToProps);

export default connector(RightSideContent);
