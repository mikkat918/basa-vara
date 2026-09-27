<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'
import { useUiStore } from '../../stores/uiStore'

const router = useRouter()
const auth = useAuthStore()
const ui = useUiStore()
const loading = ref(false)
const form = reactive({ name: '', email: '', phone: '', role: 'tenant', password: '', confirmPassword: '' })
const error = ref('')

async function submit() {
  loading.value = true
  error.value = ''
  try {
    await auth.register(form)
    ui.toast('Your account is ready.', 'success')
    router.push('/login')
  } catch (err) {
    error.value = err.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="container page auth-shell">
    <div class="card auth-card">
      <h1>Create an account</h1>
      <p class="muted">Join as a tenant or landlord.</p>
      <form class="stack" @submit.prevent="submit">
        <label class="field">
          Full name
          <input v-model="form.name" class="control" placeholder="Your name" />
        </label>
        <label class="field">
          Email
          <input v-model="form.email" class="control" type="email" placeholder="you@example.com" />
        </label>
        <label class="field">
          Phone number
          <input v-model="form.phone" class="control" placeholder="01XXXXXXXXX" />
        </label>
        <label class="field">
          I am a
          <select v-model="form.role" class="control">
            <option value="tenant">Tenant</option>
            <option value="landlord">Landlord</option>
          </select>
        </label>
        <label class="field">
          Password
          <input v-model="form.password" class="control" type="password" placeholder="Minimum 8 chars" />
        </label>
        <label class="field">
          Confirm password
          <input v-model="form.confirmPassword" class="control" type="password" placeholder="Repeat password" />
        </label>
        <p v-if="error" class="field-error">{{ error }}</p>
        <button class="btn btn-primary btn-block" type="submit" :disabled="loading">{{ loading ? 'Creating...' : 'Register' }}</button>
      </form>
      <p class="muted meta">Already have an account? <router-link to="/login">Log in</router-link></p>
    </div>
  </section>
</template>

<style scoped>
.auth-shell {
  display: grid;
  place-items: center;
  min-height: 72vh;
}
.auth-card {
  width: min(520px, 100%);
  padding: 28px;
}
.stack {
  display: grid;
  gap: 16px;
  margin-top: 18px;
}
.meta {
  margin-top: 18px;
}
</style>
