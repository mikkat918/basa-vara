<script setup>
import AppHeader from '../components/common/AppHeader.vue'
</script>

<template>
  <div class="auth">
    <AppHeader />
    <main id="main" class="container page">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.auth {
  min-height: 100svh;
  background: var(--color-bg);
}
</style>
