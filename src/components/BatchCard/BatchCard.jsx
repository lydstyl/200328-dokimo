import React from 'react'
import { Link } from 'react-router-dom'

export const BatchCard = ({ batch }) => {
  return (
    <li key={batch.id} className='card-content white-text col s12 m4'>
      <div className='card blue-grey darken-1'>
        <div className='card-content white-text'>
          <span className='green'>ok</span>
          <span className='red'>!!</span>
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
