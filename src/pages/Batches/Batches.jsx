import React from 'react';
import { useStoreState } from 'easy-peasy';
import { Link } from 'react-router-dom';

export const Batches = () => {
  const { lessors } = useStoreState((state) => state.lessor);
  const { tenants } = useStoreState((state) => state.tenant);
  const { batches } = useStoreState((state) => state.batch);

  return (
    <>
      <div className='row'>
        <h1 className='col s12'>Lots</h1>
      </div>

      {!lessors.length ? (
        <p className='row'>
          <h1 className='col s12'>Lots</h1>

          <Link className='col s12' to='/bailleurs'>
            Vous devez d'abord ajouter un bailleurs pour pouvoir ajouter un lot
          </Link>
        </p>
      ) : (
        <>
          <div className='row'>
            <Link className='col s12' to='/ajouter-lot'>
              Ajouter un lot
            </Link>
          </div>

          <ul className='row'>
            {batches.map((batch) => (
              <li key={batch.id} className='card-content white-text col s12 m6'>
                <div className='card blue-grey darken-1'>
                  <div className='card-content white-text'>
                    <span className='card-title'>
                      {batch.name}{' '}
                      {
                        tenants.filter((tenant) => tenant.id === batch.tid)[0]
                          .lastName
                      }
                    </span>

                    <p>body</p>

                    <ul className='card-action'>
                      <li>
                        <Link to={`/lot/${batch.id}`}>Détail</Link>
                      </li>
                      <li>
                        <Link to={`/lot/${batch.id}/avis-echeance`}>
                          Avis d'échéance
                        </Link>
                      </li>
                      <li>
                        <Link to={`/lot/${batch.id}/reception-paiement`}>
                          Réception paiement
                        </Link>
                      </li>
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
