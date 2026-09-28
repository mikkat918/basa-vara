<script setup>
import { formatBdt } from '../../utils/format'
import { locationLabel } from '../../utils/format'
defineProps({ property: Object, unlocked: Boolean })
</script>

```vue
<template>
  <aside v-if="property" class="property-sidebar card">
    <!-- Image -->
    <div class="image-wrap">
      <img
        :src="property.images?.[0]"
        :alt="property.title"
      />

      <div
        class="contact-status"
        :class="unlocked ? 'is-unlocked' : 'is-locked'"
      >
        <span class="status-dot"></span>
        {{ unlocked ? 'Contact unlocked' : 'Contact locked' }}
      </div>
    </div>

    <!-- Property Info -->
    <div class="property-info">
      <h3>{{ property.title }}</h3>

      <div class="rent">
        <span>{{ formatBdt(property.rent) }}</span>
        <small>/ month</small>
      </div>

      <div class="location">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 10.5c0 5-8 10-8 10s-8-5-8-10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10.5" r="2.5" />
        </svg>

        <span>{{ locationLabel(property.location) }}</span>
      </div>
    </div>

    <!-- Contact State -->
    <div class="contact-box">
      <div class="contact-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <template v-if="unlocked">
            <rect x="5" y="10" width="14" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            <path d="m9 15 2 2 4-4" />
          </template>

          <template v-else>
            <rect x="5" y="10" width="14" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </template>
        </svg>
      </div>

      <div>
        <strong>
          {{ unlocked ? 'Contact available' : 'Contact protected' }}
        </strong>

        <p>
          {{
            unlocked
              ? 'You can now access the landlord contact details.'
              : 'Unlock contact details to connect with the landlord.'
          }}
        </p>
      </div>
    </div>

    <!-- CTA -->
    <router-link
      class="view-property"
      :to="`/property/${property.id}`"
    >
      <span>View property</span>

      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12h13" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    </router-link>
  </aside>
</template>

<style scoped>
.property-sidebar {
  width: 100%;
  box-sizing: border-box;
  padding: 14px;
  overflow: hidden;
  border: 1px solid #e1e9e4;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 14px 38px rgba(31, 67, 47, 0.08);
}

/* Image */
.image-wrap {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
  border-radius: 13px;
  background: #edf2ef;
}

.image-wrap img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.contact-status {
  position: absolute;
  left: 10px;
  bottom: 10px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: calc(100% - 20px);
  padding: 7px 9px;
  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: 999px;
  backdrop-filter: blur(8px);
  font-size: 10px;
  font-weight: 800;
  white-space: nowrap;
}

.contact-status.is-unlocked {
  background: rgba(232, 250, 239, 0.94);
  color: #177c47;
}

.contact-status.is-locked {
  background: rgba(248, 249, 248, 0.94);
  color: #66736b;
}

.status-dot {
  width: 6px;
  height: 6px;
  flex: 0 0 auto;
  border-radius: 50%;
}

.is-unlocked .status-dot {
  background: #22a45c;
}

.is-locked .status-dot {
  background: #929b96;
}

/* Property info */
.property-info {
  padding: 16px 3px 0;
}

.property-info h3 {
  margin: 0;
  color: #1b2921;
  font-size: 16px;
  font-weight: 800;
  line-height: 1.4;
  letter-spacing: -0.015em;
  word-break: break-word;
}

.rent {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 8px;
}

.rent span {
  color: #16834b;
  font-size: 18px;
  font-weight: 850;
}

.rent small {
  color: #87918b;
  font-size: 11px;
  font-weight: 600;
}

.location {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  margin-top: 9px;
  color: #768179;
  font-size: 12px;
  line-height: 1.5;
}

.location svg {
  width: 15px;
  height: 15px;
  flex: 0 0 auto;
  margin-top: 1px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Contact box */
.contact-box {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 15px;
  padding: 11px;
  border: 1px solid #e4ebe6;
  border-radius: 12px;
  background: #f8faf9;
}

.contact-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex: 0 0 auto;
  border-radius: 9px;
  background: #eaf8ef;
  color: #218950;
}

.contact-icon svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.contact-box strong {
  display: block;
  color: #39473f;
  font-size: 11px;
  font-weight: 800;
}

.contact-box p {
  margin: 3px 0 0;
  color: #87918b;
  font-size: 10px;
  line-height: 1.5;
}

/* CTA */
.view-property {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 12px;
  padding: 11px 13px;
  border: 1px solid #dce9e1;
  border-radius: 11px;
  background: #f4faf6;
  color: #177f49;
  font-size: 12px;
  font-weight: 800;
  text-decoration: none;
  transition:
    background 0.18s ease,
    border-color 0.18s ease,
    transform 0.18s ease;
}

.view-property:hover {
  border-color: #c9dfd1;
  background: #eaf7ee;
  transform: translateY(-1px);
}

.view-property svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Hide on smaller layouts */
@media (max-width: 1024px) {
  .property-sidebar {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .view-property {
    transition: none;
  }
}
</style>
