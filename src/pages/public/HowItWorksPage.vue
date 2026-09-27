<script setup>
const steps = [
  { title: 'Search', text: 'Browse verified rental listings across Dhaka and other major areas.' },
  { title: 'Chat', text: 'Message a landlord without revealing private contact details upfront.' },
  { title: 'Unlock', text: 'Spend 1 coin to reveal the landlord phone number when you are ready.' },
  { title: 'Move in', text: 'Confirm the viewing, complete the paperwork, and settle into your next home.' },
]
</script>

<template>
  <section class="container page">
    <h1>How it works</h1>
    <div class="grid-4 steps">
      <article v-for="(step, index) in steps" :key="step.title" class="card step-card">
        <span class="step-number">0{{ index + 1 }}</span>
        <h3>{{ step.title }}</h3>
        <p class="muted">{{ step.text }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.steps {
  margin-top: 24px;
}
.step-card {
  padding: 20px;
}
.step-number {
  display: inline-block;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 10px;
}
</style>
