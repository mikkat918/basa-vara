<script setup>
defineProps({ property: Object })
defineEmits(['approve', 'reject', 'view'])
</script>

```vue
<template>
  <article class="approval-card card">
    <!-- Property Header -->
    <div class="property-header">
      <div class="property-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3.5 10.5 12 4l8.5 6.5" />
          <path d="M5.5 9.5V20h13V9.5" />
          <path d="M9 20v-6h6v6" />
        </svg>
      </div>

      <div class="pending-badge">
        <span class="pending-dot"></span>
        Pending review
      </div>
    </div>

    <!-- Property Information -->
    <div class="property-info">
      <h3>{{ property.title }}</h3>

      <div class="location-row">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 10.5c0 5-8 10-8 10s-8-5-8-10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10.5" r="2.5" />
        </svg>

        <span>{{ property.location?.area || 'Location not available' }}</span>
      </div>
    </div>

    <!-- Rent -->
    <div class="rent-box">
      <div class="rent-label">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3v18" />
          <path d="M16.5 7.5h-6a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 1 0 5h-6" />
        </svg>

        Monthly rent
      </div>

      <strong>৳{{ property.rent }}</strong>
    </div>

    <!-- Actions -->
    <div class="actions">
      <button
        class="action-btn view-btn"
        type="button"
        @click="$emit('view', property)"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
          <circle cx="12" cy="12" r="2.8" />
        </svg>
        View
      </button>

      <button
        class="action-btn approve-btn"
        type="button"
        @click="$emit('approve', property)"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m5 12 4.2 4.2L19 6.5" />
        </svg>
        Approve
      </button>

      <button
        class="action-btn reject-btn"
        type="button"
        @click="$emit('reject', property)"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
        Reject
      </button>
    </div>
  </article>
</template>

<style scoped>
.approval-card {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid #e1e9e4;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 12px 35px rgba(31, 67, 47, 0.07);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.approval-card:hover {
  transform: translateY(-2px);
  border-color: #d4e3da;
  box-shadow: 0 18px 42px rgba(31, 67, 47, 0.1);
}

/* Header */
.property-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.property-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  flex: 0 0 auto;
  border-radius: 12px;
  background: #eaf8ef;
  color: #18884e;
}

.property-icon svg {
  width: 21px;
  height: 21px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.pending-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 10px;
  border: 1px solid #f0e4c9;
  border-radius: 999px;
  background: #fffaf0;
  color: #916d2f;
  font-size: 11px;
  font-weight: 800;
}

.pending-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #d59b31;
}

/* Information */
.property-info {
  margin-top: 17px;
}

.property-info h3 {
  margin: 0;
  color: #1b2921;
  font-size: 18px;
  font-weight: 800;
  line-height: 1.35;
  letter-spacing: -0.02em;
  word-break: break-word;
}

.location-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 7px;
  color: #77827b;
  font-size: 13px;
}

.location-row svg {
  width: 15px;
  height: 15px;
  flex: 0 0 auto;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Rent */
.rent-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-top: 18px;
  padding: 13px 14px;
  border: 1px solid #e4ece7;
  border-radius: 12px;
  background: #f8fbf9;
}

.rent-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #6d7972;
  font-size: 11px;
  font-weight: 700;
}

.rent-label svg {
  width: 15px;
  height: 15px;
  fill: none;
  stroke: #218950;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.rent-box strong {
  color: #167e47;
  font-size: 17px;
  font-weight: 850;
  white-space: nowrap;
}

/* Actions */
.actions {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  margin-top: 18px;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 0;
  padding: 10px 9px;
  border: 1px solid transparent;
  border-radius: 10px;
  font: inherit;
  font-size: 12px;
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
  stroke-width: 1.9;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.view-btn {
  border-color: #dfe8e3;
  background: #f7faf8;
  color: #526159;
}

.view-btn:hover {
  background: #eef4f0;
  border-color: #d2ded7;
}

.approve-btn {
  border-color: #ccebd7;
  background: #eaf8ef;
  color: #16834b;
}

.approve-btn:hover {
  background: #dcf4e5;
  border-color: #bce3ca;
}

.reject-btn {
  border-color: #f0d6d6;
  background: #fff5f5;
  color: #c34d4d;
}

.reject-btn:hover {
  background: #ffebeb;
  border-color: #e9c2c2;
}

/* Responsive */
@media (max-width: 520px) {
  .approval-card {
    padding: 17px;
    border-radius: 15px;
  }

  .property-info h3 {
    font-size: 16px;
  }

  .actions {
    grid-template-columns: 1fr;
  }

  .action-btn {
    min-height: 40px;
  }
}

@media (max-width: 360px) {
  .property-header {
    align-items: flex-start;
  }

  .pending-badge {
    padding: 6px 8px;
    font-size: 10px;
  }

  .rent-box {
    align-items: flex-start;
    flex-direction: column;
    gap: 5px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .approval-card,
  .action-btn {
    transition: none;
  }
}
</style>