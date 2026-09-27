<script setup>
import { ref } from 'vue'
const props = defineProps({
  modelValue: String,
  label: { type: String, default: 'Password' },
  error: String,
  id: String,
  autocomplete: { type: String, default: 'current-password' },
})
defineEmits(['update:modelValue'])
const show = ref(false)
</script>

<template>
  <div class="field">
    <label :for="id">{{ label }}</label>
    <div class="wrap">
      <input
        class="control"
        :id="id"
        :type="show ? 'text' : 'password'"
        :value="modelValue"
        :autocomplete="autocomplete"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <button class="btn btn-ghost toggle" type="button" @click="show = !show">
        {{ show ? 'Hide' : 'Show' }}
      </button>
    </div>
    <p v-if="error" class="field-error">{{ error }}</p>
  </div>
</template>

<style scoped>
.wrap {
  position: relative;
}
.toggle {
  position: absolute;
  right: 4px;
  top: 2px;
  min-height: 40px;
}
</style>
