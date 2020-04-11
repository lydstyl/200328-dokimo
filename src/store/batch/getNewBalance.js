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

export function filterPaymentFromTo(payments, balanceDate, docDate) {
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

function nbOfMonth(from, to) {
  let tmp = from.split('/');
  const fromYYYY = parseInt(tmp[2], 10);
  const fromMM = parseInt(tmp[1], 10);

  tmp = to.split('/');
  const toYYYY = parseInt(tmp[2], 10);
  const toMM = parseInt(tmp[1], 10);

  const YYYYDif = toYYYY - fromYYYY;

  const MMDif = YYYYDif * 12 + toMM - fromMM;

  return MMDif;
}

export function getRentTotalFromTo(rent, balance, balanceDate, termTo) {
  const rentNumber = nbOfMonth(balanceDate, termTo);

  const rents = rentNumber * rent;

  return balance + rents;
}

export function getTotalPayments(payments, balanceDate, termTo) {
  payments = filterPaymentFromTo(
    payments,
    balanceDate,
    dateMinus1month(termTo)
  );

  let totalPayments = null;

  if (payments.length === 1) {
    totalPayments = payments[0].amount;

    return totalPayments;
  }

  totalPayments = payments.reduce(function (
    accumulateur,
    valeurCourante,
    index,
    array
  ) {
    // if (!array.length) {
    //   return 0;
    // }

    return accumulateur + valeurCourante.amount;
  },
  0);

  return totalPayments;
}

export function getNewBalance(o) {
  o.balance = 0; // for now
  o.balanceDate = o.beginDate;

  const totalRents = getRentTotalFromTo(
    o.rent,
    o.balance,
    o.balanceDate, // todo make sure every batch have a beginDate when created
    o.termTo
  );

  let totalPayments = 0;
  if (o.payments && o.payments.length) {
    totalPayments = getTotalPayments(o.payments, o.balanceDate, o.termTo);
  }

  const newBalance = totalRents - totalPayments;

  return newBalance;
}

export function dateMinus1month(date) {
  date = date.split('/');
  date[1] = parseInt(date[1], 10) - 1;
  date[1] = date[1] < 10 ? '0' + date[1] : date[1];

  if (date[1] === '00') {
    date[1] = 12;
    date[2] = parseInt(date[2], 10) - 1;
  }

  return date.join('/');
}
