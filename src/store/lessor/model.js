import { thunk, action } from 'easy-peasy';
import { firestore } from '../../firebase/firebase';

export default {
  lessors: [
    {
      id: 1,
      companyName: 'SCI XXX',
      managerFirstName: 'Gabriel',
      managerLastName: 'Brun',
      address1: '10 Rue Denis Papin',
      address2: '',
      postalCode: '59300',
      townName: 'Valenciennes'
    },
    {
      id: 2,
      managerFirstName: 'Jean',
      managerLastName: 'Brun',
      address1: '200 rue Baldure',
      address2: '',
      postalCode: '59590',
      townName: 'Raismes'
    }
  ],

  // THUNKS
  firestoreAddLessor: thunk(async (actions, payload) => {
    firestore
      .collection('lessors')
      .add(payload)
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);

        actions.addLessor({ ...payload, id: docRef.id }); // 👈 dispatch local actions to update state
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  }),

  // ACTIONS

  addLessor: action((state, payload) => {
    state.lessors.push(payload);
  }),

  delLessor: action((state, payload) => {
    state.lessors = state.lessors.filter(lessor => lessor.id !== payload);
  })
};
