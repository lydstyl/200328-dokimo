import { action } from 'easy-peasy'
import M from 'materialize-css/dist/js/materialize.min.js'

export const allBatchActions = {
  setLoading: action((state, payload) => {
    state.loading = payload
  }),

  // Batch
  addBatch: action((state, payload) => {
    state.batches.push(payload)
  }),

  updateBatch: action((state, payload) => {
    state.batches.map(batch => {
      if (batch.id === payload.id) {
        return payload
      }
      return batch
    })
  }),

  setBatches: action((state, payload) => {
    state.batches = payload
  }),

  delBatch: action((state, payload) => {
    state.batches = state.batches.filter(batch => batch.id !== payload)
  }),

  // Term
  addTerm: action((state, payload) => {
    state.terms.push(payload)
  }),

  setTerms: action((state, payload) => {
    state.terms = payload
  }),

  delTerm: action((state, payload) => {
    state.terms = state.terms.filter(term => term.id !== payload)
  }),

  // Payment
  addPayment: action((state, payload) => {
    state.batches.forEach(batch => {
      if (batch.id === payload.bid) {
        // add to payments list
        const amount = parseFloat(payload.amount)
        if (!batch.payments) {
          batch.payments = []
        }

        if (!payload.id) {
          return // fix double add payment
        }

        batch.payments.push({ date: payload.date, amount })

        // update balance
        batch.balance -= amount

        M.toast({
          html: `Paiment ajouté au store, nouvelle balance : ${batch.balance}`,
        })
      }
    })
  }),

  delPayment: action((state, payload) => {
    const { bid, pid } = payload

    state.batches = state.batches.map(batch => {
      if (batch.id === bid) {
        const newBatch = { ...batch }
        newBatch.payments = newBatch.payments.filter(
          payment => payment.id !== pid
        )

        return newBatch
      }
      return batch
    })
  }),
}
