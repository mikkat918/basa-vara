
<script setup>
import TextInput from './TextInput.vue'

defineProps({
  modelValue: {
    type: String,
    default: '',
  },

  label: {
    type: String,
    default: 'Phone',
  },

  error: {
    type: String,
    default: '',
  },

  id: {
    type: String,
    default: 'phone',
  },

  placeholder: {
    type: String,
    default: '01XXXXXXXXX',
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  required: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <TextInput
    :id="id"
    :label="label"
    :model-value="modelValue"
    :error="error"
    :placeholder="placeholder"
    autocomplete="tel"
    type="tel"
    inputmode="tel"
    :disabled="disabled"
    :required="required"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>
