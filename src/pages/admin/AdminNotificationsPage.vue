<script setup>
const items = [{ title: 'New verification request', time: '2h ago' }, { title: 'Payment issue flagged', time: '1d ago' }]
</script>

```vue
<template>
  <div class="notifications-page">

    <!-- Header -->
    <header class="page-header">
      <div>
        <div class="eyebrow">
          <span class="eyebrow-dot"></span>
          PLATFORM CENTER
        </div>

        <h1>Notifications</h1>

        <p>
          Stay updated with important platform events and system activity.
        </p>
      </div>

      <div class="page-badge">
        <span class="badge-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/>
            <path d="M10 21h4"/>
          </svg>
        </span>
        Notification center
      </div>
    </header>

    <!-- Notifications Card -->
    <section class="card notifications-card">

      <div class="card-header">
        <div>
          <span class="section-eyebrow">
            RECENT UPDATES
          </span>

          <h2>Notification history</h2>

          <p>
            Recent alerts and platform notifications.
          </p>
        </div>

        <div class="count-badge">
          {{ items?.length || 0 }}
          {{ (items?.length || 0) === 1 ? 'notification' : 'notifications' }}
        </div>
      </div>

      <!-- Notification List -->
      <div v-if="items?.length" class="notification-list">

        <div
          v-for="(item, index) in items"
          :key="item.title + index"
          class="notification-item"
        >

          <!-- Icon -->
          <div class="notification-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/>
              <path d="M10 21h4"/>
            </svg>
          </div>

          <!-- Content -->
          <div class="notification-content">
            <strong>{{ item.title }}</strong>
            <span>Platform notification</span>
          </div>

          <!-- Time -->
          <div class="notification-time">
            <span class="time-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9"/>
                <path d="M12 7v5l3 2"/>
              </svg>
            </span>

            <small>{{ item.time }}</small>
          </div>

        </div>

      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">

        <div class="empty-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/>
            <path d="M10 21h4"/>
          </svg>
        </div>

        <h3>No notifications</h3>

        <p>
          New platform notifications will appear here when they are available.
        </p>

      </div>

    </section>

  </div>
</template>

<style scoped>
.notifications-page {
  min-height: 100%;

  padding: clamp(24px, 4vw, 48px);

  box-sizing: border-box;

  background:
    radial-gradient(
      circle at 8% 0%,
      rgba(22, 163, 74, 0.08),
      transparent 28%
    ),
    radial-gradient(
      circle at 95% 10%,
      rgba(14, 165, 164, 0.06),
      transparent 25%
    ),
    #f6f8f7;
}

/* Header */

.page-header {
  max-width: 1500px;

  margin: 0 auto 30px;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 24px;
}

.eyebrow,
.section-eyebrow {
  color: var(--color-primary);

  font-size: 0.68rem;
  font-weight: 800;

  letter-spacing: 0.12em;
}

.eyebrow {
  display: flex;
  align-items: center;

  gap: 8px;

  margin-bottom: 8px;
}

.eyebrow-dot {
  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: var(--color-primary);

  box-shadow:
    0 0 0 4px rgba(22, 163, 74, 0.1);
}

.page-header h1 {
  margin: 0;

  color: #17221d;

  font-size: clamp(2rem, 3vw, 2.7rem);

  line-height: 1.05;

  letter-spacing: -0.04em;
}

.page-header p {
  margin: 10px 0 0;

  color: var(--color-muted);

  font-size: 0.95rem;
}

.page-badge {
  display: flex;
  align-items: center;

  gap: 9px;

  padding: 9px 14px;

  border: 1px solid rgba(22, 163, 74, 0.14);

  border-radius: 999px;

  background: rgba(255, 255, 255, 0.88);

  color: #41604e;

  font-size: 0.78rem;
  font-weight: 700;

  white-space: nowrap;
}

.badge-icon {
  width: 25px;
  height: 25px;

  display: grid;
  place-items: center;

  border-radius: 50%;

  background: rgba(22, 163, 74, 0.09);

  color: var(--color-primary);
}

.badge-icon svg {
  width: 15px;
  height: 15px;

  stroke: currentColor;

  stroke-width: 1.8;

  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Main Card */

.notifications-card {
  width: 100%;
  max-width: 1500px;

  margin: 0 auto;

  padding: 0;

  overflow: hidden;

  border: 1px solid rgba(20, 40, 30, 0.07);

  border-radius: 18px;

  background: rgba(255, 255, 255, 0.96);

  box-shadow:
    0 8px 30px rgba(25, 45, 35, 0.06);
}

/* Card Header */

.card-header {
  padding: 22px 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  border-bottom: 1px solid var(--color-border);
}

.card-header h2 {
  margin: 5px 0 0;

  color: #17221d;

  font-size: 1.1rem;

  letter-spacing: -0.02em;
}

.card-header p {
  margin: 5px 0 0;

  color: var(--color-muted);

  font-size: 0.78rem;
}

.count-badge {
  padding: 7px 11px;

  border-radius: 999px;

  background: #f1f5f2;

  color: #5f6d65;

  font-size: 0.72rem;
  font-weight: 700;

  white-space: nowrap;
}

/* Notification List */

.notification-list {
  display: grid;
}

.notification-item {
  display: grid;

  grid-template-columns: 42px minmax(0, 1fr) auto;

  align-items: center;

  gap: 14px;

  padding: 17px 24px;

  border-bottom: 1px solid var(--color-border);

  transition:
    background 0.18s ease,
    transform 0.18s ease;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-item:hover {
  background: #fafcfb;
}

/* Notification Icon */

.notification-icon {
  width: 40px;
  height: 40px;

  display: grid;
  place-items: center;

  border-radius: 11px;

  background: rgba(22, 163, 74, 0.08);

  color: var(--color-primary);
}

.notification-icon svg {
  width: 19px;
  height: 19px;

  stroke: currentColor;

  stroke-width: 1.8;

  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Content */

.notification-content {
  min-width: 0;

  display: grid;

  gap: 4px;
}

.notification-content strong {
  overflow: hidden;

  color: #26332c;

  font-size: 0.86rem;
  font-weight: 750;

  text-overflow: ellipsis;
  white-space: nowrap;
}

.notification-content span {
  color: var(--color-muted);

  font-size: 0.68rem;
}

/* Time */

.notification-time {
  display: flex;

  align-items: center;

  gap: 8px;

  color: #68746d;

  white-space: nowrap;
}

.notification-time small {
  font-size: 0.74rem;
}

.time-icon {
  width: 28px;
  height: 28px;

  display: grid;
  place-items: center;

  border-radius: 8px;

  background: #f3f5f4;

  color: #718078;
}

.time-icon svg {
  width: 15px;
  height: 15px;

  stroke: currentColor;

  stroke-width: 1.8;

  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Empty State */

.empty-state {
  min-height: 320px;

  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  padding: 40px 24px;

  text-align: center;
}

.empty-icon {
  width: 62px;
  height: 62px;

  display: grid;
  place-items: center;

  margin-bottom: 15px;

  border-radius: 18px;

  background: rgba(22, 163, 74, 0.08);

  color: var(--color-primary);
}

.empty-icon svg {
  width: 28px;
  height: 28px;

  stroke: currentColor;

  stroke-width: 1.7;

  stroke-linecap: round;
  stroke-linejoin: round;
}

.empty-state h3 {
  margin: 0;

  color: #26332c;

  font-size: 1rem;
}

.empty-state p {
  max-width: 410px;

  margin: 7px 0 0;

  color: var(--color-muted);

  font-size: 0.8rem;

  line-height: 1.6;
}

/* Responsive */

@media (max-width: 850px) {
  .notifications-page {
    padding: 24px 18px;
  }

  .page-header {
    align-items: flex-start;

    flex-direction: column;

    margin-bottom: 24px;
  }

  .page-badge {
    align-self: flex-start;
  }
}

@media (max-width: 560px) {
  .notifications-page {
    padding: 20px 14px;
  }

  .page-header h1 {
    font-size: 1.9rem;
  }

  .card-header {
    padding: 18px;

    align-items: flex-start;

    flex-direction: column;
  }

  .notification-item {
    grid-template-columns: 38px minmax(0, 1fr);

    gap: 11px;

    padding: 15px 18px;
  }

  .notification-icon {
    width: 36px;
    height: 36px;
  }

  .notification-icon svg {
    width: 17px;
    height: 17px;
  }

  .notification-time {
    grid-column: 2;

    margin-top: -4px;

    justify-content: flex-start;
  }

  .notifications-card {
    border-radius: 14px;
  }
}

@media (max-width: 380px) {
  .notifications-page {
    padding: 18px 10px;
  }

  .page-header p {
    font-size: 0.82rem;
  }

  .notification-item {
    padding: 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .notification-item {
    transition: none;
  }
}
</style>