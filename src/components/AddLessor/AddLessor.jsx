import React, { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';

import { Preloader } from '../Preloader/Preloader';
import { Input } from '../Input/Input';

export const AddLessor = () => {
  const [type, setType] = useState(null);

  const {
    user: { uid },
  } = useStoreState((state) => state.user);

  const { loading } = useStoreState((state) => state.lessor);

  const { firestoreAddLessor } = useStoreActions((actions) => actions.lessor);

  const history = useHistory();

  const handleChangeType = (e) => {
    const { value } = e.target;

    setType(value);
  };

  const handleAddLessor = (e) => {
    e.preventDefault();

    const inputs = document.querySelectorAll('.input input');

    const lessor = {};

    let isSubmitable = true;

    inputs.forEach((node) => {
      lessor[node.name] = node.value;

      if (
        node.name !== 'address2' &&
        node.name !== 'managerFirstName' &&
        !node.value
      ) {
        isSubmitable = false;
      }
    });

    if (isSubmitable) {
      lessor['uid'] = uid;

      firestoreAddLessor(lessor);

      history.push('/bailleurs');
    } else {
      console.log(lessor);

      M.toast({
        html: `Vous ne pouvez pas ajouter ce bailleur car il manque des informations indispensables dans le formulaire`,
      });
    }
  };

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <form className='row'>
          <h1 className='col s12'>Ajouter un bailleur</h1>

          <div className='col s12'>
            <div className='input-fiel'>
              <div>
                <select
                  onChange={handleChangeType}
                  style={{ display: 'block' }}
                >
                  <option value=''>--Merci de choisir une option--</option>
                  <option value='person'>Personne physique</option>
                  <option value='company'>Société</option>
                </select>

                <label>Type</label>
              </div>
            </div>
          </div>

          {type === 'company' ? (
            <div className='input-field col s12'>
              <div className='row'>
                <Input name='companyName' size='s12' />
              </div>
              <div className='row'>
                <Input name='managerFirstName' size='s6' />
                <Input name='managerLastName' size='s6' />
              </div>
            </div>
          ) : (
            <div className='col s12'>
              <div className='row'>
                <Input name='managerFirstName' size='s6' />
                <Input name='managerLastName' size='s6' />
              </div>
            </div>
          )}

          <Input name='address1' size='s12' />
          <Input name='address2' size='s12' />

          <div className='col s12'>
            <div className='row'>
              <Input name='postalCode' size='s4' />
              <Input name='townName' size='s4' />

              <button
                onClick={(e) => handleAddLessor(e)}
                className='waves-effect waves-light btn col s4'
              >
                Ajouter ce bailleur
                <i className='material-icons left'>person_add</i>
              </button>
            </div>
          </div>
        </form>
      )}{' '}
    </>
  );
};
