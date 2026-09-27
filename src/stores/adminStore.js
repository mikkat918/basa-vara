import { defineStore } from 'pinia'
import { ref } from 'vue'
import { adminService } from '../services/adminService'

export const useAdminStore = defineStore('admin', () => {
  const overview = ref(null)
  const loading = ref(false)

  async function loadOverview() {
    loading.value = true
    try {
      overview.value = await adminService.overview()
    } finally {
      loading.value = false
    }
  }

  return { overview, loading, loadOverview }
})
