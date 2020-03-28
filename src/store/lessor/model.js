import { action } from 'easy-peasy';

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

  addLessor: action((state, payload) => {
    state.lessors.push(payload);
  }),

  delLessor: action((state, payload) => {
    state.lessors = state.lessors.filter(lessor => lessor.id !== payload);
  })
};
