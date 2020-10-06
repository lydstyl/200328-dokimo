import React, { useState } from 'react'
import { useStoreState } from 'easy-peasy'
import { Link } from 'react-router-dom'
import { BatchCard } from '../../components/BatchCard/BatchCard'

export const Batches = () => {
  const { lessors } = useStoreState((state) => state.lessor)
  const { tenants } = useStoreState((state) => state.tenant)
  let { batches } = useStoreState((state) => state.batch)

  batches = batches
    .map((b) => {
      const { lastName } = tenants.filter((t) => t.id === b.tid)[0]

      b.tenantLastName = lastName

      return b
    })
    .sort((a, b) => {
      if (a.tenantLastName < b.tenantLastName) {
        return -1
      } else if (a.tenantLastName > b.tenantLastName) {
        return 1
      } else {
        return 0
      }
    })

  const [filteredBatches, setFilteredBatches] = useState(batches)

  const handleChange = (evt) => {
    setFilteredBatches(
      batches.filter((b) =>
        b.tenantLastName
          .toUpperCase()
          .startsWith(evt.target.value.toUpperCase())
      )
    )
  }

  return (
    <>
      <div className='row'>
        <h1 className='col s12'>Lots</h1>
      </div>

      {!lessors.length || !tenants.length ? (
        <p className='row'>
          <Link className='col s12' to='/bailleurs'>
            Vous devez d'abord ajouter un bailleurs et un locataire pour pouvoir
            ajouter un lot
          </Link>
        </p>
      ) : (
        <>
          <div className='row'>
            <Link className='col s12' to='/ajouter-lot'>
              Ajouter un lot
            </Link>
          </div>

          <input
            onChange={handleChange}
            type='text'
            placeholder='Nom de famille du locataire'
          />

          <ul className='row cards'>
            {filteredBatches.map((batch) => (
              <BatchCard key={batch.id} batch={batch} />
            ))}
          </ul>
        </>
      )}
    </>
  )
}
