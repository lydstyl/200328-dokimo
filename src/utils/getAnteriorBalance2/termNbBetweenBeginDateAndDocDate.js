export const termNbBetweenBeginDateAndDocDate = (essentials) => {
  let { beginDate, docDate } = essentials;

  beginDate = getYYYYAndMM(beginDate);
  docDate = getYYYYAndMM(docDate);

  const yearNb = docDate.YYYY - beginDate.YYYY ;

  const monthNb = docDate.MM - beginDate.MM;

  const termNb = yearNb * 12 + monthNb + 1;

  return termNb;
};

const getYYYYAndMM = (frDate) => {
  const tmp = frDate.split('/');

  return {
    YYYY: parseInt(tmp[2], 10),
    MM: parseInt(tmp[1], 10),
  };
};
