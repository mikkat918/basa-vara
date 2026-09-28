<script setup>
import { onMounted } from 'vue'
import { useNotificationStore } from '../../stores/notificationStore'

const notifications = useNotificationStore()

onMounted(() => notifications.load())
</script>

<template>
  <div class="page notifications-page">
    <!-- Header -->
    <header class="page-header">
      <div class="header-copy">
        <span class="eyebrow">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"></path>
            <path d="M10 21h4"></path>
          </svg>
          Updates &amp; alerts
        </span>

```
    <h1>Notifications</h1>

    <p>
      Stay updated with important activity, property updates and account
      notifications.
    </p>
  </div>

  <div class="header-badge">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"></path>
      <path d="M10 21h4"></path>
    </svg>
    Notifications
  </div>
</header>

<!-- Notifications Card -->
<section class="card panel">
  <div class="panel-header">
    <div>
      <span class="section-label">Activity center</span>
      <h2>Recent notifications</h2>
      <p>Your latest account and platform updates.</p>
    </div>

    <div class="count-badge">
      {{ notifications.items.length }}
      <span>total</span>
    </div>
  </div>

  <!-- Notification List -->
  <ul v-if="notifications.items.length" class="list">
    <li
      v-for="item in notifications.items"
      :key="item.id"
      class="notification-item"
    >
      <div class="notification-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"></path>
          <path d="M10 21h4"></path>
        </svg>
      </div>

      <div class="notification-content">
        <strong>{{ item.title }}</strong>
        <p>{{ item.body }}</p>
      </div>

      <div class="notification-arrow">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </div>
    </li>
  </ul>

  <!-- Empty State -->
  <div v-else class="empty-state">
    <div class="empty-icon">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"></path>
        <path d="M10 21h4"></path>
      </svg>
    </div>

    <h3>No notifications yet</h3>

    <p>
      New account activity and important updates will appear here.
    </p>
  </div>
</section>
```

  </div>
</template>

<style scoped>
.page {
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: clamp(22px, 4vw, 42px);
  background:
    radial-gradient(circle at 8% 0%, rgba(23, 132, 95, 0.10), transparent 30%),
    radial-gradient(circle at 96% 12%, rgba(31, 167, 122, 0.08), transparent 28%),
    #f6f8f7;
  color: #18231f;
}

.notifications-page {
  display: grid;
  gap: 24px;
}

/* Header */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

.header-copy {
  min-width: 0;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 9px;
  color: #17845f;
  font-size: 0.72rem;
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
  font-size: clamp(1.7rem, 3vw, 2.35rem);
  line-height: 1.1;
  letter-spacing: -0.035em;
}

.page-header p {
  max-width: 680px;
  margin: 9px 0 0;
  color: #6d7b75;
  font-size: 0.94rem;
  line-height: 1.65;
}

.header-badge {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: 1px solid #d9ebe3;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.86);
  color: #397360;
  font-size: 0.78rem;
  font-weight: 800;
  white-space: nowrap;
  box-shadow: 0 6px 18px rgba(28, 73, 57, 0.05);
}

.header-badge svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Main Card */
.panel {
  width: 100%;
  box-sizing: border-box;
  padding: clamp(20px, 3vw, 30px);
  border: 1px solid #e3ebe7;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.97);
  box-shadow: 0 14px 40px rgba(26, 55, 44, 0.07);
  overflow: hidden;
}

/* Panel Header */
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding-bottom: 22px;
  border-bottom: 1px solid #edf1ef;
}

.section-label {
  display: block;
  margin-bottom: 4px;
  color: #7b8983;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.panel-header h2 {
  margin: 0;
  color: #1b2923;
  font-size: 1.08rem;
  letter-spacing: -0.015em;
}

.panel-header p {
  margin: 5px 0 0;
  color: #7a8782;
  font-size: 0.81rem;
}

.count-badge {
  min-width: 52px;
  display: inline-flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
  padding: 9px 12px;
  border: 1px solid #dceee7;
  border-radius: 11px;
  background: #f1f9f6;
  color: #17845f;
  font-size: 0.95rem;
  font-weight: 850;
}

.count-badge span {
  color: #6e8379;
  font-size: 0.68rem;
  font-weight: 700;
}

/* List */
.list {
  list-style: none;
  margin: 0;
  padding: 4px 0 0;
  display: grid;
}

.notification-item {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr) 22px;
  align-items: center;
  gap: 14px;
  padding: 18px 4px;
  border-bottom: 1px solid #edf1ef;
  transition:
    background 0.18s ease,
    transform 0.18s ease;
}

.notification-item:last-child {
  border-bottom: 0;
}

.notification-item:hover {
  padding-left: 9px;
  padding-right: 9px;
  border-radius: 12px;
  background: #fbfdfc;
}

/* Notification Icon */
.notification-icon {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border: 1px solid #dcefe7;
  border-radius: 13px;
  background: #eff9f5;
  color: #17845f;
}

.notification-icon svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Content */
.notification-content {
  min-width: 0;
}

.notification-content strong {
  display: block;
  overflow: hidden;
  color: #27362f;
  font-size: 0.88rem;
  font-weight: 800;
  line-height: 1.4;
  text-overflow: ellipsis;
}

.notification-content p {
  margin: 4px 0 0;
  color: #7c8984;
  font-size: 0.78rem;
  line-height: 1.55;
}

/* Arrow */
.notification-arrow {
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  color: #a0aaa5;
}

.notification-arrow svg {
  width: 17px;
  height: 17px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Empty State */
.empty-state {
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 35px 20px;
  text-align: center;
}

.empty-icon {
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  margin-bottom: 15px;
  border-radius: 16px;
  background: #eff8f4;
  color: #17845f;
}

.empty-icon svg {
  width: 27px;
  height: 27px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.empty-state h3 {
  margin: 0;
  color: #293831;
  font-size: 0.98rem;
}

.empty-state p {
  max-width: 420px;
  margin: 7px 0 0;
  color: #89948f;
  font-size: 0.8rem;
  line-height: 1.6;
}

/* Tablet */
@media (max-width: 800px) {
  .page {
    padding: 24px 20px;
  }

  .panel {
    padding: 22px;
  }
}

/* Mobile */
@media (max-width: 620px) {
  .page {
    padding: 20px 14px;
  }

  .page-header {
    flex-direction: column;
    gap: 13px;
  }

  .header-badge {
    align-self: flex-start;
  }

  .panel {
    padding: 18px;
    border-radius: 16px;
  }

  .panel-header {
    align-items: flex-start;
  }

  .notification-item {
    grid-template-columns: 40px minmax(0, 1fr);
    gap: 11px;
    padding: 15px 2px;
  }

  .notification-icon {
    width: 40px;
    height: 40px;
    border-radius: 11px;
  }

  .notification-icon svg {
    width: 18px;
    height: 18px;
  }

  .notification-arrow {
    display: none;
  }
}

/* Small mobile */
@media (max-width: 430px) {
  .page-header h1 {
    font-size: 1.55rem;
  }

  .page-header p {
    font-size: 0.84rem;
  }

  .panel-header {
    gap: 10px;
  }

  .panel-header h2 {
    font-size: 0.98rem;
  }

  .panel-header p {
    font-size: 0.74rem;
  }

  .count-badge {
    padding: 8px 9px;
  }

  .notification-content strong {
    font-size: 0.82rem;
  }

  .notification-content p {
    font-size: 0.74rem;
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

