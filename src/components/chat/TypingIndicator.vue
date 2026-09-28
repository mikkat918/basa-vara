```vue
<template>
  <div class="typing" role="status" aria-label="Someone is typing">
    <span class="typing-bubble">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </span>

    <span class="label">Typing</span>
  </div>
</template>

<style scoped>
.typing {
  display: flex;
  align-items: center;
  gap: 7px;
  width: fit-content;
  margin: 8px 4px 4px;
  color: #8b9690;
}

.typing-bubble {
  display: flex;
  align-items: center;
  gap: 3px;
  min-width: 34px;
  height: 23px;
  padding: 0 8px;
  box-sizing: border-box;
  border: 1px solid #e1e8e4;
  border-radius: 12px 12px 12px 4px;
  background: #ffffff;
  box-shadow: 0 3px 10px rgba(31, 67, 47, 0.04);
}

.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #7c8982;
  animation: typing-dot 1.2s infinite ease-in-out;
}

.dot:nth-child(2) {
  animation-delay: 0.15s;
}

.dot:nth-child(3) {
  animation-delay: 0.3s;
}

.label {
  font-size: 9px;
  font-weight: 650;
  letter-spacing: 0.01em;
}

@keyframes typing-dot {
  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.4;
  }

  30% {
    transform: translateY(-3px);
    opacity: 1;
  }
}

@media (max-width: 480px) {
  .typing {
    margin-left: 2px;
  }

  .label {
    font-size: 8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dot {
    animation: none;
    opacity: 0.65;
  }
}
</style>