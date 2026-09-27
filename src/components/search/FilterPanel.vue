<script setup>
import { AMENITIES, FURNISHING, LOCATIONS, PREFERRED_TENANTS, PROPERTY_TYPES } from '../../utils/constants'
import AppCheckbox from '../forms/AppCheckbox.vue'

const props = defineProps({
  modelValue: { type: Object, required: true },
  open: Boolean,
})
const emit = defineEmits(['update:modelValue', 'apply', 'clear', 'close'])

function toggleAmenity(id, on) {
  const set = new Set(props.modelValue.amenities || [])
  if (on) set.add(id)
  else set.delete(id)
  emit('update:modelValue', { ...props.modelValue, amenities: [...set] })
}
</script>

<template>
  <form class="filters card" :class="{ sheet: open }" @submit.prevent="emit('apply')">
    <header class="row" style="justify-content: space-between">
      <h3>Filters</h3>
      <button class="btn btn-ghost hide-desktop" type="button" @click="emit('close')">Close</button>
    </header>
    <label class="field">Location
      <select class="control" :value="modelValue.location" @change="emit('update:modelValue', { ...modelValue, location: $event.target.value })">
        <option value="">Any</option>
        <option v-for="l in LOCATIONS" :key="l.area" :value="l.area">{{ l.area }}</option>
      </select>
    </label>
    <label class="field">Area
      <input class="control" :value="modelValue.area" placeholder="Sub-area" @input="emit('update:modelValue', { ...modelValue, area: $event.target.value })" />
    </label>
    <label class="field">Property type
      <select class="control" :value="modelValue.type" @change="emit('update:modelValue', { ...modelValue, type: $event.target.value })">
        <option value="">Any</option>
        <option v-for="t in PROPERTY_TYPES" :key="t" :value="t">{{ t }}</option>
      </select>
    </label>
    <div class="grid-2">
      <label class="field">Min rent
        <input class="control" type="number" :value="modelValue.minRent" @input="emit('update:modelValue', { ...modelValue, minRent: $event.target.value })" />
      </label>
      <label class="field">Max rent
        <input class="control" type="number" :value="modelValue.maxRent" @input="emit('update:modelValue', { ...modelValue, maxRent: $event.target.value })" />
      </label>
    </div>
    <div class="grid-2">
      <label class="field">Bedrooms
        <input class="control" type="number" min="0" :value="modelValue.bedrooms" @input="emit('update:modelValue', { ...modelValue, bedrooms: $event.target.value })" />
      </label>
      <label class="field">Bathrooms
        <input class="control" type="number" min="0" :value="modelValue.bathrooms" @input="emit('update:modelValue', { ...modelValue, bathrooms: $event.target.value })" />
      </label>
    </div>
    <label class="field">Minimum size (sqft)
      <input class="control" type="number" :value="modelValue.size" @input="emit('update:modelValue', { ...modelValue, size: $event.target.value })" />
    </label>
    <label class="field">Furnishing
      <select class="control" :value="modelValue.furnishing" @change="emit('update:modelValue', { ...modelValue, furnishing: $event.target.value })">
        <option value="">Any</option>
        <option v-for="f in FURNISHING" :key="f" :value="f">{{ f }}</option>
      </select>
    </label>
    <label class="field">Available date
      <input class="control" type="date" :value="modelValue.availableDate" @input="emit('update:modelValue', { ...modelValue, availableDate: $event.target.value })" />
    </label>
    <label class="field">Preferred tenant
      <select class="control" :value="modelValue.preferredTenant" @change="emit('update:modelValue', { ...modelValue, preferredTenant: $event.target.value })">
        <option value="">Any</option>
        <option v-for="t in PREFERRED_TENANTS" :key="t" :value="t">{{ t }}</option>
      </select>
    </label>
    <fieldset>
      <legend>Amenities</legend>
      <AppCheckbox
        v-for="a in AMENITIES"
        :key="a.id"
        :label="a.label"
        :model-value="(modelValue.amenities || []).includes(a.id)"
        @update:model-value="toggleAmenity(a.id, $event)"
      />
    </fieldset>
    <div class="row">
      <button class="btn btn-secondary" type="button" @click="emit('clear')">Clear</button>
      <button class="btn btn-primary" type="submit">Apply</button>
    </div>
  </form>
</template>

<style scoped>
.filters {
  padding: 16px;
  display: grid;
  gap: 12px;
}
fieldset {
  border: 0;
  padding: 0;
}
@media (max-width: 900px) {
  .filters.sheet {
    position: fixed;
    inset: auto 0 0;
    z-index: 60;
    max-height: 85vh;
    overflow: auto;
    border-radius: 16px 16px 0 0;
  }
}
</style>
