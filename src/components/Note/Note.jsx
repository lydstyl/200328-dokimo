import React, { useContext } from 'react'
import dayjs from 'dayjs'
import M from 'materialize-css/dist/js/materialize.min.js'

import { firestore } from '../../firebase/firebase'

import { NoteContext } from '../../pages/BatchNotes/NoteContext'

export const Note = ({ note }) => {
  const { id, date, title, content } = note

  const noteContext = useContext(NoteContext)
  const { actionTypes, dispatch } = noteContext

  const handleChange = evt => {
    const newNote = { ...note }

    newNote[evt.target.name] = evt.target.value

    dispatch({ type: actionTypes.SET_NOTE, payload: newNote })
  }

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

  const save = async _ => {
    try {
      await firestore.collection('notes').doc(id).update(note)

      M.toast({
        html: `Note sauvée`,
      })
    } catch (error) {
      console.log('Note -> error', error)
    }
  }

  return (
    <div className='row note'>
      <div className='col s12'>
        <div className='row head'>
          <div className='date'>
            <label className='col s3'>Le</label>
            <input
              className='col s9'
              onChange={handleChange}
              value={dayjs(date).format('YYYY-MM-DD')}
              type='date'
              name='date'
            />
          </div>

          <h2 className='title'>
            <label className='col s3'>Titre</label>
            <input
              className='col s9'
              onChange={handleChange}
              value={title}
              name='title'
              type='text'
            />
          </h2>
        </div>

        <div className='row body'>
          <label className='col s12'>Contenu</label>
          <textarea
            className='col s12'
            onChange={handleChange}
            value={content}
            name='content'
            cols='30'
            rows='10'
          ></textarea>
        </div>

        <div className='row foot'>
          <button className='col s6' onClick={save}>
            Sauver
          </button>

          <button className='col s6' onClick={removeNote}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  )
}
