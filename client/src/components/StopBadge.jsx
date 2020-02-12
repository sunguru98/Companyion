import React from 'react';
import { ReactComponent as DeleteIcon } from '../deleteIcon.svg';
import '../styles/components/StopBadge.scss';

const StopBadge = ({ stopName, onClick }) => {
  return (
    <li className='StopBadge'>
      <span onClick={onClick}>
        <DeleteIcon className='StopBadge__delete' />
      </span>
      {stopName}
    </li>
  );
};

export default StopBadge;
