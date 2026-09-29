import { UNLOCK_COST } from '../utils/constants'
import { getDb, saveDb, delay, nextId } from '../mocks/db'
import { ApiError } from '../utils/errors'
import { apiConfig, request } from './apiClient'

function clone(v) {
  return JSON.parse(JSON.stringify(v))
}

export const walletService = {
  async getWallet(userId) {
    if (!apiConfig.useMock) return request('/wallet')
    await delay()
    const db = getDb()
    return clone(db.wallets[userId] || { userId, coinBalance: 0 })
  },

  async transactions(userId) {
    if (!apiConfig.useMock) return request('/wallet/transactions')
    await delay()
    return clone(getDb().transactions.filter((t) => t.userId === userId))
  },

  async previewUnlock(userId, propertyId) {
    if (!apiConfig.useMock) return request(`/contacts/preview/${propertyId}`)
    await delay(80)
    const db = getDb()
    const wallet = db.wallets[userId] || { coinBalance: 0 }
    const cost = db.settings.unlockCost || UNLOCK_COST
    const already = db.contactUnlocks.some((u) => u.userId === userId && u.propertyId === propertyId)
    return {
      alreadyUnlocked: already,
      currentBalance: wallet.coinBalance,
      unlockCost: cost,
      remainingBalance: already ? wallet.coinBalance : wallet.coinBalance - cost,
      sufficient: already || wallet.coinBalance >= cost,
    }
  },

  async unlockContact(userId, propertyId) {
    if (!apiConfig.useMock) return request('/contacts/unlock', { method: 'POST', body: { propertyId } })
    await delay()
    const db = getDb()
    const existing = db.contactUnlocks.find((u) => u.userId === userId && u.propertyId === propertyId)
    const property = db.properties.find((p) => p.id === propertyId)
    if (!property) throw new ApiError(404, 'Property not found')
    const secret = db.contactSecrets[property.landlordId]
    if (existing) {
      return { unlocked: true, contact: clone(secret) }
    }
    const cost = db.settings.unlockCost || UNLOCK_COST
    const wallet = db.wallets[userId] || { userId, coinBalance: 0 }
    if (wallet.coinBalance < cost) {
      throw new ApiError(422, 'Insufficient coins')
    }
    wallet.coinBalance -= cost
    db.wallets[userId] = wallet
    db.contactUnlocks.push({
      id: nextId('cu'),
      userId,
      propertyId,
      coinCost: cost,
      createdAt: new Date().toISOString(),
    })
    db.transactions.unshift({
      id: nextId('t'),
      userId,
      type: 'Contact Unlock',
      coins: -cost,
      amount: cost * (db.settings.coinPrice || 10),
      paymentMethod: '',
      status: 'Success',
      description: `Unlocked contact for ${property.title}`,
      createdAt: new Date().toISOString(),
      propertyId,
    })
    property.contactUnlocks += 1
    saveDb(db)
    return { unlocked: true, contact: clone(secret) }
  },

  async unlockPropertyContact(userId, propertyId) {
    return this.unlockContact(userId, propertyId)
  },

  async getUnlockedContact(userId, propertyId) {
    if (!apiConfig.useMock) return request(`/contacts/unlocked/${propertyId}`)
    await delay(60)
    const db = getDb()
    const unlocked = db.contactUnlocks.some((u) => u.userId === userId && u.propertyId === propertyId)
    if (!unlocked) return { unlocked: false, contact: null }
    const property = db.properties.find((p) => p.id === propertyId)
    const secret = property ? db.contactSecrets[property.landlordId] : null
    return { unlocked: true, contact: clone(secret) }
  },

  async unlockedCount(userId) {
    if (!apiConfig.useMock) {
      const result = await request('/wallet/unlocks')
      return Array.isArray(result) ? result.length : Number(result?.total || 0)
    }
    return getDb().contactUnlocks.filter((u) => u.userId === userId).length
  },
}
