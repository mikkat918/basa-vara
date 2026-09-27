<script setup>
import { onMounted } from 'vue'
import PropertyGrid from '../../components/property/PropertyGrid.vue'
import { usePropertyStore } from '../../stores/propertyStore'

const store = usePropertyStore()

onMounted(() => store.loadSaved(''))
</script>

<template>
  <div class="page">
    <h1>Saved properties</h1>
    <PropertyGrid :items="store.saved" :loading="store.loading" />
  </div>
</template>
