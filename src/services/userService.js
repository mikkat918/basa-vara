import { getDb, saveDb, delay } from '../mocks/db'
import { ApiError } from '../utils/errors'
import { passwordRule } from '../utils/validators'
import { apiConfig, request } from './apiClient'

export const userService = {
  async updateProfile(userId, payload) {
    if (!apiConfig.useMock) return request('/me', { method: 'PUT', body: payload })
    await delay()
    const db = getDb()
    const user = db.users.find((u) => u.id === userId)
    if (!user) throw new ApiError(404, 'User not found')
    Object.assign(user, payload)
    saveDb(db)
    return user
  },

  async changePassword(userId, { currentPassword, password, confirmPassword }) {
    if (!apiConfig.useMock) return request('/me/password', { method: 'POST', body: { currentPassword, password } })
    await delay()
    const err = passwordRule(password)
    if (err) throw new ApiError(422, err)
    if (password !== confirmPassword) throw new ApiError(422, 'Passwords do not match')
    if (!currentPassword) throw new ApiError(422, 'Current password is required')
    return { ok: true }
  },

  async deleteAccount(userId) {
    if (!apiConfig.useMock) return request('/me', { method: 'DELETE' })
    await delay()
    const db = getDb()
    const user = db.users.find((u) => u.id === userId)
    if (user) user.status = 'deleted'
    saveDb(db)
    return { ok: true }
  },

  async blocked(userId) {
    await delay()
    const db = getDb()
    const ids = db.blockedUsers.filter((b) => b.userId === userId).map((b) => b.blockedId)
    return db.users.filter((u) => ids.includes(u.id)).map((u) => ({ id: u.id, name: u.name, email: u.email }))
  },

  async unblock(userId, blockedId) {
    await delay()
    const db = getDb()
    db.blockedUsers = db.blockedUsers.filter((b) => !(b.userId === userId && b.blockedId === blockedId))
    saveDb(db)
    return { ok: true }
  },
}
