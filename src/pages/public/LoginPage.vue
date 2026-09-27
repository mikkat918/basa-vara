<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'
import { useUiStore } from '../../stores/uiStore'

const form = reactive({ email: '', password: '' })
const loading = ref(false)
const error = ref('')
const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const ui = useUiStore()

async function submit() {
  loading.value = true
  error.value = ''
  try {
    await auth.login(form)
    const redirect = route.query.redirect || (auth.role === 'admin' ? '/admin' : auth.role === 'landlord' ? '/landlord' : '/dashboard')
    router.push(redirect)
    ui.toast('Welcome back.', 'success')
  } catch (err) {
    error.value = err.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="container page auth-shell">
    <div class="card auth-card">
      <h1>Welcome back</h1>
      <p class="muted">Sign in to continue your rental search or manage listings.</p>
      <form class="stack" @submit.prevent="submit">
        <label class="field">
          Email
          <input v-model="form.email" class="control" type="email" placeholder="you@example.com" />
        </label>
        <label class="field">
          Password
          <input v-model="form.password" class="control" type="password" placeholder="••••••••" />
        </label>
        <p v-if="error" class="field-error">{{ error }}</p>
        <button class="btn btn-primary btn-block" type="submit" :disabled="loading">
          {{ loading ? 'Signing in...' : 'Log in' }}
        </button>
      </form>
      <div class="meta row">
        <router-link to="/forgot-password">Forgot password?</router-link>
        <span class="muted">No account? <router-link to="/register">Register</router-link></span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.auth-shell {
  display: grid;
  place-items: center;
  min-height: 70vh;
}
.auth-card {
  width: min(480px, 100%);
  padding: 28px;
}
.stack {
  display: grid;
  gap: 16px;
  margin-top: 18px;
}
.meta {
  justify-content: space-between;
  margin-top: 18px;
  flex-wrap: wrap;
}
</style>
