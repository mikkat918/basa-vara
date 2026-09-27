<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePropertyStore } from '../../stores/propertyStore'
import { useWalletStore } from '../../stores/walletStore'
import { useAuthStore } from '../../stores/authStore'
import { useUiStore } from '../../stores/uiStore'
import { formatBdt, formatDate } from '../../utils/format'
import { walletService } from '../../services/walletService'
import UnlockContactModal from '../../components/wallet/UnlockContactModal.vue'

const route = useRoute()
const router = useRouter()
const propertyStore = usePropertyStore()
const walletStore = useWalletStore()
const auth = useAuthStore()
const ui = useUiStore()
const modalOpen = ref(false)
const contact = ref(null)
const preview = ref(null)
const isUnlocked = ref(false)
const saved = ref(false)

const property = computed(() => propertyStore.current)
const landlord = computed(() => propertyStore.landlord)
const shareUrl = computed(() => `${window.location.origin}/property/${route.params.id}`)

async function load() {
  await propertyStore.loadDetails(route.params.id)
  if (auth.user) {
    await walletStore.load()
    const response = await walletService.previewUnlock(auth.user.id, route.params.id)
    preview.value = response
    isUnlocked.value = response.alreadyUnlocked || false
    if (response.alreadyUnlocked) {
      const unlocked = await walletService.getUnlockedContact(auth.user.id, route.params.id)
      contact.value = unlocked.contact
      isUnlocked.value = unlocked.unlocked
    }
  }
}

onMounted(() => {
  load()
})
watch(() => route.params.id, load)

async function openUnlockModal() {
  if (!auth.user) {
    router.push({ path: '/login', query: { redirect: route.fullPath } })
    return
  }
  if (auth.user.role !== 'tenant') {
    ui.toast('Only tenants can unlock contact details.', 'warning')
    return
  }
  const data = await walletService.previewUnlock(auth.user.id, route.params.id)
  preview.value = data
  modalOpen.value = true
}

async function unlockContact() {
  if (!auth.user) return
  try {
    const result = await walletService.unlockPropertyContact(auth.user.id, route.params.id)
    contact.value = result.contact
    isUnlocked.value = true
    modalOpen.value = false
    await walletStore.load()
    ui.toast('Contact unlocked successfully.', 'success')
  } catch (error) {
    ui.toast(error.message || 'Unable to unlock contact', 'error')
    if (error.message === 'Insufficient coins') {
      const data = await walletService.previewUnlock(auth.user.id, route.params.id)
      preview.value = data
      modalOpen.value = true
    }
  }
}

function buyCoins() {
  router.push('/dashboard/wallet')
  modalOpen.value = false
}

function share() {
  if (navigator.share) {
    navigator.share({ title: property.value?.title || 'Basa Vara', url: shareUrl.value })
  } else {
    navigator.clipboard?.writeText(shareUrl.value)
    ui.toast('Listing link copied.', 'success')
  }
}

function chatWithLandlord() {
  if (!auth.user) {
    router.push({ path: '/login', query: { redirect: route.fullPath } })
    return
  }
  router.push(auth.role === 'landlord' ? '/landlord/messages' : '/dashboard/messages')
}

async function toggleSave() {
  if (!auth.user) return router.push({ path: '/login', query: { redirect: route.fullPath } })
  if (auth.role !== 'tenant') return ui.toast('Only tenants can save properties.', 'warning')
  try { saved.value = await propertyStore.toggleSave(route.params.id); ui.toast(saved.value ? 'Property saved.' : 'Property removed from saved.', 'success') } catch (error) { ui.toast(error.message || 'Unable to update saved properties', 'error') }
}
</script>

<template>
  <section v-if="propertyStore.loading" class="container page">
    <div class="card skeleton" style="height: 420px"></div>
  </section>

  <section v-else-if="propertyStore.error" class="container page">
    <div class="card error-box">
      <h1>Property unavailable</h1>
      <p>{{ propertyStore.error }}</p>
      <button class="btn btn-primary" type="button" @click="load">Try again</button>
    </div>
  </section>

  <section v-else-if="property" class="container page property-detail">
    <nav class="crumbs" aria-label="Breadcrumb">
      <router-link to="/">Home</router-link>
      <span> / </span>
      <router-link to="/properties">Properties</router-link>
      <span> / </span>
      <span>{{ property.title }}</span>
    </nav>

    <div class="gallery">
      <img :src="property.images?.[0]" :alt="property.title" class="main-image" />
      <div class="thumbs">
        <img v-for="(image, index) in property.images || []" :key="index" :src="image" :alt="`${property.title} photo ${index + 1}`" />
      </div>
    </div>

    <div class="details-grid">
      <div class="content">
        <div class="title-row">
          <div>
            <h1>{{ property.title }}</h1>
            <p class="muted">{{ property.location?.area }}, {{ property.location?.subArea }}</p>
          </div>
          <span class="badge badge-success" v-if="property.verified">Verified</span>
        </div>

        <div class="stats">
          <div class="stat"><strong>{{ formatBdt(property.rent) }}</strong><span>Monthly rent</span></div>
          <div class="stat"><strong>{{ formatBdt(property.securityDeposit) }}</strong><span>Deposit</span></div>
          <div class="stat"><strong>{{ property.bedrooms }}</strong><span>Bedrooms</span></div>
          <div class="stat"><strong>{{ property.bathrooms }}</strong><span>Bathrooms</span></div>
        </div>

        <div class="card info-card">
          <h2>Overview</h2>
          <ul class="facts">
            <li><span>Size</span><strong>{{ property.size }} sq ft</strong></li>
            <li><span>Floor</span><strong>{{ property.floor }} / {{ property.totalFloors }}</strong></li>
            <li><span>Available</span><strong>{{ formatDate(property.availableFrom) }}</strong></li>
            <li><span>Furnishing</span><strong>{{ property.furnishing }}</strong></li>
            <li><span>Preferred tenant</span><strong>{{ property.preferredTenant }}</strong></li>
          </ul>
        </div>

        <div class="card info-card">
          <h2>Amenities</h2>
          <div class="amenities">
            <span v-for="amenity in property.amenities || []" :key="amenity" class="chip">{{ amenity }}</span>
          </div>
        </div>

        <div class="card info-card">
          <h2>Description</h2>
          <p>{{ property.description }}</p>
        </div>

        <div class="card info-card">
          <h2>Nearby places</h2>
          <ul class="nearby">
            <li v-for="item in property.nearby || []" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>

      <aside class="sidebar-panel">
        <div class="card sticky-card">
          <div class="price-line">
            <span class="muted">Rent</span>
            <strong>{{ formatBdt(property.rent) }}</strong>
          </div>
          <div class="actions">
            <button class="btn btn-secondary" type="button" @click="share">Share</button>
            <button class="btn btn-secondary" type="button" @click="toggleSave">{{ saved ? 'Saved' : 'Save' }}</button>
          </div>
          <button class="btn btn-secondary btn-block" type="button" @click="chatWithLandlord">Chat</button>
          <button class="btn btn-primary btn-block" type="button" @click="openUnlockModal">Unlock contact</button>

          <div v-if="isUnlocked && contact" class="contact-box">
            <h3>Contact details</h3>
            <p><strong>{{ contact.name }}</strong></p>
            <p>{{ contact.phone }}</p>
          </div>

          <div v-else class="contact-box locked">
            <h3>Contact locked</h3>
            <p>Spend 1 coin to reveal the landlord phone number.</p>
            <p v-if="preview" class="muted">Current balance: {{ preview.currentBalance }} Coins</p>
          </div>
        </div>

        <div class="card agent-card">
          <h3>Landlord</h3>
          <div class="agent-row">
            <div class="avatar">{{ landlord?.name?.split(' ').map((part) => part[0]).join('').slice(0, 2) || 'LH' }}</div>
            <div>
              <p>{{ landlord?.name }}</p>
              <small class="muted">Response rate: {{ landlord?.responseRate || 95 }}%</small>
              <small class="muted">Response time: {{ landlord?.responseTime || 'Within 1 hour' }}</small>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <UnlockContactModal
      :open="modalOpen"
      :preview="preview"
      @close="modalOpen = false"
      @unlock="unlockContact"
      @buy="buyCoins"
    />
  </section>
</template>

<style scoped>
.property-detail {
  display: grid;
  gap: 20px;
}
.crumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  color: var(--color-muted);
  font-size: 0.95rem;
}
.gallery {
  display: grid;
  gap: 12px;
}
.main-image {
  width: 100%;
  height: clamp(240px, 55vw, 420px);
  object-fit: cover;
  border-radius: 18px;
  border: 1px solid var(--color-border);
}
.thumbs {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}
.thumbs img {
  width: 100%;
  height: 110px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid var(--color-border);
}
.details-grid {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(280px, 360px);
  gap: 20px;
}
.content,
.sidebar-panel {
  display: grid;
  gap: 16px;
}
.title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}
.stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}
.stat {
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 16px;
  display: grid;
  gap: 4px;
}
.stat strong {
  font-size: 1.1rem;
}
.info-card {
  padding: 20px;
}
.facts {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
}
.facts li {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 8px;
}
.amenities {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip {
  display: inline-flex;
  padding: 6px 10px;
  border-radius: 999px;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-size: 0.85rem;
  font-weight: 600;
}
.sticky-card,
.agent-card {
  padding: 20px;
}
.price-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.price-line strong {
  font-size: 1.6rem;
}
.actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  margin-bottom: 12px;
}
.contact-box {
  margin-top: 16px;
  padding: 16px;
  background: var(--color-primary-soft);
  border-radius: 12px;
}
.contact-box.locked {
  background: #fff3e7;
}
.agent-row {
  display: flex;
  gap: 12px;
  align-items: center;
}
.avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: var(--color-primary-soft);
  display: grid;
  place-items: center;
  color: var(--color-primary);
  font-weight: 700;
}
.error-box {
  padding: 28px;
}
@media (max-width: 820px) {
  .details-grid,
  .stats {
    grid-template-columns: 1fr;
  }
  .thumbs {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
