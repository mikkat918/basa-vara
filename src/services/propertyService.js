import { getDb, saveDb, delay, nextId } from '../mocks/db'
import { ApiError } from '../utils/errors'
import { apiConfig, request } from './apiClient'

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function applyFilters(list, filters = {}) {
  return list.filter((p) => {
    if (filters.location && p.location.area !== filters.location) return false
    if (filters.area && p.location.subArea !== filters.area && p.location.area !== filters.area) return false
    if (filters.type && p.type !== filters.type) return false
    if (filters.minRent && p.rent < Number(filters.minRent)) return false
    if (filters.maxRent && p.rent > Number(filters.maxRent)) return false
    if (filters.bedrooms && p.bedrooms < Number(filters.bedrooms)) return false
    if (filters.bathrooms && p.bathrooms < Number(filters.bathrooms)) return false
    if (filters.size && p.size < Number(filters.size)) return false
    if (filters.furnishing && p.furnishing !== filters.furnishing) return false
    if (filters.availableDate && p.availableFrom > filters.availableDate) return false
    if (filters.preferredTenant && p.preferredTenant !== filters.preferredTenant) return false
    if (filters.amenities?.length) {
      if (!filters.amenities.every((a) => p.amenities.includes(a))) return false
    }
    if (filters.q) {
      const q = filters.q.toLowerCase()
      const hay = `${p.title} ${p.location.area} ${p.location.subArea} ${p.address || ''}`.toLowerCase()
      if (!hay.includes(q)) return false
    }
    if (filters.status) {
      if (p.status !== filters.status) return false
    }
    return true
  })
}

function sortList(list, sort) {
  const copy = [...list]
  if (sort === 'rent-asc') copy.sort((a, b) => a.rent - b.rent)
  else if (sort === 'rent-desc') copy.sort((a, b) => b.rent - a.rent)
  else if (sort === 'newest') copy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  else copy.sort((a, b) => Number(b.featured) - Number(a.featured) || b.views - a.views)
  return copy
}

export const propertyService = {
  async search(params = {}) {
    if (!apiConfig.useMock) return request(`/properties${qs(params)}`)
    await delay()
    const db = getDb()
    let list = db.properties.filter((p) => p.status === 'active')
    list = sortList(applyFilters(list, params), params.sort)
    const page = Number(params.page || 1)
    const pageSize = Number(params.pageSize || 9)
    const start = (page - 1) * pageSize
    return {
      items: clone(list.slice(start, start + pageSize)),
      total: list.length,
      page,
      pageSize,
    }
  },

  async getById(id, { userId } = {}) {
    if (!apiConfig.useMock) return request(`/properties/${id}`)
    await delay()
    const db = getDb()
    const property = db.properties.find((p) => p.id === id)
    if (!property) throw new ApiError(404, 'Property not found')
    if (property.status !== 'active' && !userId) throw new ApiError(404, 'Property not found')
    if (userId && property.status === 'active') {
      property.views += 1
      db.recentlyViewed = [
        { userId, propertyId: id, viewedAt: new Date().toISOString() },
        ...db.recentlyViewed.filter((v) => !(v.userId === userId && v.propertyId === id)),
      ].slice(0, 40)
      saveDb(db)
    }
    const landlord = db.users.find((u) => u.id === property.landlordId)
    return {
      property: clone(property),
      landlord: landlord
        ? {
            id: landlord.id,
            name: landlord.name,
            verified: landlord.verified,
            responseRate: landlord.responseRate,
            responseTime: landlord.responseTime,
            avatar: landlord.avatar,
          }
        : null,
    }
  },

  async featured() {
    if (!apiConfig.useMock) return request('/properties?featured=1')
    await delay()
    return clone(getDb().properties.filter((p) => p.featured && p.status === 'active').slice(0, 6))
  },

  async latest() {
    if (!apiConfig.useMock) return request('/properties?sort=newest')
    await delay()
    return clone(
      [...getDb().properties]
        .filter((p) => p.status === 'active')
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6),
    )
  },

  async recommended(userId) {
    if (!apiConfig.useMock) return request('/properties/recommended')
    await delay()
    return clone(getDb().properties.filter((p) => p.status === 'active').slice(0, 4))
  },

  async forLandlord(landlordId) {
    if (!apiConfig.useMock) return request('/landlord/properties')
    await delay()
    return clone(getDb().properties.filter((p) => p.landlordId === landlordId))
  },

  async save(userId, propertyId) {
    if (!apiConfig.useMock) return request('/saved', { method: 'POST', body: { propertyId } })
    await delay(120)
    const db = getDb()
    if (!db.saved.some((s) => s.userId === userId && s.propertyId === propertyId)) {
      db.saved.push({ userId, propertyId })
      const p = db.properties.find((x) => x.id === propertyId)
      if (p) p.savedCount += 1
      saveDb(db)
    }
    return { saved: true }
  },

  async unsave(userId, propertyId) {
    if (!apiConfig.useMock) return request(`/saved/${propertyId}`, { method: 'DELETE' })
    await delay(120)
    const db = getDb()
    db.saved = db.saved.filter((s) => !(s.userId === userId && s.propertyId === propertyId))
    saveDb(db)
    return { saved: false }
  },

  async savedList(userId, q = '') {
    if (!apiConfig.useMock) return request('/saved')
    await delay()
    const db = getDb()
    const ids = db.saved.filter((s) => s.userId === userId).map((s) => s.propertyId)
    let items = db.properties.filter((p) => ids.includes(p.id))
    if (q) items = items.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()))
    return clone(items)
  },

  async isSaved(userId, propertyId) {
    const db = getDb()
    return db.saved.some((s) => s.userId === userId && s.propertyId === propertyId)
  },

  async recentlyViewed(userId) {
    await delay()
    const db = getDb()
    const ids = db.recentlyViewed.filter((v) => v.userId === userId).map((v) => v.propertyId)
    return clone(db.properties.filter((p) => ids.includes(p.id)))
  },

  async create(landlordId, payload) {
    if (!apiConfig.useMock) return request('/properties', { method: 'POST', body: payload })
    await delay()
    const db = getDb()
    const property = {
      ...payload,
      id: nextId('p'),
      landlordId,
      views: 0,
      uniqueVisitors: 0,
      savedCount: 0,
      inquiries: 0,
      contactUnlocks: 0,
      featured: false,
      verified: false,
      createdAt: new Date().toISOString(),
    }
    db.properties.unshift(property)
    saveDb(db)
    return clone(property)
  },

  async update(id, landlordId, payload) {
    if (!apiConfig.useMock) return request(`/properties/${id}`, { method: 'PUT', body: payload })
    await delay()
    const db = getDb()
    const property = db.properties.find((p) => p.id === id && p.landlordId === landlordId)
    if (!property) throw new ApiError(404, 'Property not found')
    Object.assign(property, payload)
    saveDb(db)
    return clone(property)
  },

  async duplicate(id, landlordId) {
    await delay()
    const db = getDb()
    const property = db.properties.find((p) => p.id === id && p.landlordId === landlordId)
    if (!property) throw new ApiError(404, 'Property not found')
    const copy = {
      ...clone(property),
      id: nextId('p'),
      title: `${property.title} (copy)`,
      status: 'draft',
      views: 0,
      inquiries: 0,
      createdAt: new Date().toISOString(),
    }
    db.properties.unshift(copy)
    saveDb(db)
    return copy
  },

  async setStatus(id, landlordId, status) {
    await delay()
    const db = getDb()
    const property = db.properties.find((p) => p.id === id && p.landlordId === landlordId)
    if (!property) throw new ApiError(404, 'Property not found')
    property.status = status
    saveDb(db)
    return clone(property)
  },

  async remove(id, landlordId) {
    await delay()
    const db = getDb()
    db.properties = db.properties.filter((p) => !(p.id === id && p.landlordId === landlordId))
    saveDb(db)
    return { ok: true }
  },

  async analytics(id, landlordId) {
    await delay()
    const db = getDb()
    const property = db.properties.find((p) => p.id === id && p.landlordId === landlordId)
    if (!property) throw new ApiError(404, 'Property not found')
    return {
      views: property.views,
      uniqueVisitors: property.uniqueVisitors,
      savedCount: property.savedCount,
      inquiries: property.inquiries,
      contactUnlocks: property.contactUnlocks,
      series: {
        views: [12, 18, 22, 19, 28, 31, property.views % 40],
        unlocks: [0, 1, 0, 2, 1, 1, property.contactUnlocks % 5],
      },
    }
  },
}

function qs(params = {}) {
  const values = Object.entries(params).filter(([, value]) => value !== '' && value != null && (!Array.isArray(value) || value.length))
  return values.length ? `?${new URLSearchParams(values.map(([key, value]) => [key, Array.isArray(value) ? value.join(',') : value])).toString()}` : ''
}
