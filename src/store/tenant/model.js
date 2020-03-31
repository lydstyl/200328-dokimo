import { thunk, action } from 'easy-peasy';
import { firestore } from '../../firebase/firebase';

export default {
  loading: false,
  tenants: [],

  // THUNKS
  firestoreAddTenant: thunk(async (actions, payload) => {
    actions.setLoading(true);

    firestore
      .collection('tenants')
      .add(payload)
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);

        actions.addTenant({ ...payload, id: docRef.id }); // 👈 dispatch local actions to update state

        actions.setLoading(false);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);

        actions.setLoading(false);
      });
  }),

  firestoreGetTenants: thunk(async (actions, payload) => {
    actions.setLoading(true);

    firestore
      .collection('tenants')
      .where('uid', '==', payload)
      .get()
      .then(querySnapshot => {
        const tenants = [];

        querySnapshot.forEach(doc => {
          tenants.push({ ...doc.data(), id: doc.id });
        });

        actions.setTenants(tenants);

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

  addTenant: action((state, payload) => {
    state.tenants.push(payload);
  }),

  setTenants: action((state, payload) => {
    state.tenants = payload;
  })
};
