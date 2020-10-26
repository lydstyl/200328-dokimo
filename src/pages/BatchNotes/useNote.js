import { useReducer } from 'react'
import { useStoreState } from 'easy-peasy'
import { useParams } from 'react-router-dom'

const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  ADD_NOTE: 'ADD_NOTE',
  SET_NOTES: 'SET_NOTES',
  REMOVE_NOTE: 'REMOVE_NOTE',
}

const initialState = {
  notes: [],
  loading: false,
}

function reducer(state, action) {
  const newState = { ...state }

  switch (action.type) {
    case actionTypes.SET_LOADING:
      newState.loading = action.payload
      return newState

    case actionTypes.ADD_NOTE:
      if (!newState.notes.find(n => n.id === action.payload.id)) {
        newState.notes.push(action.payload)
      } else {
        console.log('Id de la note déjà ajoutée, ', action.payload.id)
      }

      newState.loading = false

      return newState

    case actionTypes.SET_NOTES:
      newState.notes = action.payload

      newState.loading = false

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
