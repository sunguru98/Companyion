import React from 'react';
import { Link } from 'react-router-dom';
import CompaniesList from './CompaniesList';
import '../styles/components/LeftSideContent.scss';

const LeftSideContent = ({ companies }) => {
  console.log(companies);
  return (
    <div className='LeftSideContent'>
      <div className='LeftSideContent__buttons'>
        <Link to='/company/create'>
          <button className='Button'>Create new route</button>
        </Link>
        <Link to='/company/join'>
          <button className='Button yellow'>Upload CSV File</button>
        </Link>
      </div>
      <CompaniesList companies={companies} />
    </div>
  );
};

export default LeftSideContent;
