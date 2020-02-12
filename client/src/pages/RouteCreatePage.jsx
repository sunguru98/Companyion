import React, { useState, Fragment } from 'react';

import { connect } from 'react-redux';

import Spinner from '../components/Spinner';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import Helmet from 'react-helmet';

const RouteCreatePage = ({ createRoute, routeLoading }) => {
  const [formState, setFormState] = useState({
    name: '',
    stops: [],
    routeType: '',
    direction: '',
    status: '',
    stopName: ''
  });

  const { name, stops, routeType, direction, status } = formState;

  const handleSubmit = e => {
    e.preventDefault();
    createRoute({ name, routeType, direction, stops, status });
  };

  const handleChange = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section className='page'>
      <Helmet>
        <title>R-Care Create Route</title>
        <meta name='description' content='Create page of R-Care' />
      </Helmet>
      <form className='Form' onSubmit={handleSubmit}>
        <h1>{!routeLoading ? 'Create a new route' : 'Please wait'}</h1>
        {routeLoading ? (
          <Spinner />
        ) : (
          <Fragment>
            <InputField
              name='name'
              type='text'
              placeholder='Route name'
              value={name}
              onChange={handleChange}
              isTextArea={false}
            />
            <SelectField
              className='SelectField'
              name='routeType'
              value={routeType}
              onChange={handleChange}
              optionValues={[
                {
                  value: '',
                  text: 'Please select a route type',
                  isDisabled: true
                },
                { value: 'ac', text: 'AC' },
                { value: 'general', text: 'General' }
              ]}
            />
            <SelectField
              className='SelectField'
              name='direction'
              value={direction}
              onChange={handleChange}
              optionValues={[
                {
                  value: '',
                  text: 'Please select a route direction',
                  isDisabled: true
                },
                { value: 'up', text: 'Up' },
                { value: 'down', text: 'Down' }
              ]}
            />
            <SelectField
              className='SelectField'
              name='status'
              value={status}
              onChange={handleChange}
              optionValues={[
                {
                  value: '',
                  text: 'Please select a route status',
                  isDisabled: true
                },
                { value: 'active', text: 'Active' },
                { value: 'inactive', text: 'Inactive' }
              ]}
            />
          </Fragment>
        )}
        <input
          className={`Button ${routeLoading ? 'disabled' : ''}`}
          disabled={routeLoading}
          type='submit'
          value='Create Route'
        />
      </form>
    </section>
  );
};

const mapStateToProps = ({ route: { routeLoading, errors } }) => ({
  routeLoading,
  errors
});

// const mapDispatchToProps = { createRoute: createRoute };
const connector = connect(mapStateToProps, {});

export default connector(RouteCreatePage);
