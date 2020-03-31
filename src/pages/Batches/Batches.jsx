import React from 'react';
import { useStoreState } from 'easy-peasy';
import { Link } from 'react-router-dom';

export const Batches = () => {
  const { lessors } = useStoreState(state => state.lessor);

  return (
    <div>
      <h1>Lots</h1>

      {!lessors.length ? (
        <p>
          <Link to='/bailleurs'>
            Vous devez d'abord ajouter un bailleurs pour pouvoir ajouter un lot
          </Link>
        </p>
      ) : (
        <>
          <Link to='/ajouter-lot'>Ajouter un lot</Link>
          <ul>
            <li>Avis d'échéance</li>
            <li>Quittance</li>
            <li>Reçu partiel de loyer</li>
            <li>Révision de loyer</li>
          </ul>
          <p>Liste des lots</p>
        </>
      )}
    </div>
  );
};
