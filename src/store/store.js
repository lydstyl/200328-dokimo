import { createStore } from 'easy-peasy';

import userModel from './user/model';
import lessorsModel from './lessor/model';

const storeModel = {
  user: userModel,
  lessor: lessorsModel
};

export default createStore(storeModel);
