import { thunk } from 'easy-peasy'

import { firestore } from '../../firebase/firebase'

export const batchesThunks = {
  firestoreAddBatch: thunk(async (actions, payload) => {
    actions.setLoading(true)

    if (!payload.payments) {
      payload.payments = []
    }

    firestore
      .collection('batches')
      .add(payload)
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id)

        actions.addBatch({ ...payload, id: docRef.id }) // 👈 dispatch local actions to update state

        actions.setLoading(false)
      })
      .catch(function (error) {
        console.error('Error adding document: ', error)

        actions.setLoading(false)
      })
  }),

  firestoreGetBatches: thunk(async (actions, payload) => {
    actions.setLoading(true)

    firestore
      .collection('batches')
      .where('uid', '==', payload)
      .get()
      .then(querySnapshot => {
        const batches = []

        querySnapshot.forEach(doc => {
          batches.push({ ...doc.data(), id: doc.id })
        })

        batches.map(batch => {
          batch.balance = parseFloat(batch.balance)
          batch.rent = parseFloat(batch.rent)
          batch.charge = parseFloat(batch.charge)
          return batch
        })

        actions.setBatches(batches)

        actions.setLoading(false)
      })
      .catch(function (error) {
        console.error('Error adding document: ', error)

        actions.setLoading(false)
      })
  }),

  firestoreUpdateBatch: thunk(async (actions, payload) => {
    actions.setLoading(true)

    firestore.collection('batches').doc(payload.id).update(payload)
    actions.updateBatch(payload)

    actions.setLoading(false)
  }),

  firestoreDelBatch: thunk(async (actions, payload) => {
    actions.setLoading(true)

    firestore
      .collection('batches')
      .doc(payload)
      .delete()
      .then(function () {
        console.log('Document successfully deleted!')

        actions.delBatch(payload)

        actions.setLoading(false)
      })
      .catch(function (error) {
        console.error('Error removing document: ', error)

        actions.setLoading(false)
      })
  }),
}
