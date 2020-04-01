import { thunk, action } from 'easy-peasy';
import { firestore } from '../../firebase/firebase';

export default {
  loading: false,
  batches: [],

  // THUNKS
  firestoreAddBatch: thunk(async (actions, payload) => {
    actions.setLoading(true);

    firestore
      .collection('batches')
      .add(payload)
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);

        actions.addBatch({ ...payload, id: docRef.id }); // 👈 dispatch local actions to update state

        actions.setLoading(false);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);

        actions.setLoading(false);
      });
  }),

  firestoreGetBatches: thunk(async (actions, payload) => {
    actions.setLoading(true);

    firestore
      .collection('batches')
      .where('uid', '==', payload)
      .get()
      .then(querySnapshot => {
        const batches = [];

        querySnapshot.forEach(doc => {
          batches.push({ ...doc.data(), id: doc.id });
        });

        actions.setBatches(batches);

        actions.setLoading(false);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);

        actions.setLoading(false);
      });
  }),

  // ACTIONS
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),

  addBatch: action((state, payload) => {
    state.batches.push(payload);
  }),

  setBatches: action((state, payload) => {
    state.batches = payload;
  })

  // delLessor: action((state, payload) => {
  //   state.lessors = state.lessors.filter(lessor => lessor.id !== payload);
  // })
};
