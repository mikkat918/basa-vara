<script setup>
import { reactive } from 'vue'
import { LOCATIONS } from '../../utils/constants'

const emit = defineEmits(['search'])
const form = reactive({ q: '', location: '' })

function submit() {
  emit('search', { ...form })
}
</script>

<template>
  <form class="bar" @submit.prevent="submit">
    <label class="sr-only" for="q">Keyword</label>
    <input id="q" class="control" v-model="form.q" placeholder="Search area, title..." />
    <select class="control" v-model="form.location" aria-label="Location">
      <option value="">All locations</option>
      <option v-for="l in LOCATIONS" :key="l.area" :value="l.area">{{ l.area }}</option>
    </select>
    <button class="btn btn-primary" type="submit">Search</button>
  </form>
</template>

<style scoped>
.bar {
  display: grid;
  grid-template-columns: 1fr 200px auto;
  gap: 8px;
}
@media (max-width: 700px) {
  .bar {
    grid-template-columns: 1fr;
  }
}
</style>
