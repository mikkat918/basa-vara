
<script setup>
import { formatBdt, locationLabel } from '../../utils/format'

defineProps({
  property: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<template>
  <section class="property-info">
    <div class="section-header">
      <div class="header-icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 5.5A1.5 1.5 0 015.5 4h13A1.5 1.5 0 0120 5.5v13a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 014 18.5v-13z"
            stroke="currentColor"
            stroke-width="1.7"
          />

          <path
            d="M8 8h8M8 12h8M8 16h4"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
          />
        </svg>
      </div>

      <div>
        <h2>Property Information</h2>
        <p>Details and specifications</p>
      </div>
    </div>

    <dl class="info">
      <!-- Monthly Rent -->
      <div class="info-item highlight">
        <dt>
          <span class="item-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 3v18M17 7.5c0-1.4-1.8-2.5-4.5-2.5S8 6.1 8 7.5 9.3 9.5 12.5 10s4.5 1.1 4.5 2.5-1.8 2.5-4.5 2.5S8 14 8 12.5"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>
          </span>

          Monthly rent
        </dt>

        <dd class="rent">
          {{ formatBdt(property.rent) }}
          <small>/ month</small>
        </dd>
      </div>

      <!-- Security Deposit -->
      <div class="info-item">
        <dt>
          <span class="item-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 3l7 3v5c0 4.5-2.9 7.8-7 10-4.1-2.2-7-5.5-7-10V6l7-3z"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
              />

              <path
                d="M9 12l2 2 4-4"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>

          Security deposit
        </dt>

        <dd>
          {{ formatBdt(property.securityDeposit) }}
        </dd>
      </div>

      <!-- Bedrooms -->
      <div class="info-item">
        <dt>
          <span class="item-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 18v-5a2 2 0 012-2h12a2 2 0 012 2v5"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />

              <path
                d="M6 11V7a2 2 0 012-2h8a2 2 0 012 2v4"
                stroke="currentColor"
                stroke-width="1.7"
              />

              <path
                d="M3 18h18"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>
          </span>

          Bedrooms
        </dt>

        <dd>{{ property.bedrooms ?? '—' }}</dd>
      </div>

      <!-- Bathrooms -->
      <div class="info-item">
        <dt>
          <span class="item-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 12h14M6 12V7a2 2 0 012-2h3a2 2 0 012 2v5"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />

              <path
                d="M4 12v5M20 12v5M3 17h18"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>
          </span>

          Bathrooms
        </dt>

        <dd>{{ property.bathrooms ?? '—' }}</dd>
      </div>

      <!-- Size -->
      <div class="info-item">
        <dt>
          <span class="item-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 4h6M4 4v6M20 20h-6M20 20v-6"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />

              <path
                d="M8 4v2M12 4v2M16 18v2M12 18v2M4 8h2M4 12h2M18 8h2M18 12h2"
                stroke="currentColor"
                stroke-width="1.4"
                stroke-linecap="round"
              />
            </svg>
          </span>

          Property size
        </dt>

        <dd>
          {{ property.size ?? '—' }}
          <small v-if="property.size">sqft</small>
        </dd>
      </div>

      <!-- Floor -->
      <div class="info-item">
        <dt>
          <span class="item-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 20h14M7 20V8l5-4 5 4v12"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
              />

              <path
                d="M10 11h4M10 14h4M10 17h4"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </span>

          Floor
        </dt>

        <dd>
          {{ property.floor ?? '—' }}
          <span v-if="property.totalFloors">
            / {{ property.totalFloors }}
          </span>
        </dd>
      </div>

      <!-- Available From -->
      <div class="info-item">
        <dt>
          <span class="item-icon">
            <svg
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
                stroke-width="1.7"
              />

              <path
                d="M8 3v4M16 3v4M4 9h16"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>
          </span>

          Available from
        </dt>

        <dd>{{ property.availableFrom || '—' }}</dd>
      </div>

      <!-- Type -->
      <div class="info-item">
        <dt>
          <span class="item-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 20V9l8-5 8 5v11"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
              />

              <path
                d="M9 20v-6h6v6M8 10h.01M12 10h.01M16 10h.01"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>
          </span>

          Property type
        </dt>

        <dd>
          {{ property.type || '—' }}

          <span v-if="property.listingType">
            · {{ property.listingType }}
          </span>
        </dd>
      </div>

      <!-- Location -->
      <div class="info-item full">
        <dt>
          <span class="item-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1116 0z"
                stroke="currentColor"
                stroke-width="1.7"
              />

              <circle
                cx="12"
                cy="10"
                r="2.5"
                stroke="currentColor"
                stroke-width="1.7"
              />
            </svg>
          </span>

          Location
        </dt>

        <dd>
          {{ locationLabel(property.location) || '—' }}
        </dd>
      </div>

      <!-- Preferred Tenant -->
      <div class="info-item full">
        <dt>
          <span class="item-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="8"
                r="3"
                stroke="currentColor"
                stroke-width="1.7"
              />

              <path
                d="M5 20c.8-3.4 3.1-5 7-5s6.2 1.6 7 5"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>
          </span>

          Preferred tenant
        </dt>

        <dd>
          {{ property.preferredTenant || 'Not specified' }}
        </dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
/* ========================================
   Section
======================================== */

.property-info {
  width: 100%;
}

/* ========================================
   Header
======================================== */

.section-header {
  display: flex;
  align-items: center;
  gap: 11px;

  margin-bottom: 16px;
}

.header-icon {
  display: grid;
  place-items: center;

  width: 38px;
  height: 38px;

  flex: 0 0 auto;

  border-radius: 9px;

  background: #eff6ff;
  color: #2563eb;
}

.header-icon svg {
  width: 19px;
  height: 19px;
}

.section-header h2 {
  margin: 0;

  color: #0f172a;

  font-size: 18px;
  font-weight: 700;

  line-height: 1.3;
}

.section-header p {
  margin: 3px 0 0;

  color: #64748b;

  font-size: 12px;
}

/* ========================================
   Information Grid
======================================== */

.info {
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 10px;

  margin: 0;
  padding: 0;
}

/* ========================================
   Info Item
======================================== */

.info-item {
  min-width: 0;

  padding: 13px 14px;

  border: 1px solid #e2e8f0;
  border-radius: 9px;

  background: #ffffff;

  transition:
    border-color 0.2s ease,
    background 0.2s ease;
}

.info-item:hover {
  border-color: #cbd5e1;
  background: #fafcff;
}

.info-item.full {
  grid-column: 1 / -1;
}

/* ========================================
   Definition
======================================== */

dt {
  display: flex;
  align-items: center;
  gap: 8px;

  margin: 0 0 7px;

  color: #64748b;

  font-size: 11px;
  font-weight: 600;

  line-height: 1.4;
}

dd {
  margin: 0;

  color: #1e293b;

  font-size: 14px;
  font-weight: 700;

  line-height: 1.45;

  word-break: break-word;
}

dd small {
  color: #64748b;

  font-size: 11px;
  font-weight: 500;
}

/* ========================================
   Item Icon
======================================== */

.item-icon {
  display: grid;
  place-items: center;

  width: 28px;
  height: 28px;

  flex: 0 0 auto;

  border-radius: 7px;

  background: #f8fafc;
  color: #64748b;
}

.item-icon svg {
  width: 15px;
  height: 15px;
}

/* ========================================
   Rent Highlight
======================================== */

.info-item.highlight {
  border-color: #dbeafe;
  background: #f8fbff;
}

.info-item.highlight .item-icon {
  background: #eff6ff;
  color: #2563eb;
}

.info-item.highlight .rent {
  color: #2563eb;

  font-size: 17px;
}

.rent small {
  color: #64748b;
}

/* ========================================
   Responsive
======================================== */

@media (max-width: 700px) {
  .info {
    grid-template-columns: 1fr;
  }

  .info-item.full {
    grid-column: auto;
  }
}

@media (max-width: 480px) {
  .section-header h2 {
    font-size: 16px;
  }

  .header-icon {
    width: 35px;
    height: 35px;
  }

  .info-item {
    padding: 12px;
  }

  dd {
    font-size: 13px;
  }
}

/* ========================================
   Reduced Motion
======================================== */

@media (prefers-reduced-motion: reduce) {
  .info-item {
    transition: none;
  }
}
</style>
