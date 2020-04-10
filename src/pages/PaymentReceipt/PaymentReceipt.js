import React, { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import { useParams } from 'react-router-dom';

export const PaymentReceipt = () => {
  const { id } = useParams(); // batch id
  const { batches } = useStoreState((state) => state.batch);
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

    let date = paymentDate.split('-');
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
