import { action } from 'easy-peasy';

export default {
  isAuthenticated: false,

  setIsAuthenticated: action((state, payload) => {
    state.isAuthenticated = payload;
  })
};
