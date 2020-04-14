import React from 'react';
import { useParams } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

export const PaymentDocument = () => {
  const { bid, id } = useParams();
  const { batches } = useStoreState((state) => state.batch);
  const batch = batches.filter((batch) => batch.id === bid)[0];
  const {
    lid,
    tid,
    address1: batchAddress1,
    address2: batchAddress2,
    postalCode: batchPostalCode,
  } = batch;

  const payment = batch.payments.filter((payment) => payment.id === id)[0];
  const {
    document: { type, term, amount },
    date,
  } = payment;

  const { lessors } = useStoreState((state) => state.lessor);
  const lessor = lessors.filter((lessor) => lessor.id === lid)[0];
  const { companyName, managerFirstName, managerLastName } = lessor;

  const { tenants } = useStoreState((state) => state.tenant);
  const tenant = tenants.filter((tenant) => tenant.id === tid)[0];
  const { civility, firstName, lastName } = tenant;

  return (
    <>
      <div className='row'>
        <h1 className='col'>{type}</h1>
        <p className='col s12'>Période: {term}</p>
        <p className='col'>
          Adresse du bien immobilier loué: {batchAddress1} {batchAddress2}{' '}
          {batchPostalCode} {batch.townName}
        </p>
      </div>

      <div className='row table'>
        <div className='col'>
          <p>Propriétaire</p>
          <p>
            {companyName
              ? companyName
              : managerLastName + ' ' + managerFirstName}
          </p>

          <p>Locataire</p>
          <p>
            {civility} {firstName} {lastName}
          </p>

          <p>Total des loyer et charges reçus</p>
          <p>{amount} €</p>
        </div>
      </div>

      <div className='row payment'>
        <div className='col'>
          {type === 'Quittance de loyer' ? (
            <>
              <p>
                Je soussigné {managerFirstName} {managerLastName} gérant de{' '}
                {companyName} propriétaire du logement désigné ci-dessus,
                déclare avoir reçu de la part du locataire l’ensemble des sommes
                mentionnées à titre du loyer et des charges.
              </p>
              <p>
                Cette quittance annule tous les reçus qui auraient pu être
                donnés pour acomptes versés au titre du loyer et des charges
                pour l’échéance correspondante. Le paiement de la présente
                quittance ne présume pas du paiement des termes précédents. A
                conserver 3 ans après échéance du bail.
              </p>
            </>
          ) : (
            <>
              <p>
                Je soussigné {managerFirstName} {managerLastName} gérant de{' '}
                {companyName} propriétaire du logement désigné ci-dessus,
                déclare avoir reçu de la part du locataire l’ensemble des sommes
                mentionnées à titre de paiement partiel du loyer et des charges.
              </p>
              <p>Ce reçu ne peut en aucun cas servir de quittance de loyer.</p>
            </>
          )}

          <p>
            Fait à {lessor.townName} le {date}
          </p>

          <p>Le bailleur</p>
        </div>
      </div>
    </>
  );
};
