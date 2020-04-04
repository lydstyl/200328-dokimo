import React, { useState } from 'react';
import { useStoreState } from 'easy-peasy';

import { useParams } from 'react-router-dom';

export const BatchDetail = () => {
  const { id } = useParams();

  const { lessors } = useStoreState(state => state.lessor);
  const { tenants } = useStoreState(state => state.tenant);
  const { batches } = useStoreState(state => state.batch);

  const batch = batches.filter(batch => batch.id === id)[0];
  const {
    lid,
    tid,
    charge,
    balance, // must be editable
    rent
    // beginDate, paymentDeadline
  } = batch;

  const lessor = lessors.filter(lessor => lessor.id === lid)[0];
  const tenant = tenants.filter(tenant => tenant.id === tid)[0];

  const {
    companyName,
    managerFirstName,
    managerLastName,
    address1,
    address2,
    postalCode,
    townName
  } = lessor;

  const { civility, firstName, lastName } = tenant;

  const docPlace = 'Raismes';
  const date = new Date();

  function prefix0(number) {
    if (number < 10) return '0' + number;
    return number;
  }

  // must be editable
  let docDate =
    prefix0(date.getDate()) +
    '/' +
    prefix0(date.getMonth() + 1) +
    '/' +
    date.getFullYear();

  console.log(docDate);

  // must be editable
  const termFrom =
    '01/' +
    (parseInt(date.getMonth(), 10) + 1 < 10
      ? '0' + (parseInt(date.getMonth(), 10) + 1)
      : parseInt(date.getMonth(), 10) + 1) +
    '/' +
    date.getFullYear();

  let lastDayOfMonth = parseInt(date.getMonth(), 10);
  lastDayOfMonth = new Date(2008, lastDayOfMonth + 1, 0);
  lastDayOfMonth = lastDayOfMonth.getDate();

  const termTo =
    lastDayOfMonth +
    '/' +
    (parseInt(date.getMonth(), 10) + 1 < 10
      ? '0' + (parseInt(date.getMonth(), 10) + 1)
      : parseInt(date.getMonth(), 10) + 1) +
    '/' +
    date.getFullYear();

  const [csBalance, setCsBalance] = useState(balance); //

  const onCsBalanceChange = e => {
    setCsBalance(parseFloat(e.target.value));
  };

  return (
    <div>
      <h1 className='row'>Détail de la location</h1>

      <div className='row json no-print'>
        <pre>{JSON.stringify(batch, null, 4)}</pre>
        <pre>{JSON.stringify(lessor, null, 4)}</pre>
        <pre>{JSON.stringify(tenant, null, 4)}</pre>
      </div>

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
          <label for='balance'>Solde antérieur</label>
        </div>

        <div className='input-field col s6'>
          <input name='docDate' id='docDate' type='date' className='validate' />
          <label for='docDate'>Date du document</label>
        </div>

        <div className='input-field col s6'>
          <input
            name='termFrom'
            id='termFrom'
            type='date'
            className='validate'
          />
          <label for='termFrom'>Term du</label>
        </div>

        <div className='input-field col s6'>
          <button onClick='handleChange'>Ok</button>
        </div>
      </form>

      <div className='due-notice'>
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
          à <span>{docPlace}</span>, le <span>{docDate}</span>
        </div>

        <div className='row amount-to-pay'>
          <p>
            Somme à payer sur le terme du {termFrom} au {termTo}
          </p>

          <ul>
            <li>Solde antérieur: {csBalance}</li>
            <li>Loyer nu : {rent}</li>
            <li>Charges: {charge}</li>
            <li>Total à payer : {csBalance + rent + charge}</li>
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
