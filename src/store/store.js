import { createStore } from 'easy-peasy';

import lessorsModel from './lessor/model';

const productsModel = {
  items: {
    1: { id: 1, name: 'Peas', price: 10 }
  }
};

const storeModel = {
  lessor: lessorsModel,
  products: productsModel
};

export default createStore(storeModel);
