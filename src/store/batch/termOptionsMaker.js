function lastDayOfMonth(year, monthIndex) {
  const date = new Date(year, monthIndex + 1, 0)
  return date.getDate()
}

export function termOptionsMaker(beginDate) {
  const d = getDates(beginDate)

  let yyyy = d.nowYear
  let mm = d.nowMonth

  const terms = []

  if (d.nowYear === d.beginYear) {
    // 2020 === 2020
    for (mm; mm >= d.beginMonth; mm--) {
      const YYYY = getYYYY(mm, yyyy)
      const MM = getMM(mm)

      terms.push(getOption(YYYY, MM))
    }
  } else {
    for (let i = 1; i <= 12; i++) {
      if (mm < 1) {
        yyyy--
        mm = 12
      }

      if (yyyy === d.beginYear && mm < d.beginMonth) {
        break
      }

      terms.push(getOption(yyyy, mm))

      mm--
    }
  }

  return terms
}

function getDates(beginDate) {
  const now = new Date()
  const nowYear = now.getFullYear()
  const nowMonth = now.getMonth() + 2

  beginDate = beginDate.split('/')
  const beginYear = parseInt(beginDate[2], 10)
  const beginMonth = parseInt(beginDate[1], 10)

  return { now, nowYear, nowMonth, beginYear, beginMonth }
}

function getYYYY(mm, yyyy) {
  if (mm > 12) {
    let toAdd = mm / 12 - 1

    toAdd = Math.ceil(toAdd)

    return yyyy + toAdd
  } else {
    return yyyy
  }
}

function getMM(mm) {
  if (mm === 13) {
    return 1
  } else {
    return mm
  }
}

function getOption(yyyy, mm) {
  let mm0 = mm < 10 ? '0' + mm : mm

  if (mm0 > 12 || mm0 === '13') {
    mm0 = '01'

    yyyy++ // new year
  }

  const option = {
    docDate: [10, mm0, yyyy].join('/'),
    termFrom: ['01', mm0, yyyy].join('/'),
    termTo: [lastDayOfMonth(yyyy, mm - 1), mm0, yyyy].join('/'),
  }

  return option
}
