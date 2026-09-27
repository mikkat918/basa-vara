const FRIENDLY = {
  401: 'Please sign in to continue.',
  403: 'You do not have permission to view this page.',
  404: 'We could not find what you were looking for.',
  422: 'Please check the form and try again.',
  429: 'Too many attempts. Please wait a moment.',
  500: 'Something went wrong. Please try again.',
}

export class ApiError extends Error {
  constructor(status, message, details) {
    super(message)
    this.status = status
    this.details = details
  }
}

export function toUserMessage(error) {
  if (!error) return FRIENDLY[500]
  if (error instanceof ApiError) {
    return FRIENDLY[error.status] || error.message || FRIENDLY[500]
  }
  if (error.name === 'TypeError') return 'Network error. Check your connection and try again.'
  return error.message || FRIENDLY[500]
}
