import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { authService } from '../services/authService'
import { STORAGE_KEYS } from '../utils/constants'
import { readJson, removeItem, writeJson } from '../utils/storage'

export const useAuthStore = defineStore('auth', () => {
  const session = ref(readJson(STORAGE_KEYS.SESSION, null))
  const loading = ref(false)
  const error = ref('')

  const user = computed(() => session.value?.user || null)
  const token = computed(() => session.value?.token || '')
  const isAuthenticated = computed(() => Boolean(user.value))
  const role = computed(() => user.value?.role || null)

  function persist(next) {
    session.value = next
    if (next) writeJson(STORAGE_KEYS.SESSION, next)
    else removeItem(STORAGE_KEYS.SESSION)
  }

  async function login(payload) {
    loading.value = true
    error.value = ''
    try {
      const result = await authService.login(payload)
      persist(result)
      return result.user
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function register(payload) {
    loading.value = true
    error.value = ''
    try {
      const result = await authService.register(payload)
      persist(result)
      return result.user
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  function logout() {
    persist(null)
  }

  function setUser(nextUser) {
    if (!session.value) return
    persist({ ...session.value, user: nextUser })
  }

  return { session, user, token, isAuthenticated, role, loading, error, login, register, logout, setUser }
})
