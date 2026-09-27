<script setup>
import { ref } from 'vue'
const text = ref('')
const emit = defineEmits(['send'])
function submit() {
  if (!text.value.trim()) return
  emit('send', text.value)
  text.value = ''
}
</script>

<template>
  <form class="input" @submit.prevent="submit">
    <button class="btn btn-ghost" type="button" aria-label="Attachment" @click="$emit('attach')">Attach</button>
    <label class="sr-only" for="msg">Message</label>
    <input id="msg" class="control" v-model="text" placeholder="Write a message" />
    <button class="btn btn-primary" type="submit">Send</button>
  </form>
</template>

<style scoped>
.input {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 8px;
  padding: 8px;
  border-top: 1px solid var(--color-border);
}
</style>
