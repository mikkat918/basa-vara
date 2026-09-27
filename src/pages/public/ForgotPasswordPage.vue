<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../../services/authService'

const email = ref('')
const status = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()

async function submit() {
  loading.value = true
  error.value = ''
  status.value = ''
  try {
    const result = await authService.forgotPassword(email.value)
    status.value = result.message || 'A reset link has been sent.'
    router.push({ path: '/reset-password', query: { email: email.value } })
  } catch (err) {
    error.value = err.message || 'Unable to reset password'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="container page auth-shell">
    <div class="card auth-card">
      <h1>Reset your password</h1>
      <p class="muted">Enter your email to receive a reset code.</p>
      <form class="stack" @submit.prevent="submit">
        <label class="field">
          Email
          <input v-model="email" class="control" type="email" placeholder="you@example.com" />
        </label>
        <p v-if="error" class="field-error">{{ error }}</p>
        <p v-if="status" class="muted">{{ status }}</p>
        <button class="btn btn-primary btn-block" type="submit" :disabled="loading">{{ loading ? 'Sending...' : 'Send reset code' }}</button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.auth-shell {
  display: grid;
  place-items: center;
  min-height: 60vh;
}
.auth-card {
  width: min(440px, 100%);
  padding: 28px;
}
.stack {
  display: grid;
  gap: 16px;
  margin-top: 18px;
}
</style>
