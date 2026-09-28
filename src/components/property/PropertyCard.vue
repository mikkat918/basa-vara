
<script setup>
import { formatBdt, locationLabel } from '../../utils/format'
import PropertyStatusBadge from './PropertyStatusBadge.vue'

defineProps({
  property: {
    type: Object,
    required: true,
  },

  layout: {
    type: String,
    default: 'grid',
  },
})
</script>

<template>
  <article
    class="property-card"
    :class="`layout-${layout}`"
  >
    <!-- Image -->
    <router-link
      :to="`/property/${property.id}`"
      class="image-link"
      :aria-label="`View ${property.title}`"
    >
      <div class="image-wrap">
        <img
          v-if="property.images?.[0]"
          :src="property.images[0]"
          :alt="property.title"
          loading="lazy"
        />

        <div
          v-else
          class="image-placeholder"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
          >
            <rect
              x="3"
              y="4"
              width="18"
              height="16"
              rx="2"
              stroke="currentColor"
              stroke-width="1.7"
            />

            <circle
              cx="8.5"
              cy="9"
              r="1.5"
              stroke="currentColor"
              stroke-width="1.5"
            />

            <path
              d="M4 17l4.5-4 3.2 2.8 2.3-2.1L20 18"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span>No image available</span>
        </div>

        <!-- Status -->
        <div class="image-badges">
          <PropertyStatusBadge
            v-if="property.status && property.status !== 'active'"
            :status="property.status"
          />

          <span
            v-else-if="property.verified"
            class="verified-badge"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M20 6L9 17l-5-5"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            Verified
          </span>
        </div>

        <!-- Image count -->
        <span
          v-if="property.images?.length > 1"
          class="image-count"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="2"
              stroke="currentColor"
              stroke-width="1.7"
            />

            <circle
              cx="8"
              cy="10"
              r="1.5"
              fill="currentColor"
            />

            <path
              d="M4 17l4-4 3 3 2.5-2.5L20 18"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          {{ property.images.length }}
        </span>
      </div>
    </router-link>

    <!-- Content -->
    <div class="body">
      <!-- Title -->
      <h3 class="title">
        <router-link :to="`/property/${property.id}`">
          {{ property.title }}
        </router-link>
      </h3>

      <!-- Location -->
      <p class="location">
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

        <span>{{ locationLabel(property.location) }}</span>
      </p>

      <!-- Rent -->
      <div class="rent-row">
        <p class="rent">
          {{ formatBdt(property.rent) }}
          <span>/ month</span>
        </p>
      </div>

      <!-- Property Meta -->
      <div class="meta">
        <span>
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

          {{ property.bedrooms ?? 0 }} bed
        </span>

        <i></i>

        <span>
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
              d="M4 12v5M20 12v5"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
            />

            <path
              d="M3 17h18"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
            />
          </svg>

          {{ property.bathrooms ?? 0 }} bath
        </span>

        <i></i>

        <span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="4"
              y="4"
              width="16"
              height="16"
              rx="2"
              stroke="currentColor"
              stroke-width="1.7"
            />

            <path
              d="M9 4v16M15 4v16M4 9h16M4 15h16"
              stroke="currentColor"
              stroke-width="1.4"
            />
          </svg>

          {{ property.size ?? 0 }} sqft
        </span>
      </div>

      <!-- Extra Content -->
      <div
        v-if="$slots.default"
        class="actions"
      >
        <slot />
      </div>
    </div>
  </article>
</template>

<style scoped>
/* ========================================
   Card
======================================== */

.property-card {
  width: 100%;
  min-width: 0;

  overflow: hidden;

  border: 1px solid #e2e8f0;
  border-radius: 12px;

  background: #ffffff;

  box-shadow:
    0 1px 2px rgba(15, 23, 42, 0.04),
    0 6px 20px rgba(15, 23, 42, 0.04);

  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    border-color 0.22s ease;
}

.property-card:hover {
  border-color: #d5deea;

  box-shadow:
    0 4px 8px rgba(15, 23, 42, 0.05),
    0 14px 30px rgba(15, 23, 42, 0.08);

  transform: translateY(-3px);
}

/* ========================================
   Image
======================================== */

.image-link {
  display: block;

  color: inherit;
  text-decoration: none;
}

.image-wrap {
  position: relative;

  width: 100%;
  height: 190px;

  overflow: hidden;

  background: #f1f5f9;
}

.image-wrap img {
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;

  transition: transform 0.35s ease;
}

.property-card:hover .image-wrap img {
  transform: scale(1.035);
}

/* ========================================
   Image Placeholder
======================================== */

.image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;

  width: 100%;
  height: 100%;

  color: #94a3b8;

  font-size: 12px;
}

.image-placeholder svg {
  width: 36px;
  height: 36px;
}

/* ========================================
   Image Badges
======================================== */

.image-badges {
  position: absolute;

  top: 12px;
  left: 12px;

  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.verified-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;

  padding: 5px 9px;

  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 999px;

  background: rgba(255, 255, 255, 0.94);

  color: #166534;

  font-size: 11px;
  font-weight: 700;

  box-shadow: 0 2px 7px rgba(15, 23, 42, 0.1);
}

.verified-badge svg {
  width: 13px;
  height: 13px;
}

/* ========================================
   Image Count
======================================== */

.image-count {
  position: absolute;

  right: 12px;
  bottom: 12px;

  display: inline-flex;
  align-items: center;
  gap: 5px;

  padding: 5px 8px;

  border-radius: 6px;

  background: rgba(15, 23, 42, 0.72);
  color: #ffffff;

  font-size: 11px;
  font-weight: 600;

  backdrop-filter: blur(4px);
}

.image-count svg {
  width: 14px;
  height: 14px;
}

/* ========================================
   Body
======================================== */

.body {
  min-width: 0;

  padding: 16px;
}

/* ========================================
   Title
======================================== */

.title {
  margin: 0;

  font-size: 16px;
  font-weight: 700;

  line-height: 1.4;
}

.title a {
  display: -webkit-box;

  overflow: hidden;

  color: #0f172a;

  text-decoration: none;

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.title a:hover {
  color: #2563eb;
}

/* ========================================
   Location
======================================== */

.location {
  display: flex;
  align-items: center;
  gap: 5px;

  margin: 7px 0 0;

  color: #64748b;

  font-size: 12px;
  line-height: 1.4;
}

.location svg {
  width: 15px;
  height: 15px;

  flex: 0 0 auto;

  color: #94a3b8;
}

.location span {
  overflow: hidden;

  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ========================================
   Rent
======================================== */

.rent-row {
  margin-top: 12px;
}

.rent {
  margin: 0;

  color: #2563eb;

  font-size: 18px;
  font-weight: 800;

  line-height: 1.3;
}

.rent span {
  color: #64748b;

  font-size: 11px;
  font-weight: 500;
}

/* ========================================
   Meta
======================================== */

.meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 7px;

  margin-top: 12px;
  padding-top: 12px;

  border-top: 1px solid #eef2f7;

  color: #64748b;

  font-size: 11px;
}

.meta span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.meta svg {
  width: 14px;
  height: 14px;

  color: #94a3b8;
}

.meta i {
  width: 3px;
  height: 3px;

  border-radius: 50%;

  background: #cbd5e1;
}

/* ========================================
   Actions
======================================== */

.actions {
  margin-top: 14px;
}

/* ========================================
   List Layout
======================================== */

.layout-list {
  display: grid;

  grid-template-columns: 250px minmax(0, 1fr);
}

.layout-list .image-wrap {
  height: 100%;
  min-height: 220px;
}

.layout-list .body {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.layout-list .actions {
  margin-top: 16px;
}

/* ========================================
   Responsive
======================================== */

@media (max-width: 850px) {
  .layout-list {
    grid-template-columns: 210px minmax(0, 1fr);
  }

  .layout-list .image-wrap {
    min-height: 210px;
  }
}

@media (max-width: 700px) {
  .layout-list {
    display: block;
  }

  .layout-list .image-wrap {
    height: 190px;
    min-height: 0;
  }

  .layout-list .body {
    display: block;
  }
}

@media (max-width: 480px) {
  .image-wrap {
    height: 180px;
  }

  .body {
    padding: 14px;
  }

  .title {
    font-size: 15px;
  }

  .rent {
    font-size: 17px;
  }

  .meta {
    gap: 6px;
  }
}

/* ========================================
   Reduced Motion
======================================== */

@media (prefers-reduced-motion: reduce) {
  .property-card,
  .image-wrap img {
    transition: none;
  }

  .property-card:hover {
    transform: none;
  }

  .property-card:hover .image-wrap img {
    transform: none;
  }
}
</style>
