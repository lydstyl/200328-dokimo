import { useReducer } from 'react'
import { useStoreState } from 'easy-peasy'
import { useParams } from 'react-router-dom'

const actionTypes = {
  ADD_NOTE: 'ADD_NOTE',
  REMOVE_NOTE: 'REMOVE_NOTE',
}

const initialState = {
  notes: [],
}

function reducer(state, action) {
  const newState = { ...state }

  switch (action.type) {
    case actionTypes.ADD_NOTE:
      newState.notes.push(action.payload)
      return newState

    case actionTypes.REMOVE_NOTE:
      return newState.notes.filter(n => n.id !== action.payload)

    default:
      throw new Error()
  }
}

export const useNote = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { id } = useParams()
  const { batches } = useStoreState(state => state.batch)
  const batch = batches.filter(batch => batch.id === id)[0]

  return {
    batch,
    actionTypes,
    state,
    dispatch,
  }
}
