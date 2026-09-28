
<script setup>
import AppHeader from '../components/common/AppHeader.vue'
</script>

<template>
  <div class="auth-layout">
    <AppHeader />

    <main
      id="main"
      class="auth-main"
      tabindex="-1"
    >
      <div class="auth-container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<style scoped>
/* ========================================
   Auth Layout
======================================== */

.auth-layout {
  display: flex;
  flex-direction: column;

  width: 100%;
  min-height: 100svh;

  background: var(--color-bg, #f8fafc);
  color: #0f172a;

  overflow-x: hidden;
}

/* ========================================
   Main
======================================== */

.auth-main {
  display: flex;
  flex: 1;

  width: 100%;

  box-sizing: border-box;

  padding: 32px 20px 48px;

  outline: none;
}

/* ========================================
   Container
======================================== */

.auth-container {
  width: 100%;
  max-width: 1180px;

  margin: 0 auto;
}

/* ========================================
   Responsive
======================================== */

@media (max-width: 768px) {
  .auth-main {
    padding: 24px 16px 36px;
  }
}

@media (max-width: 480px) {
  .auth-main {
    padding: 18px 12px 28px;
  }
}

/* ========================================
   Reduced Motion
======================================== */

@media (prefers-reduced-motion: reduce) {
  .auth-layout {
    scroll-behavior: auto;
  }
}
</style>
