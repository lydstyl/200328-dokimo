import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Link, useHistory } from 'react-router-dom';

export const Batches = () => {
  const { lessors } = useStoreState(state => state.lessor);

  return (
    <div>
      <h1>Lots</h1>

      {lessors.length ? (
        <>
          <p>Ajouter un lot</p>

          <p>Liste des lots</p>
        </>
      ) : (
        <>
          <p>
            Vous devez d'abord ajouter un bailleurs pour pouvoir ajouter un lot
          </p>
          <p>
            <Link to='/bailleurs'>Bailleurs</Link>
          </p>
        </>
      )}
    </div>
  );
};
