import React from 'react'
import { useStoreState } from 'easy-peasy'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

export const BatchOther = () => {
  const { id } = useParams()

  const { batches } = useStoreState(state => state.batch)

  const batch = batches.filter(batch => batch.id === id)[0]

  return (
    <div className='row'>
      <h1 className='col s12'>Autres actions de {batch.name}</h1>
      <div className='col s12'>
        <div>
          <Link to={`/lot/${batch.id}/notes`}>Notes</Link>
        </div>

        {/* <div>
            <Link to={`/lot/${batch.id}/révision`}>Révision de loyer</Link>
          </div> */}

        <div>
          <Link to={`/lot/${batch.id}/supprimer`}>Supprimer ce lot</Link>
        </div>
      </div>
    </div>
  )
}
