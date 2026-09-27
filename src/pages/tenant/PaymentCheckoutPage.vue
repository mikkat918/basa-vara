<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { COIN_PACKAGES } from '../../utils/constants'
import { paymentService } from '../../services/paymentService'
import { useAuthStore } from '../../stores/authStore'
import { useUiStore } from '../../stores/uiStore'
const route = useRoute(); const router = useRouter(); const auth = useAuthStore(); const ui = useUiStore()
const method = ref('bkash'); const loading = ref(false); const notice = ref('')
const pack = computed(() => COIN_PACKAGES.find((item) => item.id === route.query.package) || COIN_PACKAGES[0])
async function pay() { loading.value = true; notice.value = ''; try { const result = await paymentService.createPayment({ userId: auth.user.id, packageId: pack.value.id, method: method.value }); notice.value = `Payment request ${result.paymentId} is pending. Coins will be added only after gateway confirmation.`; ui.toast('Payment request created. Awaiting confirmation.', 'warning') } catch (error) { ui.toast(error.message || 'Unable to start payment', 'error') } finally { loading.value = false } }
</script>

<template>
  <div class="page">
    <div class="page-heading"><div><h1>Checkout</h1><p class="muted">Securely purchase coins to unlock landlord contacts.</p></div><button class="btn btn-secondary" type="button" @click="router.push('/dashboard/wallet')">Back to wallet</button></div>
    <div class="card panel">
      <div class="grid">
        <label>
          Payment method
          <select v-model="method">
            <option value="bkash">bKash</option><option value="nagad">Nagad</option><option value="card">Card</option>
          </select>
        </label>
        <label>
          Package
          <input :value="`${pack.coins} coins — ৳${pack.amount}`" readonly />
        </label>
      </div>
      <p v-if="notice" class="notice">{{ notice }}</p><button class="btn btn-primary" type="button" :disabled="loading" @click="pay">{{ loading ? 'Creating payment…' : `Pay ৳${pack.amount}` }}</button>
    </div>
  </div>
</template>

<style scoped>
.panel { padding: 24px; display: grid; gap: 18px; }
.grid { display: grid; gap: 16px; }
.page-heading { display:flex; justify-content:space-between; gap:16px; align-items:start; margin-bottom:20px; }.notice { padding:12px; border-radius:var(--radius-md); background:#fdf3e3; color:#87580c; }
label { display: grid; gap: 8px; font-weight: 600; }
input, select { padding: 12px 14px; border-radius: 10px; border: 1px solid var(--color-border); }
@media (max-width:560px) { .page-heading { display:grid; } }
</style>
