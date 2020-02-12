import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../styles/components/RouteListItem.scss';
import { ReactComponent as EditIcon } from '../edit.svg';
import { ReactComponent as DeleteIcon } from '../trash.svg';

const RouteListItem = ({
  routeObj: { name, status, _id },
  history,
  getSingleRoute,
  deleteRoute
}) => {
  const handleClick = () => {
    getSingleRoute(_id);
  };

  const handleDelete = e => {
    e.stopPropagation();
    if (window.confirm('Confirm delete route?')) deleteRoute(_id);
  };

  const handleUpdate = e => {
    e.stopPropagation();
    history.push(`/route/edit/${_id}`);
  };

  return (
    <div className='RouteListItem' onClick={handleClick}>
      <div className='RouteListItem__info'>
        <h3>Name: {name}</h3>
        <h4>Status: {status}</h4>
      </div>
      <div className='RouteListItem__buttons'>
        <span className='RouteListItem__update' onClick={handleUpdate}>
          <EditIcon />
        </span>
        <span className='RouteListItem__delete' onClick={handleDelete}>
          <DeleteIcon />
        </span>
      </div>
    </div>
  );
};

// const mapDispatchToProps = { getSingleRoute, deleteRoute };
const connector = connect(null, {});

export default withRouter(connector(RouteListItem));
