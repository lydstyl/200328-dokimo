import React, { useContext } from 'react'
import dayjs from 'dayjs'

import { firestore } from '../../firebase/firebase'

import { NoteContext } from '../../pages/BatchNotes/NoteContext'

export const Note = ({ note }) => {
  const { id, date, title, content } = note

  const noteContext = useContext(NoteContext)

  const {
    actionTypes,
    // state,
    dispatch,
  } = noteContext

  const removeNote = async _ => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true })

    try {
      await firestore.collection('notes').doc(id).delete()

      console.log('Note supprimée')

      dispatch({ type: actionTypes.REMOVE_NOTE, payload: id })
    } catch (error) {
      console.log('Note -> error', error)

      dispatch({ type: actionTypes.SET_LOADING, payload: false })
    }
  }

  return (
    <div className='note'>
      <div className='head'>
        <div className='date'>Le {dayjs(date).format('DD/MM/YYYY')}</div>
        <h2 className='title'>Titre {title}</h2>
      </div>

      <div className='body'>Content {content}</div>

      <div className='foot'>
        <button>Sauver</button>
        <button onClick={removeNote}>Supprimer</button>
      </div>
    </div>
  )
}
