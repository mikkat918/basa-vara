import { getDb, saveDb, delay, nextId } from '../mocks/db'
import { ApiError } from '../utils/errors'
import { emailRule, passwordRule, phoneRule, required } from '../utils/validators'
import { apiConfig, request } from './apiClient'

function publicUser(user) {
  if (!user) return null
  const { ...safe } = user
  return safe
}

export const authService = {
  async login({ email, password }) {
    if (!apiConfig.useMock) return request('/auth/login', { method: 'POST', body: { email, password } })
    await delay()
    const emailError = emailRule(email)
    const passError = passwordRule(password)
    if (emailError || passError) throw new ApiError(422, emailError || passError)
    const db = getDb()
    const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (!user) throw new ApiError(401, 'Invalid email or password')
    if (user.status === 'blocked' || user.status === 'suspended') {
      throw new ApiError(403, 'This account is not active')
    }
    return {
      token: `mock-token-${user.id}`,
      user: publicUser(user),
    }
  },

  async register(payload) {
    if (!apiConfig.useMock) return request('/auth/register', { method: 'POST', body: payload })
    await delay()
    const errors = [
      required(payload.name, 'Name'),
      emailRule(payload.email),
      phoneRule(payload.phone),
      passwordRule(payload.password),
      payload.password !== payload.confirmPassword ? 'Passwords do not match' : '',
      !['tenant', 'landlord'].includes(payload.role) ? 'Select a role' : '',
    ].filter(Boolean)
    if (errors.length) throw new ApiError(422, errors[0])
    const db = getDb()
    if (db.users.some((u) => u.email.toLowerCase() === payload.email.toLowerCase())) {
      throw new ApiError(422, 'An account with this email already exists')
    }
    const user = {
      id: nextId('u'),
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      role: payload.role,
      avatar: '',
      verified: false,
      status: 'active',
      createdAt: new Date().toISOString(),
      responseRate: payload.role === 'landlord' ? 100 : undefined,
      responseTime: payload.role === 'landlord' ? 'New landlord' : undefined,
      notificationSettings: { email: true, sms: false, push: true },
      privacySettings: { showProfile: true, showActivity: false },
    }
    db.users.push(user)
    db.wallets[user.id] = { userId: user.id, coinBalance: 0 }
    saveDb(db)
    return { token: `mock-token-${user.id}`, user: publicUser(user) }
  },

  async forgotPassword(email) {
    if (!apiConfig.useMock) return request('/auth/forgot-password', { method: 'POST', body: { email } })
    await delay()
    const err = emailRule(email)
    if (err) throw new ApiError(422, err)
    return { ok: true, message: 'If this email is registered, a reset code has been sent.' }
  },

  async verifyOtp({ email, otp }) {
    if (!apiConfig.useMock) return request('/auth/verify-otp', { method: 'POST', body: { email, otp } })
    await delay()
    if (!otp || String(otp).length < 4) throw new ApiError(422, 'Enter the 6-digit code')
    return { ok: true, resetToken: `reset-${email}` }
  },

  async resetPassword({ resetToken, password, confirmPassword }) {
    if (!apiConfig.useMock) return request('/auth/reset-password', { method: 'POST', body: { resetToken, password } })
    await delay()
    const err = passwordRule(password)
    if (err) throw new ApiError(422, err)
    if (password !== confirmPassword) throw new ApiError(422, 'Passwords do not match')
    if (!resetToken) throw new ApiError(422, 'Reset session expired')
    return { ok: true }
  },

  async me(token) {
    if (!apiConfig.useMock) return request('/auth/me', { token })
    await delay(120)
    const id = String(token || '').replace('mock-token-', '')
    const db = getDb()
    const user = db.users.find((u) => u.id === id)
    if (!user) throw new ApiError(401, 'Session expired')
    return publicUser(user)
  },
}
