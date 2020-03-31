import { createStore } from 'easy-peasy';

import userModel from './user/model';
import lessorsModel from './lessor/model';
import batchesModel from './batch/model';

const storeModel = {
  user: userModel,
  lessor: lessorsModel,
  batch: batchesModel
};

export default createStore(storeModel);
