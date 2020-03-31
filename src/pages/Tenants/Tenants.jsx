import React from 'react';
import { Input } from '../../components/Input/Input';

export const Tenants = () => {
  const handleAdd = () => {
    const tenant = {};
  };

  return (
    <div>
      <div>
        <h1 className='row'>Locataires</h1>

        <form className='row'>
          <Input name='civility' size='s12' />
          <Input name='firstName' size='s12' />
          <Input name='lastName' size='s12' />

          <Input name='uid' size='s6' />
          {/* <Input name='lid' size='s6' />
          <Input name='bid' size='s6' /> */}

          <button
            onClick={e => handleAdd(e)}
            className='waves-effect waves-light btn col s4'
          >
            +
          </button>
        </form>
      </div>
    </div>
  );
};
