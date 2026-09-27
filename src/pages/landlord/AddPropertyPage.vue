<script setup>
import { reactive } from 'vue'

const form = reactive({
  title: '',
  type: 'Apartment',
  price: '',
  city: 'Dhaka',
  bedrooms: 2,
  bathrooms: 1,
})

const submit = () => {
  console.log('New property draft:', form)
}
</script>

<template>
  <div class="page">
    <h1>Add property</h1>
    <form class="card panel" @submit.prevent="submit">
      <div class="grid two-col">
        <label>
          Title
          <input v-model="form.title" type="text" placeholder="Modern apartment in Dhanmondi" />
        </label>
        <label>
          Type
          <select v-model="form.type">
            <option>Apartment</option>
            <option>House</option>
            <option>Studio</option>
            <option>Commercial</option>
          </select>
        </label>
        <label>
          Monthly rent
          <input v-model="form.price" type="number" placeholder="25000" />
        </label>
        <label>
          City
          <input v-model="form.city" type="text" />
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
      <button class="btn btn-primary" type="submit">Save listing</button>
    </form>
  </div>
</template>

<style scoped>
.panel { padding: 20px; }
.grid { display: grid; gap: 16px; }
.two-col { grid-template-columns: repeat(2, minmax(0, 1fr)); }
label { display: grid; gap: 8px; font-weight: 600; }
input, select { padding: 12px 14px; border: 1px solid var(--color-border); border-radius: 10px; }
.btn { margin-top: 18px; }
@media (max-width: 700px) { .two-col { grid-template-columns: 1fr; } }
</style>
