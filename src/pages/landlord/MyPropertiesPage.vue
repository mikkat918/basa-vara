<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { propertyService } from '../../services/propertyService'
import { useAuthStore } from '../../stores/authStore'

const auth = useAuthStore(); const router = useRouter(); const items = ref([]); const loading = ref(false)

async function load() { loading.value = true; try { items.value = await propertyService.forLandlord(auth.user.id) } finally { loading.value = false } }
onMounted(load)
</script>

<template>
  <div class="page">
    <div class="heading"><div><h1>My properties</h1><p class="muted">Manage your listings and their approval status.</p></div><button class="btn btn-primary" type="button" @click="router.push('/landlord/properties/new')">Add property</button></div>
    <div class="card panel">
      <p v-if="loading" class="muted">Loading properties…</p><p v-else-if="!items.length" class="muted">No properties yet. Create your first listing to get started.</p>
      <ul v-else class="list">
        <li v-for="item in items" :key="item.id" class="row item">
          <span>{{ item.title }}</span>
          <span class="badge badge-success">{{ item.status }}</span>
          <span class="row"><button class="btn btn-secondary" type="button" @click="router.push(`/landlord/properties/${item.id}/edit`)">Edit</button><button class="btn btn-secondary" type="button" @click="router.push(`/landlord/properties/${item.id}/analytics`)">Analytics</button></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.panel { padding: 20px; }
.heading { display:flex; justify-content:space-between; gap:16px; align-items:start; margin-bottom:20px; }.heading p { margin-top:4px; }
.list { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
.item { justify-content: space-between; border-bottom: 1px solid var(--color-border); padding-bottom: 8px; }
@media(max-width:600px){.heading,.item{align-items:stretch; flex-direction:column}}
</style>
