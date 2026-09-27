<script setup>
defineProps({ label: String })
defineEmits(['remove'])
</script>

<template>
  <button class="chip" type="button" @click="$emit('remove')">{{ label }} ×</button>
</template>

<style scoped>
.chip {
  border: 1px solid var(--color-border);
  background: #fff;
  border-radius: 999px;
  padding: 6px 10px;
  cursor: pointer;
}
</style>
