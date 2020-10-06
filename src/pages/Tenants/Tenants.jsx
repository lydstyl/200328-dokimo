import React, { useState, useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import M from 'materialize-css/dist/js/materialize.min.js'

import { Input } from '../../components/Input/Input'
import { Preloader } from '../../components/Preloader/Preloader'

export const Tenants = () => {
  const [isSubmitable, setIsSubmitable] = useState(false)

  const {
    user: { uid },
  } = useStoreState((state) => state.user)
  const { tenants, loading } = useStoreState((state) => state.tenant)
  const { batches } = useStoreState((state) => state.batch)

  const {
    firestoreAddTenant,
    firestoreGetTenants,
    firestoreDelTenant,
  } = useStoreActions((actions) => actions.tenant)

  const handleChangeLastName = (e) => {
    const { value } = e.target
    if (value) {
      setIsSubmitable(true)
    } else {
      setIsSubmitable(false)
    }
  }

  const handleAdd = (e) => {
    e.preventDefault()

    const tenant = {
      // id: null,
      uid,
    }

    const inputs = document.querySelectorAll('form [name]')
    inputs.forEach((input) => {
      tenant[input.name] = input.value
    })

    firestoreAddTenant(tenant)
  }

  const handleDelete = (e, id) => {
    e.preventDefault()

    const tenantBatches = batches.filter((batch) => batch.tid === id)

    if (tenantBatches.length) {
      M.toast({
        html: `Vous devez d'abord supprimer les lots loués par ce locataire pour pouvoir le supprimer`,
      })
    } else {
      firestoreDelTenant(id)
    }
  }

  useEffect(() => {
    firestoreGetTenants(uid)
  }, [firestoreGetTenants, uid])

  return (
    <>
      <div className='row'>
        <h1 className='col s12'>Locataires</h1>
      </div>

      <form className='row'>
        {/* <Input name='civility' size='s12' /> */}

        <div className='col s12'>
          <div className='input-fiel'>
            <div>
              <select style={{ display: 'block' }} name='civility'>
                <option value='Monsieur'>Monsieur</option>
                <option value='Madame'>Madame</option>
              </select>

              <label>Type</label>
            </div>
          </div>
        </div>

        <Input name='firstName' size='s12' />

        <div className={`input input-field col s12`}>
          <input
            onChange={handleChangeLastName}
            name='lastName'
            type='text'
            className='validate'
          />
          <label htmlFor='last_name'>Nom de famille</label>
        </div>

        {isSubmitable && (
          <button
            onClick={(e) => handleAdd(e)}
            className='waves-effect waves-light btn col s4'
          >
            Ajouter ce locataire
            <i className='material-icons left'>person_add</i>
          </button>
        )}
      </form>

      {loading && <Preloader />}

      {!loading && tenants.length !== 0 && (
        <ul className='row cards'>
          {tenants.map((tenant) => (
            <li key={tenant.id} className='card-content white-text'>
              <div className='card blue-grey darken-1'>
                <div className='card-content white-text'>
                  <span className='card-title'>
                    <span>{tenant.civility}</span>{' '}
                    <span>{tenant.firstName}</span>{' '}
                    <span>{tenant.lastName}</span>
                  </span>

                  <ul className='card-action'>
                    <li>
                      <a onClick={(e) => handleDelete(e, tenant.id)} href='!#'>
                        <i className='material-icons'>delete</i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
