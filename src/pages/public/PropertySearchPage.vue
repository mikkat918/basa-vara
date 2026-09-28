<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FilterPanel from '../../components/search/FilterPanel.vue'
import FilterChip from '../../components/search/FilterChip.vue'
import SortDropdown from '../../components/search/SortDropdown.vue'
import PropertyGrid from '../../components/property/PropertyGrid.vue'
import AppPagination from '../../components/common/AppPagination.vue'
import EmptyState from '../../components/common/EmptyState.vue'
import ErrorState from '../../components/common/ErrorState.vue'
import { usePropertyStore } from '../../stores/propertyStore'

const store = usePropertyStore()
const route = useRoute()
const router = useRouter()
const layout = ref('grid')
const filtersOpen = ref(false)
const filters = reactive({
  q: '',
  location: '',
  area: '',
  type: '',
  minRent: '',
  maxRent: '',
  bedrooms: '',
  bathrooms: '',
  size: '',
  furnishing: '',
  availableDate: '',
  preferredTenant: '',
  amenities: [],
  sort: 'relevance',
  page: 1,
})

function fromQuery() {
  Object.assign(filters, {
    q: route.query.q || '',
    location: route.query.location || '',
    area: route.query.area || '',
    type: route.query.type || '',
    minRent: route.query.minRent || '',
    maxRent: route.query.maxRent || '',
    bedrooms: route.query.bedrooms || '',
    bathrooms: route.query.bathrooms || '',
    size: route.query.size || '',
    furnishing: route.query.furnishing || '',
    availableDate: route.query.availableDate || '',
    preferredTenant: route.query.preferredTenant || '',
    amenities: route.query.amenities ? String(route.query.amenities).split(',') : [],
    sort: route.query.sort || 'relevance',
    page: Number(route.query.page || 1),
  })
}

function toQuery() {
  const q = {}
  Object.entries(filters).forEach(([k, v]) => {
    if (k === 'amenities' && v?.length) q.amenities = v.join(',')
    else if (v) q[k] = v
  })
  router.replace({ query: q })
}

function run() {
  toQuery()
  store.search({ ...filters, pageSize: 9 })
  filtersOpen.value = false
}

function clear() {
  Object.assign(filters, {
    q: '',
    location: '',
    area: '',
    type: '',
    minRent: '',
    maxRent: '',
    bedrooms: '',
    bathrooms: '',
    size: '',
    furnishing: '',
    availableDate: '',
    preferredTenant: '',
    amenities: [],
    sort: 'relevance',
    page: 1,
  })
  run()
}

const chips = computed(() => {
  const list = []
  if (filters.location) list.push({ key: 'location', label: filters.location })
  if (filters.type) list.push({ key: 'type', label: filters.type })
  if (filters.minRent) list.push({ key: 'minRent', label: `Min ৳${filters.minRent}` })
  if (filters.maxRent) list.push({ key: 'maxRent', label: `Max ৳${filters.maxRent}` })
  filters.amenities.forEach((a) => list.push({ key: `a-${a}`, label: a, amenity: a }))
  return list
})

function removeChip(chip) {
  if (chip.amenity) filters.amenities = filters.amenities.filter((a) => a !== chip.amenity)
  else filters[chip.key] = ''
  filters.page = 1
  run()
}

watch(
  () => filters.sort,
  () => {
    filters.page = 1
    run()
  },
)

onMounted(() => {
  fromQuery()
  run()
})
</script>


<template>
  <div class="search-page">
    <div class="container page search">

      <!-- Header -->
      <div class="search-header">
        <div>
          <span class="eyebrow">PROPERTY SEARCH</span>
          <h1>Find your next home</h1>
          <p class="search-subtitle">
            Search and filter available properties by location, price and features.
          </p>
        </div>

        <div v-if="store.total" class="result-count">
          <strong>{{ store.total }}</strong>
          <span>properties found</span>
        </div>
      </div>

      <!-- Search toolbar -->
      <div class="toolbar">

        <div class="search-input-wrap">
          <svg
            class="search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="11" cy="11" r="7"></circle>
            <path d="m20 20-3.5-3.5"></path>
          </svg>

          <input
            class="control search-input"
            v-model="filters.q"
            placeholder="Search by location, property name..."
            @keyup.enter="run"
          />
        </div>

        <SortDropdown v-model="filters.sort" />

        <button
          class="btn btn-secondary view-btn"
          type="button"
          @click="layout = layout === 'grid' ? 'list' : 'grid'"
        >
          <svg
            v-if="layout === 'grid'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M8 6h13"></path>
            <path d="M8 12h13"></path>
            <path d="M8 18h13"></path>
            <path d="M3 6h.01"></path>
            <path d="M3 12h.01"></path>
            <path d="M3 18h.01"></path>
          </svg>

          <svg
            v-else
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
          </svg>

          {{ layout === 'grid' ? 'List view' : 'Grid view' }}
        </button>

        <button
          class="btn btn-primary filters-btn"
          type="button"
          @click="filtersOpen = true"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M4 6h16"></path>
            <path d="M7 12h10"></path>
            <path d="M10 18h4"></path>
          </svg>

          Filters
        </button>
      </div>

      <!-- Active filters -->
      <div v-if="chips.length" class="chips-wrapper">
        <div class="chips-label">Active filters</div>

        <div class="chips">
          <FilterChip
            v-for="c in chips"
            :key="c.key"
            :label="c.label"
            @remove="removeChip(c)"
          />
        </div>
      </div>

      <!-- Main content -->
      <div class="layout">

        <!-- Desktop / mobile filters -->
        <FilterPanel
          class="desk"
          :class="{ sheet: filtersOpen }"
          :open="filtersOpen"
          :model-value="filters"
          @update:model-value="Object.assign(filters, $event)"
          @apply="run"
          @clear="clear"
          @close="filtersOpen = false"
        />

        <!-- Results -->
        <main class="results-area">

          <div v-if="!store.loading && !store.error" class="results-toolbar">
            <span>
              Showing
              <strong>{{ store.results.length }}</strong>
              {{ store.results.length === 1 ? 'property' : 'properties' }}
            </span>
          </div>

          <ErrorState
            v-if="store.error"
            :message="store.error"
            @retry="run"
          />

          <EmptyState
            v-else-if="!store.loading && !store.results.length"
            title="No properties match"
            message="Try clearing filters or searching another area."
          >
            <button
              class="btn btn-secondary"
              type="button"
              @click="clear"
            >
              Clear filters
            </button>
          </EmptyState>

          <PropertyGrid
            v-else
            :items="store.results"
            :loading="store.loading"
            :layout="layout"
          />

          <div class="pagination-wrap">
            <AppPagination
              :page="filters.page"
              :total="store.total"
              @update:page="filters.page = $event; run()"
            />
          </div>

        </main>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* =========================
   PAGE
========================= */

.search-page {
  min-height: 100vh;
  background:
    radial-gradient(
      circle at top left,
      rgba(16, 185, 129, 0.08),
      transparent 32%
    ),
    #f7faf9;
}

.search {
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  padding-top: 34px;
  padding-bottom: 60px;
  box-sizing: border-box;
}

/* =========================
   HEADER
========================= */

.search-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 22px;
}

.eyebrow {
  display: inline-block;
  margin-bottom: 7px;
  color: #059669;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.search-header h1 {
  margin: 0;
  color: #17211d;
  font-size: clamp(28px, 3vw, 42px);
  line-height: 1.1;
  letter-spacing: -0.035em;
}

.search-subtitle {
  max-width: 680px;
  margin: 10px 0 0;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.6;
}

.result-count {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
  padding: 13px 17px;
  border: 1px solid #dceee7;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 8px 25px rgba(15, 23, 42, 0.04);
}

.result-count strong {
  color: #059669;
  font-size: 22px;
  line-height: 1;
}

.result-count span {
  margin-top: 4px;
  color: #6b7280;
  font-size: 12px;
}

/* =========================
   TOOLBAR
========================= */

.toolbar {
  display: grid;
  grid-template-columns: minmax(260px, 1fr) 180px auto auto;
  gap: 10px;
  align-items: center;
  margin: 18px 0 12px;
  padding: 12px;
  border: 1px solid #e5ebe8;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.045);
}

.search-input-wrap {
  position: relative;
  min-width: 0;
}

.search-input {
  width: 100%;
  padding-left: 42px;
  box-sizing: border-box;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 14px;
  width: 18px;
  height: 18px;
  color: #94a3b8;
  transform: translateY(-50%);
  pointer-events: none;
}

.view-btn,
.filters-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  white-space: nowrap;
}

.view-btn svg,
.filters-btn svg {
  width: 17px;
  height: 17px;
}

/* =========================
   CHIPS
========================= */

.chips-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  margin: 10px 0 20px;
}

.chips-label {
  flex-shrink: 0;
  color: #64748b;
  font-size: 12px;
  font-weight: 700;
}

.chips {
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
  overflow-x: auto;
  padding-bottom: 2px;
  scrollbar-width: thin;
}

/* =========================
   CONTENT LAYOUT
========================= */

.layout {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 20px;
  align-items: start;
}

.results-area {
  min-width: 0;
}

.results-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 30px;
  margin-bottom: 12px;
  color: #64748b;
  font-size: 13px;
}

.results-toolbar strong {
  color: #17211d;
}

/* =========================
   FILTERS
========================= */

.filters-btn {
  display: none;
}

/* =========================
   PAGINATION
========================= */

.pagination-wrap {
  display: flex;
  justify-content: center;
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid #e5ebe8;
}

/* =========================
   RESPONSIVE
========================= */

@media (max-width: 1150px) {
  .search {
    padding-left: 24px;
    padding-right: 24px;
  }

  .toolbar {
    grid-template-columns: minmax(220px, 1fr) 160px auto;
  }

  .filters-btn {
    display: inline-flex;
  }

  .layout {
    grid-template-columns: 1fr;
  }

  .desk:not(.sheet) {
    display: none;
  }
}

@media (max-width: 800px) {
  .search {
    padding-top: 24px;
    padding-bottom: 40px;
  }

  .search-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
  }

  .result-count {
    align-items: flex-start;
  }

  .toolbar {
    grid-template-columns: 1fr 1fr;
    padding: 10px;
  }

  .search-input-wrap {
    grid-column: 1 / -1;
  }

  .view-btn,
  .filters-btn {
    width: 100%;
  }

  .chips-wrapper {
    align-items: flex-start;
    flex-direction: column;
    gap: 7px;
  }
}

@media (max-width: 560px) {
  .search {
    padding-left: 14px;
    padding-right: 14px;
  }

  .search-header h1 {
    font-size: 29px;
  }

  .search-subtitle {
    font-size: 13px;
  }

  .toolbar {
    grid-template-columns: 1fr;
    gap: 8px;
    border-radius: 15px;
  }

  .search-input-wrap {
    grid-column: auto;
  }

  .view-btn,
  .filters-btn {
    min-height: 42px;
  }

  .results-toolbar {
    margin-bottom: 9px;
  }
}

@media (max-width: 380px) {
  .search {
    padding-left: 10px;
    padding-right: 10px;
  }

  .search-header h1 {
    font-size: 26px;
  }

  .toolbar {
    padding: 8px;
  }
}

/* =========================
   REDUCED MOTION
========================= */

@media (prefers-reduced-motion: reduce) {
  .search-page *,
  .search-page *::before,
  .search-page *::after {
    scroll-behavior: auto !important;
    transition: none !important;
    animation: none !important;
  }
}
</style>