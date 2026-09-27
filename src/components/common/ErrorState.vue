<script setup>
defineProps({
  message: { type: String, default: 'Something went wrong.' },
})
defineEmits(['retry'])
</script>

<template>
  <div class="err card" style="padding: 24px" role="alert">
    <h3>Unable to load</h3>
    <p class="muted">{{ message }}</p>
    <button class="btn btn-secondary" type="button" style="margin-top: 12px" @click="$emit('retry')">Try again</button>
  </div>
</template>
