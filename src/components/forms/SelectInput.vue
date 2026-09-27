<script setup>
defineProps({
  modelValue: [String, Number],
  label: String,
  error: String,
  id: String,
  required: Boolean,
  disabled: Boolean,
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: 'Select' },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="field">
    <label v-if="label" :for="id">{{ label }}</label>
    <select
      class="control"
      :id="id"
      :value="modelValue"
      :required="required"
      :disabled="disabled"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option value="">{{ placeholder }}</option>
      <option v-for="opt in options" :key="opt.value ?? opt" :value="opt.value ?? opt">
        {{ opt.label ?? opt }}
      </option>
    </select>
    <p v-if="error" class="field-error">{{ error }}</p>
  </div>
</template>
