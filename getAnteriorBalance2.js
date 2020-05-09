// - FIX BUG AVIS LE CHANGEMENT MANUELLE DE LA DATE DU DOC NE CHANGE PAS LE SOLDE ANTERIEUR

const term = '04/2020'; // term = 'du 01/04/2020 au 30/04/2020';
const docDate = '10/03/2020'; // tester docDate = '24/03/2020'

const batch = {
  address1: 'test add1',
  address2: 'test add2',
  balance: -5920,
  beginDate: '01/03/2020',
  charge: 100,
  id: 'ptnknnoWVowVPcrv1Lcz',
  lid: 'KqtbDFFgw7zoQNL2m9fc',
  name: 'Test',
  payments: [
    {
      amount: 1000,
      balance: -1000,
      bid: 'ptnknnoWVowVPcrv1Lcz',
      cumulPaymentsAmount: 1000,
      cumulRents: 0,
      date: '23/03/2020',
      dateObj: {
        seconds: 1587592800,
        nanoseconds: 0,
      },
      document: {
        amount: 2000,
        term: 'du 01/03/2020 au 31/03/2020',
        type: 'Quittance de loyer',
      },
      id: '23-03-2020-218792522251608500',
      term: {
        from: '01/03/2020',
        to: '31/03/2020',
      },
    },
    {
      amount: 1000,
      balance: -1000,
      bid: 'ptnknnoWVowVPcrv1Lcz',
      cumulPaymentsAmount: 2000,
      cumulRents: 1000,
      date: '21/04/2020',
      dateObj: {
        seconds: 1590012000,
        nanoseconds: 0,
      },
      document: {
        amount: 2000,
        term: 'du 01/04/2020 au 30/04/2020',
        type: 'Quittance de loyer',
      },
      id: '21-04-2020-225749000042497760',
      term: {
        from: '01/04/2020',
        to: '30/04/2020',
      },
    },
  ],
  postalCode: '12345',
  rent: 900,
  tid: '0eaOQVkcDRAwuVkmhVKp',
  townName: 'TEST Town',
  uid: 'WzRRklCv1nMUhCJOW3xN4oP5Ls23',
};

const getEssential = (batch, term, docDate) => {
  const { beginDate, rent, charge } = batch;
  let payments = [...batch.payments];

  payments = payments.map((p) => {
    const { amount, date, dateObj, cumulPaymentsAmount } = p;

    return {
      date,
      dateObj,
      amount,
      cumulPaymentsAmount,
    };
  });

  const essential = {
    beginDate,
    rent,
    charge,
    payments,
    term,
    docDate,
  };

  return essential;
};

const sendAlertIfDocDateGreaterThenTermToDate = (essentials) => {
  if (!'xx') {
    console.log("Document date can't be greter then term to date");
    return true;
  }
  return false;
};

const termNbBetweenBeginDateAndDocDate = (essentials) => {
  return 0;
};

const paymentsBeforeDocDate = (essentials) => {
  return 0;
};

const getAnteriorBalance2 = (batch, term, docDate) => {
  // only keep essentials informations so it is easier to code
  const essentials = getEssential(batch, term, docDate);

  console.log('essential', essentials);

  if (sendAlertIfDocDateGreaterThenTermToDate(essentials)) {
    return 0;
  }

  const anteriorBalance =
    termNbBetweenBeginDateAndDocDate(essentials) -
    paymentsBeforeDocDate(essentials);

  return anteriorBalance;
};

const anteriorBalance = getAnteriorBalance2(batch, term, docDate);
console.log('anteriorBalance', anteriorBalance);
