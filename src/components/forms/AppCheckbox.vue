<script setup>
defineProps({
  modelValue: Boolean,
  label: String,
  id: String,
})
defineEmits(['update:modelValue'])
</script>

<template>
  <label class="chk">
    <input :id="id" type="checkbox" :checked="modelValue" @change="$emit('update:modelValue', $event.target.checked)" />
    {{ label }}
  </label>
</template>

<style scoped>
.chk {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 40px;
}
</style>
