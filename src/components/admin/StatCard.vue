<script setup>
defineProps({
  label: String,
  value: [String, Number],
  hint: String,
})
</script>

<template>
  <article class="card" style="padding: 16px">
    <p class="muted">{{ label }}</p>
    <p class="val">{{ value }}</p>
    <p v-if="hint" class="muted">{{ hint }}</p>
  </article>
</template>

<style scoped>
.val {
  font-size: 1.6rem;
  font-weight: 700;
}
</style>
