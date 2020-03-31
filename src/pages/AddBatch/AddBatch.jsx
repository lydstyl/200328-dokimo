import React from 'react';

import { Input } from '../../components/Input/Input';

export const AddBatch = () => {
  const handleAddBatch = e => {};

  /*
  name
  uid
  lid
  
  address1
  address2
  postalCode
  town

  balance (0 by default)
  
  rent
  charge
  
  (tenants array)
  tenantCivility
  tenantFirstName
  tenantLastName
  */

  return (
    <div>
      <h1 className='row'>AddBatch</h1>

      <form className='row'>
        <Input name='name' size='s12' />
        <Input name='uid' size='s6' />
        <Input name='lid' size='s6' />

        <Input name='address1' size='s12' />
        <Input name='address2' size='s12' />
        <Input name='postalCode' size='s6' />
        <Input name='townName' size='s6' />

        <Input name='balance' size='s12' />
        <Input name='rent' size='s6' />
        <Input name='charge' size='s6' />

        <button
          onClick={e => handleAddBatch(e)}
          className='waves-effect waves-light btn col s4'
        >
          +
        </button>
      </form>
    </div>
  );
};
