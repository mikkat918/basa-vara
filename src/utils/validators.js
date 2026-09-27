export function required(value, label = 'This field') {
  if (value === undefined || value === null || String(value).trim() === '') {
    return `${label} is required`
  }
  return ''
}

export function emailRule(value) {
  if (!value) return 'Email is required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email'
  return ''
}

export function phoneRule(value) {
  if (!value) return 'Phone is required'
  if (!/^(?:\+8801|01)[3-9]\d{8}$/.test(String(value).replace(/\s/g, ''))) {
    return 'Enter a valid Bangladesh phone number'
  }
  return ''
}

export function passwordRule(value) {
  if (!value) return 'Password is required'
  if (value.length < 8) return 'Password must be at least 8 characters'
  if (!/\d/.test(value)) return 'Password must include a number'
  return ''
}

export function confirmPasswordRule(value, original) {
  if (value !== original) return 'Passwords do not match'
  return ''
}

export function validateFields(rules) {
  const errors = {}
  Object.entries(rules).forEach(([key, message]) => {
    if (message) errors[key] = message
  })
  return errors
}
