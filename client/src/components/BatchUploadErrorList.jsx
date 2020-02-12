import React from 'react';

const BatchUploadErrorList = ({ errors }) => {
  return (
    <div>
      {errors.map((e, index) => (
        <div key={index}>
          <h3>Error: {e.error}</h3>
          <h3>Row Number: {e.rowNumber}</h3>
          <h3>Column: {e.prop}</h3>
          <h3>Entered Value: {e.recievedValue}</h3>
        </div>
      ))}
    </div>
  );
};

export default BatchUploadErrorList;
