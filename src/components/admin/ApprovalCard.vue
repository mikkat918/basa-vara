<script setup>
defineProps({ property: Object })
defineEmits(['approve', 'reject', 'view'])
</script>

<template>
  <article class="card" style="padding: 16px">
    <h3>{{ property.title }}</h3>
    <p class="muted">{{ property.location?.area }} · ৳{{ property.rent }}</p>
    <div class="row">
      <button class="btn btn-secondary" type="button" @click="$emit('view', property)">View</button>
      <button class="btn btn-primary" type="button" @click="$emit('approve', property)">Approve</button>
      <button class="btn btn-danger" type="button" @click="$emit('reject', property)">Reject</button>
    </div>
  </article>
</template>
