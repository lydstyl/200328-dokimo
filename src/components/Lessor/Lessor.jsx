import React from 'react';
import { Link } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

export const Lessor = () => {
  const lessors = useStoreState(state => state.lessors);

  return (
    <div>
      <h1>Bailleurs</h1>
      <Link to='/add-lessor'>Ajouter un bailleur</Link>

      <pre>{JSON.stringify(lessors, null, 4)}</pre>
    </div>
  );
};
