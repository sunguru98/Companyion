import React from 'react';
import { connect } from 'react-redux';
import { quitCompany } from '../redux/actions/companyActions';
import { withRouter } from 'react-router-dom';

import '../styles/components/CompaniesListItem.scss';
import { ReactComponent as EditIcon } from '../edit.svg';
import { ReactComponent as DeleteIcon } from '../trash.svg';

const CompaniesListItem = ({
  company: {
    company: { name, _id },
    joinedAt,
    leftAt
  },
  history,
  quitCompany
}) => {
  const handleClick = () => {
    history.push(`/company/${_id}`);
  };

  const handleDelete = e => {
    e.stopPropagation();
    if (window.confirm('Confirm quit company?')) quitCompany(_id);
  };

  const handleUpdate = e => {
    e.stopPropagation();
    history.push(`/route/edit/${_id}`);
  };

  return (
    <div className='CompaniesListItem' onClick={handleClick}>
      <div className='CompaniesListItem__info'>
        <h3>Name: {name}</h3>
        <h4>Joined At: {joinedAt}</h4>
        {leftAt && <h4>Joined At: {joinedAt}</h4>}
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

export default withRouter(connect(null, { quitCompany })(CompaniesListItem));
