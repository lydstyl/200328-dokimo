import React, { useState } from 'react';
import { useStoreActions } from 'easy-peasy';

import { Input } from '../Input/Input';

export const AddLessor = () => {
  const [type, setType] = useState(null);

  const { addLessor } = useStoreActions(actions => actions.lessor);

  const handleChangeType = e => {
    setType(e.target.value);
  };

  const handleAddLessor = e => {
    e.preventDefault();

    const inputs = document.querySelectorAll('.input input');

    const lessor = {};

    inputs.forEach(node => {
      lessor[node.name] = node.value;
    });

    console.log(JSON.stringify(lessor, null, 4));

    addLessor(lessor);
  };

  return (
    <form>
      <h1>Ajouter un bailleur</h1>

      <div className='row'>
        <div className='input-field col s12'>
          <select onChange={handleChangeType}>
            <option defaultValue=''>--Merci de choisir une option--</option>
            <option value='person'>Personne physique</option>
            <option value='company'>Société</option>
          </select>

          <label>Type</label>
        </div>
      </div>

      {type === 'company' ? (
        <div className='row'>
          <div className='input-field col s12'>
            <div className='row'>
              <Input name='companyName' size='s12' />
            </div>
            <div className='row'>
              <Input name='managerFirstName' size='s6' />
              <Input name='managerLastName' size='s6' />
            </div>
          </div>
        </div>
      ) : (
        <>
          <Input name='managerFirstName' />
          <Input name='managerLastName' />
        </>
      )}

      <Input name='address1' />
      <Input name='address2' />
      <div className='row'>
        <Input name='postalCode' size='s6' />
        <Input name='townName' size='s6' />
      </div>

      <button onClick={e => handleAddLessor(e)}>+</button>
    </form>
  );
};
