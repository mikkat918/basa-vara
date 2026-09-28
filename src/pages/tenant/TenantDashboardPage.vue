<script setup>
import { computed, onMounted } from 'vue'
import { usePropertyStore } from '../../stores/propertyStore'
import { useWalletStore } from '../../stores/walletStore'
import { useChatStore } from '../../stores/chatStore'
import { useAuthStore } from '../../stores/authStore'
import { propertyService } from '../../services/propertyService'
import PropertyGrid from '../../components/property/PropertyGrid.vue'

const auth = useAuthStore()
const propertyStore = usePropertyStore()
const walletStore = useWalletStore()
const chatStore = useChatStore()
const saved = computed(() => propertyStore.saved)
const recommended = computed(() => propertyStore.results.slice(0, 3))

onMounted(async () => {
  await walletStore.load()
  await propertyStore.loadSaved('')
  await chatStore.loadList()
  await propertyStore.search({ page: 1, pageSize: 3 })
})

const stats = computed(() => [
  { label: 'Saved properties', value: saved.value.length },
  { label: 'Active conversations', value: chatStore.conversations.length },
  { label: 'Coin balance', value: `${walletStore.coinBalance} coins` },
  { label: 'Unlocked contacts', value: '0' },
])
</script>

```vue id="tenant-dashboard-pro"
<template>
  <div class="page dashboard">
    <!-- Header -->
    <header class="dashboard-header">
      <div class="header-copy">
        <span class="eyebrow">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M3.75 10.25 12 3.5l8.25 6.75v9.5a.75.75 0 0 1-.75.75h-5.25v-5.25h-4.5v5.25H4.5a.75.75 0 0 1-.75-.75v-9.5Z"
            />
          </svg>
          Tenant workspace
        </span>

        <h1>Tenant dashboard</h1>

        <p class="subtitle">
          Manage your saved homes, explore new properties, and stay connected
          with landlords from one place.
        </p>
      </div>

      <div class="dashboard-status">
        <span class="status-dot"></span>
        <span>Dashboard overview</span>
      </div>
    </header>

    <!-- Stats -->
    <section class="stats" aria-label="Dashboard statistics">
      <div
        v-for="(stat, index) in stats"
        :key="stat.label"
        class="card stat-card"
      >
        <div class="stat-top">
          <div class="stat-icon" :class="`stat-icon-${index % 4}`">
            <svg
              v-if="index === 0"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M4 10.25 12 3.5l8 6.75v9.25a.75.75 0 0 1-.75.75h-5v-5.5h-4.5v5.5h-5A.75.75 0 0 1 4 19.5v-9.25Z"
              />
            </svg>

            <svg
              v-else-if="index === 1"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M12 20.25S4.5 15.9 4.5 9.55A4.05 4.05 0 0 1 12 7.32a4.05 4.05 0 0 1 7.5 2.23c0 6.35-7.5 10.7-7.5 10.7Z"
              />
            </svg>

            <svg
              v-else-if="index === 2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v8.5a2.25 2.25 0 0 1-2.25 2.25h-4.3l-2.45 2.45-2.45-2.45h-4.3A2.25 2.25 0 0 1 3 15.25v-8.5A2.25 2.25 0 0 1 5.25 4.5Z"
              />
            </svg>

            <svg
              v-else
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M12 3.25a8.75 8.75 0 1 0 8.75 8.75A8.76 8.76 0 0 0 12 3.25Zm0 4a1.25 1.25 0 1 1-1.25 1.25A1.25 1.25 0 0 1 12 7.25Zm1.1 9.5h-2.2v-6h2.2v6Z"
              />
            </svg>
          </div>

          <span class="stat-label">{{ stat.label }}</span>
        </div>

        <strong>{{ stat.value }}</strong>

        <span class="stat-footer">
          <span class="mini-dot"></span>
          Updated overview
        </span>
      </div>
    </section>

    <!-- Recently Viewed + Saved -->
    <section class="cards-grid">
      <div class="card panel">
        <div class="panel-header">
          <div>
            <span class="section-label">Your activity</span>
            <h2>Recently viewed</h2>
          </div>

          <div class="panel-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 5.25a6.75 6.75 0 1 0 6.75 6.75h-1.5A5.25 5.25 0 1 1 12 6.75V5.25Zm.75 0v6.75h6.75v-1.5h-5.25V5.25h-1.5Z"
              />
            </svg>
          </div>
        </div>

        <div v-if="propertyStore.saved.length" class="activity-state">
          <div class="activity-visual">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4.5 5.25A2.25 2.25 0 0 1 6.75 3h10.5a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 17.25 21H6.75A2.25 2.25 0 0 1 4.5 18.75V5.25Zm3 1.5v1.5h9v-1.5h-9Zm0 3.75V12h6v-1.5h-6Zm0 3.75v1.5h9v-1.5h-9Z"
              />
            </svg>
          </div>

          <div>
            <strong>Continue exploring</strong>
            <p class="muted">
              Your browsing history is ready to continue.
            </p>
          </div>
        </div>

        <div v-else class="empty-state">
          <div class="empty-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 4.5a7.5 7.5 0 1 0 7.5 7.5A7.5 7.5 0 0 0 12 4.5Zm.75 3v4.19l2.8 1.62-.75 1.3-3.55-2.05V7.5h1.5Z"
              />
            </svg>
          </div>

          <div>
            <strong>No browsing history</strong>
            <p class="muted">
              You have not viewed any properties yet.
            </p>
          </div>
        </div>
      </div>

      <div class="card panel">
        <div class="panel-header">
          <div>
            <span class="section-label">Your shortlist</span>
            <h2>Saved properties</h2>
          </div>

          <div class="panel-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6 3.75A2.25 2.25 0 0 1 8.25 1.5h7.5A2.25 2.25 0 0 1 18 3.75v17.1a.65.65 0 0 1-1.03.53L12 17.7l-4.97 3.68A.65.65 0 0 1 6 20.85V3.75Z"
              />
            </svg>
          </div>
        </div>

        <div v-if="saved.length" class="property-preview">
          <PropertyGrid
            :items="saved.slice(0, 3)"
            :loading="propertyStore.loading"
          />
        </div>

        <div v-else class="empty-state">
          <div class="empty-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 20.25S4.5 15.9 4.5 9.55A4.05 4.05 0 0 1 12 7.32a4.05 4.05 0 0 1 7.5 2.23c0 6.35-7.5 10.7-7.5 10.7Z"
              />
            </svg>
          </div>

          <div>
            <strong>No saved properties</strong>
            <p class="muted">
              Save properties you like and find them here later.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Conversations -->
    <section class="card panel conversations-panel">
      <div class="panel-header">
        <div>
          <span class="section-label">Stay connected</span>
          <h2>Recent conversations</h2>
        </div>

        <div class="conversation-count">
          {{ chatStore.conversations.length || 0 }}
          <span>recent</span>
        </div>
      </div>

      <ul
        v-if="chatStore.conversations.length"
        class="list"
      >
        <li
          v-for="conversation in chatStore.conversations.slice(0, 3)"
          :key="conversation.id"
          class="conversation-item"
        >
          <div class="conversation-avatar">
            {{
              (conversation.other?.name || 'C')
                .charAt(0)
                .toUpperCase()
            }}
          </div>

          <div class="conversation-content">
            <strong>
              {{ conversation.other?.name || 'Conversation' }}
            </strong>

            <p>
              {{ conversation.lastMessage || 'No messages yet' }}
            </p>
          </div>

          <div class="conversation-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="m9 5 7 7-7 7 1.5 1.5 8.5-8.5-8.5-8.5L9 5Z" />
            </svg>
          </div>
        </li>
      </ul>

      <div v-else class="empty-state conversation-empty">
        <div class="empty-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v8.5a2.25 2.25 0 0 1-2.25 2.25h-4.3l-2.45 2.45-2.45-2.45h-4.3A2.25 2.25 0 0 1 3 15.25v-8.5A2.25 2.25 0 0 1 5.25 4.5Z"
            />
          </svg>
        </div>

        <div>
          <strong>No conversations yet</strong>
          <p class="muted">
            Your recent landlord conversations will appear here.
          </p>
        </div>
      </div>
    </section>

    <!-- Recommended -->
    <section class="card panel recommended-panel">
      <div class="panel-header">
        <div>
          <span class="section-label">For you</span>
          <h2>Recommended properties</h2>
          <p class="panel-description">
            Properties that may match what you're looking for.
          </p>
        </div>

        <div class="recommendation-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 2.75 14.9 8.6l6.45.94-4.67 4.55 1.1 6.43L12 17.48l-5.78 3.04 1.1-6.43-4.67-4.55 6.45-.94L12 2.75Z"
            />
          </svg>
        </div>
      </div>

      <div class="recommended-content">
        <PropertyGrid
          :items="recommended"
          :loading="propertyStore.loading"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.dashboard {
  min-height: 100%;
  box-sizing: border-box;
  display: grid;
  gap: clamp(18px, 2vw, 24px);
  padding: clamp(22px, 3vw, 42px);
  background:
    radial-gradient(
      circle at 94% 0%,
      rgba(24, 148, 103, 0.08),
      transparent 28%
    ),
    radial-gradient(
      circle at 0% 100%,
      rgba(24, 148, 103, 0.055),
      transparent 28%
    ),
    #f6f8f7;
}

/* Header */
.dashboard-header {
  width: min(100%, 1400px);
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

.header-copy {
  min-width: 0;
}

.eyebrow,
.section-label {
  color: #17845f;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 9px;
}

.eyebrow svg {
  width: 15px;
  height: 15px;
  fill: currentColor;
}

.dashboard-header h1 {
  margin: 0;
  color: #17231e;
  font-size: clamp(1.8rem, 3vw, 2.55rem);
  line-height: 1.1;
  font-weight: 820;
  letter-spacing: -0.04em;
}

.subtitle {
  max-width: 700px;
  margin: 10px 0 0;
  color: #6b7771;
  font-size: 0.96rem;
  line-height: 1.65;
}

.dashboard-status {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: 1px solid rgba(23, 132, 95, 0.13);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.86);
  color: #176f53;
  font-size: 0.82rem;
  font-weight: 750;
  box-shadow: 0 5px 18px rgba(26, 48, 39, 0.045);
  white-space: nowrap;
}

.status-dot,
.mini-dot {
  display: inline-block;
  border-radius: 50%;
  background: #1a9a6a;
}

.status-dot {
  width: 8px;
  height: 8px;
  box-shadow: 0 0 0 4px rgba(26, 154, 106, 0.1);
}

/* Stats */
.stats {
  width: min(100%, 1400px);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.card {
  border: 1px solid rgba(22, 37, 31, 0.07);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow:
    0 14px 40px rgba(24, 42, 35, 0.045),
    0 2px 8px rgba(24, 42, 35, 0.025);
}

.stat-card {
  min-width: 0;
  padding: 18px;
  display: grid;
  gap: 14px;
}

.stat-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.stat-label {
  min-width: 0;
  color: #65716b;
  font-size: 0.8rem;
  font-weight: 700;
  text-align: right;
}

.stat-icon,
.panel-icon,
.recommendation-icon,
.empty-icon {
  display: grid;
  place-items: center;
}

.stat-icon {
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  border-radius: 12px;
  color: #17845f;
  background: rgba(23, 132, 95, 0.09);
}

.stat-icon-1 {
  color: #92700b;
  background: rgba(196, 155, 30, 0.1);
}

.stat-icon-2 {
  color: #4773b6;
  background: rgba(71, 115, 182, 0.1);
}

.stat-icon-3 {
  color: #8058a8;
  background: rgba(128, 88, 168, 0.1);
}

.stat-icon svg {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.stat-card strong {
  color: #17231e;
  font-size: clamp(1.5rem, 2.4vw, 2rem);
  line-height: 1;
  font-weight: 820;
  letter-spacing: -0.035em;
}

.stat-footer {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #89928d;
  font-size: 0.7rem;
  font-weight: 650;
}

.mini-dot {
  width: 6px;
  height: 6px;
}

/* Main two-column section */
.cards-grid {
  width: min(100%, 1400px);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.panel {
  min-width: 0;
  overflow: hidden;
  padding: 0;
}

.panel-header {
  min-height: 76px;
  box-sizing: border-box;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid #edf1ef;
  background: linear-gradient(
    180deg,
    rgba(249, 252, 250, 0.95),
    rgba(255, 255, 255, 0.96)
  );
}

.section-label {
  display: block;
  margin-bottom: 4px;
  font-size: 0.67rem;
}

.panel h2 {
  margin: 0;
  color: #1b2923;
  font-size: 1.05rem;
  line-height: 1.3;
  font-weight: 780;
}

.panel-description {
  margin: 6px 0 0;
  color: #77827c;
  font-size: 0.84rem;
  line-height: 1.5;
}

.panel-icon,
.recommendation-icon {
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  border-radius: 12px;
  color: #17845f;
  background: rgba(23, 132, 95, 0.09);
}

.panel-icon svg,
.recommendation-icon svg {
  width: 19px;
  height: 19px;
  fill: currentColor;
}

/* Activity */
.activity-state,
.empty-state {
  padding: 28px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.activity-visual,
.empty-icon {
  width: 46px;
  height: 46px;
  flex: 0 0 46px;
  border-radius: 14px;
  color: #17845f;
  background: rgba(23, 132, 95, 0.08);
}

.activity-visual svg,
.empty-icon svg {
  width: 22px;
  height: 22px;
  fill: currentColor;
}

.activity-state strong,
.empty-state strong {
  display: block;
  margin-bottom: 4px;
  color: #27342e;
  font-size: 0.9rem;
}

.muted {
  margin: 0;
  color: #77827c;
  font-size: 0.83rem;
  line-height: 1.55;
}

.property-preview {
  padding: 18px;
}

/* Conversations */
.conversations-panel {
  width: min(100%, 1400px);
  margin: 0 auto;
}

.conversation-count {
  padding: 7px 10px;
  border-radius: 999px;
  background: rgba(23, 132, 95, 0.08);
  color: #17845f;
  font-size: 0.78rem;
  font-weight: 800;
}

.conversation-count span {
  margin-left: 3px;
  font-weight: 650;
}

.list {
  list-style: none;
  padding: 10px 18px 18px;
  margin: 0;
  display: grid;
  gap: 8px;
}

.conversation-item {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 12px;
  border: 1px solid transparent;
  border-radius: 13px;
  transition:
    background 160ms ease,
    border-color 160ms ease,
    transform 160ms ease;
}

.conversation-item:hover {
  background: #f7faf8;
  border-color: #e6eeea;
  transform: translateY(-1px);
}

.conversation-avatar {
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(23, 132, 95, 0.1);
  color: #17845f;
  font-size: 0.84rem;
  font-weight: 800;
}

.conversation-content {
  min-width: 0;
  flex: 1;
}

.conversation-content strong {
  display: block;
  overflow: hidden;
  color: #25332d;
  font-size: 0.86rem;
  font-weight: 750;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.conversation-content p {
  overflow: hidden;
  margin: 4px 0 0;
  color: #7a857f;
  font-size: 0.79rem;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.conversation-arrow {
  width: 26px;
  height: 26px;
  flex: 0 0 26px;
  display: grid;
  place-items: center;
  color: #a1aaa5;
}

.conversation-arrow svg {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

.conversation-empty {
  min-height: 150px;
  box-sizing: border-box;
}

/* Recommended */
.recommended-panel {
  width: min(100%, 1400px);
  margin: 0 auto;
}

.recommended-content {
  padding: 20px;
}

.recommendation-icon {
  color: #92700b;
  background: rgba(196, 155, 30, 0.1);
}

/* Responsive */
@media (max-width: 1050px) {
  .stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 820px) {
  .dashboard {
    padding: 24px 18px;
  }

  .dashboard-header {
    display: grid;
    gap: 14px;
  }

  .dashboard-status {
    justify-self: start;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .dashboard {
    padding: 18px 14px 28px;
    gap: 16px;
  }

  .stats {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .stat-card {
    padding: 15px;
    gap: 11px;
    border-radius: 15px;
  }

  .stat-icon {
    width: 35px;
    height: 35px;
    flex-basis: 35px;
    border-radius: 10px;
  }

  .stat-icon svg {
    width: 17px;
    height: 17px;
  }

  .stat-label {
    font-size: 0.72rem;
  }

  .stat-card strong {
    font-size: 1.4rem;
  }

  .panel-header {
    padding: 15px;
  }

  .property-preview,
  .recommended-content {
    padding: 12px;
  }

  .list {
    padding: 8px 10px 12px;
  }
}

@media (max-width: 420px) {
  .dashboard {
    padding: 14px 10px 22px;
  }

  .dashboard-header h1 {
    font-size: 1.65rem;
  }

  .subtitle {
    font-size: 0.88rem;
  }

  .stats {
    gap: 8px;
  }

  .stat-card {
    padding: 13px;
  }

  .stat-top {
    align-items: flex-start;
  }

  .stat-label {
    line-height: 1.3;
  }

  .panel-header {
    min-height: 68px;
  }

  .panel-icon,
  .recommendation-icon {
    width: 35px;
    height: 35px;
    flex-basis: 35px;
  }

  .panel-icon svg,
  .recommendation-icon svg {
    width: 17px;
    height: 17px;
  }

  .activity-state,
  .empty-state {
    padding: 22px 15px;
  }

  .conversation-item {
    padding: 10px 7px;
  }
}

@media (max-width: 360px) {
  .stats {
    grid-template-columns: 1fr;
  }

  .stat-top {
    align-items: center;
  }

  .stat-label {
    text-align: left;
  }

  .dashboard-status {
    width: 100%;
    box-sizing: border-box;
    justify-content: center;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .dashboard *,
  .dashboard *::before,
  .dashboard *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
</style>
