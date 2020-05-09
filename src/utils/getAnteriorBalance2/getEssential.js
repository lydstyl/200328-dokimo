import { convertFrDateToJSDate } from './convertFrDateToJSDate.mjs';
import { getTermToDateJS } from './getTermToDateJS.mjs';

export const getEssential = (batch, termDate, docDate) => {
  const { beginDate, rent, charge } = batch;
  let payments = [...batch.payments];

  payments = payments.map((p) => {
    const { amount, date, cumulPaymentsAmount } = p;

    return {
      date,
      paymentDateJS: convertFrDateToJSDate(date),
      amount,
      cumulPaymentsAmount,
    };
  });

  const essential = {
    beginDate,
    beinDateJS: convertFrDateToJSDate(beginDate),
    rent,
    charge,
    payments,
    termDate,
    termDateJS: convertFrDateToJSDate(termDate),
    termToDateJS: getTermToDateJS(termDate),
    docDate,
    docDateJS: convertFrDateToJSDate(docDate),
  };

  return essential;
};
