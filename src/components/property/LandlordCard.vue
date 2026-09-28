
<script setup>
defineProps({
  landlord: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<template>
  <aside class="landlord-card">
    <!-- Header -->
    <div class="card-header">
      <div class="avatar">
        <img
          v-if="landlord?.avatar"
          :src="landlord.avatar"
          :alt="`${landlord?.name || 'Landlord'} profile`"
        />

        <span v-else>
          {{ landlord?.name?.charAt(0)?.toUpperCase() || 'L' }}
        </span>
      </div>

      <div class="identity">
        <div class="name-row">
          <h3>{{ landlord?.name || 'Landlord' }}</h3>

          <span
            v-if="landlord?.verified"
            class="verified"
            title="Verified landlord"
            aria-label="Verified landlord"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M20 6L9 17l-5-5"
                stroke="currentColor"
                stroke-width="2.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>

        <p class="role">Property Landlord</p>
      </div>
    </div>

    <!-- Verification -->
    <div
      v-if="landlord?.verified"
      class="verified-badge"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 3l2.2 1.5 2.65-.05 1.1 2.4 2.2 1.45-.8 2.55.8 2.55-2.2 1.45-1.1 2.4-2.65-.05L12 21l-2.2-1.5-2.65.05-1.1-2.4-2.2-1.45.8-2.55-.8-2.55 2.2-1.45 1.1-2.4 2.65.05L12 3z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linejoin="round"
        />

        <path
          d="M8.5 12l2.2 2.2 4.8-5"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <span>Verified landlord</span>
    </div>

    <!-- Stats -->
    <div class="stats">
      <div class="stat">
        <div class="stat-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 12a8 8 0 1116 0"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />

            <path
              d="M12 8v4l2.5 1.5"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <div>
          <span class="stat-label">Response rate</span>
          <strong>{{ landlord?.responseRate || 0 }}%</strong>
        </div>
      </div>

      <div class="divider"></div>

      <div class="stat">
        <div class="stat-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="8.5"
              stroke="currentColor"
              stroke-width="1.8"
            />

            <path
              d="M12 7v5l3 2"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <div>
          <span class="stat-label">Response time</span>
          <strong>{{ landlord?.responseTime || 'Not available' }}</strong>
        </div>
      </div>
    </div>

    <!-- Actions / Extra Content -->
    <div
      v-if="$slots.default"
      class="card-actions"
    >
      <slot />
    </div>
  </aside>
</template>

<style scoped>
/* ========================================
   Card
======================================== */

.landlord-card {
  width: 100%;
  box-sizing: border-box;

  padding: 20px;

  background: #ffffff;

  border: 1px solid #e2e8f0;
  border-radius: 12px;

  box-shadow:
    0 1px 2px rgba(15, 23, 42, 0.04),
    0 6px 20px rgba(15, 23, 42, 0.04);

  color: #1e293b;
}

/* ========================================
   Header
======================================== */

.card-header {
  display: flex;
  align-items: center;
  gap: 13px;
}

/* ========================================
   Avatar
======================================== */

.avatar {
  flex: 0 0 auto;

  display: grid;
  place-items: center;

  width: 50px;
  height: 50px;

  overflow: hidden;

  border-radius: 50%;

  background: #eff6ff;
  color: #2563eb;

  font-size: 18px;
  font-weight: 700;
}

.avatar img {
  width: 100%;
  height: 100%;

  object-fit: cover;
}

/* ========================================
   Identity
======================================== */

.identity {
  min-width: 0;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.name-row h3 {
  margin: 0;

  overflow: hidden;

  color: #0f172a;

  font-size: 16px;
  font-weight: 700;

  line-height: 1.3;

  text-overflow: ellipsis;
  white-space: nowrap;
}

.role {
  margin: 3px 0 0;

  color: #64748b;

  font-size: 12px;
}

/* ========================================
   Verified Icon
======================================== */

.verified {
  display: grid;
  place-items: center;

  width: 17px;
  height: 17px;

  flex: 0 0 auto;

  color: #2563eb;
}

.verified svg {
  width: 100%;
  height: 100%;
}

/* ========================================
   Verified Badge
======================================== */

.verified-badge {
  display: flex;
  align-items: center;
  gap: 7px;

  margin-top: 16px;
  padding: 9px 11px;

  border: 1px solid #dbeafe;
  border-radius: 8px;

  background: #eff6ff;
  color: #1d4ed8;

  font-size: 12px;
  font-weight: 600;
}

.verified-badge svg {
  width: 17px;
  height: 17px;

  flex: 0 0 auto;
}

/* ========================================
   Stats
======================================== */

.stats {
  display: grid;

  margin-top: 18px;

  border: 1px solid #eef2f7;
  border-radius: 9px;

  background: #f8fafc;
}

.stat {
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 12px;
}

.stat-icon {
  display: grid;
  place-items: center;

  width: 32px;
  height: 32px;

  flex: 0 0 auto;

  border-radius: 8px;

  background: #ffffff;
  color: #64748b;
}

.stat-icon svg {
  width: 17px;
  height: 17px;
}

.stat-label {
  display: block;

  margin-bottom: 2px;

  color: #64748b;

  font-size: 11px;
  font-weight: 500;
}

.stat strong {
  display: block;

  color: #1e293b;

  font-size: 13px;
  font-weight: 700;
}

.divider {
  height: 1px;
  margin: 0 12px;

  background: #e2e8f0;
}

/* ========================================
   Slot / Actions
======================================== */

.card-actions {
  display: flex;
  flex-direction: column;
  gap: 9px;

  margin-top: 18px;
  padding-top: 18px;

  border-top: 1px solid #eef2f7;
}

/* ========================================
   Responsive
======================================== */

@media (max-width: 600px) {
  .landlord-card {
    padding: 16px;
    border-radius: 10px;
  }

  .avatar {
    width: 46px;
    height: 46px;
  }

  .name-row h3 {
    font-size: 15px;
  }

  .stat {
    padding: 10px;
  }
}

/* ========================================
   Reduced Motion
======================================== */

@media (prefers-reduced-motion: reduce) {
  .landlord-card * {
    transition: none !important;
  }
}
</style>
