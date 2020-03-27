import React from 'react';

export const Input = ({ name }) => {
  return (
    <div className='input'>
      <label>{name}</label>

      <input name={name} type='text' />
    </div>
  );
};
