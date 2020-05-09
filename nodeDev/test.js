const convertFrDateToJSDate = (frDate) => {
  frDate = frDate.split('/');
  const DD = frDate[0];
  const indexMM = frDate[1] - 1;

  const YYYY = frDate[2];

  const JSDate = new Date(YYYY, indexMM, DD);

  return JSDate;
};

console.log(convertFrDateToJSDate('21/04/2020'));
