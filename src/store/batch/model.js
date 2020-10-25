import { batchUtils } from './batchUtils'
import { batchesThunks } from './batchesThunks'
import { termThunks } from './termThunks'
import { paymentThunks } from './paymentThunks'
import { allBatchActions } from './allBatchActions'

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

  // ...batchRentReviewThunks,

  // ACTIONS
  ...allBatchActions,
}
