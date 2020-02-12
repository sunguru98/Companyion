import React from 'react';

const SelectField = ({
  name,
  required,
  value,
  optionValues,
  onChange,
  className
}) => {
  return (
    <select
      className={className}
      value={value}
      name={name}
      required={required}
      onChange={onChange}>
      {optionValues.map(({ value, isDisabled, text }, index) => (
        <option key={index} value={value} disabled={isDisabled}>
          {text}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
