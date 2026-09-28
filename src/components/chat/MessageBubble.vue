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

```vue
<template>
  <div
    class="message-row"
    :class="{ mine }"
  >
    <div class="bubble">
      <p>{{ message.message }}</p>

      <div class="bubble-meta">
        <time>{{ formatDateTime(message.timestamp) }}</time>

        <svg
          v-if="mine"
          class="message-check"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="m5 12 4 4L19 6" />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-row {
  display: flex;
  width: 100%;
  margin: 3px 0;
  padding: 0 4px;
  box-sizing: border-box;
}

.message-row.mine {
  justify-content: flex-end;
}

.bubble {
  position: relative;
  max-width: min(76%, 620px);
  padding: 10px 12px 8px;
  border: 1px solid #e3e9e5;
  border-radius: 15px 15px 15px 5px;
  background: #ffffff;
  color: #344139;
  box-shadow: 0 3px 12px rgba(31, 67, 47, 0.045);
  word-break: break-word;
}

.mine .bubble {
  border-color: #d2eadb;
  border-radius: 15px 15px 5px 15px;
  background: #eaf8ef;
  color: #245139;
}

.bubble p {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.55;
  white-space: pre-wrap;
}

.bubble-meta {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 3px;
  margin-top: 5px;
}

time {
  color: #9aa39e;
  font-size: 8px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
}

.mine time {
  color: #6d9a7e;
}

.message-check {
  width: 11px;
  height: 11px;
  fill: none;
  stroke: #32915a;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Subtle hover */
.bubble {
  transition:
    transform 0.16s ease,
    box-shadow 0.16s ease;
}

.bubble:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(31, 67, 47, 0.07);
}

/* Tablet */
@media (max-width: 700px) {
  .bubble {
    max-width: 82%;
  }

  .bubble p {
    font-size: 11px;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .message-row {
    padding: 0 2px;
  }

  .bubble {
    max-width: 86%;
    padding: 9px 10px 7px;
    border-radius: 13px 13px 13px 5px;
  }

  .mine .bubble {
    border-radius: 13px 13px 5px 13px;
  }

  .bubble p {
    font-size: 11px;
    line-height: 1.5;
  }

  time {
    font-size: 7px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bubble {
    transition: none;
  }
}
</style>
