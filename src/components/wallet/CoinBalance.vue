<script setup>
defineProps({
  balance: Number,
  compact: Boolean,
})
</script>

<template>
  <div class="card bal" :class="{ compact }">
    <p class="muted">Current balance</p>
    <p class="num">{{ balance }} Coins</p>
    <p class="muted">1 Coin = ৳10</p>
    <slot />
  </div>
</template>

<style scoped>
.bal {
  padding: 20px;
}
.num {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary);
}
.compact .num {
  font-size: 1.2rem;
}
</style>
