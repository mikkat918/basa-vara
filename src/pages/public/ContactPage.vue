<script setup>
import { reactive, ref } from 'vue'

const form = reactive({ name: '', email: '', message: '' })
const sent = ref(false)

function submit() {
  sent.value = true
}
</script>

<template>
  <section class="container page">
    <h1>Contact us</h1>
    <div class="grid-2 contact-grid">
      <div class="card info-card">
        <h3>Support</h3>
        <p class="muted">Email: support@basavara.com</p>
        <p class="muted">Phone: +880 1700-000000</p>
        <p class="muted">Dhaka, Bangladesh</p>
      </div>
      <div class="card form-card">
        <form class="stack" @submit.prevent="submit">
          <label class="field">
            Name
            <input v-model="form.name" class="control" placeholder="Your name" />
          </label>
          <label class="field">
            Email
            <input v-model="form.email" class="control" type="email" placeholder="you@example.com" />
          </label>
          <label class="field">
            Message
            <textarea v-model="form.message" class="control" placeholder="Tell us how we can help"></textarea>
          </label>
          <button class="btn btn-primary" type="submit">Send message</button>
          <p v-if="sent" class="muted">Your message has been queued. We will get back to you soon.</p>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-grid {
  margin-top: 24px;
}
.info-card,
.form-card {
  padding: 24px;
}
.stack {
  display: grid;
  gap: 14px;
}
</style>
