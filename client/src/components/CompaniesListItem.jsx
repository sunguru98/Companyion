import React from 'react';
import { connect } from 'react-redux';
import { quitCompany } from '../redux/actions/companyActions';
import { withRouter } from 'react-router-dom';

import '../styles/components/CompaniesListItem.scss';
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

  return (
    <div className='CompaniesListItem' onClick={handleClick}>
      <div className='CompaniesListItem__info'>
        <h3>Name: {name}</h3>
        <h4>Joined At: {new Date(joinedAt).toLocaleDateString()}</h4>
        {leftAt && (
          <h4>Joined At: {new Date(joinedAt).toLocaleDateString()}</h4>
        )}
      </div>
      <div className='CompaniesListItem__buttons'>
        {!leftAt ? (
          <span className='CompaniesListItem__delete' onClick={handleDelete}>
            <DeleteIcon />
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default withRouter(connect(null, { quitCompany })(CompaniesListItem));
