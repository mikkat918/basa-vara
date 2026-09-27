<script setup>
import { computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import SearchBar from '../../components/search/SearchBar.vue'
import PropertyGrid from '../../components/property/PropertyGrid.vue'
import { usePropertyStore } from '../../stores/propertyStore'
import { LOCATIONS } from '../../utils/constants'
import { useAuthStore } from '../../stores/authStore'

const store = usePropertyStore()
const router = useRouter()
const auth = useAuthStore()
const steps = [
  { t: 'Search', d: 'Filter by area, rent, and amenities.' },
  { t: 'Visit details', d: 'Browse photos and listing facts for free.' },
  { t: 'Chat', d: 'Message the landlord about viewing times.' },
  { t: 'Unlock', d: 'Spend 1 coin to reveal verified phone details.' },
]

onMounted(() => store.loadHome())

function search(payload) {
  const q = new URLSearchParams()
  if (payload.q) q.set('q', payload.q)
  if (payload.location) q.set('location', payload.location)
  router.push(`/properties?${q.toString()}`)
}

const landlordCta = computed(() => (auth.role === 'landlord' ? '/landlord/properties/new' : '/register'))
</script>

<template>
  <section class="hero">
    <div class="container">
      <p class="eyebrow">বাসা ভাড়া · Bangladesh rentals</p>
      <h1>Find a trusted home. Talk first. Unlock contact when you are ready.</h1>
      <p class="muted lead">Browse flats across Dhaka for free. Chat with landlords. Use coins only when you need a phone number.</p>
      <SearchBar @search="search" />
    </div>
  </section>

  <section class="container page">
    <h2>Popular locations</h2>
    <div class="grid-4" style="margin-top: 16px">
      <router-link v-for="l in LOCATIONS" :key="l.area" class="card loc" :to="`/properties?location=${l.area}`">
        {{ l.area }}
        <span class="muted">Dhaka</span>
      </router-link>
    </div>
  </section>

  <section class="container page">
    <h2>Featured properties</h2>
    <PropertyGrid :items="store.featured" :loading="store.loading" />
  </section>

  <section class="container page">
    <h2>Latest listings</h2>
    <PropertyGrid :items="store.latest" :loading="store.loading" />
    <p style="margin-top: 16px"><router-link class="btn btn-secondary" to="/properties">Browse all</router-link></p>
  </section>

  <section class="container page">
    <h2>How it works</h2>
    <div class="grid-4" style="margin-top: 16px">
      <article v-for="s in steps" :key="s.t" class="card" style="padding: 16px">
        <h3>{{ s.t }}</h3>
        <p class="muted">{{ s.d }}</p>
      </article>
    </div>
  </section>

  <section class="container page">
    <div class="grid-3">
      <article class="card" style="padding: 16px">
        <h3>Verified listings</h3>
        <p class="muted">Moderation before a listing goes live.</p>
      </article>
      <article class="card" style="padding: 16px">
        <h3>Fair contact unlock</h3>
        <p class="muted">1 coin (৳10) only when you need the landlord’s number.</p>
      </article>
      <article class="card" style="padding: 16px">
        <h3>Local payments</h3>
        <p class="muted">bKash, Nagad, and card placeholders ready for the live gateway.</p>
      </article>
    </div>
  </section>

  <section class="cta">
    <div class="container">
      <h2>Landlords: list your property</h2>
      <p>Reach serious tenants. Submit for approval in minutes.</p>
      <router-link class="btn btn-primary" :to="landlordCta">Get started</router-link>
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: #fff;
  border-bottom: 1px solid var(--color-border);
  padding: 48px 0;
}
.eyebrow {
  color: var(--color-primary);
  font-weight: 600;
  margin-bottom: 8px;
}
h1 {
  max-width: 18ch;
  margin-bottom: 12px;
}
.lead {
  max-width: 52ch;
  margin-bottom: 20px;
}
.loc {
  padding: 16px;
  text-decoration: none;
  color: inherit;
  display: grid;
  gap: 4px;
  font-weight: 600;
}
.cta {
  background: var(--color-primary);
  color: #fff;
  padding: 48px 0;
}
.cta h2,
.cta p {
  color: #fff;
  margin-bottom: 12px;
}
.cta .btn-primary {
  background: #fff;
  color: var(--color-primary);
}
</style>
