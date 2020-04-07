function frDateToObj(frDate) {
  frDate = frDate.split('/');

  frDate = frDate.map((num) => parseInt(num, 10));

  return {
    day: frDate[0],
    month: frDate[1],
    monthIndex: frDate[1] - 1,
    year: frDate[2],
  };
}

function isAfterOrEgalDate(afterDate, date) {
  return afterDate - date >= 0 ? true : false;
}

function frDateToDateObj(frDate) {
  let date = frDateToObj(frDate);

  date = new Date(date.year, date.monthIndex, date.day);

  return date;
}

function filterPaymentFromTo(payments, balanceDate, docDate) {
  return payments.filter((payment) => {
    let paymentDate = payment.date;

    paymentDate = frDateToDateObj(paymentDate);

    const from = frDateToDateObj(balanceDate);
    const to = frDateToDateObj(docDate);

    const dateAfterFrom = isAfterOrEgalDate(paymentDate, from);
    const dateBeforeTo = isAfterOrEgalDate(to, paymentDate);

    return dateAfterFrom && dateBeforeTo;
  });
}

function getRentTotalFromTo(rent, balance, balanceDate, termTo) {
  function getMonth(frDate) {
    return parseInt(frDate.split('/')[1], 10);
  }

  balanceDate = getMonth(balanceDate);
  termTo = getMonth(termTo);

  const rentNumber = termTo - balanceDate + 1;

  const rents = rentNumber * rent;

  return balance + rents;
}

function getTotalPayments(payments, balanceDate, termTo) {
  payments = filterPaymentFromTo(payments, balanceDate, termTo);

  return payments.reduce(function (accumulateur, valeurCourante, index, array) {
    if (index === 1) {
      accumulateur = accumulateur.amount;
    }

    return accumulateur + valeurCourante.amount;
  });
}

export function getNewBalance(o) {
  const totalRents = getRentTotalFromTo(
    o.rent,
    o.balance,
    o.balanceDate,
    o.termTo
  );

  const totalPayments = getTotalPayments(o.payments, o.balanceDate, o.termTo);

  const newBalance = totalRents - totalPayments;

  return newBalance;
}

// const rent = 500; // loyer + charges

// const balance = 0;
// const balanceDate = '01/01/2020';

// const termTo = '30/04/2020';

// const payments = [
//   { amount: 500, date: '09/01/2020' },
//   { amount: 450, date: '12/02/2020' },
//   { amount: 50, date: '22/02/2020' },
//   { amount: 550, date: '09/03/2020' },
//   { amount: 450, date: '09/04/2020' },
//   { amount: 500, date: '09/05/2020' },
//   { amount: 500, date: '15/06/2020' },
// ];

// const newBalance = getNewBalance({
//   payments,
//   rent,
//   balance,
//   balanceDate,
//   termTo,
// });

// console.log(newBalance);
