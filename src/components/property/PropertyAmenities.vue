<script setup>
import { AMENITIES } from '../../utils/constants'
defineProps({ amenities: { type: Array, default: () => [] } })
function label(id) {
  return AMENITIES.find((a) => a.id === id)?.label || id
}
</script>

<template>
  <ul class="am">
    <li v-for="id in amenities" :key="id">{{ label(id) }}</li>
  </ul>
</template>

<style scoped>
.am {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
}
.am li {
  background: var(--color-primary-soft);
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.85rem;
}
</style>
