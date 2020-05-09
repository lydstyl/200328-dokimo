// - FIX BUG AVIS LE CHANGEMENT MANUEL DE LA DATE DU DOC NE CHANGE PAS LE SOLDE ANTERIEUR

import { getEssential } from './getEssential.js';
import { sendAlertIfDocDateGreaterThenTermToDate } from './sendAlertIfDocDateGreaterThenTermToDate.js';
import { termNbBetweenBeginDateAndDocDate } from './termNbBetweenBeginDateAndDocDate.js';
import { paymentsSumBeforeDocDate } from './paymentsSumBeforeDocDate.js';

export const getAnteriorBalance2 = (batch, termDate, docDate) => {
  const essentials = getEssential(batch, termDate, docDate); // only keep essentials informations so it is easier to code

  if (sendAlertIfDocDateGreaterThenTermToDate(essentials)) {
    return 0;
  }

  const { rent, charge } = essentials;

  const rentsAndChargesSum =
    termNbBetweenBeginDateAndDocDate(essentials) * (rent + charge);

  const paymentsSum = paymentsSumBeforeDocDate(essentials);

  const anteriorBalance = rentsAndChargesSum - paymentsSum;

  // console.log('essential', essentials);

  // console.log(
  //   `anteriorBalance from  v2 anteriorBalance ${anteriorBalance}, termDate ${termDate}, docDate ${docDate}`
  // );

  return anteriorBalance;
};

// const termDate = '01/04/2020'; // term = 'du 01/04/2020 au 30/04/2020';
// const docDate = '20/04/2020';

// const anteriorBalance = getAnteriorBalance2(batch, termDate, docDate);
