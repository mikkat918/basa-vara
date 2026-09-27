<script setup>
import AppModal from '../common/AppModal.vue'
defineProps({
  open: Boolean,
  preview: Object,
})
defineEmits(['close', 'unlock', 'buy'])
</script>

<template>
  <AppModal :open="open" title="Unlock landlord contact?" @close="$emit('close')">
    <div v-if="preview" class="stack">
      <p>Current balance: <strong>{{ preview.currentBalance }} Coins</strong></p>
      <p>Unlock cost: <strong>{{ preview.unlockCost }} Coin</strong></p>
      <p>Remaining balance: <strong>{{ preview.remainingBalance }} Coins</strong></p>
      <p v-if="!preview.sufficient" class="field-error">Insufficient coins</p>
      <div class="row" style="justify-content: flex-end">
        <button class="btn btn-secondary" type="button" @click="$emit('close')">Cancel</button>
        <button v-if="preview.sufficient" class="btn btn-primary" type="button" @click="$emit('unlock')">Unlock contact</button>
        <button v-else class="btn btn-primary" type="button" @click="$emit('buy')">Buy coins</button>
      </div>
    </div>
  </AppModal>
</template>
