<script setup>
defineProps({
  landlord: Object,
})
</script>

<template>
  <aside class="card" style="padding: 16px">
    <h3>Landlord</h3>
    <p>{{ landlord?.name }}</p>
    <p v-if="landlord?.verified" class="badge badge-success">Verified landlord</p>
    <p class="muted">Response rate {{ landlord?.responseRate || 0 }}%</p>
    <p class="muted">{{ landlord?.responseTime }}</p>
    <slot />
  </aside>
</template>
