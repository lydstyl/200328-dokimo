import { max2Decimals } from "../../utils/max2Decimals";

function nbOfMonth(from, to) {
  let tmp = from.split("/");
  const fromYYYY = parseInt(tmp[2], 10);
  const fromMM = parseInt(tmp[1], 10);

  tmp = to.split("/");
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
    payment.dateObj = payment.date.split("/");
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

  // add cumulPaymentAmount
  let cumulPaymentsAmount = 0;

  options.payments = options.payments.map((payment) => {
    let { amount } = payment;
    amount = max2Decimals(amount);

    cumulPaymentsAmount = cumulPaymentsAmount + amount;
    cumulPaymentsAmount = max2Decimals(cumulPaymentsAmount);

    payment.cumulPaymentsAmount = cumulPaymentsAmount;
    return payment;
  });

  // add term ex Période​ : du 01/03/2020 au 31/03/2020
  options.payments.map((payment) => {
    const tmp = payment.date.split("/");

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
    payment.cumulRents = max2Decimals(payment.cumulRents);

    payment.balance = max2Decimals(
      payment.cumulRents - payment.cumulPaymentsAmount
    );

    return payment;
  });

  // add type of document
  options.payments.map((payment) => {
    if (payment.cumulRents === payment.cumulPaymentsAmount) {
      payment.document = {
        type: "Quittance de loyer",
      };
    } else if (payment.cumulRents - payment.cumulPaymentsAmount > 0) {
      payment.document = {
        type: "Reçu partiel de loyer",
      };

      payment.restToPay = max2Decimals(
        payment.cumulRents - payment.cumulPaymentsAmount
      );
    } else {
      payment.document = {
        type: "Trop perçu de loyer",
      };

      payment.toMuchPaid = max2Decimals(
        payment.cumulPaymentsAmount - payment.cumulRents
      );
    }

    payment.document.term = `du ${payment.term.from} au ${payment.term.to}`;

    return payment;
  });

  return options.payments;
}
