import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useHistory } from 'react-router-dom';

import { Input } from '../../components/Input/Input';

import M from 'materialize-css/dist/js/materialize.min.js';

export const AddBatch = () => {
  const { user } = useStoreState(state => state.user);
  const { lessors } = useStoreState(state => state.lessor);
  const { tenants } = useStoreState(state => state.tenant);

  const { firestoreAddBatch } = useStoreActions(actions => actions.batch);

  const history = useHistory();

  const LessorSelect = () => {
    return (
      <div className='input-fiel'>
        <div>
          <label>Bailleur</label>

          <select name='lid' style={{ display: 'block' }}>
            {lessors.map(lessor => (
              <option key={lessor.id} value={lessor.id}>
                {lessor.companyName ||
                  `${lessor.managerFirstName} ${lessor.managerLastName}`}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  const TenantSelect = () => {
    return (
      <div className='input-fiel'>
        <div>
          <label>Locataire</label>

          <select name='tid' style={{ display: 'block' }}>
            {tenants.map(tenant => (
              <option key={tenant.id} value={tenant.id}>
                {`${tenant.civility} ${tenant.lastName}`}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  const handleAddBatch = e => {
    e.preventDefault();

    const inputs = document.querySelectorAll('form [name]');
    const batch = { uid: user.uid, balance: 0 };
    inputs.forEach(input => {
      batch[input.name] = input.value;
    });

    firestoreAddBatch(batch);

    history.push('/lots');
  };

  useEffect(() => {
    var elems = document.querySelectorAll('.datepicker');
    const options = {
      format: 'dd/mm/yyyy',
      defaultDate: new Date(),
      setDefaultDate: true,
      firstDay: 1,
      yearRange: 2
    };
    // var instances = M.Datepicker.init(elems, options);
    M.Datepicker.init(elems, options);
  }, []);

  return (
    <div>
      <h1 className='row'>Ajouter un lot / une location</h1>

      <form className='row'>
        <LessorSelect />

        <TenantSelect />

        <Input name='name' size='s12' />
        <Input name='address1' size='s12' />
        <Input name='address2' size='s12' />
        <Input name='postalCode' size='s6' />
        <Input name='townName' size='s6' />

        <Input name='rent' size='s6' />
        <Input name='charge' size='s6' />

        <div className='input input-field col s12'>
          <input type='text' name='beginDate' className='datepicker' />
          <label htmlFor='beginDate'>Date de début</label>
        </div>

        <div className='input input-field col s12'>
          <input type='text' name='paymentDeadline' className='datepicker' />
          <label htmlFor='paymentDeadline'>Date limite de paiement</label>
        </div>

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
