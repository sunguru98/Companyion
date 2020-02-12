import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Spinner from '../components/Spinner';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import Helmet from 'react-helmet';

const RouteUpdatePage = ({ match }) => {
  return (
    <section className='page'>
      <Helmet>
        <title>R-Care Update Route</title>
        <meta name='description' content='Update Route page of R-Care' />
      </Helmet>
      {routeLoading ? (
        <Spinner />
      ) : (
        <form className='Form' onSubmit={handleSubmit}>
          <h1>{!routeLoading ? `Update route ${routeName}` : 'Please wait'}</h1>
          {routeLoading ? (
            <Spinner />
          ) : (
            <Fragment>
              <InputField
                required
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
                required
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
                required
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
                required
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
            value='Update Route'
          />
        </form>
      )}
    </section>
  );
};

const mapStateToProps = ({ route: { routeLoading, route } }) => ({
  routeLoading,
  route
});

const connector = connect(mapStateToProps, {});

export default connector(RouteUpdatePage);
