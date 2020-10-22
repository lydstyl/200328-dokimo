import React from 'react'
import { Link } from 'react-router-dom'

export const BatchCard = ({ batch }) => {
  let diffInDays = 0
  let badgeColor

  makeBadgeData()

  function makeBadgeData() {
    if (batch.payments[batch.payments.length - 1]) {
      let lastPaymentDate = batch.payments[batch.payments.length - 1].date

      lastPaymentDate = lastPaymentDate.split('/')

      lastPaymentDate = new Date(
        `${lastPaymentDate[2]}-${lastPaymentDate[1]}-${lastPaymentDate[0]}`
      )

      const dateNow = new Date()

      // To calculate the time difference of two dates
      const diffIMS = dateNow.getTime() - lastPaymentDate.getTime()

      // To calculate the no. of days between two dates
      diffInDays = Math.floor(diffIMS / (1000 * 3600 * 24))

      // diffInDays = -31 + +diffInDays
      diffInDays = +diffInDays - 31

      if (diffInDays > 5) {
        badgeColor = 'red'
      } else if (diffInDays > 1) {
        badgeColor = 'orange'
      } else {
        badgeColor = 'green'
      }

      diffInDays = diffInDays.toString()
    }
  }

  return (
    <li className='card-content white-text'>
      <div className='card blue-grey darken-1'>
        <div className='card-content white-text'>
          <span style={{ color: 'black' }} className={`badge ${badgeColor}`}>
            J{diffInDays}
          </span>
          <span className='card-title'>
            {batch.name} {batch.tenantLastName}
          </span>

          <ul className='card-action'>
            <li>
              <Link to={`/lot/${batch.id}/reception-paiement`}>Paiement</Link>
            </li>
            <li>
              <Link to={`/lot/${batch.id}/avis-echeance`}>Avis</Link>
            </li>
            <li className='batch-card-delete'>
              <Link to={`/lot/${batch.id}`}>
                <i className='material-icons'>delete</i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </li>
  )
}
