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

```vue
<template>
  <div class="chat-page">
    <!-- Header -->
    <header class="chat-header">
      <div class="header-copy">
        <div class="header-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H7l-3 2v-4.2A7.5 7.5 0 1 1 20 11.5Z" />
            <path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01" />
          </svg>
        </div>

        <div>
          <span class="eyebrow">Communication center</span>
          <h1>Messages</h1>
          <p>Connect with landlords and manage your property conversations.</p>
        </div>
      </div>

      <div class="secure-badge">
        <span class="secure-dot"></span>
        Secure messaging
      </div>
    </header>

    <!-- Chat workspace -->
    <div class="chat" :class="{ 'show-chat': mobileChat }">

      <!-- Conversation sidebar -->
      <aside class="left chat-card">
        <div class="list-header">
          <div>
            <span class="section-label">Inbox</span>
            <h2>Conversations</h2>
          </div>

          <span class="conversation-count">
            {{ chat.conversations.length }}
          </span>
        </div>

        <div class="list-content">
          <EmptyState
            v-if="!chat.loading && !chat.conversations.length"
            title="No conversations"
            message="Start a chat from a property page."
          />

          <ConversationList
            :items="chat.conversations"
            :active-id="chat.activeId"
            @select="open"
          />
        </div>
      </aside>

      <!-- Main chat window -->
      <section class="chat-main">
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
      </section>

      <!-- Property context -->
      <aside class="property-column">
        <div class="property-label">
          <span class="property-dot"></span>
          Property context
        </div>

        <ChatPropertyPanel
          :property="active?.property"
          :unlocked="unlocked"
        />
      </aside>

      <!-- Mobile back button -->
      <button
        v-if="mobileChat"
        class="btn btn-secondary back"
        type="button"
        @click="mobileChat = false"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 12H5" />
          <path d="m11 18-6-6 6-6" />
        </svg>

        <span>Back to conversations</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.chat-page {
  min-height: 100%;
  box-sizing: border-box;
  padding: 28px;
  background:
    radial-gradient(circle at 8% 0%, rgba(38, 166, 91, 0.08), transparent 28%),
    radial-gradient(circle at 100% 20%, rgba(33, 150, 83, 0.06), transparent 25%),
    #f6f9f7;
}

/* =========================
   Header
========================= */

.chat-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  max-width: 1600px;
  margin: 0 auto 22px;
}

.header-copy {
  display: flex;
  align-items: flex-start;
  gap: 13px;
}

.header-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  flex: 0 0 auto;
  margin-top: 3px;
  border: 1px solid #d8eadf;
  border-radius: 13px;
  background: #eaf7ef;
  color: #18864d;
  box-shadow: 0 7px 20px rgba(28, 112, 64, 0.07);
}

.header-icon svg {
  width: 21px;
  height: 21px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.eyebrow {
  display: block;
  margin-bottom: 4px;
  color: #18864d;
  font-size: 10px;
  font-weight: 850;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.chat-header h1 {
  margin: 0;
  color: #17251d;
  font-size: clamp(25px, 2.2vw, 34px);
  font-weight: 850;
  line-height: 1.15;
  letter-spacing: -0.035em;
}

.chat-header p {
  margin: 7px 0 0;
  color: #7b8780;
  font-size: 13px;
  line-height: 1.55;
}

.secure-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 12px;
  border: 1px solid #dcebe2;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.84);
  color: #507060;
  font-size: 11px;
  font-weight: 750;
  white-space: nowrap;
  box-shadow: 0 5px 18px rgba(32, 75, 48, 0.04);
}

.secure-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #28a862;
  box-shadow: 0 0 0 4px rgba(40, 168, 98, 0.1);
}

/* =========================
   Main layout
========================= */

.chat {
  display: grid;
  grid-template-columns: 290px minmax(0, 1fr) 270px;
  gap: 14px;
  align-items: stretch;
  max-width: 1600px;
  min-height: min(720px, calc(100vh - 170px));
  margin: 0 auto;
}

.chat-card,
.chat-main,
.property-column {
  min-width: 0;
}

/* =========================
   Conversation sidebar
========================= */

.left {
  display: flex;
  flex-direction: column;
  min-height: 620px;
  padding: 0;
  overflow: hidden;
  border: 1px solid #dfe9e3;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 14px 38px rgba(31, 67, 47, 0.06);
}

.list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 17px 16px 14px;
  border-bottom: 1px solid #edf1ee;
}

.section-label {
  display: block;
  margin-bottom: 3px;
  color: #87918b;
  font-size: 9px;
  font-weight: 850;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.list-header h2 {
  margin: 0;
  color: #25332b;
  font-size: 15px;
  font-weight: 800;
}

.conversation-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 25px;
  height: 25px;
  padding: 0 7px;
  box-sizing: border-box;
  border-radius: 999px;
  background: #eaf7ef;
  color: #16834b;
  font-size: 10px;
  font-weight: 850;
}

.list-content {
  min-height: 0;
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

/* =========================
   Main chat
========================= */

.chat-main {
  min-height: 620px;
  overflow: hidden;
  border: 1px solid #dfe9e3;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 14px 38px rgba(31, 67, 47, 0.06);
}

/* =========================
   Property column
========================= */

.property-column {
  display: flex;
  flex-direction: column;
  gap: 9px;
  min-width: 0;
}

.property-label {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 2px 4px 4px;
  color: #68766e;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.property-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #21a05a;
  box-shadow: 0 0 0 4px rgba(33, 160, 90, 0.1);
}

/* =========================
   Mobile back button
========================= */

.back {
  display: none;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 42px;
  border-radius: 11px;
  font-weight: 750;
}

.back svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* =========================
   Large tablet
========================= */

@media (max-width: 1200px) {
  .chat {
    grid-template-columns: 260px minmax(0, 1fr);
  }

  .property-column {
    display: none;
  }
}

/* =========================
   Tablet / mobile
========================= */

@media (max-width: 1024px) {
  .chat-page {
    padding: 22px;
  }

  .chat {
    grid-template-columns: minmax(0, 1fr);
    min-height: calc(100vh - 165px);
  }

  .left {
    min-height: 540px;
  }

  .chat-main {
    min-height: 540px;
  }

  .chat:not(.show-chat) .chat-main {
    display: none;
  }

  .chat.show-chat .left {
    display: none;
  }

  .chat.show-chat .chat-main {
    display: block;
  }

  .chat.show-chat {
    grid-template-rows: minmax(0, 1fr) auto;
  }

  .back {
    display: inline-flex;
  }
}

/* =========================
   Small tablet
========================= */

@media (max-width: 700px) {
  .chat-page {
    padding: 16px;
  }

  .chat-header {
    align-items: flex-start;
    margin-bottom: 16px;
  }

  .secure-badge {
    display: none;
  }

  .chat {
    min-height: calc(100vh - 135px);
  }

  .left,
  .chat-main {
    min-height: 500px;
    border-radius: 15px;
  }
}

/* =========================
   Mobile
========================= */

@media (max-width: 480px) {
  .chat-page {
    padding: 12px;
  }

  .header-copy {
    gap: 10px;
  }

  .header-icon {
    width: 38px;
    height: 38px;
    border-radius: 11px;
  }

  .header-icon svg {
    width: 18px;
    height: 18px;
  }

  .chat-header h1 {
    font-size: 24px;
  }

  .chat-header p {
    max-width: 290px;
    font-size: 11px;
  }

  .list-header {
    padding: 14px 13px 12px;
  }

  .list-content {
    padding: 6px;
  }

  .left,
  .chat-main {
    min-height: calc(100vh - 145px);
    border-radius: 13px;
  }

  .back {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .chat-page *,
  .chat-page *::before,
  .chat-page *::after {
    scroll-behavior: auto !important;
    transition: none !important;
    animation: none !important;
  }
}
</style>