import React from 'react';
import { Link } from 'react-router-dom';

const Onboarding = ({ companies }) => {
  return (
    <div className='Form'>
      <h1 style={{ textAlign: 'center' }}>
        Get started with your first route.
      </h1>
      <div style={{ width: '90%', display: 'flex', justifyContent: 'center' }}>
        <Link to='/company/new'>
          <button
            style={{ width: '100%', cursor: 'pointer' }}
            className='Button big'>
            Create Route
          </button>
        </Link>

        <Link style={{ marginLeft: '2rem' }} to='/company/join'>
          <button
            style={{ width: '100%', cursor: 'pointer' }}
            className='Button big yellow'>
            Join company
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Onboarding;
