import React from 'react'
import { Link } from 'react-router-dom'

export const BatchCard = ({ batch }) => {
  let diffInDays = 0

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
  }

  return (
    <li className='card-content white-text col s12 m4'>
      <div className='card blue-grey darken-1'>
        <div className='card-content white-text'>
          <span
            style={{ color: 'black' }}
            className={diffInDays >= 30 ? 'badge red' : 'badge green'}
          >
            J-{diffInDays}
          </span>
          <span className='card-title'>
            {batch.name} {batch.tenantLastName}
          </span>

          <ul className='card-action'>
            <li>
              <Link to={`/lot/${batch.id}/avis-echeance`}>Avis d'échéance</Link>
            </li>
            <li>
              <Link to={`/lot/${batch.id}/reception-paiement`}>
                Réception paiement
              </Link>
            </li>
            <li>
              <Link to={`/lot/${batch.id}`}>Supprimer</Link>
            </li>
          </ul>
        </div>
      </div>
    </li>
  )
}
