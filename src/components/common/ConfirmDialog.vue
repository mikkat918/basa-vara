<script setup>
import { useUiStore } from '../../stores/uiStore'

const ui = useUiStore()
</script>

<template>
  <teleport to="body">
    <div v-if="ui.confirm" class="overlay" @click.self="ui.confirm.resolve(false)">
      <div class="modal" role="alertdialog" aria-modal="true" :aria-labelledby="ui.confirm.title">
        <h2>{{ ui.confirm.title }}</h2>
        <p class="muted">{{ ui.confirm.message }}</p>
        <div class="row" style="margin-top: 16px; justify-content: flex-end">
          <button class="btn btn-secondary" type="button" @click="ui.confirm.resolve(false)">
            {{ ui.confirm.cancelLabel || 'Cancel' }}
          </button>
          <button
            class="btn"
            :class="ui.confirm.danger ? 'btn-danger' : 'btn-primary'"
            type="button"
            @click="ui.confirm.resolve(true)"
          >
            {{ ui.confirm.confirmLabel || 'Confirm' }}
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(20, 28, 24, 0.45);
  display: grid;
  place-items: center;
  z-index: 90;
  padding: 16px;
}
.modal {
  background: #fff;
  border-radius: 12px;
  width: min(440px, 100%);
  padding: 20px;
}
</style>
