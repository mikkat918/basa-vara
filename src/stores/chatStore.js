import { defineStore } from 'pinia'
import { ref } from 'vue'
import { chatService } from '../services/chatService'
import { useAuthStore } from './authStore'

export const useChatStore = defineStore('chat', () => {
  const conversations = ref([])
  const messages = ref([])
  const activeId = ref('')
  const loading = ref(false)
  const sending = ref(false)
  const error = ref('')
  const typing = ref(false)

  async function loadList() {
    const auth = useAuthStore()
    loading.value = true
    try {
      conversations.value = await chatService.listConversations(auth.user.id)
    } finally {
      loading.value = false
    }
  }

  async function open(id) {
    const auth = useAuthStore()
    activeId.value = id
    loading.value = true
    error.value = ''
    try {
      messages.value = await chatService.getMessages(id, auth.user.id)
      await loadList()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function send(text) {
    const auth = useAuthStore()
    sending.value = true
    try {
      const msg = await chatService.sendMessage(activeId.value, auth.user.id, text)
      messages.value.push(msg)
      await loadList()
    } finally {
      sending.value = false
    }
  }

  async function start(landlordId, propertyId) {
    const auth = useAuthStore()
    return chatService.startConversation(auth.user.id, landlordId, propertyId)
  }

  return { conversations, messages, activeId, loading, sending, error, typing, loadList, open, send, start }
})
