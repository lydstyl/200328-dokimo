import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import { Input } from '../../components/Input/Input';

export const Tenants = () => {
  const {
    user: { uid }
  } = useStoreState(state => state.user);

  const { tenants } = useStoreState(state => state.tenant);

  const { firestoreAddTenant, firestoreGetTenants } = useStoreActions(
    actions => actions.tenant
  );

  const handleAdd = e => {
    e.preventDefault();

    const tenant = {
      // id: null,
      uid
    };

    const inputs = document.querySelectorAll('input[name]');
    inputs.forEach(input => {
      tenant[input.name] = input.value;
    });

    firestoreAddTenant(tenant);
  };

  useEffect(() => {
    firestoreGetTenants(uid);
  }, [firestoreGetTenants, uid]);

  return (
    <div>
      <h1 className='row'>Locataires</h1>

      <form className='row'>
        <Input name='civility' size='s12' />
        <Input name='firstName' size='s12' />
        <Input name='lastName' size='s12' />

        <button
          onClick={e => handleAdd(e)}
          className='waves-effect waves-light btn col s4'
        >
          +
        </button>
      </form>

      <pre>{JSON.stringify(tenants, null, 4)}</pre>
    </div>
  );
};
