import React from 'react';
import { Link } from 'react-router-dom';
import CompaniesList from './CompaniesList';
import '../styles/components/LeftSideContent.scss';

const LeftSideContent = ({ routes }) => {
  return (
    <div className='LeftSideContent'>
      <div className='LeftSideContent__buttons'>
        <Link to='/route/create'>
          <button className='Button'>Create new route</button>
        </Link>
        <Link to='/route/create/multi'>
          <button className='Button yellow'>Upload CSV File</button>
        </Link>
      </div>
      <CompaniesList routes={routes} />
    </div>
  );
};

export default LeftSideContent;
