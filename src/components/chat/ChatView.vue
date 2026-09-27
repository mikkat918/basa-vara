<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ConversationList from './ConversationList.vue'
import ChatWindow from './ChatWindow.vue'
import ChatPropertyPanel from './ChatPropertyPanel.vue'
import EmptyState from '../common/EmptyState.vue'
import { useChatStore } from '../../stores/chatStore'
import { useUiStore } from '../../stores/uiStore'
import { chatService } from '../../services/chatService'
import { walletService } from '../../services/walletService'
import { useAuthStore } from '../../stores/authStore'

const chat = useChatStore()
const ui = useUiStore()
const auth = useAuthStore()
const route = useRoute()
const unlocked = ref(false)
const mobileChat = ref(false)

const active = computed(() => chat.conversations.find((c) => c.id === chat.activeId))

async function open(id) {
  await chat.open(id)
  mobileChat.value = true
  if (active.value?.property?.id) {
    const res = await walletService.getUnlockedContact(auth.user.id, active.value.property.id)
    unlocked.value = res.unlocked
  }
}

async function send(text) {
  await chat.send(text)
}

async function block() {
  const ok = await ui.askConfirm({ title: 'Block this user?', message: 'You will stop receiving messages.', danger: true, confirmLabel: 'Block' })
  if (!ok) return
  await chatService.block(chat.activeId, auth.user.id)
  ui.toast('User blocked')
  await chat.loadList()
}

async function report() {
  const ok = await ui.askConfirm({ title: 'Report conversation?', message: 'Admins will review this chat.', confirmLabel: 'Report' })
  if (!ok) return
  await chatService.report(chat.activeId, auth.user.id, 'Reported from chat UI')
  ui.toast('Report submitted')
}

onMounted(async () => {
  await chat.loadList()
  const qid = route.query.c
  if (qid) open(qid)
  else if (chat.conversations[0]) open(chat.conversations[0].id)
})

watch(
  () => route.query.c,
  (id) => {
    if (id) open(id)
  },
)
</script>

<template>
  <div class="chat" :class="{ 'show-chat': mobileChat }">
    <aside class="left">
      <h2>Messages</h2>
      <EmptyState v-if="!chat.loading && !chat.conversations.length" title="No conversations" message="Start a chat from a property page." />
      <ConversationList :items="chat.conversations" :active-id="chat.activeId" @select="open" />
    </aside>
    <ChatWindow
      :conversation="active"
      :messages="chat.messages"
      :loading="chat.loading"
      :error="chat.error"
      :sending="chat.sending"
      @send="send"
      @block="block"
      @report="report"
      @retry="open(chat.activeId)"
    />
    <ChatPropertyPanel :property="active?.property" :unlocked="unlocked" />
    <button v-if="mobileChat" class="btn btn-secondary back" type="button" @click="mobileChat = false">Back to list</button>
  </div>
</template>

<style scoped>
.chat {
  display: grid;
  grid-template-columns: 280px 1fr 260px;
  gap: 12px;
  align-items: start;
}
.left {
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 12px;
  max-height: 70vh;
  overflow: auto;
}
.back {
  display: none;
}
@media (max-width: 1024px) {
  .chat {
    grid-template-columns: 1fr;
  }
  .chat:not(.show-chat) :deep(.window) {
    display: none;
  }
  .chat.show-chat .left {
    display: none;
  }
  .back {
    display: inline-flex;
  }
}
</style>
