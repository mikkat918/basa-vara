<script setup>
defineProps({ text: String })
</script>

<template>
  <div class="desc">
    <h2>Description</h2>
    <p>{{ text }}</p>
  </div>
</template>

<style scoped>
.desc {
  display: grid;
  gap: 8px;
}
</style>
