import React from 'react';

export const Input = ({ name, size }) => {
  return (
    <div className={`input input-field col ${size}`}>
      <input name={name} type='text' className='validate' />
      <label htmlFor='last_name'>{name}</label>
    </div>
  );
};
