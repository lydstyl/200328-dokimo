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

function lastDayOfMonth(year, monthIndex) {
  const date = new Date(year, monthIndex + 1, 0);
  return date.getDate();
}

export function mapBalanceToPayments(options) {
  // add dateObj to every payment
  options.payments.map((payment) => {
    payment.dateObj = payment.date.split('/');
    payment.dateObj = new Date(
      payment.dateObj[2],
      payment.dateObj[1],
      payment.dateObj[0]
    );

    return payment;
  });

  // sort by date
  options.payments.sort((a, b) => {
    return a.dateObj - b.dateObj;
  });

  let cumulPaymentsAmount = 0;

  options.payments = options.payments.map((payment) => {
    cumulPaymentsAmount += payment.amount;

    payment.cumulPaymentsAmount = cumulPaymentsAmount;
    return payment;
  });

  // add term ex Période​ : du 01/03/2020 au 31/03/2020
  options.payments.map((payment) => {
    const tmp = payment.date.split('/');

    payment.term = {
      from: `01/${tmp[1]}/${tmp[2]}`,
      to: `${lastDayOfMonth(tmp[2], parseInt(tmp[1], 10) - 1)}/${tmp[1]}/${
        tmp[2]
      }`,
    };

    return payment;
  });

  // add cumulRents to every payment & balance
  options.payments.map((payment) => {
    const monthNb = nbOfMonth(options.beginDate, payment.date) + 1;

    payment.cumulRents = options.chargeAndRent * monthNb;

    payment.balance = payment.cumulRents - payment.cumulPaymentsAmount;

    return payment;
  });

  // add type of document
  options.payments.map((payment) => {
    if (payment.balance <= 0) {
      payment.document = {
        type: 'Quittance de loyer',
      };
    } else {
      payment.document = {
        type: 'Reçu partiel de paiement',
      };
    }

    payment.document.term = `du ${payment.term.from} au ${payment.term.to}`;

    payment.document.amount = options.chargeAndRent - payment.balance;

    return payment;
  });

  console.log(options.payments);
  return options.payments;
}

// const beginDate = '01/11/2019';

// const chargeAndRent = 1000;

// const payments = [
//   {
//     amount: 1100,
//     date: '06/12/2019',
//     id: '06/12/2019862304350804886000',
//   },
//   {
//     amount: 1000,
//     date: '05/11/2019',
//     id: '05/11/2019622143791867094300',
//   },
//   {
//     amount: 500,
//     date: '07/01/2020',
//     id: '07/01/2020327777440000987840',
//   },
//   {
//     amount: 1400,
//     date: '08/02/2020',
//     id: '08/02/202011573291673605990',
//   },
//   {
//     amount: 900,
//     date: '09/03/2020',
//     id: '09/03/202011573291673605990',
//   },
//   {
//     amount: 100,
//     date: '10/03/2020',
//     id: '10/03/202011573291673605990',
//   },
//   {
//     amount: 100,
//     date: '11/03/2020',
//     id: '11/03/202011573291673605990',
//   },
//   {
//     amount: 100,
//     date: '12/04/2020',
//     id: '12/04/202011573291673605990',
//   },
// ];

// const options = {
//   beginDate,
//   chargeAndRent,
//   payments,
// };

// mapBalanceToPayments(options);
