function lastDayOfMonth(year, monthIndex) {
  const date = new Date(year, monthIndex + 1, 0);
  return date.getDate();
}

function getOption(yyyy, mm) {
  const mm0 = mm < 10 ? '0' + mm : mm;
  const option = {
    docDate: [10, mm0, yyyy].join('-'),
    termFrom: ['01', mm0, yyyy].join('-'),
    termTo: [lastDayOfMonth(yyyy, mm - 1), mm0, yyyy].join('-'),
  };

  return option;
}

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
      terms.push(getOption(yyyy, mm));
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

      terms.push(getOption(yyyy, mm));

      mm--;
    }
  }
  return terms;
}

// const beginDate = '01/02/2020';
// // const beginDate = '01/11/2019';

// const test = termOptionsMaker(beginDate);
// console.log(test);

// // termOptionsMaker return something like :
// // [
// //   {
// //     docDate: '10-04-2020',
// //     termFrom: '01-04-2020',
// //     termTo: '30-04-2020'
// //   },
// //   {
// //     docDate: '10-03-2020',
// //     termFrom: '01-03-2020',
// //     termTo: '31-03-2020'
// //   },
// //   {
// //     docDate: '10-02-2020',
// //     termFrom: '01-02-2020',
// //     termTo: '29-02-2020'
// //   }
// // ]
