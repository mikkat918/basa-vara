<script setup>
import PropertyCard from './PropertyCard.vue'
import SkeletonLoader from '../common/SkeletonLoader.vue'

defineProps({
  items: Array,
  loading: Boolean,
  layout: { type: String, default: 'grid' },
})
</script>

<template>
  <div v-if="loading" class="grid-3">
    <div v-for="n in 6" :key="n" class="card" style="padding: 16px">
      <div class="skeleton" style="height: 160px; margin-bottom: 12px"></div>
      <SkeletonLoader />
    </div>
  </div>
  <div v-else :class="layout === 'list' ? 'stack' : 'grid-3'">
    <PropertyCard v-for="p in items" :key="p.id" :property="p" :layout="layout">
      <slot name="actions" :property="p" />
    </PropertyCard>
  </div>
</template>
