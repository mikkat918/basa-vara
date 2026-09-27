<script setup>
defineProps({
  title: String,
  values: { type: Array, default: () => [] },
})
const max = (vals) => Math.max(...vals, 1)
</script>

<template>
  <article class="card" style="padding: 16px">
    <h3>{{ title }}</h3>
    <div class="bars" aria-hidden="true">
      <span v-for="(v, i) in values" :key="i" class="bar" :style="{ height: `${(v / max(values)) * 80}px` }"></span>
    </div>
    <p class="muted">Last 7 periods</p>
  </article>
</template>

<style scoped>
.bars {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 90px;
  margin: 12px 0;
}
.bar {
  flex: 1;
  background: var(--color-primary);
  border-radius: 4px 4px 0 0;
  min-height: 4px;
}
</style>
