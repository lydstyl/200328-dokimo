import { thunk, action } from 'easy-peasy';

import { auth } from '../../firebase/firebase';

import M from 'materialize-css/dist/js/materialize.min.js';

export default {
  isAuthenticated: false,

  signOut: thunk(async actions => {
    auth.signOut();

    actions.setIsAuthenticated(false); // 👈 dispatch local actions to update state
  }),

  createUserWithEmailAndPassword: thunk(async (actions, payload) => {
    auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .catch(function(error) {
        M.toast({ html: error.message });
      });

    M.toast({ html: 'createUserWithEmailAndPassword' });

    actions.setIsAuthenticated(true); // 👈 dispatch local actions to update state
  }),

  signInWithEmailAndPassword: thunk(async (actions, payload) => {
    auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .catch(function(error) {
        M.toast({ html: error.message });
      });

    M.toast({ html: 'signInWithEmailAndPassword' });

    actions.setIsAuthenticated(true); // 👈 dispatch local actions to update state
  }),

  setIsAuthenticated: action((state, payload) => {
    state.isAuthenticated = payload;
  })
};
