import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useParams, useHistory } from 'react-router-dom';

export const BatchDetail = () => {
  const { id } = useParams();

  const { batches } = useStoreState((state) => state.batch);
  const { firestoreDelBatch } = useStoreActions((actions) => actions.batch);

  const batch = batches.filter((batch) => batch.id === id)[0];

  const history = useHistory();

  const handleDelBatch = (e) => {
    e.preventDefault();

    firestoreDelBatch(id);

    history.push('/lots');
  };

  return (
    <div className='container'>
      <div className='row'>
        <h1 className='col s12'>{batch.name}</h1>
        <div className='col s12'>
          <a onClick={(e) => handleDelBatch(e)} href='!#'>
            <i className='material-icons'>delete</i> Supprimer ce lot
          </a>
          {/* <pre>{JSON.stringify(batch, null, 4)}</pre> */}
        </div>
      </div>
    </div>
  );
};
