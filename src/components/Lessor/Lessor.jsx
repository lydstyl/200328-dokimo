import React from 'react';
import { Link } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

import { LessorCard } from '../LessorCard/LessorCard';

export const Lessor = () => {
  const lessors = useStoreState(state => state.lessor.lessors);

  return (
    <div className='row'>
      <div className='col s12'>
        <h1>Bailleurs</h1>
        <Link to='/add-lessor'>Ajouter un bailleur</Link>

        <div className='row'>
          {lessors.map(lessor => (
            <LessorCard key={lessor.id} lessor={lessor} />
          ))}
        </div>
      </div>
    </div>
  );
};
