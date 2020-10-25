import {
  getNewBalance,
  getTotalPayments,
  getRentTotalFromTo,
  dateMinus1month,
} from './getNewBalance'
import { termOptionsMaker } from './termOptionsMaker'
import { mapBalanceToPayments } from './mapBalanceToPayments'

export const batchUtils = {
  inputDateExtractor: inputValue => {
    const tmp = inputValue.split('-')

    return {
      string: inputValue,
      year: parseInt(tmp[0], 10),
      month: parseInt(tmp[1], 10),
      day: parseInt(tmp[2], 10),
    }
  },

  prefix0: number => {
    if (
      number < 10
      // && number.split(0) != 0
    )
      return '0' + number
    return number
  },

  enDateToFr: date => {
    date = date.split('-')
    return [date[2], date[1], date[0]].join('-')
  },

  getNewBalance,
  getTotalPayments,
  getRentTotalFromTo,
  dateMinus1month,
  termOptionsMaker,
  mapBalanceToPayments,
}
