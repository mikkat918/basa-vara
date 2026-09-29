import { COIN_PACKAGES } from '../utils/constants'
import { getDb, saveDb, delay, nextId } from '../mocks/db'
import { ApiError } from '../utils/errors'
import { apiConfig, request } from './apiClient'

export const paymentService = {
  async createPayment({ userId, packageId, method }) {
    if (!apiConfig.useMock) return request('/payments', { method: 'POST', body: { packageId, method } })
    await delay()
    const pack = COIN_PACKAGES.find((p) => p.id === packageId)
    if (!pack) throw new ApiError(422, 'Unknown package')
    const db = getDb()
    const payment = {
      id: nextId('pay'),
      userId,
      packageId,
      amount: pack.amount,
      coins: pack.coins,
      method,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    }
    db.payments.unshift(payment)
    db.pendingPayments[payment.id] = payment
    saveDb(db)
    return {
      paymentId: payment.id,
      status: 'Pending',
      redirectHint: 'Awaiting gateway confirmation from bKash / Nagad / card processor.',
    }
  },

  async verifyPayment(paymentId) {
    if (!apiConfig.useMock) return request(`/payments/${paymentId}/verify`, { method: 'POST' })
    await delay()
    const db = getDb()
    const payment = db.payments.find((p) => p.id === paymentId)
    if (!payment) throw new ApiError(404, 'Payment not found')
    return { paymentId, status: payment.status }
  },

  async getPaymentStatus(paymentId) {
    if (!apiConfig.useMock) return request(`/payments/${paymentId}`)
    await delay()
    const db = getDb()
    const payment = db.payments.find((p) => p.id === paymentId)
    if (!payment) throw new ApiError(404, 'Payment not found')
    return payment
  },

  async cancelPayment(paymentId, userId) {
    if (!apiConfig.useMock) return request(`/payments/${paymentId}/cancel`, { method: 'POST' })
    await delay()
    const db = getDb()
    const payment = db.payments.find((p) => p.id === paymentId && p.userId === userId)
    if (!payment) throw new ApiError(404, 'Payment not found')
    if (payment.status === 'Pending') payment.status = 'Cancelled'
    saveDb(db)
    return payment
  },
}
