import React, { useState } from 'react';
// import { useStoreState } from 'easy-peasy';

import { useParams } from 'react-router-dom';

export const PaymentReceipt = () => {
  const { id } = useParams(); // batch id

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

    console.log({ bid: id, date, amount }); // todo set this date in Firebase and in the store
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
          onChange={(e) => setAmount(e.target.value)}
          type='number'
          name='amount'
          value={amount}
        />

        <button onClick={handleSavePayment}>Sauver</button>
      </form>
    </div>
  );
};
