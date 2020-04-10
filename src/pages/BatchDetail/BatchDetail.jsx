import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useParams, useHistory } from 'react-router-dom';

export const BatchDetail = () => {
  const { id } = useParams();

  const { batches } = useStoreState((state) => state.batch);
  const { firestoreDelBatch } = useStoreActions((actions) => actions.batch);

  const batch = batches.filter((batch) => batch.id === id)[0];

  const history = useHistory();

  const handleDelBatch = () => {
    firestoreDelBatch(id);

    history.push('/lots');
  };

  return (
    <div className='container'>
      <pre>{JSON.stringify(batch, null, 4)}</pre>

      <button onClick={handleDelBatch}>
        <i className='material-icons'>delete</i>
      </button>
    </div>
  );
};
