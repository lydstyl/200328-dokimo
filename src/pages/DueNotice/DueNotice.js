import React, { useState } from 'react';
import { useStoreState } from 'easy-peasy';

import { useParams } from 'react-router-dom';

export const DueNotice = () => {
  const { id } = useParams();

  const { lessors } = useStoreState((state) => state.lessor);
  const { tenants } = useStoreState((state) => state.tenant);
  const {
    // terms,
    batches,
    utils: {
      getNewBalance,
      getTotalPayments,
      getRentTotalFromTo,
      termOptionsMaker,
    },
  } = useStoreState((state) => state.batch);

  const batch = batches.filter((batch) => batch.id === id)[0];
  const {
    lid,
    tid,
    charge,
    // balance, // must be editable
    beginDate,
    rent,
    // beginDate, paymentDeadline
  } = batch;

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

  function dateMinus1month(date) {
    date = date.split('/');
    date[1] = parseInt(date[1], 10) - 1;
    date[1] = date[1] < 10 ? '0' + date[1] : date[1];

    return date.join('/');
  }

  const [dates, setDates] = useState({
    // docDate: terms[0].docDate,
    docDate: dateMinus1month(terms[0].docDate),
    termFrom: terms[0].termFrom,
    termTo: terms[0].termTo,
  });

  const newBalance = getNewBalance({
    payments: batch.payments,
    rent: rent + charge,
    beginDate,

    termTo: dates.docDate, // doc date exemple 10/02/2020

    // termTo: dates.termTo.replace('-', '/').replace('-', '/'), // termTo 31-05-2020
  });

  const dueNoticeBalance = newBalance - rent - charge;
  const [csBalance, setCsBalance] = useState(dueNoticeBalance); // component state balance

  const onCsBalanceChange = (e) => {
    setCsBalance(parseFloat(e.target.value));
  };

  const handleTermChange = (e) => {
    const value = JSON.parse(e.target.value);

    setDates({ ...value, docDate: dateMinus1month(value.docDate) });

    let anteriorPayments = getTotalPayments(
      payments,
      '01/01/2000',
      value.docDate
    );

    let termTo = value.termTo;

    termTo = dateMinus1month(termTo); // minus 1 month the month of the document

    const anteriorRents = getRentTotalFromTo(
      rent + charge,
      0,
      beginDate,
      termTo
    );

    const anteriorBalance = anteriorPayments - anteriorRents;

    setCsBalance(anteriorBalance);
  };

  return (
    <div className='container'>
      <form className='row no-print'>
        <div className='input-field col s6'>
          <input
            onChange={onCsBalanceChange}
            name='balance'
            id='balance'
            type='number'
            className='validate'
            value={csBalance}
          />
          <label htmlFor='balance'>Solde antérieur</label>
        </div>

        <div className='col s6'>
          <div className='input-fiel'>
            <div>
              <label>Bailleur</label>

              <select
                onChange={handleTermChange}
                name='term'
                style={{ display: 'block' }}
              >
                {terms.map((term) => (
                  <option key={term.termFrom} value={JSON.stringify(term)}>
                    {`${term.termFrom} ${term.termTo}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className='input-field col s6'>
          <button
          // onClick={handleChange}
          >
            Sauver le solde et le document de ce lot
          </button>
        </div>
      </form>

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
            <li>Solde antérieur: {csBalance}</li>
            <li>Loyer nu : {rent}</li>
            <li>Charges: {charge}</li>
            <li>Total à payer : {csBalance + rent + charge} €</li>
          </ul>
        </div>

        <div className='row footer'>
          <p>Cet avis ne peut en aucun cas faire office de quittance.</p>
          <p>
            Le gérant de {companyName}, {managerFirstName} {managerLastName}
          </p>
        </div>
      </div>
    </div>
  );
};
