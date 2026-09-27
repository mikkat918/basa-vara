import { defineStore } from 'pinia'
import { ref } from 'vue'

let toastId = 0

export const useUiStore = defineStore('ui', () => {
  const toasts = ref([])
  const confirm = ref(null)
  const sidebarOpen = ref(false)

  function toast(message, type = 'success') {
    const id = ++toastId
    toasts.value.push({ id, message, type })
    setTimeout(() => dismiss(id), 3200)
  }

  function dismiss(id) {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  function askConfirm(payload) {
    return new Promise((resolve) => {
      confirm.value = {
        ...payload,
        resolve: (ok) => {
          confirm.value = null
          resolve(ok)
        },
      }
    })
  }

  return { toasts, confirm, sidebarOpen, toast, dismiss, askConfirm }
})
