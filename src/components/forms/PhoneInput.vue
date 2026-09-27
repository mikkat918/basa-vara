<script setup>
import TextInput from './TextInput.vue'
defineProps({
  modelValue: String,
  label: { type: String, default: 'Phone' },
  error: String,
  id: String,
})
defineEmits(['update:modelValue'])
</script>

<template>
  <TextInput
    :id="id"
    :label="label"
    :model-value="modelValue"
    :error="error"
    placeholder="01XXXXXXXXX"
    autocomplete="tel"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>
