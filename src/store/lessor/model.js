import { thunk, action } from 'easy-peasy';
import { firestore } from '../../firebase/firebase';

export default {
  lessors: [],

  loading: false,

  // THUNKS
  firestoreAddLessor: thunk(async (actions, payload) => {
    actions.setLoading(true);

    firestore
      .collection('lessors')
      .add(payload)
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);

        //actions.addLessor({ ...payload, id: docRef.id }); // 👈 dispatch local actions to update state

        actions.setLoading(false);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);

        actions.setLoading(false);
      });
  }),

  firestoreGetLessors: thunk(async (actions, payload) => {
    actions.setLoading(true);

    firestore
      .collection('lessors')
      .where('uid', '==', payload)
      .get()
      .then(querySnapshot => {
        const lessors = [];

        querySnapshot.forEach(doc => {
          lessors.push({ ...doc.data(), id: doc.id });
        });

        actions.setLessors(lessors);

        actions.setLoading(false);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);

        actions.setLoading(false);
      });
  }),

  firestoreDelLessor: thunk(async (actions, payload) => {
    actions.setLoading(true);

    firestore
      .collection('lessors')
      .doc(payload)
      .delete()
      .then(function() {
        console.log('Document successfully deleted!');

        actions.delLessor(payload);

        actions.setLoading(false);
      })
      .catch(function(error) {
        console.error('Error removing document: ', error);

        actions.setLoading(false);
      });
  }),

  // ACTIONS
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),

  // addLessor: action((state, payload) => {
  //   state.lessors.push(payload);
  // }),

  setLessors: action((state, payload) => {
    state.lessors = payload;
  }),

  delLessor: action((state, payload) => {
    state.lessors = state.lessors.filter(lessor => lessor.id !== payload);
  })
};
