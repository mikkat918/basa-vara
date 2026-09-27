<script setup>
const stats = [
  { label: 'Listings', value: '2,400+' },
  { label: 'Verified landlords', value: '1,000+' },
  { label: 'Avg. response time', value: '1 hr' },
  { label: 'Cities covered', value: '8' },
]
</script>

<template>
  <section class="container page">
    <h1>About Basa Vara</h1>
    <p class="muted intro">We help Bangladesh tenants and landlords connect faster and more safely with verified rental listings, direct chat, and transparent contact unlocking.</p>
    <div class="grid-4 stats">
      <article v-for="item in stats" :key="item.label" class="card stat-card">
        <strong>{{ item.value }}</strong>
        <span>{{ item.label }}</span>
      </article>
    </div>
    <div class="card content-card">
      <h2>Our mission</h2>
      <p class="muted">Basa Vara exists to make renting in Bangladesh simpler, safer, and more trustworthy. We focus on clear listings, frictionless communication, and fair coin-based contact access.</p>
    </div>
  </section>
</template>

<style scoped>
.intro {
  max-width: 68ch;
  margin-top: 12px;
}
.stats {
  margin-top: 24px;
}
.stat-card,
.content-card {
  padding: 20px;
}
.stat-card {
  display: grid;
  gap: 4px;
}
.stat-card strong {
  font-size: 1.5rem;
  color: var(--color-primary);
}
.content-card {
  margin-top: 24px;
}
</style>
