import React, { useState } from 'react';

import { Input } from '../Input/Input';

export const AddLessor = () => {
  const [type, setType] = useState(null);

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
  };

  return (
    <form>
      <h1>Ajouter un bailleur</h1>

      <select onChange={handleChangeType}>
        <option value=''>--Merci de choisir une option--</option>
        <option value='person'>Personne physique</option>
        <option value='company'>Société</option>
      </select>

      {type === 'company' ? (
        <>
          <Input name='companyName' />
          <Input name='managerFirstName' />
          <Input name='managerLastName' />
        </>
      ) : (
        <>
          <Input name='managerFirstName' />
          <Input name='managerLastName' />
        </>
      )}

      <Input name='address1' />
      <Input name='address2' />
      <Input name='postalCode' />
      <Input name='townName' />

      <button onClick={e => handleAddLessor(e)}>+</button>
    </form>
  );
};
