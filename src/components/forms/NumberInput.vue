<script setup>
defineProps({
  modelValue: [String, Number],
  label: String,
  error: String,
  id: String,
  min: [String, Number],
  max: [String, Number],
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="field">
    <label v-if="label" :for="id">{{ label }}</label>
    <input
      class="control"
      :id="id"
      type="number"
      :min="min"
      :max="max"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value === '' ? '' : Number($event.target.value))"
    />
    <p v-if="error" class="field-error">{{ error }}</p>
  </div>
</template>
