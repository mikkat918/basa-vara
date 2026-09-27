<script setup>
const props = defineProps({ status: String })
const labels = {
  draft: 'Draft',
  pending: 'Pending',
  active: 'Active',
  rejected: 'Rejected',
  rented: 'Rented',
  expired: 'Expired',
  suspended: 'Suspended',
}
const cls = {
  draft: 'badge-muted',
  pending: 'badge-warning',
  active: 'badge-success',
  rejected: 'badge-danger',
  rented: 'badge-muted',
  expired: 'badge-muted',
  suspended: 'badge-danger',
}
</script>

<template>
  <span class="badge" :class="cls[status] || 'badge-muted'">{{ labels[status] || status }}</span>
</template>
