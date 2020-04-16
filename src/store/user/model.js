import { thunk, action } from 'easy-peasy';

import { auth } from '../../firebase/firebase';

import M from 'materialize-css/dist/js/materialize.min.js';

export default {
  user: null,
  isAuthenticated: false,
  loading: false,
  email: null,

  // THUNKS
  signOut: thunk(async (actions) => {
    auth.signOut();

    actions.setIsAuthenticated(false); // 👈 dispatch local actions to update state
  }),

  onAuthStateChanged: thunk(async (actions, payload) => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        // var uid = user.uid;
        // var email = user.email;
        // var photoURL = user.photoURL;

        actions.setUser(user); // 👈 dispatch local actions to update state
        actions.setIsAuthenticated(true); // 👈 dispatch local actions to update state
        M.toast({ html: `Utilisateur connecté` });
      } else {
        // User is signed out.
        actions.setIsAuthenticated(false); // 👈 dispatch local actions to update state

        M.toast({ html: 'Utilisateur déconnecté' });
      }
    });
  }),

  createUserWithEmailAndPassword: thunk(async (actions, payload) => {
    auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .catch(function (error) {
        M.toast({ html: 'Erreur: ' + error.message });
      });

    M.toast({ html: 'Utilisateur créé' });

    actions.setIsAuthenticated(true); // 👈 dispatch local actions to update state
  }),

  signInWithEmailAndPassword: thunk(async (actions, payload) => {
    auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .catch(function (error) {
        M.toast({ html: 'Erreur: ' + error.message });
      });

    M.toast({ html: 'Connection avec e-mail et mot de passe' });

    actions.setIsAuthenticated(true); // 👈 dispatch local actions to update state
  }),

  sendPasswordResetEmail: thunk(async (actions, payload) => {
    var emailAddress = payload;

    auth
      .sendPasswordResetEmail(emailAddress)
      .then(function () {
        // Email sent.
        M.toast({ html: 'Un e-mail de réinitialisation vous a été envoyé.' });
      })
      .catch(function (error) {
        // An error happened.
        M.toast({
          html: 'Erreur: ' + error.message,
        });
      });
  }),

  // ACTIONS
  setUser: action((state, payload) => {
    state.user = payload;
    state.email = payload.email;
    state.uid = payload.uid;
  }),

  setIsAuthenticated: action((state, payload) => {
    state.isAuthenticated = payload;

    if (!payload) {
      state.uid = null;
      state.email = null;
    }
  }),
};
