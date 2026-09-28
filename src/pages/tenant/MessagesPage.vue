<script setup>
import { onMounted } from 'vue'
import ChatView from '../../components/chat/ChatView.vue'
import { useChatStore } from '../../stores/chatStore'

const chat = useChatStore()

onMounted(() => chat.loadList())
</script>

<template>
  <div class="page chat-page">
    <header class="page-header">
      <div class="header-copy">
        <span class="eyebrow">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.8 8.8 0 0 1-3.3-.6L4 20l1.7-3.7A7.3 7.3 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z"></path>
            <path d="M8 11h.01M12 11h.01M16 11h.01"></path>
          </svg>
          Communication
        </span>

```
    <h1>Messages</h1>

    <p>
      Communicate with tenants and landlords directly from your Basa Vara workspace.
    </p>
  </div>

  <div class="header-status">
    <span class="status-dot"></span>
    Secure messaging
  </div>
</header>

<main class="chat-card">
  <div class="chat-card-header">
    <div class="chat-title">
      <div class="chat-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.8 8.8 0 0 1-3.3-.6L4 20l1.7-3.7A7.3 7.3 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z"></path>
          <path d="M8 11h.01M12 11h.01M16 11h.01"></path>
        </svg>
      </div>

      <div>
        <span>Inbox</span>
        <strong>Conversation center</strong>
      </div>
    </div>

    <div class="secure-badge">
      <span></span>
      Connected
    </div>
  </div>

  <div class="chat-content">
    <ChatView />
  </div>
</main>
```

  </div>
</template>

<style scoped>
.page {
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: clamp(20px, 3.5vw, 38px);
  background:
    radial-gradient(circle at 7% 0%, rgba(23, 132, 95, 0.10), transparent 30%),
    radial-gradient(circle at 96% 12%, rgba(31, 167, 122, 0.08), transparent 28%),
    #f6f8f7;
  color: #18231f;
}

.chat-page {
  display: flex;
  flex-direction: column;
  gap: 22px;
  min-height: 100%;
}

/* Header */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  flex: 0 0 auto;
}

.header-copy {
  min-width: 0;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 8px;
  color: #17845f;
  font-size: 0.71rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.eyebrow svg {
  width: 15px;
  height: 15px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.page-header h1 {
  margin: 0;
  color: #15211c;
  font-size: clamp(1.65rem, 3vw, 2.25rem);
  line-height: 1.1;
  letter-spacing: -0.035em;
}

.page-header p {
  max-width: 680px;
  margin: 8px 0 0;
  color: #6d7b75;
  font-size: 0.9rem;
  line-height: 1.6;
}

.header-status {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 10px 14px;
  border: 1px solid #d9ebe3;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.86);
  color: #397360;
  font-size: 0.76rem;
  font-weight: 800;
  white-space: nowrap;
  box-shadow: 0 6px 18px rgba(28, 73, 57, 0.05);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #1a9b6c;
  box-shadow: 0 0 0 4px rgba(26, 155, 108, 0.10);
}

/* Chat card */
.chat-card {
  min-width: 0;
  flex: 1 1 auto;
  min-height: 520px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #e1eae6;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 16px 45px rgba(26, 55, 44, 0.08);
}

/* Chat header */
.chat-card-header {
  min-height: 68px;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 20px;
  border-bottom: 1px solid #e9efec;
  background: #ffffff;
}

.chat-title {
  display: flex;
  align-items: center;
  gap: 11px;
  min-width: 0;
}

.chat-icon {
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border: 1px solid #dcefe7;
  border-radius: 12px;
  background: #eff9f5;
  color: #17845f;
}

.chat-icon svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.chat-title span,
.chat-title strong {
  display: block;
}

.chat-title span {
  margin-bottom: 2px;
  color: #89958f;
  font-size: 0.67rem;
  font-weight: 750;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.chat-title strong {
  color: #26352e;
  font-size: 0.88rem;
  font-weight: 800;
}

.secure-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 10px;
  border: 1px solid #dceee7;
  border-radius: 999px;
  background: #f3faf7;
  color: #397360;
  font-size: 0.68rem;
  font-weight: 800;
  white-space: nowrap;
}

.secure-badge span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #1b9a6b;
}

/* Chat content */
.chat-content {
  min-width: 0;
  min-height: 0;
  flex: 1 1 auto;
  display: flex;
  overflow: hidden;
}

/*
 * ChatView is intentionally not styled internally here.
 * Its own layout, messages, inputs and functionality remain untouched.
 */
.chat-content :deep(> *) {
  width: 100%;
  min-width: 0;
  min-height: 0;
}

/* Tablet */
@media (max-width: 800px) {
  .page {
    padding: 22px 18px;
  }

  .chat-card {
    min-height: 500px;
  }
}

/* Mobile */
@media (max-width: 620px) {
  .page {
    padding: 18px 12px;
  }

  .chat-page {
    gap: 16px;
  }

  .page-header {
    flex-direction: column;
    gap: 12px;
  }

  .header-status {
    align-self: flex-start;
  }

  .chat-card {
    min-height: calc(100vh - 190px);
    border-radius: 16px;
  }

  .chat-card-header {
    min-height: 62px;
    padding: 10px 14px;
  }
}

/* Small mobile */
@media (max-width: 420px) {
  .page-header h1 {
    font-size: 1.5rem;
  }

  .page-header p {
    font-size: 0.81rem;
  }

  .chat-card-header {
    padding: 9px 11px;
  }

  .chat-icon {
    width: 36px;
    height: 36px;
    flex-basis: 36px;
    border-radius: 10px;
  }

  .chat-icon svg {
    width: 18px;
    height: 18px;
  }

  .secure-badge {
    padding: 6px 8px;
    font-size: 0.62rem;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
</style>
