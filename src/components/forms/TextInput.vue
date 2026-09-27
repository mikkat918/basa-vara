<script setup>
defineProps({
  modelValue: [String, Number],
  label: String,
  type: { type: String, default: 'text' },
  error: String,
  id: String,
  required: Boolean,
  disabled: Boolean,
  placeholder: String,
  autocomplete: String,
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="field">
    <label v-if="label" :for="id">{{ label }}</label>
    <input
      class="control"
      :id="id"
      :type="type"
      :value="modelValue"
      :required="required"
      :disabled="disabled"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :aria-invalid="Boolean(error)"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <p v-if="error" class="field-error">{{ error }}</p>
  </div>
</template>
