import React, { useReducer } from 'react'

// https://docs.google.com/document/d/1wwg8v1uj7NP0SIox36DTeBtLhpAFcFW1VIwS7bqDBjs/edit#

import { ReviewMailMaker } from './ReviewMailMaker'

export const actionTypes = {
  SET_SENDER: 'SET_SENDER',
}

const initialState = {
  sender: 'Gabriel Brun',
  recipient: 'Toto Coco',
}

function reducer(state, action) {
  const newState = { ...state }

  switch (action.type) {
    case actionTypes.SET_SENDER:
      newState.sender = action.payload

      return newState

    default:
      // throw new Error();
      return newState
  }
}

export const RentReviewContext = React.createContext(initialState)

const RentReviewProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <RentReviewContext.Provider value={{ state, dispatch }}>
      {children}
    </RentReviewContext.Provider>
  )
}

// const Field = ({ name }) => {
//   // const value = useContext(MyContext);

//   // todo useContext to get the value like this state[name]

//   // todo create action type like this `SET_${name.toCupperCase()}`

//   return (
//     <div className='field'>
//       <label>{name}</label>
//       <input type='text' name={name} />
//     </div>
//   )
// }

export const RentReview = () => {
  return (
    <RentReviewProvider>
      <ReviewMailMaker />
    </RentReviewProvider>
  )
}
