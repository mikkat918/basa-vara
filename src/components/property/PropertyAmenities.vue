
<script setup>
import { AMENITIES } from '../../utils/constants'

defineProps({
  amenities: {
    type: Array,
    default: () => [],
  },
})

function getAmenity(id) {
  return AMENITIES.find((item) => item.id === id)
}

function label(id) {
  return getAmenity(id)?.label || id
}
</script>

<template>
  <div class="amenities">
    <div
      v-if="!amenities.length"
      class="empty"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z"
          stroke="currentColor"
          stroke-width="1.7"
        />

        <path
          d="M8 9h8M8 13h5"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-linecap="round"
        />
      </svg>

      <span>No amenities listed</span>
    </div>

    <ul
      v-else
      class="amenity-list"
    >
      <li
        v-for="id in amenities"
        :key="id"
        class="amenity"
      >
        <span class="amenity-icon">
          <svg
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
        </span>

        <span class="amenity-label">
          {{ label(id) }}
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* ========================================
   Container
======================================== */

.amenities {
  width: 100%;
}

/* ========================================
   List
======================================== */

.amenity-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 10px;

  margin: 0;
  padding: 0;

  list-style: none;
}

/* ========================================
   Amenity
======================================== */

.amenity {
  display: flex;
  align-items: center;
  gap: 10px;

  min-width: 0;

  padding: 11px 13px;

  border: 1px solid #e2e8f0;
  border-radius: 9px;

  background: #ffffff;

  color: #334155;

  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.amenity:hover {
  border-color: #bfdbfe;

  background: #f8fbff;

  box-shadow: 0 3px 10px rgba(15, 23, 42, 0.04);

  transform: translateY(-1px);
}

/* ========================================
   Icon
======================================== */

.amenity-icon {
  display: grid;
  place-items: center;

  width: 28px;
  height: 28px;

  flex: 0 0 auto;

  border-radius: 7px;

  background: #eff6ff;
  color: #2563eb;
}

.amenity-icon svg {
  width: 15px;
  height: 15px;
}

/* ========================================
   Label
======================================== */

.amenity-label {
  min-width: 0;

  overflow: hidden;

  color: #334155;

  font-size: 13px;
  font-weight: 500;

  line-height: 1.4;

  text-overflow: ellipsis;
}

/* ========================================
   Empty State
======================================== */

.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  min-height: 80px;

  padding: 16px;

  border: 1px dashed #d7dee8;
  border-radius: 9px;

  background: #f8fafc;

  color: #64748b;

  font-size: 13px;
}

.empty svg {
  width: 18px;
  height: 18px;
}

/* ========================================
   Responsive
======================================== */

@media (max-width: 640px) {
  .amenity-list {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .amenity {
    padding: 10px 12px;
  }

  .amenity-label {
    font-size: 12px;
  }
}

/* ========================================
   Reduced Motion
======================================== */

@media (prefers-reduced-motion: reduce) {
  .amenity {
    transition: none;
  }

  .amenity:hover {
    transform: none;
  }
}
</style>
