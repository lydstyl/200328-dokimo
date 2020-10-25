import { thunk } from 'easy-peasy'

export const paymentThunks = {
  firestoreAddPayment: thunk(async (actions, payload) => {
    actions.firestoreUpdateBatch(payload.batch)

    actions.addPayment(payload.payment)
  }),

  firestoreDeletePayment: thunk(async (actions, payload) => {
    actions.setLoading(true)
    const newPayments = payload.batch.payments.filter(
      payment => payment.id !== payload.paymentId
    )

    const newBatch = { ...payload.batch, payments: newPayments }

    actions.firestoreUpdateBatch(newBatch)

    actions.delPayment({ bid: newBatch.id, pid: payload.paymentId })

    actions.setLoading(false)
  }),
}
