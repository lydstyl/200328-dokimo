export const getTermToDateJS = (frDate) => {
  frDate = frDate.split('/');
  const month = frDate[1] - 1;
  const YYYY = frDate[2];

  var termToDateJS = new Date(YYYY, month + 1, 0);

  return termToDateJS;
};
