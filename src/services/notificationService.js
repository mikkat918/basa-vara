import { getDb, saveDb, delay } from '../mocks/db'
import { apiConfig, request } from './apiClient'

export const notificationService = {
  async list(userId) {
    if (!apiConfig.useMock) return request('/notifications')
    await delay()
    return getDb()
      .notifications.filter((n) => n.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },

  async markRead(id, userId) {
    if (!apiConfig.useMock) return request(`/notifications/${id}/read`, { method: 'POST' })
    await delay(80)
    const db = getDb()
    const n = db.notifications.find((x) => x.id === id && x.userId === userId)
    if (n) n.read = true
    saveDb(db)
    return { ok: true }
  },

  async markAll(userId) {
    await delay(80)
    const db = getDb()
    db.notifications.filter((n) => n.userId === userId).forEach((n) => {
      n.read = true
    })
    saveDb(db)
    return { ok: true }
  },
}
