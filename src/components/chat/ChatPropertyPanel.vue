<script setup>
import { formatBdt } from '../../utils/format'
import { locationLabel } from '../../utils/format'
defineProps({ property: Object, unlocked: Boolean })
</script>

<template>
  <aside v-if="property" class="card panel">
    <img :src="property.images?.[0]" :alt="property.title" />
    <h3>{{ property.title }}</h3>
    <p>{{ formatBdt(property.rent) }} / month</p>
    <p class="muted">{{ locationLabel(property.location) }}</p>
    <p class="badge" :class="unlocked ? 'badge-success' : 'badge-muted'">
      {{ unlocked ? 'Contact unlocked' : 'Contact locked' }}
    </p>
    <router-link class="btn btn-secondary btn-block" :to="`/property/${property.id}`">View property</router-link>
  </aside>
</template>

<style scoped>
.panel {
  padding: 16px;
  display: grid;
  gap: 8px;
}
img {
  height: 140px;
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
}
@media (max-width: 1024px) {
  .panel {
    display: none;
  }
}
</style>
