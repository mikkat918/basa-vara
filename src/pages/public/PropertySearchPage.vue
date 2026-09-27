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
  <div class="container page search">
    <h1>Search properties</h1>
    <div class="toolbar">
      <input class="control" v-model="filters.q" placeholder="Search" @keyup.enter="run" />
      <SortDropdown v-model="filters.sort" />
      <button class="btn btn-secondary" type="button" @click="layout = layout === 'grid' ? 'list' : 'grid'">
        {{ layout === 'grid' ? 'List view' : 'Grid view' }}
      </button>
      <button class="btn btn-secondary filters-btn" type="button" @click="filtersOpen = true">Filters</button>
    </div>
    <div class="row" style="flex-wrap: wrap; margin: 12px 0">
      <FilterChip v-for="c in chips" :key="c.key" :label="c.label" @remove="removeChip(c)" />
    </div>
    <div class="layout">
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
      <div>
        <ErrorState v-if="store.error" :message="store.error" @retry="run" />
        <EmptyState
          v-else-if="!store.loading && !store.results.length"
          title="No properties match"
          message="Try clearing filters or searching another area."
        >
          <button class="btn btn-secondary" type="button" @click="clear">Clear filters</button>
        </EmptyState>
        <PropertyGrid v-else :items="store.results" :loading="store.loading" :layout="layout" />
        <AppPagination
          :page="filters.page"
          :total="store.total"
          @update:page="filters.page = $event; run()"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.toolbar {
  display: grid;
  grid-template-columns: 1fr 180px auto auto;
  gap: 8px;
  margin: 16px 0;
}
.layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 16px;
}
.filters-btn {
  display: none;
}
@media (max-width: 900px) {
  .toolbar {
    grid-template-columns: 1fr;
  }
  .layout {
    grid-template-columns: 1fr;
  }
  .desk:not(.sheet) {
    display: none;
  }
  .filters-btn {
    display: inline-flex;
  }
}
</style>
