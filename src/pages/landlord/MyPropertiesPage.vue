<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { propertyService } from '../../services/propertyService'
import { useAuthStore } from '../../stores/authStore'

const auth = useAuthStore(); const router = useRouter(); const items = ref([]); const loading = ref(false)

async function load() { loading.value = true; try { items.value = await propertyService.forLandlord(auth.user.id) } finally { loading.value = false } }
onMounted(load)
</script>

```vue
<template>
  <div class="page">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <span class="eyebrow">Landlord workspace</span>
        <h1>My properties</h1>
        <p class="subtitle">
          Manage your listings, approval status, and property performance.
        </p>
      </div>

      <button
        class="btn btn-primary add-btn"
        type="button"
        @click="router.push('/landlord/properties/new')"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 5v14M5 12h14"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        <span>Add property</span>
      </button>
    </div>

    <!-- Main Card -->
    <div class="card panel">
      <!-- Card Header -->
      <div class="panel-header">
        <div class="panel-title">
          <div class="title-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4 20V9l8-5 8 5v11"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
              />
              <path
                d="M8 20v-5h8v5M8 10h.01M12 10h.01M16 10h.01"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>
          </div>

          <div>
            <span class="section-eyebrow">Listings</span>
            <h2>Property portfolio</h2>
          </div>
        </div>

        <span v-if="!loading" class="count-badge">
          {{ items.length }}
        </span>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="loading-state">
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-line"></div>
        <div class="skeleton skeleton-line short"></div>
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-line"></div>
      </div>

      <!-- Empty -->
      <div
        v-else-if="!items.length"
        class="empty-state"
      >
        <div class="empty-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M4 20V9l8-5 8 5v11"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linejoin="round"
            />
            <path
              d="M8 20v-5h8v5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <h3>No properties yet</h3>

        <p>
          Create your first listing to get started.
        </p>

        <button
          class="btn btn-primary empty-btn"
          type="button"
          @click="router.push('/landlord/properties/new')"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 5v14M5 12h14"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          Add your first property
        </button>
      </div>

      <!-- Property List -->
      <ul v-else class="property-list">
        <li
          v-for="item in items"
          :key="item.id"
          class="property-row"
        >
          <!-- Property Info -->
          <div class="property-info">
            <div class="property-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 20V9l8-5 8 5v11"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linejoin="round"
                />
                <path
                  d="M8 20v-5h8v5M8 10h.01M12 10h.01M16 10h.01"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
              </svg>
            </div>

            <div class="property-content">
              <strong>{{ item.title }}</strong>
              <span>Property listing</span>
            </div>
          </div>

          <!-- Status -->
          <span class="badge badge-success">
            <span class="status-dot"></span>
            {{ item.status }}
          </span>

          <!-- Actions -->
          <div class="actions">
            <button
              class="btn btn-secondary"
              type="button"
              @click="router.push(`/landlord/properties/${item.id}/edit`)"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3Z"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linejoin="round"
                />
                <path
                  d="m13.5 7.5 3 3"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
              </svg>
              <span>Edit</span>
            </button>

            <button
              class="btn btn-secondary"
              type="button"
              @click="router.push(`/landlord/properties/${item.id}/analytics`)"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M5 19V9M12 19V5M19 19v-7"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <span>Analytics</span>
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: clamp(20px, 3vw, 40px);
  background:
    radial-gradient(
      circle at 88% 4%,
      rgba(16, 185, 129, 0.08),
      transparent 28%
    ),
    radial-gradient(
      circle at 8% 92%,
      rgba(20, 184, 166, 0.06),
      transparent 30%
    ),
    #f6f8f7;
  color: #17221d;
}

/* =========================
   Page Header
========================= */

.page-header {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto 18px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}

.eyebrow {
  display: block;
  margin-bottom: 5px;
  color: #17845f;
  font-size: 10px;
  font-weight: 850;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.page-header h1 {
  margin: 0;
  color: #17221d;
  font-size: clamp(26px, 3vw, 35px);
  line-height: 1.1;
  font-weight: 850;
  letter-spacing: -0.04em;
}

.subtitle {
  margin: 7px 0 0;
  color: #7b8881;
  font-size: 12px;
  line-height: 1.5;
}

/* =========================
   Buttons
========================= */

.btn {
  min-height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 9px 13px;
  border-radius: 10px;
  font: inherit;
  font-size: 10px;
  font-weight: 800;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.btn svg {
  width: 15px;
  height: 15px;
  flex: 0 0 15px;
}

.btn-primary {
  border: 1px solid #147653;
  background: #17845f;
  color: #fff;
  box-shadow: 0 7px 16px rgba(23, 132, 95, 0.16);
}

.btn-primary:hover {
  transform: translateY(-1px);
  background: #147653;
  box-shadow: 0 9px 20px rgba(23, 132, 95, 0.2);
}

.btn-secondary {
  min-height: 34px;
  padding: 7px 10px;
  border: 1px solid #dce7e2;
  background: #fff;
  color: #4e6259;
}

.btn-secondary:hover {
  transform: translateY(-1px);
  border-color: #bcd7ca;
  background: #f8fcfa;
  color: #167653;
}

/* =========================
   Main Card
========================= */

.card {
  background: rgba(255, 255, 255, 0.97);
  border: 1px solid #e4ebe7;
  border-radius: 20px;
  box-shadow:
    0 16px 45px rgba(28, 53, 43, 0.055),
    0 3px 10px rgba(28, 53, 43, 0.035);
}

.panel {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: clamp(20px, 3vw, 26px);
  box-sizing: border-box;
}

/* =========================
   Panel Header
========================= */

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid #e9efec;
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 11px;
}

.title-icon {
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: #edf8f3;
  border: 1px solid #dceee6;
  color: #16805c;
}

.title-icon svg {
  width: 21px;
  height: 21px;
}

.section-eyebrow {
  display: block;
  color: #17845f;
  font-size: 9px;
  font-weight: 850;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.panel-header h2 {
  margin: 4px 0 0;
  color: #26352d;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.025em;
}

.count-badge {
  min-width: 30px;
  height: 26px;
  padding: 0 9px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: #edf8f3;
  border: 1px solid #dceee6;
  color: #177653;
  font-size: 10px;
  font-weight: 850;
}

/* =========================
   Property List
========================= */

.property-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 9px;
}

.property-row {
  min-width: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 16px;
  padding: 13px 14px;
  border: 1px solid #e7eeea;
  border-radius: 14px;
  background: #fff;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.property-row:hover {
  transform: translateY(-1px);
  border-color: #d6e7df;
  box-shadow: 0 7px 20px rgba(28, 53, 43, 0.045);
}

/* =========================
   Property Info
========================= */

.property-info {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.property-icon {
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: #f0f8f4;
  border: 1px solid #dfede6;
  color: #16805c;
}

.property-icon svg {
  width: 20px;
  height: 20px;
}

.property-content {
  min-width: 0;
}

.property-content strong {
  display: block;
  overflow: hidden;
  color: #33423a;
  font-size: 12px;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.property-content span {
  display: block;
  margin-top: 4px;
  color: #929c97;
  font-size: 9px;
}

/* =========================
   Status
========================= */

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 25px;
  padding: 0 9px;
  border-radius: 999px;
  font-size: 9px;
  font-weight: 800;
  text-transform: capitalize;
  white-space: nowrap;
}

.badge-success {
  background: #eaf7f0;
  border: 1px solid #d5ecdf;
  color: #177653;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #39a879;
}

/* =========================
   Actions
========================= */

.actions {
  display: flex;
  align-items: center;
  gap: 7px;
}

/* =========================
   Empty State
========================= */

.empty-state {
  min-height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
  text-align: center;
}

.empty-icon {
  width: 64px;
  height: 64px;
  display: grid;
  place-items: center;
  margin-bottom: 14px;
  border-radius: 18px;
  background: #edf8f3;
  border: 1px solid #dceee6;
  color: #16805c;
}

.empty-icon svg {
  width: 30px;
  height: 30px;
}

.empty-state h3 {
  margin: 0;
  color: #33423a;
  font-size: 16px;
  font-weight: 800;
}

.empty-state p {
  margin: 6px 0 15px;
  color: #8a958f;
  font-size: 10px;
}

.empty-btn {
  min-height: 36px;
}

/* =========================
   Loading
========================= */

.loading-state {
  display: grid;
  gap: 10px;
  padding: 5px 2px;
}

.skeleton {
  position: relative;
  overflow: hidden;
  border-radius: 9px;
  background: #edf1ef;
}

.skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.65),
    transparent
  );
  animation: shimmer 1.4s infinite;
}

.skeleton-title {
  width: 35%;
  height: 42px;
  margin-top: 5px;
}

.skeleton-line {
  width: 100%;
  height: 58px;
}

.skeleton-line.short {
  width: 82%;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

/* =========================
   Responsive
========================= */

@media (max-width: 800px) {
  .property-row {
    grid-template-columns: minmax(0, 1fr) auto;
  }

  .actions {
    grid-column: 1 / -1;
    padding-top: 4px;
    border-top: 1px solid #edf1ef;
  }
}

@media (max-width: 600px) {
  .page {
    padding: 20px 16px;
  }

  .page-header {
    align-items: stretch;
    flex-direction: column;
  }

  .add-btn {
    width: 100%;
  }

  .panel {
    padding: 17px;
    border-radius: 17px;
  }

  .property-row {
    grid-template-columns: 1fr auto;
    gap: 11px;
    padding: 13px;
  }

  .property-info {
    min-width: 0;
  }

  .property-icon {
    width: 38px;
    height: 38px;
    flex-basis: 38px;
  }

  .property-content strong {
    font-size: 11px;
  }

  .actions {
    width: 100%;
    grid-column: 1 / -1;
  }

  .actions .btn {
    flex: 1;
  }
}

@media (max-width: 430px) {
  .page {
    padding: 17px 12px;
  }

  .panel {
    padding: 14px;
  }

  .panel-header {
    align-items: flex-start;
  }

  .title-icon {
    width: 38px;
    height: 38px;
    flex-basis: 38px;
  }

  .panel-header h2 {
    font-size: 16px;
  }

  .property-row {
    grid-template-columns: 1fr;
  }

  .badge {
    justify-self: start;
  }

  .actions {
    gap: 6px;
  }

  .actions .btn {
    min-width: 0;
    padding: 7px 8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .btn,
  .property-row {
    transition: none;
  }

  .skeleton::after {
    animation: none;
  }
}
</style>