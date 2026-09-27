import { ApiError } from '../utils/errors'

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'
const BASE = import.meta.env.VITE_API_BASE_URL || ''

export const apiConfig = { useMock: USE_MOCK, baseUrl: BASE }

export async function request(path, options = {}) {
  if (USE_MOCK) {
    throw new Error('Mock services should not call request()')
  }
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }
  const token = options.token
  if (token) headers.Authorization = `Bearer ${token}`
  let response
  try {
    response = await fetch(`${BASE}${path}`, {
      ...options,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    })
  } catch (error) {
    throw new ApiError(0, 'Network error')
  }
  if (!response.ok) {
    throw new ApiError(response.status, 'Request failed')
  }
  if (response.status === 204) return null
  return response.json()
}
