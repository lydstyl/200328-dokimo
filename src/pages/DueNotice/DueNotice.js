import React, { useState } from 'react';
import { useStoreState } from 'easy-peasy';

import { useParams } from 'react-router-dom';

export const DueNotice = () => {
  const { id } = useParams();

  const { lessors } = useStoreState((state) => state.lessor);
  const { tenants } = useStoreState((state) => state.tenant);
  const {
    batches,
    utils: {
      getRentTotalFromTo,
      getTotalPayments,
      termOptionsMaker,
      dateMinus1month,
    },
  } = useStoreState((state) => state.batch);

  const batch = batches.filter((batch) => batch.id === id)[0];
  const { lid, tid, charge, beginDate, rent } = batch;

  const payments = batch.payments ? batch.payments : [];

  const lessor = lessors.filter((lessor) => lessor.id === lid)[0];
  const tenant = tenants.filter((tenant) => tenant.id === tid)[0];

  const {
    companyName,
    managerFirstName,
    managerLastName,
    address1,
    address2,
    postalCode,
    townName,
  } = lessor;

  const { civility, firstName, lastName } = tenant;

  const docPlace = 'Raismes';

  const terms = termOptionsMaker(beginDate);

  const [dates, setDates] = useState({
    docDate: dateMinus1month(terms[0].docDate),
    termFrom: terms[0].termFrom,
    termTo: terms[0].termTo,
  });
  const [showDoc, setShowDoc] = useState(false);

  function getAnteriorBalance(docDate, termTo) {
    let anteriorPayments = getTotalPayments(payments, '01/01/2000', docDate);

    console.log(
      'fix ici anteriorPayments 0 initial au lieu de 250, anteriorPayments',
      payments,
      '01/01/2000',
      docDate
      // 'func',
    );

    termTo = dateMinus1month(termTo); // minus 1 month the month of the document

    const anteriorRents = getRentTotalFromTo(
      rent + charge,
      0,
      beginDate,
      termTo
    );

    const anteriorBalance = anteriorRents - anteriorPayments;

    console.log(`${anteriorBalance} = ${anteriorRents} - ${anteriorPayments}`);

    return anteriorBalance;
  }

  const [anteriorBalance, setAnteriorBalance] = useState(
    getAnteriorBalance(dates.docDate, dates.termTo)
  ); // component state balance

  const handleTermChange = (e) => {
    const value = JSON.parse(e.target.value);

    setDates({ ...value, docDate: dateMinus1month(value.docDate) });

    setAnteriorBalance(getAnteriorBalance(value.docDate, value.termTo));

    setShowDoc(true);
  };

  return (
    <div className='container'>
      <form className='row no-print'>
        <div className='col s6'>
          <div className='input-fiel'>
            <div>
              <label>Terme</label>

              <select
                onChange={handleTermChange}
                name='term'
                style={{ display: 'block' }}
              >
                <option value={null}>Choisissez le terme</option>
                {terms.map((term) => (
                  <option key={term.termFrom} value={JSON.stringify(term)}>
                    {`${term.termFrom} ${term.termTo}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </form>

      {showDoc && (
        <div className=' due-notice'>
          <div className='row sender'>
            <p>
              {companyName
                ? companyName
                : managerFirstName + ' ' + managerLastName}
            </p>
            <p>{address1}</p>
            {address2 && <p>{address2}</p>}
            <p>
              {postalCode} {townName}
            </p>
          </div>

          <div className='row recipient'>
            <p>
              {civility} {firstName} {lastName}
            </p>
            <p>{batch.address1}</p>
            <p>{batch.address2}</p>
            <p>
              {batch.postalCode} {batch.townName}
            </p>
          </div>

          <div className='row where-when'>
            à <span>{docPlace}</span>, le <span>{dates && dates.docDate}</span>
          </div>

          <h1 className='row'>Avis d'échéance</h1>

          <div className='row amount-to-pay'>
            <p>
              Somme à payer sur le terme du {dates && dates.termFrom} au{' '}
              {dates && dates.termTo}.
            </p>

            <ul>
              <li>Solde antérieur: {anteriorBalance}</li>
              <li>Loyer nu : {rent}</li>
              <li>Charges: {charge}</li>
              <li>Total à payer : {anteriorBalance + rent + charge} €</li>
            </ul>
          </div>

          <div className='row footer'>
            <p>Cet avis ne peut en aucun cas faire office de quittance.</p>
            <p>
              Le gérant de {companyName}, {managerFirstName} {managerLastName}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
