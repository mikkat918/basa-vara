<script setup>
defineProps({
  modelValue: String,
  label: String,
  options: Array,
  name: String,
})
defineEmits(['update:modelValue'])
</script>

<template>
  <fieldset class="field">
    <legend>{{ label }}</legend>
    <label v-for="opt in options" :key="opt.value" class="opt">
      <input
        type="radio"
        :name="name"
        :value="opt.value"
        :checked="modelValue === opt.value"
        @change="$emit('update:modelValue', opt.value)"
      />
      {{ opt.label }}
    </label>
  </fieldset>
</template>

<style scoped>
.opt {
  display: flex;
  gap: 8px;
  align-items: center;
  min-height: 40px;
}
fieldset {
  border: 0;
  padding: 0;
  margin: 0;
}
legend {
  font-weight: 600;
  margin-bottom: 6px;
}
</style>
