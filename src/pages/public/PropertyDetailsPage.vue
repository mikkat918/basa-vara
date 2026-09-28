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
  <!-- Loading -->
  <section v-if="propertyStore.loading" class="property-page">
    <div class="container">
      <div class="loading-shell">
        <div class="skeleton skeleton-image"></div>

        <div class="skeleton-details">
          <div class="skeleton skeleton-title"></div>
          <div class="skeleton skeleton-line"></div>

          <div class="skeleton-grid">
            <div class="skeleton skeleton-box"></div>
            <div class="skeleton skeleton-box"></div>
            <div class="skeleton skeleton-box"></div>
            <div class="skeleton skeleton-box"></div>
          </div>

          <div class="skeleton skeleton-content"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Error -->
  <section v-else-if="propertyStore.error" class="property-page">
    <div class="container">
      <div class="error-state">
        <div class="error-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M12 8V12"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="12" cy="16" r="1" fill="currentColor" />
            <path
              d="M10.3 4.8L3.7 16.2C3 17.4 3.9 19 5.3 19H18.7C20.1 19 21 17.4 20.3 16.2L13.7 4.8C13 3.6 11 3.6 10.3 4.8Z"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <span class="error-label">PROPERTY UNAVAILABLE</span>

        <h1>Property unavailable</h1>

        <p>{{ propertyStore.error }}</p>

        <button class="btn btn-primary retry-btn" type="button" @click="load">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M20 11A8.1 8.1 0 0 0 5.4 6.4L4 8"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 4V8H8"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 13A8.1 8.1 0 0 0 18.6 17.6L20 16"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M20 20V16H16"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Try again
        </button>
      </div>
    </div>
  </section>

  <!-- Property -->
  <section v-else-if="property" class="property-page">
    <div class="container property-detail">

      <!-- Breadcrumb -->
      <nav class="crumbs" aria-label="Breadcrumb">
        <router-link to="/">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M3 10.5L12 3L21 10.5"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.5 9V20H18.5V9"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linejoin="round"
            />
          </svg>
          Home
        </router-link>

        <span class="crumb-separator">/</span>

        <router-link to="/properties">
          Properties
        </router-link>

        <span class="crumb-separator">/</span>

        <span class="current-crumb">{{ property.title }}</span>
      </nav>

      <!-- Gallery -->
      <div class="gallery-section">
        <div class="gallery-main">
          <img
            v-if="property.images?.[0]"
            :src="property.images[0]"
            :alt="property.title"
            class="main-image"
          />

          <div v-else class="image-placeholder">
            <svg viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="4"
                width="18"
                height="16"
                rx="2"
                stroke="currentColor"
                stroke-width="1.7"
              />
              <circle
                cx="8.5"
                cy="9"
                r="1.5"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <path
                d="M3 17L8 12L11 15L14 12L21 18"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>No property image</span>
          </div>

          <div v-if="property.verified" class="verified-overlay">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3L19 6.5V11.5C19 16.2 16.05 19.8 12 21C7.95 19.8 5 16.2 5 11.5V6.5L12 3Z"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linejoin="round"
              />
              <path
                d="M9.2 12L11.2 14L15 10"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Verified listing
          </div>
        </div>

        <div
          v-if="property.images?.length > 1"
          class="thumbs"
        >
          <div
            v-for="(image, index) in property.images || []"
            :key="index"
            class="thumb"
          >
            <img
              :src="image"
              :alt="`${property.title} photo ${index + 1}`"
            />

            <span v-if="index === 0" class="thumb-label">
              Main
            </span>
          </div>
        </div>
      </div>

      <!-- Main details -->
      <div class="details-grid">

        <!-- Left -->
        <main class="content">

          <!-- Header -->
          <div class="property-header">
            <div class="title-area">
              <div class="location-line">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 10.5C20 15.5 12 21 12 21S4 15.5 4 10.5C4 6.36 7.58 3 12 3S20 6.36 20 10.5Z"
                    stroke="currentColor"
                    stroke-width="1.8"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="2.5"
                    stroke="currentColor"
                    stroke-width="1.8"
                  />
                </svg>

                <span>
                  {{ property.location?.area }}
                  <template v-if="property.location?.subArea">
                    , {{ property.location.subArea }}
                  </template>
                </span>
              </div>

              <h1>{{ property.title }}</h1>

              <p class="property-location">
                {{ property.location?.area }}
                <span v-if="property.location?.subArea">
                  • {{ property.location.subArea }}
                </span>
              </p>
            </div>

            <span
              v-if="property.verified"
              class="verified-badge"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 12L11 14L15 10"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  stroke-width="1.8"
                />
              </svg>
              Verified
            </span>
          </div>

          <!-- Quick Stats -->
          <div class="stats">
            <div class="stat">
              <div class="stat-icon rent-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 10.5L12 4L20 10.5"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6 9.5V20H18V9.5"
                    stroke="currentColor"
                    stroke-width="1.8"
                  />
                </svg>
              </div>
              <div>
                <strong>{{ formatBdt(property.rent) }}</strong>
                <span>Monthly rent</span>
              </div>
            </div>

            <div class="stat">
              <div class="stat-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 11H19V19H5V11Z"
                    stroke="currentColor"
                    stroke-width="1.8"
                  />
                  <path
                    d="M7 11V7C7 5.9 7.9 5 9 5H15C16.1 5 17 5.9 17 7V11"
                    stroke="currentColor"
                    stroke-width="1.8"
                  />
                  <path
                    d="M5 15H19"
                    stroke="currentColor"
                    stroke-width="1.8"
                  />
                </svg>
              </div>
              <div>
                <strong>{{ property.bedrooms }}</strong>
                <span>Bedrooms</span>
              </div>
            </div>

            <div class="stat">
              <div class="stat-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 11H20"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  />
                  <path
                    d="M6 11V7C6 5.9 6.9 5 8 5H16C17.1 5 18 5.9 18 7V11"
                    stroke="currentColor"
                    stroke-width="1.8"
                  />
                  <path
                    d="M5 15V19M19 15V19"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
              <div>
                <strong>{{ property.bathrooms }}</strong>
                <span>Bathrooms</span>
              </div>
            </div>

            <div class="stat">
              <div class="stat-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 19H20"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  />
                  <path
                    d="M6 19V6H18V19"
                    stroke="currentColor"
                    stroke-width="1.8"
                  />
                  <path
                    d="M9 9H15M9 12H15"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
              <div>
                <strong>{{ property.size }}</strong>
                <span>Sq ft</span>
              </div>
            </div>
          </div>

          <!-- Overview -->
          <div class="card info-card">
            <div class="section-heading">
              <div class="heading-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect
                    x="4"
                    y="4"
                    width="16"
                    height="16"
                    rx="2"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />
                  <path
                    d="M8 9H16M8 12H16M8 15H13"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                  />
                </svg>
              </div>

              <div>
                <h2>Property overview</h2>
                <p>Important details about this property</p>
              </div>
            </div>

            <ul class="facts">
              <li>
                <span>Property size</span>
                <strong>{{ property.size }} sq ft</strong>
              </li>

              <li>
                <span>Floor</span>
                <strong>
                  {{ property.floor }} / {{ property.totalFloors }}
                </strong>
              </li>

              <li>
                <span>Monthly rent</span>
                <strong>{{ formatBdt(property.rent) }}</strong>
              </li>

              <li>
                <span>Security deposit</span>
                <strong>{{ formatBdt(property.securityDeposit) }}</strong>
              </li>

              <li>
                <span>Available from</span>
                <strong>{{ formatDate(property.availableFrom) }}</strong>
              </li>

              <li>
                <span>Furnishing</span>
                <strong>{{ property.furnishing }}</strong>
              </li>

              <li>
                <span>Preferred tenant</span>
                <strong>{{ property.preferredTenant }}</strong>
              </li>
            </ul>
          </div>

          <!-- Amenities -->
          <div class="card info-card">
            <div class="section-heading">
              <div class="heading-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12L12 5L19 12"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7 11V19H17V11"
                    stroke="currentColor"
                    stroke-width="1.8"
                  />
                  <path
                    d="M10 19V14H14V19"
                    stroke="currentColor"
                    stroke-width="1.8"
                  />
                </svg>
              </div>

              <div>
                <h2>Amenities</h2>
                <p>Available features and facilities</p>
              </div>
            </div>

            <div
              v-if="property.amenities?.length"
              class="amenities"
            >
              <span
                v-for="amenity in property.amenities || []"
                :key="amenity"
                class="chip"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12L10 17L19 7"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                {{ amenity }}
              </span>
            </div>

            <div v-else class="empty-info">
              No amenities have been specified.
            </div>
          </div>

          <!-- Description -->
          <div class="card info-card">
            <div class="section-heading">
              <div class="heading-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 5H19V19H5V5Z"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />
                  <path
                    d="M8 9H16M8 12H16M8 15H13"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                  />
                </svg>
              </div>

              <div>
                <h2>Description</h2>
                <p>More information from the landlord</p>
              </div>
            </div>

            <p class="description">
              {{ property.description }}
            </p>
          </div>

          <!-- Nearby -->
          <div class="card info-card">
            <div class="section-heading">
              <div class="heading-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21C12 21 19 15.8 19 10C19 6.13 15.87 3 12 3C8.13 3 5 6.13 5 10C5 15.8 12 21 12 21Z"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="2.5"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />
                </svg>
              </div>

              <div>
                <h2>Nearby places</h2>
                <p>Places and facilities around the property</p>
              </div>
            </div>

            <ul
              v-if="property.nearby?.length"
              class="nearby"
            >
              <li
                v-for="item in property.nearby || []"
                :key="item"
              >
                <span class="nearby-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12L10 17L19 7"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                {{ item }}
              </li>
            </ul>

            <div v-else class="empty-info">
              No nearby places have been specified.
            </div>
          </div>
        </main>

        <!-- Right Sidebar -->
        <aside class="sidebar-panel">

          <!-- Contact Card -->
          <div class="card sticky-card">
            <div class="sidebar-label">
              <span>RENTAL INFORMATION</span>
            </div>

            <div class="price-line">
              <div>
                <span>Monthly rent</span>
                <strong>{{ formatBdt(property.rent) }}</strong>
              </div>
            </div>

            <div class="action-grid">
              <button
                class="action-btn"
                type="button"
                @click="share"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="18"
                    cy="5"
                    r="2.5"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />
                  <circle
                    cx="6"
                    cy="12"
                    r="2.5"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />
                  <circle
                    cx="18"
                    cy="19"
                    r="2.5"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />
                  <path
                    d="M8.2 10.8L15.8 6.2M8.2 13.2L15.8 17.8"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />
                </svg>
                Share
              </button>

              <button
                class="action-btn"
                type="button"
                @click="toggleSave"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 4.5C6 3.67 6.67 3 7.5 3H16.5C17.33 3 18 3.67 18 4.5V21L12 17.2L6 21V4.5Z"
                    :fill="saved ? 'currentColor' : 'none'"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linejoin="round"
                  />
                </svg>
                {{ saved ? 'Saved' : 'Save' }}
              </button>
            </div>

            <button
              class="btn btn-secondary btn-block chat-btn"
              type="button"
              @click="chatWithLandlord"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 5H19V16H13L9 20V16H5V5Z"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linejoin="round"
                />
                <path
                  d="M8 9H16M8 12H13"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
              </svg>
              Chat with landlord
            </button>

            <button
              class="btn btn-primary btn-block unlock-btn"
              type="button"
              @click="openUnlockModal"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <rect
                  x="5"
                  y="10"
                  width="14"
                  height="10"
                  rx="2"
                  stroke="currentColor"
                  stroke-width="1.8"
                />
                <path
                  d="M8 10V7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7V10"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
                <circle
                  cx="12"
                  cy="15"
                  r="1"
                  fill="currentColor"
                />
              </svg>
              Unlock contact
              <span class="coin-badge">1 Coin</span>
            </button>

            <!-- Unlocked -->
            <div
              v-if="isUnlocked && contact"
              class="contact-box unlocked"
            >
              <div class="contact-header">
                <div class="contact-success-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12L10 17L19 7"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>

                <div>
                  <strong>Contact unlocked</strong>
                  <span>Landlord contact details</span>
                </div>
              </div>

              <div class="contact-details">
                <p>
                  <span>Name</span>
                  <strong>{{ contact.name }}</strong>
                </p>

                <p>
                  <span>Phone</span>
                  <strong>{{ contact.phone }}</strong>
                </p>
              </div>
            </div>

            <!-- Locked -->
            <div
              v-else
              class="contact-box locked"
            >
              <div class="locked-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect
                    x="5"
                    y="10"
                    width="14"
                    height="10"
                    rx="2"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />
                  <path
                    d="M8 10V7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7V10"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                  />
                </svg>
              </div>

              <div>
                <h3>Contact is locked</h3>
                <p>
                  Spend 1 Coin to reveal the landlord's phone number.
                </p>

                <p
                  v-if="preview"
                  class="balance"
                >
                  Current balance:
                  <strong>{{ preview.currentBalance }} Coins</strong>
                </p>
              </div>
            </div>

            <div class="security-note">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3L19 6.5V11.5C19 16.2 16.05 19.8 12 21C7.95 19.8 5 16.2 5 11.5V6.5L12 3Z"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 12L11 14L15 10"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              Contact information is protected and only shown after unlock.
            </div>
          </div>

          <!-- Landlord Card -->
          <div class="card agent-card">
            <div class="agent-heading">
              <div>
                <span class="sidebar-label">PROPERTY OWNER</span>
                <h3>Landlord</h3>
              </div>

              <div class="owner-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="8"
                    r="3"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />
                  <path
                    d="M5 20C5.6 16.6 8.1 14.5 12 14.5C15.9 14.5 18.4 16.6 19 20"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
            </div>

            <div class="agent-row">
              <div class="avatar">
                {{
                  landlord?.name
                    ?.split(' ')
                    .map((part) => part[0])
                    .join('')
                    .slice(0, 2) || 'LH'
                }}
              </div>

              <div class="agent-info">
                <p>{{ landlord?.name }}</p>

                <small>
                  <span class="online-dot"></span>
                  Available to respond
                </small>
              </div>
            </div>

            <div class="response-info">
              <div>
                <span>Response rate</span>
                <strong>
                  {{ landlord?.responseRate || 95 }}%
                </strong>
              </div>

              <div>
                <span>Response time</span>
                <strong>
                  {{ landlord?.responseTime || 'Within 1 hour' }}
                </strong>
              </div>
            </div>
          </div>

          <!-- Safety Card -->
          <div class="safety-card">
            <div class="safety-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3L19 6.5V11.5C19 16.2 16.05 19.8 12 21C7.95 19.8 5 16.2 5 11.5V6.5L12 3Z"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 12L11 14L15 10"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <div>
              <strong>Stay safe</strong>
              <p>
                Never share sensitive information or send money
                before confirming the property details.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>

    <!-- Unlock Modal -->
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
/* =====================================================
   PAGE
===================================================== */

.property-page {
  min-height: 100vh;
  padding: 28px 0 70px;
  background:
    radial-gradient(
      circle at 5% 0%,
      rgba(5, 150, 105, 0.06),
      transparent 25%
    ),
    #f7faf9;
  color: #17211d;
}

.container {
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
}

/* =====================================================
   BREADCRUMBS
===================================================== */

.crumbs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
  color: #71817a;
  font-size: 13px;
}

.crumbs a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #047857;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
}

.crumbs a:hover {
  color: #064e3b;
}

.crumbs a svg {
  width: 16px;
  height: 16px;
}

.crumb-separator {
  color: #b5c1bc;
}

.current-crumb {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* =====================================================
   GALLERY
===================================================== */

.gallery-section {
  display: grid;
  gap: 10px;
  margin-bottom: 22px;
}

.gallery-main {
  position: relative;
  min-height: 400px;
  overflow: hidden;
  border-radius: 24px;
  background: #e8efec;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
}

.main-image {
  display: block;
  width: 100%;
  height: min(52vw, 490px);
  min-height: 330px;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.gallery-main:hover .main-image {
  transform: scale(1.015);
}

.image-placeholder {
  min-height: 400px;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 10px;
  color: #8a9a93;
}

.image-placeholder svg {
  width: 54px;
  height: 54px;
}

.verified-overlay {
  position: absolute;
  left: 18px;
  bottom: 18px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 13px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 999px;
  color: #fff;
  background: rgba(4, 120, 87, 0.92);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.15);
  font-size: 12px;
  font-weight: 700;
}

.verified-overlay svg {
  width: 16px;
  height: 16px;
}

.thumbs {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 9px;
}

.thumb {
  position: relative;
  height: 82px;
  overflow: hidden;
  border: 2px solid transparent;
  border-radius: 13px;
  background: #e9efed;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;
}

.thumb:first-child {
  border-color: #059669;
}

.thumb:hover {
  transform: translateY(-2px);
  border-color: #059669;
}

.thumb img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.thumb-label {
  position: absolute;
  left: 6px;
  bottom: 6px;
  padding: 3px 7px;
  border-radius: 6px;
  color: #fff;
  background: rgba(0, 0, 0, 0.55);
  font-size: 9px;
  font-weight: 700;
}

/* =====================================================
   DETAILS GRID
===================================================== */

.details-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 350px;
  align-items: start;
  gap: 24px;
}

.content,
.sidebar-panel {
  display: grid;
  gap: 18px;
}

/* =====================================================
   PROPERTY HEADER
===================================================== */

.property-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 18px;
  padding: 2px 2px 4px;
}

.title-area {
  min-width: 0;
}

.location-line {
  display: none;
  align-items: center;
  gap: 6px;
  color: #047857;
  font-size: 12px;
  font-weight: 700;
}

.location-line svg {
  width: 15px;
  height: 15px;
}

.property-header h1 {
  margin: 0;
  color: #17211d;
  font-size: clamp(27px, 3vw, 38px);
  line-height: 1.15;
  letter-spacing: -0.035em;
}

.property-location {
  margin: 8px 0 0;
  color: #71817a;
  font-size: 14px;
}

.verified-badge {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 11px;
  border: 1px solid #bce8d7;
  border-radius: 999px;
  color: #047857;
  background: #ecfdf5;
  font-size: 11px;
  font-weight: 800;
}

.verified-badge svg {
  width: 15px;
  height: 15px;
}

/* =====================================================
   STATS
===================================================== */

.stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 11px;
  min-width: 0;
  padding: 15px;
  border: 1px solid #e1eae6;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 6px 20px rgba(15, 23, 42, 0.025);
  transition:
    transform 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease;
}

.stat:hover {
  transform: translateY(-2px);
  border-color: #cce7dc;
  box-shadow: 0 12px 25px rgba(5, 150, 105, 0.06);
}

.stat-icon {
  width: 38px;
  height: 38px;
  flex: 0 0 38px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  color: #047857;
  background: #ecfdf5;
}

.stat-icon svg {
  width: 20px;
  height: 20px;
}

.stat strong,
.stat span {
  display: block;
}

.stat strong {
  overflow: hidden;
  color: #1c2924;
  font-size: 14px;
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.stat span {
  margin-top: 3px;
  color: #84918b;
  font-size: 11px;
}

/* =====================================================
   CARDS
===================================================== */

.card {
  border: 1px solid #e1eae6;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 8px 28px rgba(15, 23, 42, 0.035);
}

.info-card {
  padding: 24px;
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 21px;
}

.heading-icon {
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  color: #047857;
  background: #ecfdf5;
}

.heading-icon svg {
  width: 22px;
  height: 22px;
}

.section-heading h2 {
  margin: 0;
  color: #1d2924;
  font-size: 18px;
  letter-spacing: -0.015em;
}

.section-heading p {
  margin: 3px 0 0;
  color: #8a9691;
  font-size: 12px;
}

/* =====================================================
   FACTS
===================================================== */

.facts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 0;
  padding: 0;
  list-style: none;
  gap: 0 28px;
}

.facts li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  min-height: 47px;
  border-bottom: 1px solid #edf1ef;
}

.facts li:nth-last-child(-n + 2) {
  border-bottom: none;
}

.facts span {
  color: #78857f;
  font-size: 13px;
}

.facts strong {
  color: #27342f;
  font-size: 13px;
  text-align: right;
}

/* =====================================================
   AMENITIES
===================================================== */

.amenities {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 11px;
  border: 1px solid #d9eee6;
  border-radius: 999px;
  color: #047857;
  background: #f1fcf7;
  font-size: 12px;
  font-weight: 700;
}

.chip svg {
  width: 14px;
  height: 14px;
}

.empty-info {
  padding: 15px;
  border-radius: 12px;
  color: #87938e;
  background: #f7faf9;
  font-size: 13px;
}

/* =====================================================
   DESCRIPTION
===================================================== */

.description {
  margin: 0;
  color: #5f6f68;
  font-size: 14px;
  line-height: 1.9;
  white-space: pre-line;
}

/* =====================================================
   NEARBY
===================================================== */

.nearby {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.nearby li {
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
  padding: 11px 12px;
  border: 1px solid #e8efec;
  border-radius: 11px;
  color: #53645d;
  background: #fbfdfc;
  font-size: 13px;
}

.nearby-icon {
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
  display: grid;
  place-items: center;
  border-radius: 7px;
  color: #059669;
  background: #ecfdf5;
}

.nearby-icon svg {
  width: 13px;
  height: 13px;
}

/* =====================================================
   SIDEBAR
===================================================== */

.sidebar-panel {
  position: relative;
}

.sticky-card {
  position: sticky;
  top: 20px;
  padding: 22px;
}

.sidebar-label {
  display: block;
  margin-bottom: 8px;
  color: #8a9691;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.13em;
}

.price-line {
  padding-bottom: 18px;
  border-bottom: 1px solid #edf1ef;
}

.price-line span,
.price-line strong {
  display: block;
}

.price-line span {
  margin-bottom: 4px;
  color: #7b8882;
  font-size: 12px;
}

.price-line strong {
  color: #064e3b;
  font-size: 28px;
  letter-spacing: -0.03em;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 9px;
  margin: 17px 0 10px;
}

.action-btn {
  min-height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border: 1px solid #dce7e2;
  border-radius: 11px;
  color: #45564f;
  background: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 12px;
  font-weight: 700;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.action-btn:hover {
  border-color: #b9dccc;
  background: #f5fbf8;
  transform: translateY(-1px);
}

.action-btn svg {
  width: 17px;
  height: 17px;
  color: #047857;
}

.btn-block {
  width: 100%;
}

.chat-btn,
.unlock-btn {
  min-height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.chat-btn svg,
.unlock-btn svg {
  width: 18px;
  height: 18px;
}

.unlock-btn {
  margin-top: 9px;
  box-shadow: 0 8px 20px rgba(5, 150, 105, 0.16);
}

.coin-badge {
  padding: 3px 7px;
  border-radius: 999px;
  color: #065f46;
  background: rgba(255, 255, 255, 0.7);
  font-size: 9px;
  font-weight: 800;
}

/* =====================================================
   CONTACT
===================================================== */

.contact-box {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  padding: 15px;
  border-radius: 14px;
}

.contact-box.unlocked {
  border: 1px solid #bde8d6;
  background: #f0fdf8;
}

.contact-box.locked {
  border: 1px solid #f4dfc9;
  background: #fff9f3;
}

.contact-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 13px;
}

.contact-success-icon {
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  color: #047857;
  background: #d9f8e9;
}

.contact-success-icon svg {
  width: 18px;
  height: 18px;
}

.contact-header strong,
.contact-header span {
  display: block;
}

.contact-header strong {
  color: #14532d;
  font-size: 12px;
}

.contact-header span {
  margin-top: 2px;
  color: #789087;
  font-size: 10px;
}

.contact-details {
  display: grid;
  gap: 8px;
}

.contact-details p {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin: 0;
  padding-top: 8px;
  border-top: 1px solid rgba(5, 150, 105, 0.1);
}

.contact-details span {
  color: #788b82;
  font-size: 11px;
}

.contact-details strong {
  color: #1f3029;
  font-size: 12px;
  text-align: right;
}

.locked-icon {
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  color: #b45309;
  background: #ffedd5;
}

.locked-icon svg {
  width: 19px;
  height: 19px;
}

.contact-box.locked h3 {
  margin: 0 0 5px;
  color: #7c4514;
  font-size: 13px;
}

.contact-box.locked p {
  margin: 0;
  color: #92704e;
  font-size: 11px;
  line-height: 1.6;
}

.balance {
  margin-top: 8px !important;
}

.balance strong {
  color: #7c4514;
}

.security-note {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  margin-top: 14px;
  color: #7b8983;
  font-size: 10px;
  line-height: 1.55;
}

.security-note svg {
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
  color: #059669;
}

/* =====================================================
   LANDLORD
===================================================== */

.agent-card {
  padding: 21px;
}

.agent-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 17px;
}

.agent-heading h3 {
  margin: 0;
  color: #26352f;
  font-size: 18px;
}

.owner-icon {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  color: #047857;
  background: #ecfdf5;
}

.owner-icon svg {
  width: 21px;
  height: 21px;
}

.agent-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 50px;
  height: 50px;
  flex: 0 0 50px;
  display: grid;
  place-items: center;
  border: 3px solid #ecfdf5;
  border-radius: 50%;
  color: #047857;
  background: #dff8ed;
  font-size: 14px;
  font-weight: 800;
}

.agent-info p {
  margin: 0 0 4px;
  color: #24322c;
  font-size: 14px;
  font-weight: 700;
}

.agent-info small {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #83918b;
  font-size: 10px;
}

.online-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
}

.response-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-top: 18px;
  padding-top: 15px;
  border-top: 1px solid #edf1ef;
}

.response-info > div {
  min-width: 0;
}

.response-info span,
.response-info strong {
  display: block;
}

.response-info span {
  margin-bottom: 4px;
  color: #8a9691;
  font-size: 9px;
}

.response-info strong {
  color: #35453e;
  font-size: 11px;
}

/* =====================================================
   SAFETY
===================================================== */

.safety-card {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  padding: 15px;
  border: 1px solid #dcebe5;
  border-radius: 15px;
  background: #f3faf7;
}

.safety-icon {
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  color: #047857;
  background: #dff8ed;
}

.safety-icon svg {
  width: 18px;
  height: 18px;
}

.safety-card strong {
  display: block;
  margin-bottom: 3px;
  color: #14532d;
  font-size: 12px;
}

.safety-card p {
  margin: 0;
  color: #70827a;
  font-size: 10px;
  line-height: 1.55;
}

/* =====================================================
   ERROR STATE
===================================================== */

.error-state {
  min-height: 55vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 20px;
  text-align: center;
}

.error-icon {
  width: 72px;
  height: 72px;
  display: grid;
  place-items: center;
  margin-bottom: 18px;
  border-radius: 22px;
  color: #b45309;
  background: #fff4e8;
}

.error-icon svg {
  width: 36px;
  height: 36px;
}

.error-label {
  margin-bottom: 7px;
  color: #b45309;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.14em;
}

.error-state h1 {
  margin: 0;
  color: #25332d;
  font-size: 30px;
}

.error-state p {
  max-width: 500px;
  margin: 10px 0 20px;
  color: #78857f;
  line-height: 1.7;
}

.retry-btn {
  min-width: 130px;
}

/* =====================================================
   LOADING
===================================================== */

.loading-shell {
  display: grid;
  gap: 22px;
}

.skeleton {
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  background: #e8eeeb;
}

.skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.55),
    transparent
  );
  animation: shimmer 1.4s infinite;
}

.skeleton-image {
  height: 420px;
  border-radius: 24px;
}

.skeleton-details {
  display: grid;
  gap: 14px;
}

.skeleton-title {
  width: 50%;
  height: 38px;
}

.skeleton-line {
  width: 30%;
  height: 16px;
}

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.skeleton-box {
  height: 75px;
}

.skeleton-content {
  height: 220px;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 1050px) {
  .details-grid {
    grid-template-columns: minmax(0, 1fr) 315px;
  }

  .stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .thumbs {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 850px) {
  .property-page {
    padding-top: 20px;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }

  .sidebar-panel {
    grid-row: auto;
  }

  .sticky-card {
    position: static;
  }

  .safety-card {
    display: none;
  }

  .thumbs {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 650px) {
  .container {
    width: min(100% - 24px, 1180px);
  }

  .property-page {
    padding-bottom: 40px;
  }

  .gallery-main {
    min-height: 270px;
    border-radius: 18px;
  }

  .main-image {
    height: 68vw;
    min-height: 250px;
  }

  .thumbs {
    grid-template-columns: repeat(4, 1fr);
  }

  .thumb {
    height: 65px;
    border-radius: 10px;
  }

  .property-header {
    display: block;
  }

  .verified-badge {
    margin-top: 12px;
  }

  .property-header h1 {
    font-size: 27px;
  }

  .stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat {
    padding: 13px;
  }

  .stat-icon {
    width: 34px;
    height: 34px;
    flex-basis: 34px;
  }

  .info-card {
    padding: 19px;
    border-radius: 17px;
  }

  .facts {
    grid-template-columns: 1fr;
  }

  .facts li:nth-last-child(-n + 2) {
    border-bottom: 1px solid #edf1ef;
  }

  .facts li:last-child {
    border-bottom: none;
  }

  .nearby {
    grid-template-columns: 1fr;
  }

  .sticky-card {
    padding: 19px;
  }
}

@media (max-width: 430px) {
  .crumbs {
    font-size: 11px;
  }

  .current-crumb {
    max-width: 150px;
  }

  .gallery-main {
    min-height: 230px;
  }

  .main-image {
    height: 62vw;
    min-height: 220px;
  }

  .thumbs {
    grid-template-columns: repeat(3, 1fr);
  }

  .thumb {
    height: 62px;
  }

  .property-header h1 {
    font-size: 24px;
  }

  .property-location {
    font-size: 12px;
  }

  .stats {
    gap: 8px;
  }

  .stat {
    gap: 8px;
    padding: 11px;
  }

  .stat-icon {
    width: 31px;
    height: 31px;
    flex-basis: 31px;
  }

  .stat-icon svg {
    width: 17px;
    height: 17px;
  }

  .stat strong {
    font-size: 12px;
  }

  .stat span {
    font-size: 9px;
  }

  .section-heading h2 {
    font-size: 16px;
  }

  .section-heading p {
    font-size: 10px;
  }

  .heading-icon {
    width: 37px;
    height: 37px;
    flex-basis: 37px;
  }

  .price-line strong {
    font-size: 25px;
  }

  .action-grid {
    gap: 7px;
  }
}

@media (max-width: 350px) {
  .stats {
    grid-template-columns: 1fr;
  }

  .stat {
    justify-content: flex-start;
  }

  .thumbs {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* =====================================================
   REDUCED MOTION
===================================================== */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
