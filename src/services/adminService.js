import { getDb, saveDb, delay, nextId } from '../mocks/db'
import { ApiError } from '../utils/errors'
import { apiConfig, request } from './apiClient'

function clone(v) {
  return JSON.parse(JSON.stringify(v))
}

export const adminService = {
  async overview() {
    if (!apiConfig.useMock) return request('/admin/overview')
    await delay()
    const db = getDb()
    const today = new Date().toISOString().slice(0, 10)
    return {
      totalUsers: db.users.length,
      activeLandlords: db.users.filter((u) => u.role === 'landlord' && u.status === 'active').length,
      activeProperties: db.properties.filter((p) => p.status === 'active').length,
      pendingApprovals: db.properties.filter((p) => p.status === 'pending').length,
      todayRevenue: db.payments
        .filter((p) => p.status === 'Success' && p.createdAt.startsWith(today))
        .reduce((s, p) => s + p.amount, 0),
      totalCoinSales: db.transactions.filter((t) => t.type === 'Purchase' && t.status === 'Success').reduce((s, t) => s + t.coins, 0),
      openReports: db.reports.filter((r) => r.status === 'open').length,
      series: db.analyticsSeries,
      recentActivity: db.adminLogs.slice(0, 6),
      pending: db.properties.filter((p) => p.status === 'pending'),
      reports: db.reports.slice(0, 5),
    }
  },

  async users({ role, status, q } = {}) {
    if (!apiConfig.useMock) return request('/admin/users')
    await delay()
    let list = getDb().users.filter((u) => u.role !== 'admin' || role === 'admin')
    if (role) list = list.filter((u) => u.role === role)
    if (status) list = list.filter((u) => u.status === status)
    if (q) {
      const s = q.toLowerCase()
      list = list.filter((u) => `${u.name} ${u.email}`.toLowerCase().includes(s))
    }
    return clone(list)
  },

  async user(id) {
    if (!apiConfig.useMock) return request(`/admin/users/${id}`)
    await delay()
    const db = getDb()
    const user = db.users.find((u) => u.id === id)
    if (!user) throw new ApiError(404, 'User not found')
    return {
      user: clone(user),
      properties: clone(db.properties.filter((p) => p.landlordId === id)),
      transactions: clone(db.transactions.filter((t) => t.userId === id)),
    }
  },

  async setUserStatus(id, status) {
    if (!apiConfig.useMock) return request(`/admin/users/${id}`, { method: 'PATCH', body: { status } })
    await delay()
    const db = getDb()
    const user = db.users.find((u) => u.id === id)
    if (!user) throw new ApiError(404, 'User not found')
    user.status = status
    saveDb(db)
    return clone(user)
  },

  async updateUser(id, payload) {
    if (!apiConfig.useMock) return request(`/admin/users/${id}`, { method: 'PATCH', body: payload })
    await delay()
    const db = getDb()
    const user = db.users.find((u) => u.id === id)
    if (!user) throw new ApiError(404, 'User not found')
    Object.assign(user, payload)
    saveDb(db)
    return clone(user)
  },

  async deleteUser(id) {
    if (!apiConfig.useMock) return request(`/admin/users/${id}`, { method: 'DELETE' })
    await delay()
    const db = getDb()
    db.users = db.users.filter((u) => u.id !== id)
    saveDb(db)
    return { ok: true }
  },

  async properties({ status, q } = {}) {
    if (!apiConfig.useMock) return request(`/admin/properties${query({ status, q })}`)
    await delay()
    let list = getDb().properties
    if (status) list = list.filter((p) => p.status === status)
    if (q) list = list.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()))
    return clone(list)
  },

  async approve(id, adminId) {
    if (!apiConfig.useMock) return request(`/admin/properties/${id}/moderation`, { method: 'PATCH', body: { action: 'approve' } })
    await delay()
    const db = getDb()
    const p = db.properties.find((x) => x.id === id)
    if (!p) throw new ApiError(404, 'Not found')
    p.status = 'active'
    p.verified = true
    delete p.rejectionReason
    log(db, adminId, 'Approved listing', id)
    saveDb(db)
    return clone(p)
  },

  async reject(id, adminId, reason) {
    if (!apiConfig.useMock) return request(`/admin/properties/${id}/moderation`, { method: 'PATCH', body: { action: 'reject', reason } })
    await delay()
    if (!reason) throw new ApiError(422, 'A rejection reason is required')
    const db = getDb()
    const p = db.properties.find((x) => x.id === id)
    if (!p) throw new ApiError(404, 'Not found')
    p.status = 'rejected'
    p.rejectionReason = reason
    log(db, adminId, 'Rejected listing', id)
    saveDb(db)
    return clone(p)
  },

  async suspendProperty(id, adminId) {
    if (!apiConfig.useMock) return request(`/admin/properties/${id}/moderation`, { method: 'PATCH', body: { action: 'suspend' } })
    await delay()
    const db = getDb()
    const p = db.properties.find((x) => x.id === id)
    if (!p) throw new ApiError(404, 'Not found')
    p.status = 'suspended'
    log(db, adminId, 'Suspended listing', id)
    saveDb(db)
    return clone(p)
  },

  async reports() {
    if (!apiConfig.useMock) return request('/admin/reports')
    await delay()
    return clone(getDb().reports)
  },

  async updateReport(id, adminId, action, extra = {}) {
    if (!apiConfig.useMock) return request(`/admin/reports/${id}`, { method: 'PATCH', body: { action, ...extra } })
    await delay()
    const db = getDb()
    const r = db.reports.find((x) => x.id === id)
    if (!r) throw new ApiError(404, 'Not found')
    if (action === 'dismiss') r.status = 'dismissed'
    if (action === 'investigate') r.status = 'investigating'
    if (action === 'suspend-listing' && r.targetType === 'property') {
      const p = db.properties.find((x) => x.id === r.targetId)
      if (p) p.status = 'suspended'
      r.status = 'resolved'
    }
    if (action === 'suspend-user' || action === 'block-user') {
      const uid = extra.userId || r.relatedUserId || r.reporterId
      const user = db.users.find((u) => u.id === uid)
      if (user) user.status = action === 'block-user' ? 'blocked' : 'suspended'
      r.status = 'resolved'
    }
    r.history.push({ action, by: adminId, at: new Date().toISOString() })
    log(db, adminId, `Report ${action}`, id)
    saveDb(db)
    return clone(r)
  },

  async payments() {
    if (!apiConfig.useMock) return request('/admin/payments')
    await delay()
    return clone(getDb().payments)
  },

  async refund(paymentId, adminId) {
    if (!apiConfig.useMock) return request(`/admin/payments/${paymentId}/refund`, { method: 'POST' })
    await delay()
    const db = getDb()
    const payment = db.payments.find((p) => p.id === paymentId)
    if (!payment) throw new ApiError(404, 'Not found')
    payment.status = 'Refunded'
    const packCoins = payment.coins || 0
    if (db.wallets[payment.userId]) {
      db.wallets[payment.userId].coinBalance = Math.max(0, db.wallets[payment.userId].coinBalance - packCoins)
    }
    db.transactions.unshift({
      id: nextId('t'),
      userId: payment.userId,
      type: 'Refund',
      coins: -packCoins,
      amount: payment.amount,
      paymentMethod: payment.method,
      status: 'Refunded',
      description: `Refund for payment ${payment.id}`,
      createdAt: new Date().toISOString(),
    })
    log(db, adminId, 'Refunded payment', paymentId)
    saveDb(db)
    return clone(payment)
  },

  async coinTransactions() {
    if (!apiConfig.useMock) return request('/admin/coin-transactions')
    await delay()
    return clone(getDb().transactions)
  },

  async analytics() {
    if (!apiConfig.useMock) return request('/admin/analytics')
    await delay()
    const db = getDb()
    return {
      users: db.users.length,
      landlords: db.users.filter((u) => u.role === 'landlord').length,
      tenants: db.users.filter((u) => u.role === 'tenant').length,
      properties: db.properties.length,
      views: db.properties.reduce((s, p) => s + p.views, 0),
      saved: db.saved.length,
      chats: db.conversations.length,
      unlocks: db.contactUnlocks.length,
      coinSales: db.transactions.filter((t) => t.type === 'Purchase').reduce((s, t) => s + Math.max(0, t.coins), 0),
      revenue: db.payments.filter((p) => p.status === 'Success').reduce((s, p) => s + p.amount, 0),
      reports: db.reports.length,
      series: db.analyticsSeries,
    }
  },

  async settings() {
    if (!apiConfig.useMock) return request('/admin/settings')
    await delay()
    return clone(getDb().settings)
  },

  async saveSettings(payload, adminId) {
    if (!apiConfig.useMock) return request('/admin/settings', { method: 'PUT', body: payload })
    await delay()
    const db = getDb()
    db.settings = { ...db.settings, ...payload }
    log(db, adminId, 'Updated settings', 'platform')
    saveDb(db)
    return clone(db.settings)
  },

  async logs() {
    if (!apiConfig.useMock) return request('/admin/logs')
    await delay()
    return clone(getDb().adminLogs)
  },

  async sendNotification({ title, body, audience }, adminId) {
    if (!apiConfig.useMock) return request('/admin/notifications', { method: 'POST', body: { title, body, audience } })
    await delay()
    const db = getDb()
    const targets = db.users.filter((u) => {
      if (audience === 'all') return true
      return u.role === audience
    })
    targets.forEach((u) => {
      db.notifications.unshift({
        id: nextId('n'),
        userId: u.id,
        title,
        body,
        read: false,
        createdAt: new Date().toISOString(),
        link: '/',
      })
    })
    log(db, adminId, 'Sent notification', audience)
    saveDb(db)
    return { sent: targets.length }
  },
}

function log(db, adminId, action, target) {
  db.adminLogs.unshift({
    id: nextId('log'),
    adminId,
    action,
    target,
    date: new Date().toISOString(),
    ip: '103.4.x.x',
    device: 'Admin console',
    status: 'Success',
  })
}

function query(params = {}) {
  const entries = Object.entries(params).filter(([, value]) => value !== '' && value != null)
  return entries.length ? `?${new URLSearchParams(entries).toString()}` : ''
}
