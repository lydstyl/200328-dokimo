import { thunk, action } from 'easy-peasy';
import { firestore } from '../../firebase/firebase';

import M from 'materialize-css/dist/js/materialize.min.js';

export default {
  loading: false,
  terms: [],
  batches: [],

  utils: {
    inputDateExtractor: (inputValue) => {
      const tmp = inputValue.split('-');

      return {
        string: inputValue,
        year: parseInt(tmp[0], 10),
        month: parseInt(tmp[1], 10),
        day: parseInt(tmp[2], 10),
      };
    },

    prefix0: (number) => {
      if (
        number < 10
        // && number.split(0) != 0
      )
        return '0' + number;
      return number;
    },

    enDateToFr: (date) => {
      date = date.split('-');
      return [date[2], date[1], date[0]].join('-');
    },
  },

  // THUNKS
  firestoreAddBatch: thunk(async (actions, payload) => {
    actions.setLoading(true);

    firestore
      .collection('batches')
      .add(payload)
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id);

        actions.addBatch({ ...payload, id: docRef.id }); // 👈 dispatch local actions to update state

        actions.setLoading(false);
      })
      .catch(function (error) {
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
      .then((querySnapshot) => {
        const batches = [];

        querySnapshot.forEach((doc) => {
          batches.push({ ...doc.data(), id: doc.id });
        });

        batches.map((batch) => {
          batch.balance = parseFloat(batch.balance);
          batch.rent = parseFloat(batch.rent);
          batch.charge = parseFloat(batch.charge);
          return batch;
        });

        actions.setBatches(batches);

        actions.setLoading(false);
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);

        actions.setLoading(false);
      });
  }),

  firestoreAddTerm: thunk(async (actions, payload) => {
    actions.setLoading(true);

    firestore
      .collection('terms')
      .add(payload)
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id);

        actions.addTerm({ ...payload, id: docRef.id }); // 👈 dispatch local actions to update state

        actions.setLoading(false);
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);

        actions.setLoading(false);
      });
  }),

  firestoreGetTerms: thunk(async (actions, payload) => {
    actions.setLoading(true);

    firestore
      .collection('terms')
      .where('uid', '==', payload)
      .get()
      .then((querySnapshot) => {
        const terms = [];

        querySnapshot.forEach((doc) => {
          terms.push({ ...doc.data(), id: doc.id });
        });

        actions.setTerms(terms);

        actions.setLoading(false);
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);

        actions.setLoading(false);
      });
  }),

  firestoreDelTerm: thunk(async (actions, payload) => {
    actions.setLoading(true);

    firestore
      .collection('terms')
      .doc(payload)
      .delete()
      .then(function () {
        console.log('Document successfully deleted!');

        actions.delTerm(payload);

        actions.setLoading(false);
      })
      .catch(function (error) {
        console.error('Error removing document: ', error);

        actions.setLoading(false);
      });
  }),

  // ACTIONS
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),

  // Batch
  addBatch: action((state, payload) => {
    state.batches.push(payload);
  }),

  setBatches: action((state, payload) => {
    state.batches = payload;
  }),

  // Term
  addTerm: action((state, payload) => {
    state.terms.push(payload);
  }),

  setTerms: action((state, payload) => {
    state.terms = payload;
  }),

  delTerm: action((state, payload) => {
    state.terms = state.terms.filter((term) => term.id !== payload);
  }),

  // Payment
  addPayment: action((state, payload) => {
    console.log(payload); // {bid: "cRAuH60aUd2OXPIVxmAX", date: "08/04/2020", amount: "55"}

    state.batches.forEach((batch) => {
      if (batch.id === payload.bid) {
        // add to payments list
        const amount = parseFloat(payload.amount);
        if (!batch.payments) {
          batch.payments = [];
        }
        batch.payments.push({ date: payload.date, amount });

        // update balance
        batch.balance -= amount;

        M.toast({
          html: `Paiment ajouté au store, nouvelle balance : ${batch.balance}`,
        });
      }
    });
  }),
};
