
<script setup>
defineProps({
  modelValue: {
    type: String,
    default: 'relevance',
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="sort-field">
    <label
      class="sort-label"
      for="property-sort"
    >
      <span>Sort by</span>
    </label>

    <div class="select-wrap">
      <span
        class="sort-icon"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M8 6h12M8 12h8M8 18h4"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
          />

          <path
            d="M4 6h.01M4 12h.01M4 18h.01"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
          />
        </svg>
      </span>

      <select
        id="property-sort"
        class="sort-control"
        :value="modelValue"
        aria-label="Sort properties"
        @change="$emit('update:modelValue', $event.target.value)"
      >
        <option value="relevance">
          Relevance
        </option>

        <option value="newest">
          Newest
        </option>

        <option value="rent-asc">
          Rent: low to high
        </option>

        <option value="rent-desc">
          Rent: high to low
        </option>
      </select>

      <span
        class="select-arrow"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M7 10l5 5 5-5"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </div>
  </div>
</template>

<style scoped>
.sort-field {
  display: flex;
  align-items: center;
  gap: 9px;
}

.sort-label {
  flex: 0 0 auto;

  color: #64748b;

  font-size: 12px;
  font-weight: 600;

  white-space: nowrap;
}

.select-wrap {
  position: relative;

  min-width: 155px;
}

.sort-control {
  width: 100%;
  min-height: 36px;

  appearance: none;

  padding: 7px 34px 7px 34px;

  border: 1px solid #dbe3ec;
  border-radius: 8px;

  outline: none;

  background: #ffffff;
  color: #334155;

  font: inherit;
  font-size: 12px;
  font-weight: 600;

  cursor: pointer;

  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    background-color 0.18s ease;
}

.sort-control:hover {
  border-color: #cbd5e1;
  background: #f8fafc;
}

.sort-control:focus {
  border-color: #2563eb;
  background: #ffffff;

  box-shadow:
    0 0 0 3px rgba(37, 99, 235, 0.10);
}

.sort-icon {
  position: absolute;

  left: 11px;
  top: 50%;

  z-index: 1;

  display: grid;
  place-items: center;

  color: #64748b;

  pointer-events: none;

  transform: translateY(-50%);
}

.sort-icon svg {
  width: 15px;
  height: 15px;
}

.select-arrow {
  position: absolute;

  right: 10px;
  top: 50%;

  z-index: 1;

  display: grid;
  place-items: center;

  color: #64748b;

  pointer-events: none;

  transform: translateY(-50%);
}

.select-arrow svg {
  width: 14px;
  height: 14px;
}

/* ========================================
   Mobile
======================================== */

@media (max-width: 520px) {
  .sort-field {
    width: 100%;
    justify-content: space-between;
  }

  .select-wrap {
    flex: 1;
    min-width: 0;
    max-width: 220px;
  }
}

@media (max-width: 360px) {
  .sort-label {
    font-size: 11px;
  }

  .sort-control {
    font-size: 11px;
  }
}

/* ========================================
   Reduced Motion
======================================== */

@media (prefers-reduced-motion: reduce) {
  .sort-control {
    transition: none;
  }
}
</style>
