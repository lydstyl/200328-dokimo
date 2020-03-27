import { createStore } from 'easy-peasy';

const productsModel = {
  items: {
    1: { id: 1, name: 'Peas', price: 10 }
  }
};

const lessorsModel = [
  {
    companyName: 'SCI XXX',
    managerFirstName: 'Gabriel',
    managerLastName: 'Brun',
    address1: '10 Rue Denis Papin',
    address2: '',
    postalCode: '59300',
    townName: 'Valenciennes'
  },
  {
    managerFirstName: 'Jean',
    managerLastName: 'Brun',
    address1: '200 rue Baldure',
    address2: '',
    postalCode: '59590',
    townName: 'Raismes'
  }
];

const storeModel = {
  lessors: lessorsModel,
  products: productsModel
};

export default createStore(storeModel);
