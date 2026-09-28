
<script setup>
import { reactive } from 'vue'
import { LOCATIONS } from '../../utils/constants'

const emit = defineEmits(['search'])

const form = reactive({
  q: '',
  location: '',
})

function submit() {
  emit('search', {
    q: form.q.trim(),
    location: form.location,
  })
}
</script>

<template>
  <form
    class="search-bar"
    role="search"
    @submit.prevent="submit"
  >
    <!-- Keyword -->
    <div class="search-field keyword-field">
      <label
        class="sr-only"
        for="property-search"
      >
        Search properties
      </label>

      <span
        class="field-icon"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="11"
            cy="11"
            r="6.5"
            stroke="currentColor"
            stroke-width="1.8"
          />

          <path
            d="M16 16l4 4"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
          />
        </svg>
      </span>

      <input
        id="property-search"
        v-model="form.q"
        class="control search-input"
        type="search"
        autocomplete="off"
        placeholder="Search area, title or keyword..."
      />

      <button
        v-if="form.q"
        class="clear-search"
        type="button"
        aria-label="Clear search"
        @click="form.q = ''"
      >
        <svg
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
      </button>
    </div>

    <!-- Location -->
    <div class="search-field location-field">
      <span
        class="field-icon"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1116 0z"
            stroke="currentColor"
            stroke-width="1.8"
          />

          <circle
            cx="12"
            cy="10"
            r="2.5"
            stroke="currentColor"
            stroke-width="1.8"
          />
        </svg>
      </span>

      <label
        class="sr-only"
        for="property-location"
      >
        Location
      </label>

      <select
        id="property-location"
        v-model="form.location"
        class="control location-select"
        aria-label="Location"
      >
        <option value="">
          All locations
        </option>

        <option
          v-for="location in LOCATIONS"
          :key="location.area"
          :value="location.area"
        >
          {{ location.area }}
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

    <!-- Search Button -->
    <button
      class="search-button"
      type="submit"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="11"
          cy="11"
          r="6.5"
          stroke="currentColor"
          stroke-width="1.9"
        />

        <path
          d="M16 16l4 4"
          stroke="currentColor"
          stroke-width="1.9"
          stroke-linecap="round"
        />
      </svg>

      <span>Search</span>
    </button>
  </form>
</template>

<style scoped>
/* ========================================
   Search Bar
======================================== */

.search-bar {
  display: grid;

  grid-template-columns: minmax(0, 1fr) 210px auto;

  width: 100%;

  gap: 8px;

  padding: 6px;

  border: 1px solid #dbe3ec;
  border-radius: 11px;

  background: #ffffff;

  box-shadow:
    0 2px 8px rgba(15, 23, 42, 0.04);

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.search-bar:focus-within {
  border-color: #bfdbfe;

  box-shadow:
    0 0 0 3px rgba(37, 99, 235, 0.08),
    0 3px 10px rgba(15, 23, 42, 0.05);
}

/* ========================================
   Field
======================================== */

.search-field {
  position: relative;

  display: flex;
  align-items: center;

  min-width: 0;
}

.search-field .control {
  width: 100%;
  min-height: 40px;

  border: 0;
  border-radius: 8px;

  outline: none;

  background: #f8fafc;
  color: #1e293b;

  font: inherit;
  font-size: 13px;

  transition:
    background-color 0.18s ease,
    box-shadow 0.18s ease;
}

.search-field .control:hover {
  background: #f1f5f9;
}

.search-field .control:focus {
  background: #ffffff;

  box-shadow:
    inset 0 0 0 1px #bfdbfe;
}

/* ========================================
   Keyword Input
======================================== */

.search-input {
  padding: 8px 38px 8px 39px;
}

.search-input::-webkit-search-cancel-button {
  display: none;
}

.field-icon {
  position: absolute;
  left: 12px;

  z-index: 1;

  display: grid;
  place-items: center;

  color: #64748b;

  pointer-events: none;
}

.field-icon svg {
  width: 17px;
  height: 17px;
}

/* ========================================
   Clear
======================================== */

.clear-search {
  position: absolute;

  right: 8px;

  display: grid;
  place-items: center;

  width: 26px;
  height: 26px;

  padding: 0;

  border: 0;
  border-radius: 50%;

  background: #e2e8f0;
  color: #64748b;

  cursor: pointer;

  transition:
    background-color 0.18s ease,
    color 0.18s ease,
    transform 0.18s ease;
}

.clear-search svg {
  width: 12px;
  height: 12px;
}

.clear-search:hover {
  background: #cbd5e1;
  color: #334155;

  transform: scale(1.05);
}

.clear-search:focus-visible {
  outline: none;

  box-shadow:
    0 0 0 3px rgba(37, 99, 235, 0.12);
}

/* ========================================
   Location
======================================== */

.location-field {
  position: relative;
}

.location-field .field-icon {
  left: 12px;
}

.location-select {
  appearance: none;

  padding: 8px 34px 8px 38px;

  cursor: pointer;
}

.select-arrow {
  position: absolute;

  right: 11px;

  display: grid;
  place-items: center;

  color: #64748b;

  pointer-events: none;
}

.select-arrow svg {
  width: 15px;
  height: 15px;
}

/* ========================================
   Search Button
======================================== */

.search-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  min-width: 100px;
  min-height: 40px;

  padding: 8px 17px;

  border: 1px solid #2563eb;
  border-radius: 8px;

  background: #2563eb;
  color: #ffffff;

  font: inherit;
  font-size: 13px;
  font-weight: 700;

  cursor: pointer;

  box-shadow:
    0 2px 5px rgba(37, 99, 235, 0.18);

  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    transform 0.18s ease,
    box-shadow 0.18s ease;
}

.search-button svg {
  width: 16px;
  height: 16px;
}

.search-button:hover {
  background: #1d4ed8;
  border-color: #1d4ed8;

  transform: translateY(-1px);

  box-shadow:
    0 4px 9px rgba(37, 99, 235, 0.22);
}

.search-button:active {
  transform: translateY(0);
}

.search-button:focus-visible {
  outline: none;

  box-shadow:
    0 0 0 3px rgba(37, 99, 235, 0.16),
    0 3px 8px rgba(37, 99, 235, 0.18);
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

@media (max-width: 800px) {
  .search-bar {
    grid-template-columns: minmax(0, 1fr) 180px auto;
  }

  .search-button {
    min-width: 90px;
    padding-inline: 13px;
  }
}

/* ========================================
   Mobile
======================================== */

@media (max-width: 650px) {
  .search-bar {
    grid-template-columns: 1fr;

    padding: 8px;

    gap: 7px;

    border-radius: 12px;
  }

  .search-field .control,
  .search-button {
    min-height: 42px;
  }

  .search-button {
    width: 100%;
  }
}

/* ========================================
   Small Mobile
======================================== */

@media (max-width: 380px) {
  .search-bar {
    padding: 6px;
  }

  .search-input {
    font-size: 12px;
  }

  .search-button {
    font-size: 12px;
  }
}

/* ========================================
   Reduced Motion
======================================== */

@media (prefers-reduced-motion: reduce) {
  .search-bar,
  .search-field .control,
  .clear-search,
  .search-button {
    transition: none;
  }

  .clear-search:hover,
  .search-button:hover,
  .search-button:active {
    transform: none;
  }
}
</style>
