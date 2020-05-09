import React, { useState } from 'react';
import { useStoreState } from 'easy-peasy';

import { useParams } from 'react-router-dom';

import { amount } from '../../utils/utils';
import { getAnteriorBalance2 } from '../../utils/getAnteriorBalance2/index.js';

export const DueNotice = () => {
  const { id } = useParams();

  const { lessors } = useStoreState((state) => state.lessor);
  const { tenants } = useStoreState((state) => state.tenant);
  const {
    batches,
    utils: { termOptionsMaker, dateMinus1month },
  } = useStoreState((state) => state.batch);

  const batch = batches.filter((batch) => batch.id === id)[0];
  const { lid, tid, charge, beginDate, rent } = batch;

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

  const terms = termOptionsMaker(beginDate);

  const [dates, setDates] = useState({
    docDate: dateMinus1month(terms[0].docDate),
    termFrom: terms[0].termFrom,
    termTo: terms[0].termTo,
  });
  const [showDoc, setShowDoc] = useState(false);

  const [anteriorBalance, setAnteriorBalance] = useState(
    getAnteriorBalance2(batch, dates.termFrom, dates.docDate)
  );

  const handleTermChange = (e) => {
    let value = e.target.value;
    if (value === 'no term') {
      return;
    }
    value = JSON.parse(value);

    setDates({ ...value, docDate: dateMinus1month(value.docDate) });

    const anteriorBalance = getAnteriorBalance2(
      batch,
      dates.termFrom,
      value.docDate
    );
    console.log(
      'xxxxxx SET anteriorBalance   xxxxxxxxx',
      anteriorBalance,
      `dates.termFrom ${dates.termFrom},
    value.docDate ${value.docDate}`
    );
    setAnteriorBalance(anteriorBalance);

    setShowDoc(true);
  };

  const handlChangeDocDate = (evt) => {
    evt.preventDefault();

    let docDate = document.querySelector('#date').value.split('-');
    docDate = [docDate[2], docDate[1], docDate[0]].join('/');

    const anteriorBalance = getAnteriorBalance2(batch, dates.termFrom, docDate);
    console.log('yyyyyy SET anteriorBalance   yyyyyy', anteriorBalance);
    setAnteriorBalance(anteriorBalance);
  };

  return (
    <div className='container'>
      <form className='row no-print'>
        <div className='col m6'>
          <div className='input-fiel'>
            <div>
              <label>Terme</label>

              <select
                onChange={handleTermChange}
                name='term'
                style={{ display: 'block' }}
              >
                <option value={'no term'}>Choisissez le terme</option>
                {terms.map((term) => (
                  <option key={term.termFrom} value={JSON.stringify(term)}>
                    {`${term.termFrom} ${term.termTo}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className='col m6'>
          <label htmlFor=''>Changer la date du document</label>
          <input id='date' type='date' />
          <input
            onClick={handlChangeDocDate}
            type='submit'
            value='Changer la date du document'
          />
        </div>
      </form>

      {showDoc && (
        <div className='row due-notice'>
          <div className='col s12'>
            <div className='row sender'>
              <div className='col'>
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
            </div>

            <div className='row'>
              <div className='col recipient'>
                <p>
                  {civility} {firstName} {lastName}
                </p>
                <p>{batch.address1}</p>
                <p>{batch.address2}</p>
                <p>
                  {batch.postalCode} {batch.townName}
                </p>
              </div>
            </div>

            <div className='row'>
              <div className='col where-when'>
                à <span>{townName}</span>, le{' '}
                <span>{dates && dates.docDate}</span>
              </div>
            </div>

            <div className='row'>
              <div className='col s12 doc-title'>
                <h1>Avis d'échéance</h1>
                <p>
                  Somme à payer sur le terme du {dates && dates.termFrom} au{' '}
                  {dates && dates.termTo}:
                </p>
              </div>
            </div>

            <div className='row amount-to-pay'>
              <ul className='col s12'>
                <li>
                  <span>Solde antérieur :</span>

                  <span className='amount'>
                    {amount(
                      getAnteriorBalance2(batch, dates.termFrom, dates.docDate)
                    )}{' '}
                    €
                  </span>
                </li>
                <li>
                  Loyer nu : <span className='amount'>{amount(rent)} €</span>
                </li>
                <li>
                  Charges : <span className='amount'>{amount(charge)} €</span>
                </li>
                <li>
                  Total à payer :{' '}
                  <span className='amount'>
                    {amount(
                      getAnteriorBalance2(
                        batch,
                        dates.termFrom,
                        dates.docDate
                      ) +
                        rent +
                        charge
                    )}{' '}
                    €
                  </span>
                </li>
              </ul>
            </div>

            <div className='row footer'>
              <p>Cet avis ne peut en aucun cas faire office de quittance.</p>
              <p>
                {companyName && `Le gérant de ${companyName},`}{' '}
                {managerFirstName} {managerLastName}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
