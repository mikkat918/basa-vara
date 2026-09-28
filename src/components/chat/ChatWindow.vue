<script setup>
import MessageBubble from './MessageBubble.vue'
import MessageInput from './MessageInput.vue'
import TypingIndicator from './TypingIndicator.vue'
import LoadingSpinner from '../common/LoadingSpinner.vue'
import ErrorState from '../common/ErrorState.vue'
import EmptyState from '../common/EmptyState.vue'

defineProps({
  conversation: Object,
  messages: Array,
  loading: Boolean,
  error: String,
  sending: Boolean,
  typing: Boolean,
})
const emit = defineEmits(['send', 'block', 'report', 'retry'])
</script>

```vue
<template>
  <section class="window">

    <!-- Chat Header -->
    <header v-if="conversation" class="head">
      <div class="person">
        <div class="avatar">
          {{ conversation.other?.name?.charAt(0)?.toUpperCase() || '?' }}
        </div>

        <div class="person-info">
          <div class="name-row">
            <h2>{{ conversation.other?.name }}</h2>

            <span
              class="presence"
              :class="conversation.online ? 'online' : 'offline'"
            >
              <span class="presence-dot"></span>
              {{ conversation.online ? 'Online' : 'Offline' }}
            </span>
          </div>

          <p class="property-name">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 10.5 12 3l9 7.5" />
              <path d="M5.5 9.5V21h13V9.5" />
              <path d="M9 21v-6h6v6" />
            </svg>

            {{ conversation.property?.title }}
          </p>
        </div>
      </div>

      <div class="actions">
        <button
          class="action-btn"
          type="button"
          aria-label="Block user"
          title="Block"
          @click="emit('block')"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="8.5" />
            <path d="m6 6 12 12" />
          </svg>
          <span>Block</span>
        </button>

        <button
          class="action-btn"
          type="button"
          aria-label="Report conversation"
          title="Report"
          @click="emit('report')"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 20V4" />
            <path d="M6 5h11l-2 4 2 4H6" />
          </svg>
          <span>Report</span>
        </button>
      </div>
    </header>

    <!-- Loading -->
    <div v-if="loading" class="state-area">
      <LoadingSpinner />
    </div>

    <!-- Error -->
    <div v-else-if="error" class="state-area">
      <ErrorState
        :message="error"
        @retry="emit('retry')"
      />
    </div>

    <!-- No conversation -->
    <div v-else-if="!conversation" class="state-area">
      <div class="empty-chat-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H7l-3 2v-4.2A7.5 7.5 0 1 1 20 11.5Z" />
          <path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01" />
        </svg>
      </div>

      <EmptyState
        title="Select a conversation"
        message="Choose a chat from the list to start messaging."
      />
    </div>

    <!-- Messages -->
    <div v-else class="msgs">
      <div class="messages-inner">
        <div class="conversation-start">
          <span>Conversation</span>
        </div>

        <MessageBubble
          v-for="m in messages"
          :key="m.id"
          :message="m"
        />

        <TypingIndicator v-if="typing" />
      </div>
    </div>

    <!-- Message Input -->
    <footer v-if="conversation" class="composer">
      <MessageInput @send="emit('send', $event)" />

      <p class="security-note">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="5" y="10" width="14" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>

        Keep personal information secure when chatting.
      </p>
    </footer>

  </section>
</template>

<style scoped>
.window {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 620px;
  height: 100%;
  overflow: hidden;
  border: 0;
  border-radius: 17px;
  background: #ffffff;
}

/* =========================
   Header
========================= */

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  min-height: 76px;
  padding: 12px 17px;
  border-bottom: 1px solid #e8eeea;
  background: rgba(255, 255, 255, 0.98);
}

.person {
  display: flex;
  align-items: center;
  min-width: 0;
  gap: 11px;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  flex: 0 0 auto;
  border-radius: 13px;
  background: linear-gradient(135deg, #e5f7eb, #d4efdd);
  color: #18844b;
  font-size: 15px;
  font-weight: 850;
  text-transform: uppercase;
}

.person-info {
  min-width: 0;
}

.name-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.name-row h2 {
  margin: 0;
  color: #1d2a23;
  font-size: 14px;
  font-weight: 850;
  line-height: 1.3;
}

.presence {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 7px;
  border-radius: 999px;
  font-size: 9px;
  font-weight: 800;
}

.presence.online {
  background: #eaf8ef;
  color: #19854c;
}

.presence.offline {
  background: #f1f3f2;
  color: #7b8580;
}

.presence-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}

.online .presence-dot {
  background: #25a35d;
  box-shadow: 0 0 0 3px rgba(37, 163, 93, 0.1);
}

.offline .presence-dot {
  background: #9ba39f;
}

.property-name {
  display: flex;
  align-items: center;
  gap: 5px;
  max-width: 430px;
  margin: 4px 0 0;
  overflow: hidden;
  color: #87918b;
  font-size: 10px;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.property-name svg {
  width: 12px;
  height: 12px;
  flex: 0 0 auto;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* =========================
   Header actions
========================= */

.actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 32px;
  padding: 0 9px;
  border: 1px solid #e0e7e3;
  border-radius: 9px;
  background: #ffffff;
  color: #68736d;
  font: inherit;
  font-size: 10px;
  font-weight: 750;
  cursor: pointer;
  transition:
    border-color 0.18s ease,
    background 0.18s ease,
    color 0.18s ease;
}

.action-btn svg {
  width: 13px;
  height: 13px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.action-btn:hover {
  border-color: #c9d9d0;
  background: #f6faf7;
  color: #27834f;
}

/* =========================
   State area
========================= */

.state-area {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 400px;
  padding: 24px;
}

.empty-chat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  margin: 0 auto 5px;
  border: 1px solid #dcebe2;
  border-radius: 16px;
  background: #edf8f1;
  color: #218850;
}

.empty-chat-icon svg {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* =========================
   Messages
========================= */

.msgs {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  background:
    radial-gradient(
      circle at 50% 0%,
      rgba(32, 151, 82, 0.035),
      transparent 34%
    ),
    #fbfcfb;
}

.messages-inner {
  display: flex;
  flex-direction: column;
  gap: 3px;
  max-width: 900px;
  min-height: 100%;
  margin: 0 auto;
  padding: 20px 20px 24px;
  box-sizing: border-box;
}

.conversation-start {
  display: flex;
  justify-content: center;
  margin: 2px 0 17px;
}

.conversation-start span {
  padding: 5px 9px;
  border: 1px solid #e4ebe7;
  border-radius: 999px;
  background: #ffffff;
  color: #9aa39e;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* =========================
   Composer
========================= */

.composer {
  flex: 0 0 auto;
  padding: 10px 14px 11px;
  border-top: 1px solid #e8eeea;
  background: #ffffff;
}

.security-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin: 6px 0 0;
  color: #9aa29d;
  font-size: 8px;
  line-height: 1.4;
  text-align: center;
}

.security-note svg {
  width: 10px;
  height: 10px;
  flex: 0 0 auto;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* =========================
   Tablet
========================= */

@media (max-width: 700px) {
  .window {
    min-height: 500px;
    border-radius: 14px;
  }

  .head {
    min-height: 68px;
    padding: 10px 12px;
  }

  .avatar {
    width: 38px;
    height: 38px;
    border-radius: 11px;
  }

  .messages-inner {
    padding: 16px 13px 20px;
  }

  .composer {
    padding: 9px 10px 10px;
  }
}

/* =========================
   Mobile
========================= */

@media (max-width: 480px) {
  .head {
    align-items: flex-start;
  }

  .actions {
    gap: 4px;
  }

  .action-btn {
    width: 32px;
    padding: 0;
  }

  .action-btn span {
    display: none;
  }

  .person-info {
    max-width: calc(100vw - 130px);
  }

  .property-name {
    max-width: 190px;
  }

  .messages-inner {
    padding: 13px 10px 18px;
  }

  .security-note {
    font-size: 7px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .action-btn {
    transition: none;
  }
}
</style>