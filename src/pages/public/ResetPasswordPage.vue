<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { authService } from '../../services/authService'

const route = useRoute()
const router = useRouter()
const form = reactive({ resetToken: route.query.token || (route.query.email ? `reset-${route.query.email}` : ''), password: '', confirmPassword: '' })
const error = ref('')
const loading = ref(false)

async function submit() {
  loading.value = true
  error.value = ''
  try {
    await authService.resetPassword({
      resetToken: form.resetToken,
      password: form.password,
      confirmPassword: form.confirmPassword,
    })
    router.push('/login')
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
      <h1>Create new password</h1>
      <p class="muted">Set a new password for your account.</p>
      <form class="stack" @submit.prevent="submit">
        <label class="field">
          New password
          <input v-model="form.password" class="control" type="password" placeholder="New password" />
        </label>
        <label class="field">
          Confirm password
          <input v-model="form.confirmPassword" class="control" type="password" placeholder="Repeat password" />
        </label>
        <p v-if="error" class="field-error">{{ error }}</p>
        <button class="btn btn-primary btn-block" type="submit" :disabled="loading">{{ loading ? 'Updating...' : 'Update password' }}</button>
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
