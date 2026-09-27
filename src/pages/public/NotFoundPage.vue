<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <section class="container page not-found">
    <div class="card content-card">
      <h1>404</h1>
      <p class="muted">This page could not be found.</p>
      <button class="btn btn-primary" type="button" @click="router.push('/')">Go home</button>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  display: grid;
  place-items: center;
  min-height: 54vh;
}
.content-card {
  padding: 32px;
  text-align: center;
}
</style>
