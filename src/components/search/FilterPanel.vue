
<script setup>
import {
  AMENITIES,
  FURNISHING,
  LOCATIONS,
  PREFERRED_TENANTS,
  PROPERTY_TYPES,
} from '../../utils/constants'

import AppCheckbox from '../forms/AppCheckbox.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },

  open: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'update:modelValue',
  'apply',
  'clear',
  'close',
])

function updateFilter(key, value) {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: value,
  })
}

function toggleAmenity(id, enabled) {
  const amenities = new Set(props.modelValue.amenities || [])

  if (enabled) {
    amenities.add(id)
  } else {
    amenities.delete(id)
  }

  updateFilter('amenities', [...amenities])
}

function clearFilters() {
  emit('clear')
}

function applyFilters() {
  emit('apply')
}
</script>

<template>
  <form
    class="filters"
    :class="{ 'is-open': open }"
    @submit.prevent="applyFilters"
  >
    <!-- Header -->
    <header class="filters-header">
      <div class="header-content">
        <div class="header-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 6h16M7 12h10M10 18h4"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
          </svg>
        </div>

        <div>
          <h2>Filters</h2>
          <p>Refine your property search</p>
        </div>
      </div>

      <button
        class="close-button"
        type="button"
        aria-label="Close filters"
        @click="emit('close')"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </header>

    <!-- Basic Filters -->
    <section class="filter-section">
      <div class="section-title">
        <span>Location & property</span>
      </div>

      <!-- Location -->
      <div class="field">
        <label for="filter-location">
          Location
        </label>

        <div class="select-wrap">
          <select
            id="filter-location"
            class="control"
            :value="modelValue.location"
            @change="updateFilter('location', $event.target.value)"
          >
            <option value="">Any location</option>

            <option
              v-for="location in LOCATIONS"
              :key="location.area"
              :value="location.area"
            >
              {{ location.area }}
            </option>
          </select>
        </div>
      </div>

      <!-- Area -->
      <div class="field">
        <label for="filter-area">
          Area
        </label>

        <input
          id="filter-area"
          class="control"
          type="text"
          :value="modelValue.area"
          placeholder="e.g. Mirpur 10"
          autocomplete="off"
          @input="updateFilter('area', $event.target.value)"
        />
      </div>

      <!-- Property Type -->
      <div class="field">
        <label for="filter-type">
          Property type
        </label>

        <div class="select-wrap">
          <select
            id="filter-type"
            class="control"
            :value="modelValue.type"
            @change="updateFilter('type', $event.target.value)"
          >
            <option value="">Any property type</option>

            <option
              v-for="type in PROPERTY_TYPES"
              :key="type"
              :value="type"
            >
              {{ type }}
            </option>
          </select>
        </div>
      </div>
    </section>

    <!-- Price -->
    <section class="filter-section">
      <div class="section-title">
        <span>Monthly rent</span>
      </div>

      <div class="two-column">
        <div class="field">
          <label for="filter-min-rent">
            Minimum
          </label>

          <div class="input-with-prefix">
            <span>৳</span>

            <input
              id="filter-min-rent"
              class="control"
              type="number"
              min="0"
              inputmode="numeric"
              :value="modelValue.minRent"
              placeholder="0"
              @input="updateFilter('minRent', $event.target.value)"
            />
          </div>
        </div>

        <div class="field">
          <label for="filter-max-rent">
            Maximum
          </label>

          <div class="input-with-prefix">
            <span>৳</span>

            <input
              id="filter-max-rent"
              class="control"
              type="number"
              min="0"
              inputmode="numeric"
              :value="modelValue.maxRent"
              placeholder="Any"
              @input="updateFilter('maxRent', $event.target.value)"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Property Specs -->
    <section class="filter-section">
      <div class="section-title">
        <span>Property details</span>
      </div>

      <div class="two-column">
        <!-- Bedrooms -->
        <div class="field">
          <label for="filter-bedrooms">
            Bedrooms
          </label>

          <input
            id="filter-bedrooms"
            class="control"
            type="number"
            min="0"
            inputmode="numeric"
            :value="modelValue.bedrooms"
            placeholder="Any"
            @input="updateFilter('bedrooms', $event.target.value)"
          />
        </div>

        <!-- Bathrooms -->
        <div class="field">
          <label for="filter-bathrooms">
            Bathrooms
          </label>

          <input
            id="filter-bathrooms"
            class="control"
            type="number"
            min="0"
            inputmode="numeric"
            :value="modelValue.bathrooms"
            placeholder="Any"
            @input="updateFilter('bathrooms', $event.target.value)"
          />
        </div>
      </div>

      <!-- Size -->
      <div class="field">
        <label for="filter-size">
          Minimum size
          <span class="unit">sqft</span>
        </label>

        <input
          id="filter-size"
          class="control"
          type="number"
          min="0"
          inputmode="numeric"
          :value="modelValue.size"
          placeholder="Any size"
          @input="updateFilter('size', $event.target.value)"
        />
      </div>

      <!-- Furnishing -->
      <div class="field">
        <label for="filter-furnishing">
          Furnishing
        </label>

        <div class="select-wrap">
          <select
            id="filter-furnishing"
            class="control"
            :value="modelValue.furnishing"
            @change="updateFilter('furnishing', $event.target.value)"
          >
            <option value="">Any furnishing</option>

            <option
              v-for="furnishing in FURNISHING"
              :key="furnishing"
              :value="furnishing"
            >
              {{ furnishing }}
            </option>
          </select>
        </div>
      </div>

      <!-- Available Date -->
      <div class="field">
        <label for="filter-date">
          Available from
        </label>

        <input
          id="filter-date"
          class="control"
          type="date"
          :value="modelValue.availableDate"
          @input="updateFilter('availableDate', $event.target.value)"
        />
      </div>

      <!-- Preferred Tenant -->
      <div class="field">
        <label for="filter-tenant">
          Preferred tenant
        </label>

        <div class="select-wrap">
          <select
            id="filter-tenant"
            class="control"
            :value="modelValue.preferredTenant"
            @change="updateFilter('preferredTenant', $event.target.value)"
          >
            <option value="">Any tenant</option>

            <option
              v-for="tenant in PREFERRED_TENANTS"
              :key="tenant"
              :value="tenant"
            >
              {{ tenant }}
            </option>
          </select>
        </div>
      </div>
    </section>

    <!-- Amenities -->
    <section class="filter-section amenities-section">
      <div class="section-title amenities-title">
        <span>Amenities</span>

        <span
          v-if="modelValue.amenities?.length"
          class="selected-count"
        >
          {{ modelValue.amenities.length }} selected
        </span>
      </div>

      <fieldset class="amenities">
        <legend class="sr-only">
          Select amenities
        </legend>

        <label
          v-for="amenity in AMENITIES"
          :key="amenity.id"
          class="amenity-option"
          :class="{
            selected: (modelValue.amenities || []).includes(amenity.id),
          }"
        >
          <AppCheckbox
            :label="amenity.label"
            :model-value="
              (modelValue.amenities || []).includes(amenity.id)
            "
            @update:model-value="
              toggleAmenity(amenity.id, $event)
            "
          />
        </label>
      </fieldset>
    </section>

    <!-- Actions -->
    <footer class="filters-actions">
      <button
        class="btn-clear"
        type="button"
        @click="clearFilters"
      >
        Clear all
      </button>

      <button
        class="btn-apply"
        type="submit"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 12.5l4 4L19 7"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        Apply filters
      </button>
    </footer>
  </form>
</template>

<style scoped>
/* ========================================
   Main
======================================== */

.filters {
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: 0;

  overflow: hidden;

  background: #ffffff;

  border: 1px solid #e2e8f0;
  border-radius: 12px;

  box-shadow:
    0 2px 8px rgba(15, 23, 42, 0.04),
    0 1px 2px rgba(15, 23, 42, 0.03);
}

/* ========================================
   Header
======================================== */

.filters-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 17px 18px;

  border-bottom: 1px solid #e2e8f0;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-icon {
  display: grid;
  place-items: center;

  width: 36px;
  height: 36px;

  flex: 0 0 auto;

  border-radius: 9px;

  background: #eff6ff;
  color: #2563eb;
}

.header-icon svg {
  width: 19px;
  height: 19px;
}

.filters-header h2 {
  margin: 0;

  color: #0f172a;

  font-size: 16px;
  font-weight: 700;
}

.filters-header p {
  margin: 2px 0 0;

  color: #64748b;

  font-size: 11px;
}

/* ========================================
   Close
======================================== */

.close-button {
  display: none;
  place-items: center;

  width: 34px;
  height: 34px;

  padding: 0;

  border: 1px solid #e2e8f0;
  border-radius: 8px;

  background: #ffffff;
  color: #64748b;

  cursor: pointer;

  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease;
}

.close-button svg {
  width: 17px;
  height: 17px;
}

.close-button:hover {
  border-color: #cbd5e1;
  background: #f8fafc;
  color: #0f172a;
}

.close-button:focus-visible {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

/* ========================================
   Sections
======================================== */

.filter-section {
  display: grid;
  gap: 13px;

  padding: 17px 18px;

  border-bottom: 1px solid #edf2f7;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: #334155;

  font-size: 12px;
  font-weight: 700;
}

.section-title::before {
  content: '';

  width: 3px;
  height: 15px;

  margin-right: 7px;

  border-radius: 999px;

  background: #2563eb;
}

.section-title > span:first-child {
  flex: 1;
}

/* ========================================
   Fields
======================================== */

.field {
  display: grid;
  gap: 6px;
}

.field label {
  color: #475569;

  font-size: 11px;
  font-weight: 600;
}

.unit {
  color: #94a3b8;
  font-weight: 500;
}

.control {
  width: 100%;
  min-height: 38px;

  box-sizing: border-box;

  padding: 8px 11px;

  border: 1px solid #dbe3ec;
  border-radius: 8px;

  outline: none;

  background: #ffffff;
  color: #1e293b;

  font: inherit;
  font-size: 12px;

  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    background-color 0.18s ease;
}

.control::placeholder {
  color: #94a3b8;
}

.control:hover {
  border-color: #cbd5e1;
}

.control:focus {
  border-color: #2563eb;

  box-shadow:
    0 0 0 3px rgba(37, 99, 235, 0.10);
}

/* ========================================
   Select
======================================== */

.select-wrap {
  position: relative;
}

.select-wrap::after {
  content: '';

  position: absolute;

  top: 50%;
  right: 12px;

  width: 7px;
  height: 7px;

  border-right: 1.5px solid #64748b;
  border-bottom: 1.5px solid #64748b;

  transform: translateY(-65%) rotate(45deg);

  pointer-events: none;
}

.select-wrap .control {
  appearance: none;

  padding-right: 32px;

  cursor: pointer;
}

/* ========================================
   Number Prefix
======================================== */

.input-with-prefix {
  position: relative;
}

.input-with-prefix > span {
  position: absolute;

  left: 11px;
  top: 50%;

  z-index: 1;

  color: #64748b;

  font-size: 12px;
  font-weight: 600;

  transform: translateY(-50%);

  pointer-events: none;
}

.input-with-prefix .control {
  padding-left: 25px;
}

/* ========================================
   Two Columns
======================================== */

.two-column {
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 10px;
}

/* ========================================
   Amenities
======================================== */

.amenities-section {
  border-bottom: 0;
}

.amenities-title {
  align-items: center;
}

.selected-count {
  padding: 3px 7px;

  border-radius: 999px;

  background: #eff6ff;
  color: #2563eb;

  font-size: 10px;
  font-weight: 700;
}

.amenities {
  display: grid;

  grid-template-columns: 1fr;

  gap: 4px;

  margin: 0;
  padding: 0;

  border: 0;
}

.amenity-option {
  display: flex;
  align-items: center;

  min-height: 34px;

  padding: 3px 7px;

  border: 1px solid transparent;
  border-radius: 7px;

  transition:
    background-color 0.18s ease,
    border-color 0.18s ease;
}

.amenity-option:hover {
  background: #f8fafc;
}

.amenity-option.selected {
  border-color: #dbeafe;
  background: #f8fbff;
}

/* ========================================
   Actions
======================================== */

.filters-actions {
  display: grid;

  grid-template-columns: 1fr 1.5fr;

  gap: 9px;

  padding: 14px 18px;

  border-top: 1px solid #e2e8f0;

  background: #ffffff;
}

.btn-clear,
.btn-apply {
  min-height: 38px;

  border-radius: 8px;

  font: inherit;
  font-size: 12px;
  font-weight: 700;

  cursor: pointer;

  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease,
    transform 0.18s ease;
}

.btn-clear {
  border: 1px solid #dbe3ec;

  background: #ffffff;
  color: #475569;
}

.btn-clear:hover {
  border-color: #cbd5e1;
  background: #f8fafc;
  color: #1e293b;
}

.btn-apply {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  border: 1px solid #2563eb;

  background: #2563eb;
  color: #ffffff;

  box-shadow: 0 2px 5px rgba(37, 99, 235, 0.18);
}

.btn-apply svg {
  width: 15px;
  height: 15px;
}

.btn-apply:hover {
  background: #1d4ed8;
  border-color: #1d4ed8;

  transform: translateY(-1px);
}

.btn-clear:focus-visible,
.btn-apply:focus-visible {
  outline: none;

  box-shadow:
    0 0 0 3px rgba(37, 99, 235, 0.12);
}

/* ========================================
   Screen Reader
======================================== */

.sr-only {
  position: absolute;

  width: 1px;
  height: 1px;

  padding: 0;
  margin: -1px;

  overflow: hidden;

  clip: rect(0, 0, 0, 0);

  white-space: nowrap;

  border: 0;
}

/* ========================================
   Tablet
======================================== */

@media (max-width: 900px) {
  .filters {
    border-radius: 12px;
  }

  .close-button {
    display: grid;
  }

  .filters.is-open {
    position: fixed;

    left: 50%;
    bottom: 0;

    z-index: 60;

    width: min(100%, 560px);
    max-height: 88vh;

    overflow-y: auto;

    border-radius: 16px 16px 0 0;

    transform: translateX(-50%);

    box-shadow:
      0 -8px 30px rgba(15, 23, 42, 0.12),
      0 -2px 8px rgba(15, 23, 42, 0.06);
  }

  .filters.is-open .filters-header {
    position: sticky;
    top: 0;

    z-index: 2;

    background: rgba(255, 255, 255, 0.96);

    backdrop-filter: blur(8px);
  }

  .filters.is-open .filters-actions {
    position: sticky;
    bottom: 0;

    z-index: 2;

    box-shadow:
      0 -4px 12px rgba(15, 23, 42, 0.05);
  }

  .amenities {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* ========================================
   Mobile
======================================== */

@media (max-width: 560px) {
  .filters.is-open {
    width: 100%;
    max-height: 92vh;

    border-radius: 16px 16px 0 0;
  }

  .filters-header {
    padding: 14px 15px;
  }

  .filter-section {
    padding: 15px;
  }

  .filters-actions {
    padding: 12px 15px;
  }
}

@media (max-width: 420px) {
  .two-column {
    grid-template-columns: 1fr;
  }

  .amenities {
    grid-template-columns: 1fr;
  }
}

/* ========================================
   Reduced Motion
======================================== */

@media (prefers-reduced-motion: reduce) {
  .control,
  .close-button,
  .amenity-option,
  .btn-clear,
  .btn-apply {
    transition: none;
  }

  .btn-apply:hover {
    transform: none;
  }
}
</style>
