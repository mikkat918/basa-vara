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

```vue id="c7xq1m"
<template>
  <form class="input" @submit.prevent="submit">
    <!-- Attachment -->
    <button
      class="attach-btn"
      type="button"
      aria-label="Attachment"
      title="Attach file"
      @click="$emit('attach')"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="m20.5 11.5-8.3 8.3a5 5 0 0 1-7.1-7.1l8.5-8.5a3.5 3.5 0 0 1 5 5l-8.6 8.6a2 2 0 0 1-2.8-2.8l8-8"
        />
      </svg>
    </button>

    <!-- Message field -->
    <label class="sr-only" for="msg">
      Message
    </label>

    <div class="field">
      <input
        id="msg"
        class="control"
        v-model="text"
        type="text"
        autocomplete="off"
        placeholder="Write a message..."
      />
    </div>

    <!-- Send -->
    <button
      class="send-btn"
      type="submit"
      :disabled="!text?.trim()"
      aria-label="Send message"
      title="Send message"
    >
      <span>Send</span>

      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </svg>
    </button>
  </form>
</template>

<style scoped>
.input {
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr) auto;
  align-items: center;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border-top: 1px solid #e8eeea;
  background: #ffffff;
}

/* =========================
   Attachment
========================= */

.attach-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  padding: 0;
  border: 1px solid #dfe8e3;
  border-radius: 11px;
  background: #f8faf9;
  color: #728078;
  cursor: pointer;
  transition:
    background 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease,
    transform 0.18s ease;
}

.attach-btn:hover {
  border-color: #cbded2;
  background: #eef8f1;
  color: #218750;
  transform: translateY(-1px);
}

.attach-btn svg {
  width: 17px;
  height: 17px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* =========================
   Input
========================= */

.field {
  min-width: 0;
}

.control {
  display: block;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  padding: 0 13px;
  border: 1px solid #dfe8e3;
  border-radius: 11px;
  outline: none;
  background: #f8faf9;
  color: #29372f;
  font: inherit;
  font-size: 12px;
  transition:
    border-color 0.18s ease,
    background 0.18s ease,
    box-shadow 0.18s ease;
}

.control::placeholder {
  color: #9ba49f;
}

.control:hover {
  border-color: #cfdcd5;
}

.control:focus {
  border-color: #48a56d;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(44, 158, 88, 0.1);
}

/* =========================
   Send
========================= */

.send-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-width: 74px;
  height: 40px;
  padding: 0 13px;
  border: 0;
  border-radius: 11px;
  background: linear-gradient(135deg, #18894e, #20a05c);
  color: #ffffff;
  font: inherit;
  font-size: 11px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 5px 14px rgba(30, 143, 78, 0.17);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    opacity 0.18s ease;
}

.send-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 7px 17px rgba(30, 143, 78, 0.23);
}

.send-btn:active:not(:disabled) {
  transform: translateY(0);
}

.send-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  box-shadow: none;
}

.send-btn svg {
  width: 15px;
  height: 15px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* =========================
   Mobile
========================= */

@media (max-width: 560px) {
  .input {
    grid-template-columns: 36px minmax(0, 1fr) 42px;
    gap: 6px;
    padding: 8px;
  }

  .attach-btn {
    width: 36px;
    height: 36px;
  }

  .control {
    height: 36px;
    padding: 0 10px;
    font-size: 11px;
  }

  .send-btn {
    min-width: 42px;
    width: 42px;
    height: 36px;
    padding: 0;
  }

  .send-btn span {
    display: none;
  }

  .send-btn svg {
    width: 16px;
    height: 16px;
  }
}

@media (max-width: 360px) {
  .input {
    grid-template-columns: 34px minmax(0, 1fr) 40px;
    padding: 7px;
  }

  .attach-btn {
    width: 34px;
    height: 34px;
  }

  .control {
    height: 34px;
  }

  .send-btn {
    width: 40px;
    height: 34px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .attach-btn,
  .control,
  .send-btn {
    transition: none;
  }
}
</style>
