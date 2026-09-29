import { ApiError } from '../utils/errors'
import { STORAGE_KEYS } from '../utils/constants'
import { readJson } from '../utils/storage'

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'
const BASE = import.meta.env.VITE_API_BASE_URL || ''

export const apiConfig = { useMock: USE_MOCK, baseUrl: BASE }

export async function request(path, options = {}) {
  if (USE_MOCK) {
    throw new Error('Mock services should not call request()')
  }
  const headers = { Accept: 'application/json', ...(options.headers || {}) }
  // Services share the persisted session so protected requests cannot
  // accidentally go out without authorization headers.
  const token = options.token || readJson(STORAGE_KEYS.SESSION, null)?.token
  const { token: _token, ...fetchOptions } = options
  if (token) headers.Authorization = `Bearer ${token}`
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData
  if (options.body != null && !isFormData && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }
  let response
  try {
    response = await fetch(`${BASE}${path}`, {
      ...fetchOptions,
      headers,
      body: options.body == null ? undefined : isFormData ? options.body : JSON.stringify(options.body),
    })
  } catch (error) {
    throw new ApiError(0, 'Network error', { cause: error })
  }
  if (!response.ok) {
    let message = 'Request failed'
    let details
    try {
      const payload = await response.json()
      message = payload.message || payload.error?.message || payload.error || message
      details = payload.details || payload.errors
    } catch {
      // Empty or non-JSON error responses use the generic message.
    }
    throw new ApiError(response.status, message, details)
  }
  if (response.status === 204) return null
  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) return null
  return response.json()
}
