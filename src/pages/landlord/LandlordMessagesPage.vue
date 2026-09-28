<script setup>
const messages = [
  { sender: 'Nabila', preview: 'I am interested in your flat in Banani.', time: '08:40 AM' },
  { sender: 'Sajid', preview: 'Can you share the lease terms?', time: 'Yesterday' },
]
</script>

```vue
<template>
  <div class="page">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <span class="eyebrow">Communication center</span>
        <h1>Messages</h1>
        <p class="muted">
          Review conversations and recent messages from users.
        </p>
      </div>

      <div class="header-badge">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-5 4v-4.5A2.5 2.5 0 0 1 4 13.5z"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linejoin="round"
          />
          <path
            d="M8 8h8M8 11.5h5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
          />
        </svg>

        <span>{{ messages?.length || 0 }} messages</span>
      </div>
    </div>

    <!-- Messages Card -->
    <div class="card panel">
      <div class="panel-header">
        <div class="panel-title">
          <div class="title-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-5 4v-4.5A2.5 2.5 0 0 1 4 13.5z"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
              />
              <path
                d="M8 8h8M8 11.5h5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>
          </div>

          <div>
            <span class="section-eyebrow">Inbox</span>
            <h2>Recent conversations</h2>
          </div>
        </div>

        <span class="count-badge">
          {{ messages?.length || 0 }}
        </span>
      </div>

      <!-- Empty State -->
      <div
        v-if="!messages?.length"
        class="empty-state"
      >
        <div class="empty-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-5 4v-4.5A2.5 2.5 0 0 1 4 13.5z"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <h3>No messages yet</h3>
        <p>Your recent conversations will appear here.</p>
      </div>

      <!-- Message List -->
      <div
        v-else
        class="message-list"
      >
        <div
          v-for="item in messages"
          :key="item.sender"
          class="message-row"
        >
          <!-- Avatar -->
          <div class="avatar">
            {{ item.sender?.charAt(0)?.toUpperCase() || "U" }}
          </div>

          <!-- Message Content -->
          <div class="message-content">
            <div class="message-top">
              <strong>{{ item.sender }}</strong>

              <small>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle
                    cx="12"
                    cy="12"
                    r="8.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />
                  <path
                    d="M12 7v5l3 2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                {{ item.time }}
              </small>
            </div>

            <span class="preview">
              {{ item.preview }}
            </span>
          </div>

          <!-- Message Indicator -->
          <div class="message-indicator">
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: clamp(20px, 3vw, 40px);
  background:
    radial-gradient(
      circle at 88% 4%,
      rgba(16, 185, 129, 0.08),
      transparent 28%
    ),
    radial-gradient(
      circle at 8% 92%,
      rgba(20, 184, 166, 0.06),
      transparent 30%
    ),
    #f6f8f7;
  color: #17221d;
}

/* =========================
   Header
========================= */

.page-header {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto 18px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}

.eyebrow {
  display: block;
  margin-bottom: 5px;
  color: #17845f;
  font-size: 10px;
  font-weight: 850;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.page-header h1 {
  margin: 0;
  color: #17221d;
  font-size: clamp(25px, 3vw, 34px);
  line-height: 1.1;
  font-weight: 850;
  letter-spacing: -0.04em;
}

.muted {
  color: #7b8881;
}

.page-header p {
  margin: 6px 0 0;
  font-size: 12px;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  border: 1px solid #dceae3;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.84);
  color: #557066;
  font-size: 10px;
  font-weight: 800;
  white-space: nowrap;
}

.header-badge svg {
  width: 17px;
  height: 17px;
  color: #17845f;
}

/* =========================
   Main Card
========================= */

.card {
  background: rgba(255, 255, 255, 0.97);
  border: 1px solid #e4ebe7;
  border-radius: 20px;
  box-shadow:
    0 16px 45px rgba(28, 53, 43, 0.055),
    0 3px 10px rgba(28, 53, 43, 0.035);
}

.panel {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 22px;
  box-sizing: border-box;
}

/* =========================
   Panel Header
========================= */

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 20px;
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 11px;
}

.title-icon {
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: #edf8f3;
  border: 1px solid #dceee6;
  color: #16805c;
}

.title-icon svg {
  width: 21px;
  height: 21px;
}

.section-eyebrow {
  display: block;
  color: #17845f;
  font-size: 9px;
  font-weight: 850;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.panel-header h2 {
  margin: 4px 0 0;
  color: #24322b;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.count-badge {
  min-width: 30px;
  height: 26px;
  padding: 0 9px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: #edf8f3;
  border: 1px solid #dceee6;
  color: #177653;
  font-size: 10px;
  font-weight: 850;
}

/* =========================
   Message List
========================= */

.message-list {
  display: grid;
  gap: 8px;
}

.message-row {
  min-width: 0;
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr) 8px;
  align-items: center;
  gap: 12px;
  padding: 13px 14px;
  border: 1px solid #e7eeea;
  border-radius: 14px;
  background: #fff;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.message-row:hover {
  transform: translateY(-1px);
  border-color: #d6e7df;
  background: #fcfefd;
  box-shadow: 0 7px 20px rgba(28, 53, 43, 0.045);
}

/* =========================
   Avatar
========================= */

.avatar {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    #e8f7f0,
    #d8eee4
  );
  border: 1px solid #d2e9df;
  color: #167753;
  font-size: 12px;
  font-weight: 850;
}

/* =========================
   Message Content
========================= */

.message-content {
  min-width: 0;
}

.message-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.message-top strong {
  min-width: 0;
  overflow: hidden;
  color: #2e3d35;
  font-size: 12px;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.message-top small {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #929c97;
  font-size: 9px;
  white-space: nowrap;
}

.message-top small svg {
  width: 12px;
  height: 12px;
}

.preview {
  display: block;
  overflow: hidden;
  margin-top: 5px;
  color: #7f8b85;
  font-size: 10px;
  line-height: 1.5;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* =========================
   Indicator
========================= */

.message-indicator {
  width: 8px;
  height: 8px;
  display: grid;
  place-items: center;
}

.message-indicator span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #45a982;
  box-shadow: 0 0 0 3px rgba(69, 169, 130, 0.1);
}

/* =========================
   Empty State
========================= */

.empty-state {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
}

.empty-icon {
  width: 62px;
  height: 62px;
  display: grid;
  place-items: center;
  margin-bottom: 14px;
  border-radius: 18px;
  background: #edf8f3;
  border: 1px solid #dceee6;
  color: #16805c;
}

.empty-icon svg {
  width: 29px;
  height: 29px;
}

.empty-state h3 {
  margin: 0;
  color: #33423a;
  font-size: 16px;
  font-weight: 800;
}

.empty-state p {
  margin: 6px 0 0;
  color: #8a958f;
  font-size: 11px;
}

/* =========================
   Responsive
========================= */

@media (max-width: 700px) {
  .page {
    padding: 22px 18px;
  }

  .header-badge {
    display: none;
  }

  .panel {
    padding: 18px;
  }

  .message-row {
    grid-template-columns: 40px minmax(0, 1fr) 7px;
    gap: 10px;
  }

  .avatar {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .page {
    padding: 18px 14px;
  }

  .page-header h1 {
    font-size: 27px;
  }

  .panel {
    padding: 14px;
    border-radius: 17px;
  }

  .panel-header {
    align-items: flex-start;
  }

  .panel-header h2 {
    font-size: 16px;
  }

  .title-icon {
    width: 38px;
    height: 38px;
    flex-basis: 38px;
  }

  .message-row {
    grid-template-columns: 39px minmax(0, 1fr);
    padding: 13px;
  }

  .message-indicator {
    display: none;
  }

  .message-top {
    align-items: flex-start;
    flex-direction: column;
    gap: 4px;
  }

  .message-top small {
    font-size: 8px;
  }

  .preview {
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}

@media (prefers-reduced-motion: reduce) {
  .message-row {
    transition: none;
  }
}
</style>