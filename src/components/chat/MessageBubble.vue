<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../../stores/authStore'
import { formatDateTime } from '../../utils/format'

const props = defineProps({
  message: Object,
})
const auth = useAuthStore()
const mine = computed(() => props.message.senderId === auth.user?.id)
</script>

<template>
  <div class="bubble" :class="{ mine }">
    <p>{{ message.message }}</p>
    <time>{{ formatDateTime(message.timestamp) }}</time>
  </div>
</template>

<style scoped>
.bubble {
  max-width: 80%;
  background: #eef1ef;
  padding: 10px 12px;
  border-radius: 12px;
  margin: 8px 0;
}
.mine {
  margin-left: auto;
  background: var(--color-primary-soft);
}
time {
  display: block;
  font-size: 11px;
  color: var(--color-muted);
}
</style>
