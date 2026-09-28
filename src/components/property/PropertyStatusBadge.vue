
<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    default: '',
  },
})

const statusConfig = {
  draft: {
    label: 'Draft',
    class: 'badge-muted',
    icon: 'edit',
  },

  pending: {
    label: 'Pending',
    class: 'badge-warning',
    icon: 'clock',
  },

  active: {
    label: 'Active',
    class: 'badge-success',
    icon: 'check',
  },

  rejected: {
    label: 'Rejected',
    class: 'badge-danger',
    icon: 'close',
  },

  rented: {
    label: 'Rented',
    class: 'badge-muted',
    icon: 'home',
  },

  expired: {
    label: 'Expired',
    class: 'badge-muted',
    icon: 'calendar',
  },

  suspended: {
    label: 'Suspended',
    class: 'badge-danger',
    icon: 'pause',
  },
}

const normalizedStatus = computed(() =>
  String(props.status || '')
    .trim()
    .toLowerCase()
)

const config = computed(() => {
  return (
    statusConfig[normalizedStatus.value] || {
      label: props.status || 'Unknown',
      class: 'badge-muted',
      icon: 'info',
    }
  )
})
</script>

<template>
  <span
    class="status-badge"
    :class="config.class"
    :aria-label="`Property status: ${config.label}`"
  >
    <!-- Check -->
    <svg
      v-if="config.icon === 'check'"
      class="status-icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12.5l4.2 4.2L19 7"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <!-- Clock -->
    <svg
      v-else-if="config.icon === 'clock'"
      class="status-icon"
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

    <!-- Close -->
    <svg
      v-else-if="config.icon === 'close'"
      class="status-icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 7l10 10M17 7L7 17"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>

    <!-- Edit -->
    <svg
      v-else-if="config.icon === 'edit'"
      class="status-icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 20h4l10.5-10.5a2.12 2.12 0 00-3-3L5 17v3z"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linejoin="round"
      />
      <path
        d="M13.5 7.5l3 3"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
      />
    </svg>

    <!-- Home -->
    <svg
      v-else-if="config.icon === 'home'"
      class="status-icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 10.5L12 4l8 6.5V20H4V10.5z"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linejoin="round"
      />
      <path
        d="M9 20v-5h6v5"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linejoin="round"
      />
    </svg>

    <!-- Calendar -->
    <svg
      v-else-if="config.icon === 'calendar'"
      class="status-icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="4"
        y="5"
        width="16"
        height="15"
        rx="2"
        stroke="currentColor"
        stroke-width="1.8"
      />
      <path
        d="M8 3v4M16 3v4M4 9h16"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
      />
    </svg>

    <!-- Pause -->
    <svg
      v-else-if="config.icon === 'pause'"
      class="status-icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="5"
        y="4"
        width="14"
        height="16"
        rx="3"
        stroke="currentColor"
        stroke-width="1.8"
      />
      <path
        d="M10 9v6M14 9v6"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
      />
    </svg>

    <!-- Info / Unknown -->
    <svg
      v-else
      class="status-icon"
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
        d="M12 10.5v5"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
      />
      <circle
        cx="12"
        cy="7.5"
        r="1"
        fill="currentColor"
      />
    </svg>

    <span class="status-label">
      {{ config.label }}
    </span>
  </span>
</template>

<style scoped>
.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  min-height: 25px;
  padding: 4px 9px;

  border: 1px solid transparent;
  border-radius: 999px;

  font-size: 11px;
  font-weight: 700;
  line-height: 1;

  white-space: nowrap;

  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    transform 0.18s ease;
}

.status-icon {
  width: 13px;
  height: 13px;

  flex: 0 0 auto;
}

.status-label {
  display: inline-block;
}

/* ========================================
   Muted
======================================== */

.badge-muted {
  color: #475569;
  background: #f1f5f9;
  border-color: #e2e8f0;
}

/* ========================================
   Warning
======================================== */

.badge-warning {
  color: #92400e;
  background: #fffbeb;
  border-color: #fde68a;
}

/* ========================================
   Success
======================================== */

.badge-success {
  color: #166534;
  background: #f0fdf4;
  border-color: #bbf7d0;
}

/* ========================================
   Danger
======================================== */

.badge-danger {
  color: #b91c1c;
  background: #fef2f2;
  border-color: #fecaca;
}

/* ========================================
   Hover
======================================== */

.status-badge:hover {
  transform: translateY(-1px);
}

/* ========================================
   Small screens
======================================== */

@media (max-width: 480px) {
  .status-badge {
    min-height: 24px;
    padding: 4px 8px;

    font-size: 10px;
  }

  .status-icon {
    width: 12px;
    height: 12px;
  }
}

/* ========================================
   Reduced motion
======================================== */

@media (prefers-reduced-motion: reduce) {
  .status-badge {
    transition: none;
  }

  .status-badge:hover {
    transform: none;
  }
}
</style>
