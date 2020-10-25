import React from 'react'
import { useStoreActions } from 'easy-peasy'
import { useParams, useHistory } from 'react-router-dom'

export const BatchRemove = () => {
  const { id } = useParams()

  const { firestoreDelBatch } = useStoreActions(actions => actions.batch)

  const history = useHistory()

  const handleDelBatch = e => {
    e.preventDefault()

    firestoreDelBatch(id)

    history.push('/lots')
  }

  return (
    <div>
      <a onClick={e => handleDelBatch(e)} href='!#'>
        <i className='material-icons'>delete</i> Supprimer ce lot
      </a>
    </div>
  )
}
