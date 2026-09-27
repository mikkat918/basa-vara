<script setup>
import { APP_NAME } from '../../utils/constants'
</script>

<template>
  <footer class="footer">
    <div class="container grid-4">
      <div>
        <p class="brand">{{ APP_NAME }}</p>
        <p class="muted">Trusted rental listings across Bangladesh. Search, chat, then unlock verified landlord contacts with coins.</p>
      </div>
      <div>
        <h3>Explore</h3>
        <router-link to="/properties">Find a home</router-link>
        <router-link to="/how-it-works">How it works</router-link>
        <router-link to="/register">List a property</router-link>
      </div>
      <div>
        <h3>Company</h3>
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
      </div>
      <div>
        <h3>Legal</h3>
        <router-link to="/terms">Terms</router-link>
        <router-link to="/privacy">Privacy</router-link>
      </div>
    </div>
    <p class="copy muted">© {{ new Date().getFullYear() }} {{ APP_NAME }}. Dhaka, Bangladesh.</p>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--color-border);
  background: #fff;
  padding: 40px 0 24px;
  margin-top: auto;
}
.brand {
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 8px;
}
.footer a,
.footer h3 {
  display: block;
  margin-bottom: 8px;
}
.copy {
  text-align: center;
  margin-top: 32px;
}
</style>
