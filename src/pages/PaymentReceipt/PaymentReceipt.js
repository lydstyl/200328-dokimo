import React, { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import { useParams } from 'react-router-dom';

import M from 'materialize-css/dist/js/materialize.min.js';

export const PaymentReceipt = () => {
  const { id } = useParams(); // batch id
  const {
    batches,
    utils: { dateMinus1month, mapBalanceToPayments },
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

  const { beginDate, rent, charge } = batch;
  let payments = batch.payments;

  let tooOldDate = dateMinus1month(beginDate).split('/');
  tooOldDate[0] = '10';
  tooOldDate = new Date(
    tooOldDate[2],
    parseInt(tooOldDate[1], 10) - 1,
    tooOldDate[0]
  );

  const now = new Date();

  const handleSavePayment = (e) => {
    e.preventDefault();

    let date = paymentDate.split('-');

    const paymentDateObj = new Date(
      date[0],
      parseInt(date[1], 10) - 1,
      date[2]
    );

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

    // add to payments list
    if (!payments) {
      payments = [];
    }

    const pid = date + Math.random() * 1000000000000000000;
    payments.push({
      id: pid,
      date,
      amount,
    });

    // update balance
    batch.balance -= amount;

    payments = mapBalanceToPayments({
      beginDate,
      chargeAndRent: charge + rent,
      payments,
    });

    batch.payments = payments;

    // add bid to every payements
    batch.payments.map((payment) => {
      payment.bid = id;
    });

    const payment = batch.payments.filter((payment) => payment.id === pid);

    firestoreAddPayment({ batch, payment });
  };

  const handleDeletePayment = (id) => {
    firestoreDeletePayment({ batch, paymentId: id });
  };

  return (
    <div>
      <h1>Réception de paiement</h1>

      <p>La date du début de la location est le {beginDate}.</p>
      <p>
        La date du paiement doit être comprise entre {tooOldDate.toString()} et{' '}
        {now.toString()}
      </p>

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
        {payments.map((payment) => (
          <li key={payment.id}>
            <button onClick={() => handleDeletePayment(payment.id)}>X</button>{' '}
            {payment.date} {payment.amount} {payment.document.type}
          </li>
        ))}
      </ul>

      <pre>{JSON.stringify(payments, null, 4)}</pre>
    </div>
  );
};
