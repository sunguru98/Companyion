import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const InputField = ({
  type,
  name,
  disabled,
  placeholder,
  value,
  isTextArea,
  children,
  required,
  onChange,
  errors
}) => {
  const isError = errors && errors.find(e => e.param === name);
  return (
    <div className='InputField'>
      {isTextArea === true ? (
        <Fragment>
          <textarea
            disabled={disabled}
            className={`InputField__textarea ${isError ? 'error' : ''} ${
              disabled ? 'disabled' : ''
            }`}
            onChange={onChange}
            name={name}
            required={required ?? false}
            placeholder={placeholder}>
            {children}
          </textarea>
          {isError ? (
            <small className='InputField__error'>{isError.msg}</small>
          ) : null}
        </Fragment>
      ) : (
        <Fragment>
          <input
            disabled={disabled}
            className={`InputField__input ${isError ? 'error' : ''} ${
              disabled ? 'disabled' : ''
            }`}
            onChange={onChange}
            name={name}
            required={required ?? false}
            type={type}
            value={value}
            placeholder={placeholder}
          />
          {isError ? (
            <small className='InputField__error'>{isError.msg}</small>
          ) : null}
        </Fragment>
      )}
    </div>
  );
};

const connector = connect(state => ({
  errors: state.user.errors
}));

export default connector(InputField);
