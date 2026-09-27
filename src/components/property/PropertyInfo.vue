<script setup>
import { formatBdt } from '../../utils/format'
import { locationLabel } from '../../utils/format'
defineProps({ property: Object })
</script>

<template>
  <dl class="info">
    <div><dt>Monthly rent</dt><dd>{{ formatBdt(property.rent) }}</dd></div>
    <div><dt>Security deposit</dt><dd>{{ formatBdt(property.securityDeposit) }}</dd></div>
    <div><dt>Bedrooms</dt><dd>{{ property.bedrooms }}</dd></div>
    <div><dt>Bathrooms</dt><dd>{{ property.bathrooms }}</dd></div>
    <div><dt>Size</dt><dd>{{ property.size }} sqft</dd></div>
    <div><dt>Floor</dt><dd>{{ property.floor }} / {{ property.totalFloors }}</dd></div>
    <div><dt>Available from</dt><dd>{{ property.availableFrom }}</dd></div>
    <div><dt>Type</dt><dd>{{ property.type }} · {{ property.listingType }}</dd></div>
    <div><dt>Location</dt><dd>{{ locationLabel(property.location) }}</dd></div>
    <div><dt>Preferred tenant</dt><dd>{{ property.preferredTenant }}</dd></div>
  </dl>
</template>

<style scoped>
.info {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
dt {
  color: var(--color-muted);
  font-size: 0.85rem;
}
dd {
  margin: 0;
  font-weight: 600;
}
@media (max-width: 600px) {
  .info {
    grid-template-columns: 1fr;
  }
}
</style>
