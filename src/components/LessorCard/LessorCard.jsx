import React from 'react';
import { useStoreActions } from 'easy-peasy';

export const LessorCard = ({ lessor }) => {
  const { firestoreDelLessor } = useStoreActions(actions => actions.lessor);

  const {
    id,
    companyName,
    managerFirstName,
    managerLastName,
    address1,
    address2,
    postalCode,
    townName
  } = lessor;

  const handleDelete = e => {
    e.preventDefault();

    firestoreDelLessor(id);
  };

  return (
    <div className='col s12 m6 l4'>
      <div className='card blue-grey darken-1'>
        <div className='card-content white-text'>
          <span className='card-title'>
            {companyName ? (
              <>
                <i className='material-icons'>business</i>
                <span> </span>
                <span>{companyName}</span>
              </>
            ) : (
              <>
                <i className='material-icons'>face</i>
                <span> </span>
                <span>{managerFirstName}</span>
                <span> </span>
                <span>{managerLastName}</span>
              </>
            )}
          </span>

          <div>
            <div>{address1}</div>
            <div>{address2 && address2}</div>
            <div>
              {postalCode} {townName}
            </div>
          </div>
        </div>

        <div className='card-action'>
          <a onClick={handleDelete} href='!#'>
            <i className='material-icons'>delete</i>
          </a>
        </div>
      </div>
    </div>
  );
};
