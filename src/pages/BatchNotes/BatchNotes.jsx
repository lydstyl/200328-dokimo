import React, { useContext, useEffect } from 'react'

import { NoteContext } from './NoteContext'
import { firestore } from '../../firebase/firebase'
import { Note } from '../../components/Note/Note'

export const BatchNotes = () => {
  const noteContext = useContext(NoteContext)

  const { batch, actionTypes, state, dispatch } = noteContext

  const { id: bid, name } = batch

  const addNote = async _ => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true })

    try {
      const note = {
        bid,
        batchName: batch.name,
        date: new Date(),
        title: state.notes.length + 1,
        content: '',
      }

      const docRef = await firestore.collection('notes').add(note)

      note.id = docRef.id

      dispatch({ type: actionTypes.ADD_NOTE, payload: note })
    } catch (error) {
      console.log('BatchNotes -> error', error)

      dispatch({ type: actionTypes.SET_LOADING, payload: false })
    }
  }

  useEffect(() => {
    ;(async _ => {
      dispatch({ type: actionTypes.SET_LOADING, payload: true })

      try {
        const querySnapshot = await firestore
          .collection('notes')
          .where('bid', '==', bid)
          .get()

        const notes = []

        querySnapshot.forEach(doc => {
          notes.push({ ...doc.data(), id: doc.id })
        })

        // TODO sort notes by date

        dispatch({ type: actionTypes.SET_NOTES, payload: notes })
      } catch (error) {
        console.log('BatchNotes -> error', error)

        dispatch({ type: actionTypes.SET_LOADING, payload: false })
      }
    })()
  }, [])

  return (
    <div className='row other'>
      <h1 className='col s12'>Notes à propos du lot {name}</h1>

      <button onClick={addNote}>Ajouter une note</button>

      <div className='notes'>
        {state.loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {state.notes.length ? (
              <>
                {state.notes.map(n => (
                  <Note key={n.id} note={n} />
                ))}
              </>
            ) : (
              <p>Il n'y a pas de note.</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
