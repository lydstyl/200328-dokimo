import React, { useContext } from 'react'

import { actionTypes, RentReviewContext } from './RentReview'

export const Field = ({ name }) => {
  const rentReviewContext = useContext(RentReviewContext)
  const { state, dispatch } = rentReviewContext

  const actionType = `SET_${name.toUpperCase()}`

  return (
    <div className='field'>
      <label>{name}</label>
      <input
        value={state[name]}
        onChange={evt =>
          dispatch({
            type: actionTypes[actionType],
            payload: evt.target.value,
          })
        }
        type='text'
        name={name}
      />
    </div>
  )
}
