<script setup>
defineProps({
  lines: { type: Number, default: 3 },
})
</script>

<template>
  <div class="sk" aria-hidden="true">
    <div v-for="n in lines" :key="n" class="skeleton line"></div>
  </div>
</template>

<style scoped>
.sk {
  display: grid;
  gap: 8px;
}
.line {
  height: 14px;
}
</style>
