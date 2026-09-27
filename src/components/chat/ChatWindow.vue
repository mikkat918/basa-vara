<script setup>
import MessageBubble from './MessageBubble.vue'
import MessageInput from './MessageInput.vue'
import TypingIndicator from './TypingIndicator.vue'
import LoadingSpinner from '../common/LoadingSpinner.vue'
import ErrorState from '../common/ErrorState.vue'
import EmptyState from '../common/EmptyState.vue'

defineProps({
  conversation: Object,
  messages: Array,
  loading: Boolean,
  error: String,
  sending: Boolean,
  typing: Boolean,
})
const emit = defineEmits(['send', 'block', 'report', 'retry'])
</script>

<template>
  <section class="window">
    <header v-if="conversation" class="head">
      <div>
        <h2>{{ conversation.other?.name }}</h2>
        <p class="muted">{{ conversation.online ? 'Online' : 'Offline' }} · {{ conversation.property?.title }}</p>
      </div>
      <div class="row">
        <button class="btn btn-secondary" type="button" @click="emit('block')">Block</button>
        <button class="btn btn-secondary" type="button" @click="emit('report')">Report</button>
      </div>
    </header>
    <LoadingSpinner v-if="loading" />
    <ErrorState v-else-if="error" :message="error" @retry="emit('retry')" />
    <EmptyState v-else-if="!conversation" title="Select a conversation" message="Choose a chat from the list." />
    <div v-else class="msgs">
      <MessageBubble v-for="m in messages" :key="m.id" :message="m" />
      <TypingIndicator v-if="typing" />
    </div>
    <MessageInput v-if="conversation" @send="emit('send', $event)" />
  </section>
</template>

<style scoped>
.window {
  display: flex;
  flex-direction: column;
  min-height: 60vh;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 12px;
}
.head {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 12px;
  border-bottom: 1px solid var(--color-border);
}
.msgs {
  flex: 1;
  padding: 12px;
  overflow: auto;
}
</style>
