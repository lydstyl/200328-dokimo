import React, { useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useParams, Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";

function getNowEnDate() {
  const date = new Date();

  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();

  return [yyyy, mm < 10 ? "0" + mm : mm, dd < 10 ? "0" + dd : dd].join("-");
}

export const PaymentReceipt = () => {
  const { id } = useParams(); // batch id
  const {
    batches,
    utils: { dateMinus1month, mapBalanceToPayments },
  } = useStoreState((state) => state.batch);
  const batch = batches.filter((batch) => batch.id === id)[0];

  const { beginDate, rent, charge } = batch;
  let payments = batch.payments;

  const { firestoreAddPayment, firestoreDeletePayment } = useStoreActions(
    (actions) => actions.batch
  );

  const [paymentDate, setPaymentDate] = useState(getNowEnDate);

  const [amount, setAmount] = useState(
    payments[payments.length - 1]?.amount || 0
  );

  const handleDateChange = (e) => {
    setPaymentDate(e.target.value);
  };

  let tooOldDate = dateMinus1month(beginDate).split("/");
  tooOldDate[0] = "10";
  tooOldDate = new Date(
    tooOldDate[2],
    parseInt(tooOldDate[1], 10) - 1,
    tooOldDate[0]
  );

  const now = new Date();

  const handleSavePayment = (e) => {
    e.preventDefault();

    let date = paymentDate.split("-");

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

    date = [date[2], date[1], date[0]].join("/");

    // add to payments list
    if (!payments) {
      payments = [];
    }

    const pid =
      date.replace(/\//g, "-") + "-" + Math.random() * 1000000000000000000;
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
      return payment;
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

      <form>
        <input
          onChange={handleDateChange}
          type="date"
          name="paymentDate"
          value={paymentDate}
        />

        <input
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          type="number"
          name="amount"
          step="0.01"
          placeholder="543,21"
          value={amount}
        />

        <button onClick={handleSavePayment}>Sauver</button>
      </form>

      <ul>
        {payments
          .sort((a, b) => {
            return b.dateObj - a.dateObj;
          })
          .map((payment) => (
            <li key={payment.id}>
              <button onClick={() => handleDeletePayment(payment.id)}>
                <i className="material-icons">delete</i>
              </button>{" "}
              {payment.date} {payment.amount}{" "}
              <Link to={`/lot/${payment.bid}/recu/${payment.id}`}>
                {payment.document.type}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};
