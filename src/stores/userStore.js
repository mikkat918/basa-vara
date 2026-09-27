import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userService } from '../services/userService'
import { useAuthStore } from './authStore'

export const useUserStore = defineStore('user', () => {
  const blocked = ref([])
  const loading = ref(false)

  async function updateProfile(payload) {
    const auth = useAuthStore()
    const user = await userService.updateProfile(auth.user.id, payload)
    auth.setUser(user)
    return user
  }

  async function changePassword(payload) {
    const auth = useAuthStore()
    return userService.changePassword(auth.user.id, payload)
  }

  async function loadBlocked() {
    const auth = useAuthStore()
    blocked.value = await userService.blocked(auth.user.id)
  }

  async function unblock(id) {
    const auth = useAuthStore()
    await userService.unblock(auth.user.id, id)
    await loadBlocked()
  }

  async function deleteAccount() {
    const auth = useAuthStore()
    await userService.deleteAccount(auth.user.id)
    auth.logout()
  }

  return { blocked, loading, updateProfile, changePassword, loadBlocked, unblock, deleteAccount }
})
