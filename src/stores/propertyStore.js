import { defineStore } from 'pinia'
import { ref } from 'vue'
import { propertyService } from '../services/propertyService'
import { useAuthStore } from './authStore'

export const usePropertyStore = defineStore('property', () => {
  const results = ref([])
  const total = ref(0)
  const page = ref(1)
  const loading = ref(false)
  const error = ref('')
  const featured = ref([])
  const latest = ref([])
  const saved = ref([])
  const current = ref(null)
  const landlord = ref(null)

  async function search(params) {
    loading.value = true
    error.value = ''
    try {
      const data = await propertyService.search(params)
      results.value = data.items
      total.value = data.total
      page.value = data.page
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function loadHome() {
    loading.value = true
    try {
      ;[featured.value, latest.value] = await Promise.all([propertyService.featured(), propertyService.latest()])
    } finally {
      loading.value = false
    }
  }

  async function loadDetails(id) {
    loading.value = true
    error.value = ''
    current.value = null
    try {
      const auth = useAuthStore()
      const data = await propertyService.getById(id, { userId: auth.user?.id })
      current.value = data.property
      landlord.value = data.landlord
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function loadSaved(q) {
    const auth = useAuthStore()
    saved.value = await propertyService.savedList(auth.user.id, q)
  }

  async function toggleSave(propertyId) {
    const auth = useAuthStore()
    const isSaved = await propertyService.isSaved(auth.user.id, propertyId)
    if (isSaved) await propertyService.unsave(auth.user.id, propertyId)
    else await propertyService.save(auth.user.id, propertyId)
    return !isSaved
  }

  return {
    results,
    total,
    page,
    loading,
    error,
    featured,
    latest,
    saved,
    current,
    landlord,
    search,
    loadHome,
    loadDetails,
    loadSaved,
    toggleSave,
  }
})
