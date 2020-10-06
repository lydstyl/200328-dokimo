import { getEssential } from './getEssential.js'
import { sendAlertIfDocDateGreaterThenTermToDate } from './sendAlertIfDocDateGreaterThenTermToDate.js'
import { termNbBetweenBeginDateAndDocDate } from './termNbBetweenBeginDateAndDocDate.js'
import { paymentsSumBeforeDocDate } from './paymentsSumBeforeDocDate.js'

export const getAnteriorBalance2 = (batch, termDate, docDate) => {
  const essentials = getEssential(batch, termDate, docDate) // only keep essentials informations so it is easier to code

  if (sendAlertIfDocDateGreaterThenTermToDate(essentials)) {
    return 0
  }

  const { rent, charge } = essentials

  const rentsAndChargesSum =
    termNbBetweenBeginDateAndDocDate(essentials) * (rent + charge)

  const paymentsSum = paymentsSumBeforeDocDate(essentials)

  const anteriorBalance = rentsAndChargesSum - paymentsSum

  return anteriorBalance.toFixed(2)
}
