import React from 'react'

export const Note = ({ note }) => {
  console.log('Note -> note', note)

  const { date, title, content } = note

  return (
    <div className='note'>
      <div className='head'>
        <div className='date'></div>
        <h2 className='title'>Titre {title}</h2>
      </div>

      <div className='body'>{content}</div>

      <div className='foot'>
        <button>Sauver</button>
        <button>Supprimer</button>
      </div>
    </div>
  )
}
