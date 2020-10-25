import React, { useEffect } from 'react'

import { useNote } from './useNote'

export const BatchNotes = () => {
  const noteHook = useNote()

  const { batch, actionTypes, state, dispatch } = noteHook

  const { id: bid, name } = batch

  const addNote = async _ => {
    try {
      const note = {
        bid,
        batchName: batch.name,
        date: new Date(),
        title: '',
        content: '',
      }

      // note.id = id;

      dispatch({ type: actionTypes.ADD_NOTE, payload: note })
    } catch (error) {
      console.log('BatchNotes -> error', error)
    }
  }

  useEffect(() => {
    // get notes from firestore sorted by date
  }, [])

  return (
    <div className='row other'>
      <h1 className='col s12'>Notes à propos du lot {name}</h1>

      <button onClick={addNote}>Ajouter une note</button>

      <pre>{JSON.stringify(state, null, 4)}</pre>
    </div>
  )
}
