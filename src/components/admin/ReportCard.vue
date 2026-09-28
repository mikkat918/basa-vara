<script setup>
import { formatDateTime } from '../../utils/format'
defineProps({ report: Object })
defineEmits(['action'])
</script>

```vue
<template>
  <article class="report-card card">
    <!-- Header -->
    <div class="report-header">
      <div class="report-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 3h9l3 3v15H6z" />
          <path d="M15 3v4h4" />
          <path d="M9 11h6M9 15h5" />
        </svg>
      </div>

      <span class="category-badge">
        {{ report.category }}
      </span>
    </div>

    <!-- Report Details -->
    <div class="report-content">
      <div class="section-label">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 10v6M12 7h.01" />
        </svg>
        Report details
      </div>

      <p class="details">
        {{ report.details }}
      </p>
    </div>

    <!-- Meta -->
    <div class="report-meta">
      <div class="meta-item">
        <span class="meta-label">Status</span>
        <span class="status-badge">
          <span class="status-dot"></span>
          {{ report.status }}
        </span>
      </div>

      <div class="meta-divider"></div>

      <div class="meta-item">
        <span class="meta-label">Reported</span>
        <span class="date">
          {{ formatDateTime(report.createdAt) }}
        </span>
      </div>
    </div>

    <!-- Actions -->
    <div class="actions-section">
      <div class="section-label">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h10" />
        </svg>
        Available actions
      </div>

      <div class="actions">
        <button
          class="action-btn secondary"
          type="button"
          @click="$emit('action', 'investigate')"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="5.5" />
            <path d="m15 15 5 5" />
          </svg>
          Investigate
        </button>

        <button
          class="action-btn secondary"
          type="button"
          @click="$emit('action', 'dismiss')"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
          Dismiss
        </button>

        <button
          class="action-btn secondary"
          type="button"
          @click="$emit('action', 'suspend-listing')"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 4h14v16H5z" />
            <path d="M9 8h6M9 12h6M9 16h3" />
          </svg>
          Suspend listing
        </button>

        <button
          class="action-btn secondary"
          type="button"
          @click="$emit('action', 'suspend-user')"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5.5 20c.7-4 2.9-6 6.5-6s5.8 2 6.5 6" />
          </svg>
          Suspend user
        </button>

        <button
          class="action-btn danger"
          type="button"
          @click="$emit('action', 'block-user')"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="8.5" />
            <path d="m7 7 10 10" />
          </svg>
          Block user
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.report-card {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid #e1e9e4;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 12px 35px rgba(31, 67, 47, 0.07);
}

/* Header */
.report-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.report-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  flex: 0 0 auto;
  border-radius: 12px;
  background: #fff7e8;
  color: #a87620;
}

.report-icon svg {
  width: 21px;
  height: 21px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.category-badge {
  display: inline-flex;
  align-items: center;
  max-width: 55%;
  padding: 7px 10px;
  border: 1px solid #f0dfbd;
  border-radius: 999px;
  background: #fff9ed;
  color: #916b2e;
  font-size: 11px;
  font-weight: 800;
  line-height: 1.2;
  text-align: right;
  word-break: break-word;
}

/* Content */
.report-content {
  margin-top: 20px;
}

.section-label {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #6e7a72;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.section-label svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: #258c54;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.details {
  margin: 8px 0 0;
  color: #344139;
  font-size: 14px;
  line-height: 1.65;
  word-break: break-word;
}

/* Meta */
.report-meta {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 19px;
  padding: 13px 14px;
  border: 1px solid #e6ece8;
  border-radius: 12px;
  background: #f8faf9;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.meta-label {
  color: #87918b;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  white-space: nowrap;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #3e5147;
  font-size: 11px;
  font-weight: 800;
  word-break: break-word;
}

.status-dot {
  width: 6px;
  height: 6px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #d39b31;
}

.date {
  color: #65736b;
  font-size: 11px;
  font-weight: 600;
  word-break: break-word;
}

.meta-divider {
  width: 1px;
  height: 22px;
  background: #dfe7e2;
}

/* Actions */
.actions-section {
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid #edf1ee;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 38px;
  padding: 8px 11px;
  border: 1px solid transparent;
  border-radius: 10px;
  font: inherit;
  font-size: 11px;
  font-weight: 800;
  cursor: pointer;
  transition:
    background 0.18s ease,
    border-color 0.18s ease,
    transform 0.18s ease;
}

.action-btn:hover {
  transform: translateY(-1px);
}

.action-btn:active {
  transform: translateY(0);
}

.action-btn svg {
  width: 15px;
  height: 15px;
  flex: 0 0 auto;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.action-btn.secondary {
  border-color: #dfe8e3;
  background: #f7faf8;
  color: #526159;
}

.action-btn.secondary:hover {
  border-color: #d0ddd5;
  background: #eef4f0;
}

.action-btn.danger {
  border-color: #efcece;
  background: #fff5f5;
  color: #c44d4d;
}

.action-btn.danger:hover {
  border-color: #e5bcbc;
  background: #ffebeb;
}

/* Responsive */
@media (max-width: 600px) {
  .report-card {
    padding: 17px;
    border-radius: 15px;
  }

  .report-meta {
    align-items: flex-start;
    flex-direction: column;
    gap: 9px;
  }

  .meta-divider {
    width: 100%;
    height: 1px;
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .action-btn {
    width: 100%;
  }
}

@media (max-width: 400px) {
  .report-header {
    align-items: flex-start;
  }

  .category-badge {
    max-width: 50%;
  }

  .actions {
    grid-template-columns: 1fr;
  }

  .action-btn {
    min-height: 40px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .action-btn {
    transition: none;
  }
}
</style>
