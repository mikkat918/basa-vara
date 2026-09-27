<script setup>
defineProps({
  items: { type: Array, required: true },
})
</script>

<template>
  <nav class="crumbs" aria-label="Breadcrumb">
    <ol>
      <li v-for="(item, i) in items" :key="item.label">
        <router-link v-if="item.to && i < items.length - 1" :to="item.to">{{ item.label }}</router-link>
        <span v-else aria-current="page">{{ item.label }}</span>
        <span v-if="i < items.length - 1" class="sep">/</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.crumbs ol {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
  color: var(--color-muted);
  font-size: 0.9rem;
}
.sep {
  margin-left: 8px;
}
</style>
