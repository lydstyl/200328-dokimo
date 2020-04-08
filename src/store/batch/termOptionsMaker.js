export function termOptionsMaker(beginDate) {
  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;

  beginDate = beginDate.split('/');
  const beginYear = parseInt(beginDate[2], 10);
  const beginMonth = parseInt(beginDate[1], 10);

  const terms = [];
  let yyyy = nowYear;
  let mm = nowMonth;

  if (nowYear === beginYear) {
    for (mm; mm >= beginMonth; mm--) {
      terms.push(mm + '/' + yyyy);
    }
  } else {
    for (let i = 1; i <= 12; i++) {
      if (mm < 1) {
        yyyy--;
        mm = 12;
      }

      if (yyyy === beginYear && mm < beginMonth) {
        break;
      }

      terms.push(mm + '/' + yyyy);

      mm--;
    }
  }
  console.log(terms);
}

// const beginDate = '01/02/2020';
// const beginDate = '01/11/2019';

// termOptionsMaker(beginDate);
