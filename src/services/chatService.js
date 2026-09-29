import { getDb, saveDb, delay, nextId } from '../mocks/db'
import { ApiError } from '../utils/errors'
import { apiConfig, request } from './apiClient'

function clone(v) {
  return JSON.parse(JSON.stringify(v))
}

export const chatService = {
  async listConversations(userId) {
    if (!apiConfig.useMock) return request('/chat/conversations')
    await delay()
    const db = getDb()
    const list = db.conversations
      .filter((c) => c.tenantId === userId || c.landlordId === userId)
      .filter((c) => !c.blockedBy.includes(userId))
      .map((c) => enrich(c, db, userId))
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    return list
  },

  async getConversation(id, userId) {
    if (!apiConfig.useMock) return request(`/chat/conversations/${id}`)
    await delay()
    const db = getDb()
    const c = db.conversations.find((x) => x.id === id)
    if (!c) throw new ApiError(404, 'Conversation not found')
    if (c.tenantId !== userId && c.landlordId !== userId) throw new ApiError(403, 'Forbidden')
    return enrich(c, db, userId)
  },

  async getMessages(conversationId, userId) {
    if (!apiConfig.useMock) return request(`/chat/conversations/${conversationId}/messages`)
    await delay()
    const db = getDb()
    const c = db.conversations.find((x) => x.id === conversationId)
    if (!c || (c.tenantId !== userId && c.landlordId !== userId)) throw new ApiError(403, 'Forbidden')
    db.messages
      .filter((m) => m.conversationId === conversationId && m.senderId !== userId)
      .forEach((m) => {
        m.read = true
      })
    saveDb(db)
    return clone(db.messages.filter((m) => m.conversationId === conversationId))
  },

  async sendMessage(conversationId, userId, message) {
    if (!apiConfig.useMock) return request(`/chat/conversations/${conversationId}/messages`, { method: 'POST', body: { message } })
    await delay(160)
    if (!message?.trim()) throw new ApiError(422, 'Message cannot be empty')
    const db = getDb()
    const c = db.conversations.find((x) => x.id === conversationId)
    if (!c) throw new ApiError(404, 'Conversation not found')
    if (c.blockedBy.length) throw new ApiError(403, 'This conversation is blocked')
    const msg = {
      id: nextId('m'),
      conversationId,
      senderId: userId,
      message: message.trim(),
      timestamp: new Date().toISOString(),
      read: false,
    }
    db.messages.push(msg)
    c.updatedAt = msg.timestamp
    const other = c.tenantId === userId ? c.landlordId : c.tenantId
    db.notifications.unshift({
      id: nextId('n'),
      userId: other,
      title: 'New message',
      body: message.trim().slice(0, 80),
      read: false,
      createdAt: msg.timestamp,
      link: c.tenantId === other ? '/dashboard/messages' : '/landlord/messages',
    })
    saveDb(db)
    return clone(msg)
  },

  async startConversation(tenantId, landlordId, propertyId) {
    if (!apiConfig.useMock) return request('/chat/conversations', { method: 'POST', body: { landlordId, propertyId } })
    await delay()
    const db = getDb()
    let c = db.conversations.find(
      (x) => x.tenantId === tenantId && x.landlordId === landlordId && x.propertyId === propertyId,
    )
    if (!c) {
      c = {
        id: nextId('c'),
        tenantId,
        landlordId,
        propertyId,
        updatedAt: new Date().toISOString(),
        blockedBy: [],
      }
      db.conversations.unshift(c)
      const p = db.properties.find((x) => x.id === propertyId)
      if (p) p.inquiries += 1
      saveDb(db)
    }
    return clone(c)
  },

  async block(conversationId, userId) {
    if (!apiConfig.useMock) return request(`/chat/conversations/${conversationId}/block`, { method: 'POST' })
    await delay()
    const db = getDb()
    const c = db.conversations.find((x) => x.id === conversationId)
    if (!c) throw new ApiError(404, 'Conversation not found')
    if (!c.blockedBy.includes(userId)) c.blockedBy.push(userId)
    const other = c.tenantId === userId ? c.landlordId : c.tenantId
    if (!db.blockedUsers.some((b) => b.userId === userId && b.blockedId === other)) {
      db.blockedUsers.push({ userId, blockedId: other, createdAt: new Date().toISOString() })
    }
    saveDb(db)
    return { ok: true }
  },

  async report(conversationId, userId, details) {
    if (!apiConfig.useMock) return request(`/chat/conversations/${conversationId}/reports`, { method: 'POST', body: { details } })
    await delay()
    const db = getDb()
    const c = db.conversations.find((x) => x.id === conversationId)
    db.reports.unshift({
      id: nextId('r'),
      reporterId: userId,
      targetType: 'conversation',
      targetId: conversationId,
      category: 'Harassment',
      details: details || 'Reported from chat',
      status: 'open',
      history: [{ action: 'Opened', by: userId, at: new Date().toISOString() }],
      createdAt: new Date().toISOString(),
      relatedUserId: c ? (c.tenantId === userId ? c.landlordId : c.tenantId) : null,
    })
    saveDb(db)
    return { ok: true }
  },
}

function enrich(c, db, userId) {
  const otherId = c.tenantId === userId ? c.landlordId : c.tenantId
  const other = db.users.find((u) => u.id === otherId)
  const property = db.properties.find((p) => p.id === c.propertyId)
  const msgs = db.messages.filter((m) => m.conversationId === c.id)
  const last = msgs[msgs.length - 1]
  const unread = msgs.filter((m) => m.senderId !== userId && !m.read).length
  return {
    ...clone(c),
    other: other ? { id: other.id, name: other.name, avatar: other.avatar, verified: other.verified } : null,
    property: property
      ? {
          id: property.id,
          title: property.title,
          rent: property.rent,
          images: property.images,
          location: property.location,
        }
      : null,
    lastMessage: last?.message || '',
    lastAt: last?.timestamp || c.updatedAt,
    unread,
    online: otherId.endsWith('1'),
  }
}
