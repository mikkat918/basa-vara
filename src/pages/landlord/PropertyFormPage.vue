<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { propertyService } from '../../services/propertyService'
import { useAuthStore } from '../../stores/authStore'
import { useUiStore } from '../../stores/uiStore'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const ui = useUiStore()
const isEdit = computed(() => Boolean(route.params.id))
const loading = ref(false)
const form = reactive({ title: '', rent: 25000, area: 'Dhaka', bedrooms: 2, bathrooms: 1, status: 'draft', description: '', type: 'Apartment' })

onMounted(async () => {
  if (isEdit.value) {
    loading.value = true
    try {
      const item = (await propertyService.forLandlord(auth.user.id)).find((property) => property.id === route.params.id)
      if (!item) throw new Error('Property not found')
      Object.assign(form, { title: item.title, rent: item.rent, area: item.location.area, bedrooms: item.bedrooms, bathrooms: item.bathrooms, status: item.status, description: item.description, type: item.type })
    } catch (error) { ui.toast(error.message || 'Unable to load property', 'error') } finally { loading.value = false }
  }
})

async function save() {
  if (!form.title.trim() || form.rent <= 0) return ui.toast('Add a title and valid monthly rent.', 'error')
  loading.value = true
  const payload = { title: form.title.trim(), rent: Number(form.rent), bedrooms: Number(form.bedrooms), bathrooms: Number(form.bathrooms), status: form.status, type: form.type, listingType: 'Rent', securityDeposit: Number(form.rent) * 2, size: 800, floor: 1, totalFloors: 1, location: { division: 'Dhaka', district: 'Dhaka', area: form.area, subArea: form.area, address: form.area }, description: form.description || 'Details will be added by the landlord.', amenities: [], images: [], availableFrom: new Date().toISOString().slice(0, 10), preferredTenant: 'Anyone', furnishing: 'Unfurnished', nearby: [] }
  try { const result = isEdit.value ? await propertyService.update(route.params.id, auth.user.id, payload) : await propertyService.create(auth.user.id, payload); ui.toast(isEdit.value ? 'Listing updated.' : 'Listing created and saved as draft.', 'success'); router.push(`/landlord/properties/${result.id}/edit`) } catch (error) { ui.toast(error.message || 'Unable to save property', 'error') } finally { loading.value = false }
}
</script>

<template>
  <div class="page">
    <h1>{{ isEdit ? 'Edit property' : 'Add property' }}</h1>
    <form class="card panel" @submit.prevent="save">
      <div class="grid two-col">
        <label>
          Title
          <input v-model="form.title" type="text" />
        </label>
        <label>
          Monthly rent
          <input v-model.number="form.rent" type="number" min="1" />
        </label>
        <label>
          Area
          <input v-model="form.area" type="text" />
        </label>
        <label>
          Status
          <select v-model="form.status">
            <option value="draft">Draft</option><option value="pending">Submit for approval</option><option value="active">Active</option><option value="paused">Paused</option>
          </select>
        </label>
        <label>
          Bedrooms
          <input v-model.number="form.bedrooms" type="number" min="0" />
        </label>
        <label>
          Bathrooms
          <input v-model.number="form.bathrooms" type="number" min="0" />
        </label>
      </div>
      <label>Description<textarea v-model="form.description" rows="4" placeholder="Describe the property, amenities, and availability"></textarea></label>
      <button class="btn btn-primary" type="submit" :disabled="loading">{{ loading ? 'Saving…' : isEdit ? 'Update listing' : 'Create listing' }}</button>
    </form>
  </div>
</template>

<style scoped>
.panel { padding: 20px; }
.grid { display: grid; gap: 16px; }
.two-col { grid-template-columns: repeat(2, minmax(0, 1fr)); }
label { display: grid; gap: 8px; font-weight: 600; }
input, select, textarea { padding: 12px 14px; border: 1px solid var(--color-border); border-radius: 10px; }
.btn { margin-top: 16px; }
@media (max-width: 700px) { .two-col { grid-template-columns: 1fr; } }
</style>
