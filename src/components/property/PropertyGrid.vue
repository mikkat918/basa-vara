
<script setup>
import PropertyCard from './PropertyCard.vue'
import SkeletonLoader from '../common/SkeletonLoader.vue'

defineProps({
  items: {
    type: Array,
    default: () => [],
  },

  loading: {
    type: Boolean,
    default: false,
  },

  layout: {
    type: String,
    default: 'grid',
    validator: (value) => ['grid', 'list'].includes(value),
  },
})
</script>

<template>
  <section class="property-list">
    <!-- Loading -->
    <div
      v-if="loading"
      class="property-grid"
    >
      <article
        v-for="n in 6"
        :key="n"
        class="property-skeleton"
        aria-hidden="true"
      >
        <div class="skeleton-image"></div>

        <div class="skeleton-content">
          <SkeletonLoader :lines="4" />
        </div>
      </article>
    </div>

    <!-- Empty -->
    <div
      v-else-if="!items.length"
      class="empty-state"
    >
      <div class="empty-icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 10.5L12 3l9 7.5"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <path
            d="M5 9.5V20h14V9.5"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linejoin="round"
          />

          <path
            d="M9 20v-5h6v5"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <h3>No properties found</h3>

      <p>
        There are no properties available to display right now.
      </p>
    </div>

    <!-- Property List -->
    <div
      v-else
      class="property-grid"
      :class="{ 'is-list': layout === 'list' }"
    >
      <PropertyCard
        v-for="property in items"
        :key="property.id"
        :property="property"
        :layout="layout"
      >
        <slot
          name="actions"
          :property="property"
        />
      </PropertyCard>
    </div>
  </section>
</template>

<style scoped>
/* ========================================
   Container
======================================== */

.property-list {
  width: 100%;
}

/* ========================================
   Property Grid
======================================== */

.property-grid {
  display: grid;

  grid-template-columns: repeat(3, minmax(0, 1fr));

  gap: 20px;

  width: 100%;
}

.property-grid.is-list {
  grid-template-columns: 1fr;

  gap: 14px;
}

/* ========================================
   Skeleton
======================================== */

.property-skeleton {
  overflow: hidden;

  border: 1px solid #e2e8f0;
  border-radius: 12px;

  background: #ffffff;
}

.skeleton-image {
  width: 100%;
  height: 190px;

  background:
    linear-gradient(
      90deg,
      #edf1f5 25%,
      #f7f9fb 50%,
      #edf1f5 75%
    );

  background-size: 200% 100%;

  animation: skeleton-shimmer 1.6s infinite;
}

.skeleton-content {
  padding: 16px;
}

/* ========================================
   Empty State
======================================== */

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 280px;

  padding: 40px 20px;

  border: 1px dashed #d7dee8;
  border-radius: 12px;

  background: #f8fafc;

  text-align: center;
}

.empty-icon {
  display: grid;
  place-items: center;

  width: 52px;
  height: 52px;

  margin-bottom: 14px;

  border-radius: 12px;

  background: #eff6ff;
  color: #2563eb;
}

.empty-icon svg {
  width: 25px;
  height: 25px;
}

.empty-state h3 {
  margin: 0;

  color: #1e293b;

  font-size: 16px;
  font-weight: 700;
}

.empty-state p {
  max-width: 360px;

  margin: 6px 0 0;

  color: #64748b;

  font-size: 13px;
  line-height: 1.6;
}

/* ========================================
   Skeleton Animation
======================================== */

@keyframes skeleton-shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

/* ========================================
   Responsive
======================================== */

@media (max-width: 1100px) {
  .property-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .property-grid.is-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .property-grid {
    grid-template-columns: 1fr;

    gap: 14px;
  }

  .property-grid.is-list {
    gap: 12px;
  }

  .skeleton-image {
    height: 180px;
  }
}

@media (max-width: 480px) {
  .skeleton-content {
    padding: 14px;
  }

  .skeleton-image {
    height: 170px;
  }

  .empty-state {
    min-height: 230px;

    padding: 30px 16px;
  }
}

/* ========================================
   Reduced Motion
======================================== */

@media (prefers-reduced-motion: reduce) {
  .skeleton-image {
    animation: none;
  }
}
</style>
