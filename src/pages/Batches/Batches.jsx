import React from 'react';
import { useStoreState } from 'easy-peasy';
import { Link } from 'react-router-dom';

export const Batches = () => {
  const { lessors } = useStoreState(state => state.lessor);
  const { tenants } = useStoreState(state => state.tenant);
  const { batches } = useStoreState(state => state.batch);

  return (
    <>
      <h1 className='row'>Lots</h1>

      {!lessors.length ? (
        <p className='row'>
          <Link to='/bailleurs'>
            Vous devez d'abord ajouter un bailleurs pour pouvoir ajouter un lot
          </Link>
        </p>
      ) : (
        <>
          <div className='row'>
            <Link to='/ajouter-lot'>Ajouter un lot</Link>
          </div>

          <ul className='row'>
            {batches.map(batch => (
              <li
                key={batch.id}
                className='card-content white-text col s12 m6 l4'
              >
                <div className='card blue-grey darken-1'>
                  <div className='card-content white-text'>
                    <span className='card-title'>{batch.name} </span>

                    {
                      tenants.filter(tenant => tenant.id === batch.tid)[0]
                        .lastName
                    }

                    <ul className='card-action'>
                      <li>
                        <i className='material-icons'>delete</i> Avis d'échéance
                      </li>
                      <li>
                        <i className='material-icons'>delete</i> Quittance
                      </li>
                      <li>Reçu partiel de loyer</li>
                      <li>Révision de loyer</li>
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};
