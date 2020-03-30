import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';

import { Preloader } from '../Preloader/Preloader';
import { LessorCard } from '../LessorCard/LessorCard';

export const Lessor = () => {
  const {
    user: { uid }
  } = useStoreState(state => state.user);

  const { lessors, loading } = useStoreState(state => state.lessor);

  const { firestoreGetLessors } = useStoreActions(actions => actions.lessor);

  useEffect(() => {
    firestoreGetLessors(uid);
  }, [uid, firestoreGetLessors]);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
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
      )}
    </>
  );
};
