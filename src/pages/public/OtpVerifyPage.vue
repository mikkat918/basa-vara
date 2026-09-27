<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { authService } from '../../services/authService'

const code = ref('')
const error = ref(''); const loading = ref(false); const router = useRouter(); const route = useRoute()
async function submit() { loading.value = true; error.value = ''; try { const result = await authService.verifyOtp({ email: route.query.email || '', otp: code.value }); router.push({ path: '/reset-password', query: { token: result.resetToken } }) } catch (err) { error.value = err.message || 'Unable to verify code' } finally { loading.value = false } }
</script>

<template>
  <div class="page auth-page">
    <div class="card auth-card">
      <h1>Verify OTP</h1>
      <p class="muted">Enter the 6-digit code sent to your phone or email.</p>
      <form @submit.prevent="submit">
        <label>
          OTP
          <input v-model="code" type="text" maxlength="6" placeholder="123456" />
        </label>
        <p v-if="error" class="field-error">{{ error }}</p><button class="btn btn-primary" type="submit" :disabled="loading">{{ loading ? 'Verifying…' : 'Verify' }}</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.auth-page { display: grid; place-items: center; min-height: 70vh; }
.auth-card { width: min(420px, 90vw); padding: 32px 24px; }
form { display: grid; gap: 16px; }
label { display: grid; gap: 8px; font-weight: 600; }
input { padding: 12px 14px; border-radius: 10px; border: 1px solid var(--color-border); }
</style>
