import { thunk } from 'easy-peasy'

import { firestore } from '../../firebase/firebase'

export const termThunks = {
  firestoreAddTerm: thunk(async (actions, payload) => {
    actions.setLoading(true)

    firestore
      .collection('terms')
      .add(payload)
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id)

        actions.addTerm({ ...payload, id: docRef.id }) // 👈 dispatch local actions to update state

        actions.setLoading(false)
      })
      .catch(function (error) {
        console.error('Error adding document: ', error)

        actions.setLoading(false)
      })
  }),

  firestoreGetTerms: thunk(async (actions, payload) => {
    actions.setLoading(true)

    firestore
      .collection('terms')
      .where('uid', '==', payload)
      .get()
      .then(querySnapshot => {
        const terms = []

        querySnapshot.forEach(doc => {
          terms.push({ ...doc.data(), id: doc.id })
        })

        actions.setTerms(terms)

        actions.setLoading(false)
      })
      .catch(function (error) {
        console.error('Error adding document: ', error)

        actions.setLoading(false)
      })
  }),

  firestoreDelTerm: thunk(async (actions, payload) => {
    actions.setLoading(true)

    firestore
      .collection('terms')
      .doc(payload)
      .delete()
      .then(function () {
        console.log('Document successfully deleted!')

        actions.delTerm(payload)

        actions.setLoading(false)
      })
      .catch(function (error) {
        console.error('Error removing document: ', error)

        actions.setLoading(false)
      })
  }),
}
