import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { notificationService } from '../services/notificationService'
import { useAuthStore } from './authStore'

export const useNotificationStore = defineStore('notification', () => {
  const items = ref([])
  const loading = ref(false)
  const unread = computed(() => items.value.filter((n) => !n.read).length)

  async function load() {
    const auth = useAuthStore()
    if (!auth.user) return
    loading.value = true
    try {
      items.value = await notificationService.list(auth.user.id)
    } finally {
      loading.value = false
    }
  }

  async function markRead(id) {
    const auth = useAuthStore()
    await notificationService.markRead(id, auth.user.id)
    await load()
  }

  async function markAll() {
    const auth = useAuthStore()
    await notificationService.markAll(auth.user.id)
    await load()
  }

  return { items, loading, unread, load, markRead, markAll }
})
