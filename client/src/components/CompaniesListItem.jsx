import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../styles/components/CompaniesListItem.scss';
import { ReactComponent as EditIcon } from '../edit.svg';
import { ReactComponent as DeleteIcon } from '../trash.svg';

const CompaniesListItem = ({
  company: { name, _id },
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
    <div className='CompaniesListItem' onClick={handleClick}>
      <div className='CompaniesListItem__info'>
        <h3>Name: {name}</h3>
        <h4>Status: {status}</h4>
      </div>
      <div className='CompaniesListItem__buttons'>
        <span className='CompaniesListItem__update' onClick={handleUpdate}>
          <EditIcon />
        </span>
        <span className='CompaniesListItem__delete' onClick={handleDelete}>
          <DeleteIcon />
        </span>
      </div>
    </div>
  );
};

// const mapDispatchToProps = { getSingleRoute, deleteRoute };
const connector = connect(null, {});

export default withRouter(connector(CompaniesListItem));
