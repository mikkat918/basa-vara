<script setup>
const profile = {
  name: 'Nabil Ahmed',
  email: 'nabil@example.com',
  phone: '+8801712345678',
  company: 'Basa Vara Homes',
}
</script>

<template>
  <div class="page">
    <h1>Profile</h1>
    <div class="card panel">
      <div class="row"><strong>Name:</strong> <span>{{ profile.name }}</span></div>
      <div class="row"><strong>Email:</strong> <span>{{ profile.email }}</span></div>
      <div class="row"><strong>Phone:</strong> <span>{{ profile.phone }}</span></div>
      <div class="row"><strong>Company:</strong> <span>{{ profile.company }}</span></div>
    </div>
  </div>
</template>

<style scoped>
.panel { padding: 20px; display: grid; gap: 12px; }
.row { display: flex; justify-content: space-between; gap: 16px; border-bottom: 1px solid var(--color-border); padding-bottom: 8px; }
</style>
