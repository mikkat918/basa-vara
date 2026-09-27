<script setup>
import { formatBdt } from '../../utils/format'
import { locationLabel } from '../../utils/format'
import PropertyStatusBadge from './PropertyStatusBadge.vue'

defineProps({
  property: { type: Object, required: true },
  layout: { type: String, default: 'grid' },
})
</script>

<template>
  <article class="card prop" :class="layout">
    <router-link :to="`/property/${property.id}`" class="img-wrap">
      <img :src="property.images?.[0]" :alt="property.title" loading="lazy" />
    </router-link>
    <div class="body">
      <div class="row" style="justify-content: space-between">
        <PropertyStatusBadge v-if="property.status && property.status !== 'active'" :status="property.status" />
        <span v-else-if="property.verified" class="badge badge-success">Verified</span>
      </div>
      <h3>
        <router-link :to="`/property/${property.id}`">{{ property.title }}</router-link>
      </h3>
      <p class="muted">{{ locationLabel(property.location) }}</p>
      <p class="rent">{{ formatBdt(property.rent) }} / month</p>
      <p class="meta">{{ property.bedrooms }} bed · {{ property.bathrooms }} bath · {{ property.size }} sqft</p>
      <slot />
    </div>
  </article>
</template>

<style scoped>
.prop.grid .img-wrap img {
  height: 180px;
  width: 100%;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
}
.prop.list {
  display: grid;
  grid-template-columns: 220px 1fr;
}
.prop.list img {
  height: 100%;
  object-fit: cover;
  border-radius: 12px 0 0 12px;
}
.body {
  padding: 16px;
}
.rent {
  font-weight: 700;
  color: var(--color-primary);
  margin: 8px 0 4px;
}
a {
  color: inherit;
  text-decoration: none;
}
@media (max-width: 700px) {
  .prop.list {
    grid-template-columns: 1fr;
  }
}
</style>
