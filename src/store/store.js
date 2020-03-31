import { createStore } from 'easy-peasy';

import userModel from './user/model';
import lessorsModel from './lessor/model';
import tenantsModel from './tenant/model';
import batchesModel from './batch/model';

const storeModel = {
  user: userModel,
  lessor: lessorsModel,
  tenant: tenantsModel,
  batch: batchesModel
};

export default createStore(storeModel);
