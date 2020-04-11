import React, { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import { useParams } from 'react-router-dom';

import M from 'materialize-css/dist/js/materialize.min.js';

export const PaymentReceipt = () => {
  const { id } = useParams(); // batch id
  const {
    batches,
    utils: { dateMinus1month },
  } = useStoreState((state) => state.batch);
  const batch = batches.filter((batch) => batch.id === id)[0];

  const { firestoreAddPayment, firestoreDeletePayment } = useStoreActions(
    (actions) => actions.batch
  );

  const getNowFrDate = () => {
    const date = new Date();

    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();

    return [dd < 10 ? '0' + dd : dd, mm < 10 ? '0' + mm : mm, yyyy].join('/');
  };

  const [paymentDate, setPaymentDate] = useState(getNowFrDate()); // todo by default get now date valid exemple value : '2020-04-06'
  const [amount, setAmount] = useState(0);

  const handleDateChange = (e) => {
    setPaymentDate(e.target.value);
  };

  const handleSavePayment = (e) => {
    e.preventDefault();

    console.log('begin', batch.beginDate);
    let tooOldDate = dateMinus1month(batch.beginDate).split('/');
    tooOldDate[0] = '10';
    tooOldDate = new Date(tooOldDate[2], tooOldDate[1], tooOldDate[0]);

    let date = paymentDate.split('-');

    const paymentDateObj = new Date(
      date[0],
      parseInt(date[1], 10) - 1,
      date[2]
    );

    const now = new Date();

    if (paymentDateObj < tooOldDate) {
      M.toast({
        html: `Vous ne pouvez pas ajouter une date si vieille`,
      });
      return;
    }

    if (paymentDateObj > now) {
      M.toast({
        html: `Vous ne pouvez pas ajouter un paiement dans le futur`,
      });
      return;
    }

    date = [date[2], date[1], date[0]].join('/');

    const payment = { bid: id, date, amount };

    // add to payments list
    if (!batch.payments) {
      batch.payments = [];
    }
    batch.payments.push({
      id: date + Math.random() * 1000000000000000000,
      date,
      amount,
    });

    // update balance
    batch.balance -= amount;

    firestoreAddPayment({ batch, payment });
  };

  const handleDeletePayment = (id) => {
    firestoreDeletePayment({ batch, paymentId: id });
  };

  return (
    <div>
      <h1>Réception de paiement</h1>

      <form>
        <input
          onChange={handleDateChange}
          type='date'
          name='paymentDate'
          value={paymentDate}
        />

        <input
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          type='number'
          name='amount'
          value={amount}
        />

        <button onClick={handleSavePayment}>Sauver</button>
      </form>

      <ul>
        {batch.payments.map((payment) => (
          <li key={payment.id}>
            <button onClick={() => handleDeletePayment(payment.id)}>X</button>{' '}
            {payment.date} {payment.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};
