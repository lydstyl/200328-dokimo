import { batchUtils } from './batchUtils'
import { batchesThunks } from './batchesThunks'
import { termThunks } from './termThunks'
import { allBatchActions } from './allBatchActions'
import { paymentThunks } from './paymentThunks'

export default {
  // INITIAL STATE
  loading: false,
  terms: [],
  batches: [],

  // UTILS
  utils: {
    ...batchUtils,
  },

  // THUNKS

  ...batchesThunks,

  ...termThunks,

  ...paymentThunks,

  // ACTIONS
  ...allBatchActions,
}
