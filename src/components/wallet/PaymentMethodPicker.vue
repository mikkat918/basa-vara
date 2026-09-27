<script setup>
import { PAYMENT_METHODS } from '../../utils/constants'
defineProps({ modelValue: String })
defineEmits(['update:modelValue'])
</script>

<template>
  <fieldset>
    <legend>Payment method</legend>
    <label v-for="m in PAYMENT_METHODS" :key="m.id" class="opt">
      <input type="radio" name="pay" :value="m.id" :checked="modelValue === m.id" @change="$emit('update:modelValue', m.id)" />
      {{ m.label }}
    </label>
  </fieldset>
</template>

<style scoped>
fieldset {
  border: 0;
  padding: 0;
}
.opt {
  display: flex;
  gap: 8px;
  min-height: 44px;
  align-items: center;
}
</style>
