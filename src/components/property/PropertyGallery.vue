
<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },

  title: {
    type: String,
    default: 'Property',
  },
})

const active = ref(0)
const full = ref(false)

const currentImage = computed(() => {
  return props.images[active.value] || ''
})

const totalImages = computed(() => props.images.length)

function selectImage(index) {
  active.value = index
}

function previous() {
  if (!totalImages.value) return

  active.value =
    active.value === 0
      ? totalImages.value - 1
      : active.value - 1
}

function next() {
  if (!totalImages.value) return

  active.value =
    active.value === totalImages.value - 1
      ? 0
      : active.value + 1
}

function closeFullscreen() {
  full.value = false
}

function handleKeydown(event) {
  if (!full.value) return

  if (event.key === 'Escape') {
    closeFullscreen()
  }

  if (event.key === 'ArrowLeft') {
    previous()
  }

  if (event.key === 'ArrowRight') {
    next()
  }
}

watch(full, (isOpen) => {
  if (isOpen) {
    document.addEventListener('keydown', handleKeydown)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  }
})

watch(
  () => props.images,
  () => {
    if (active.value >= props.images.length) {
      active.value = Math.max(props.images.length - 1, 0)
    }
  },
)

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <section class="gallery">
    <!-- Empty State -->
    <div
      v-if="!images.length"
      class="empty-gallery"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
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
          d="M4 17l4.5-4 3.2 2.8 2.3-2.1L20 18"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <span>No property images available</span>
    </div>

    <!-- Gallery -->
    <template v-else>
      <!-- Main Image -->
      <div class="main-gallery">
        <button
          class="main-image"
          type="button"
          :aria-label="`Open ${title} image ${active + 1} in fullscreen`"
          @click="full = true"
        >
          <img
            :src="currentImage"
            :alt="`${title} photo ${active + 1}`"
          />

          <span class="zoom-hint">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="10.8"
                cy="10.8"
                r="6.8"
                stroke="currentColor"
                stroke-width="1.8"
              />

              <path
                d="M16 16l4 4M10.8 8v5.6M8 10.8h5.6"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>

            View larger
          </span>

          <span
            v-if="totalImages > 1"
            class="counter"
          >
            {{ active + 1 }} / {{ totalImages }}
          </span>
        </button>

        <!-- Main Navigation -->
        <template v-if="totalImages > 1">
          <button
            class="nav-button previous"
            type="button"
            aria-label="Previous image"
            @click="previous"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <button
            class="nav-button next"
            type="button"
            aria-label="Next image"
            @click="next"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </template>
      </div>

      <!-- Thumbnails -->
      <div
        v-if="totalImages > 1"
        class="thumbnail-section"
      >
        <div class="thumbnail-header">
          <span>Property photos</span>
          <span>{{ totalImages }} photos</span>
        </div>

        <div class="thumbs">
          <button
            v-for="(img, i) in images"
            :key="`${img}-${i}`"
            type="button"
            class="thumbnail"
            :class="{ active: i === active }"
            :aria-label="`View photo ${i + 1}`"
            :aria-current="i === active ? 'true' : undefined"
            @click="selectImage(i)"
          >
            <img
              :src="img"
              :alt="`${title} thumbnail ${i + 1}`"
              loading="lazy"
            />

            <span
              v-if="i === active"
              class="active-indicator"
              aria-hidden="true"
            ></span>
          </button>
        </div>
      </div>

      <!-- Fullscreen -->
      <teleport to="body">
        <div
          v-if="full"
          class="fullscreen"
          role="dialog"
          aria-modal="true"
          :aria-label="`${title} image gallery`"
          @click.self="closeFullscreen"
        >
          <!-- Header -->
          <div class="fullscreen-header">
            <span class="fullscreen-title">
              {{ title }}
            </span>

            <span class="fullscreen-counter">
              {{ active + 1 }} / {{ totalImages }}
            </span>

            <button
              class="close-button"
              type="button"
              aria-label="Close fullscreen gallery"
              @click="closeFullscreen"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>

          <!-- Fullscreen Image -->
          <div class="fullscreen-content">
            <button
              v-if="totalImages > 1"
              class="fullscreen-nav previous"
              type="button"
              aria-label="Previous image"
              @click="previous"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

            <img
              :src="currentImage"
              :alt="`${title} photo ${active + 1}`"
            />

            <button
              v-if="totalImages > 1"
              class="fullscreen-nav next"
              type="button"
              aria-label="Next image"
              @click="next"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>

          <!-- Fullscreen Thumbnails -->
          <div
            v-if="totalImages > 1"
            class="fullscreen-thumbs"
          >
            <button
              v-for="(img, i) in images"
              :key="`full-${img}-${i}`"
              type="button"
              :class="{ active: i === active }"
              :aria-label="`View photo ${i + 1}`"
              @click="selectImage(i)"
            >
              <img
                :src="img"
                :alt="`${title} thumbnail ${i + 1}`"
              />
            </button>
          </div>
        </div>
      </teleport>
    </template>
  </section>
</template>

<style scoped>
/* ========================================
   Gallery
======================================== */

.gallery {
  width: 100%;
}

/* ========================================
   Main Gallery
======================================== */

.main-gallery {
  position: relative;

  width: 100%;
}

.main-image {
  position: relative;

  display: block;

  width: 100%;
  height: 390px;

  padding: 0;

  overflow: hidden;

  border: 0;
  border-radius: 12px;

  background: #f1f5f9;

  cursor: zoom-in;
}

.main-image img {
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;

  transition: transform 0.35s ease;
}

.main-image:hover img {
  transform: scale(1.025);
}

/* ========================================
   Zoom Hint
======================================== */

.zoom-hint {
  position: absolute;

  right: 14px;
  bottom: 14px;

  display: inline-flex;
  align-items: center;
  gap: 6px;

  padding: 7px 10px;

  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 7px;

  background: rgba(15, 23, 42, 0.68);
  color: #ffffff;

  font-size: 11px;
  font-weight: 600;

  backdrop-filter: blur(5px);
}

.zoom-hint svg {
  width: 15px;
  height: 15px;
}

/* ========================================
   Counter
======================================== */

.counter {
  position: absolute;

  top: 14px;
  right: 14px;

  padding: 6px 9px;

  border-radius: 6px;

  background: rgba(15, 23, 42, 0.72);
  color: #ffffff;

  font-size: 11px;
  font-weight: 600;

  backdrop-filter: blur(5px);
}

/* ========================================
   Navigation
======================================== */

.nav-button {
  position: absolute;
  top: 50%;

  display: grid;
  place-items: center;

  width: 38px;
  height: 38px;

  padding: 0;

  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: 50%;

  background: rgba(15, 23, 42, 0.65);
  color: #ffffff;

  cursor: pointer;

  opacity: 0;

  transform: translateY(-50%);

  transition:
    opacity 0.2s ease,
    background 0.2s ease;
}

.main-gallery:hover .nav-button {
  opacity: 1;
}

.nav-button:hover {
  background: rgba(15, 23, 42, 0.85);
}

.nav-button.previous {
  left: 14px;
}

.nav-button.next {
  right: 14px;
}

.nav-button svg {
  width: 20px;
  height: 20px;
}

/* ========================================
   Thumbnail Section
======================================== */

.thumbnail-section {
  margin-top: 12px;
}

.thumbnail-header {
  display: flex;
  justify-content: space-between;

  margin-bottom: 7px;

  color: #64748b;

  font-size: 11px;
  font-weight: 600;
}

.thumbs {
  display: flex;
  gap: 8px;

  overflow-x: auto;

  padding: 2px 2px 6px;

  scrollbar-width: thin;
}

.thumbnail {
  position: relative;

  flex: 0 0 auto;

  width: 82px;
  height: 62px;

  padding: 0;

  overflow: hidden;

  border: 2px solid transparent;
  border-radius: 7px;

  background: #f1f5f9;

  cursor: pointer;

  opacity: 0.72;

  transition:
    opacity 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.thumbnail:hover {
  opacity: 1;
  transform: translateY(-1px);
}

.thumbnail.active {
  border-color: #2563eb;
  opacity: 1;
}

.thumbnail img {
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;
}

.active-indicator {
  position: absolute;

  right: 4px;
  bottom: 4px;

  width: 6px;
  height: 6px;

  border-radius: 50%;

  background: #2563eb;
  box-shadow: 0 0 0 2px #ffffff;
}

/* ========================================
   Empty State
======================================== */

.empty-gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  min-height: 300px;

  border: 1px dashed #d7dee8;
  border-radius: 12px;

  background: #f8fafc;

  color: #64748b;

  font-size: 13px;
}

.empty-gallery svg {
  width: 40px;
  height: 40px;

  color: #94a3b8;
}

/* ========================================
   Fullscreen
======================================== */

.fullscreen {
  position: fixed;
  z-index: 9999;

  inset: 0;

  display: flex;
  flex-direction: column;

  padding: 20px;

  background: rgba(2, 6, 23, 0.97);

  color: #ffffff;
}

/* ========================================
   Fullscreen Header
======================================== */

.fullscreen-header {
  display: flex;
  align-items: center;

  min-height: 42px;

  position: relative;
}

.fullscreen-title {
  max-width: 60%;

  overflow: hidden;

  font-size: 14px;
  font-weight: 600;

  text-overflow: ellipsis;
  white-space: nowrap;
}

.fullscreen-counter {
  position: absolute;
  left: 50%;

  color: #cbd5e1;

  font-size: 12px;

  transform: translateX(-50%);
}

.close-button {
  display: grid;
  place-items: center;

  width: 38px;
  height: 38px;

  margin-left: auto;

  padding: 0;

  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;

  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;

  cursor: pointer;

  transition: background 0.2s ease;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.16);
}

.close-button svg {
  width: 19px;
  height: 19px;
}

/* ========================================
   Fullscreen Content
======================================== */

.fullscreen-content {
  position: relative;

  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 0;

  padding: 20px 55px;
}

.fullscreen-content > img {
  display: block;

  max-width: 100%;
  max-height: calc(100vh - 180px);

  object-fit: contain;

  border-radius: 6px;

  user-select: none;
}

/* ========================================
   Fullscreen Navigation
======================================== */

.fullscreen-nav {
  position: absolute;
  top: 50%;

  display: grid;
  place-items: center;

  width: 46px;
  height: 46px;

  padding: 0;

  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50%;

  background: rgba(255, 255, 255, 0.09);
  color: #ffffff;

  cursor: pointer;

  transform: translateY(-50%);

  transition: background 0.2s ease;
}

.fullscreen-nav:hover {
  background: rgba(255, 255, 255, 0.18);
}

.fullscreen-nav.previous {
  left: 5px;
}

.fullscreen-nav.next {
  right: 5px;
}

.fullscreen-nav svg {
  width: 22px;
  height: 22px;
}

/* ========================================
   Fullscreen Thumbnails
======================================== */

.fullscreen-thumbs {
  display: flex;
  justify-content: center;
  gap: 7px;

  max-width: 100%;

  overflow-x: auto;

  padding: 8px 0 2px;
}

.fullscreen-thumbs button {
  flex: 0 0 auto;

  width: 58px;
  height: 44px;

  padding: 0;

  overflow: hidden;

  border: 2px solid transparent;
  border-radius: 5px;

  background: #1e293b;

  opacity: 0.6;

  cursor: pointer;

  transition:
    opacity 0.2s ease,
    border-color 0.2s ease;
}

.fullscreen-thumbs button:hover,
.fullscreen-thumbs button.active {
  opacity: 1;
}

.fullscreen-thumbs button.active {
  border-color: #60a5fa;
}

.fullscreen-thumbs img {
  width: 100%;
  height: 100%;

  object-fit: cover;
}

/* ========================================
   Responsive
======================================== */

@media (max-width: 700px) {
  .main-image {
    height: 300px;
    border-radius: 10px;
  }

  .nav-button {
    opacity: 1;
    width: 34px;
    height: 34px;
  }

  .zoom-hint {
    display: none;
  }

  .thumbnail {
    width: 72px;
    height: 54px;
  }

  .fullscreen {
    padding: 12px;
  }

  .fullscreen-content {
    padding: 15px 42px;
  }

  .fullscreen-content > img {
    max-height: calc(100vh - 145px);
  }

  .fullscreen-nav {
    width: 36px;
    height: 36px;
  }

  .fullscreen-nav.previous {
    left: 0;
  }

  .fullscreen-nav.next {
    right: 0;
  }
}

@media (max-width: 480px) {
  .main-image {
    height: 240px;
  }

  .counter {
    top: 10px;
    right: 10px;
  }

  .fullscreen-title {
    max-width: 48%;
    font-size: 12px;
  }

  .fullscreen-content {
    padding: 10px 34px;
  }

  .fullscreen-thumbs button {
    width: 50px;
    height: 38px;
  }
}

/* ========================================
   Reduced Motion
======================================== */

@media (prefers-reduced-motion: reduce) {
  .main-image img,
  .nav-button,
  .thumbnail,
  .close-button,
  .fullscreen-nav,
  .fullscreen-thumbs button {
    transition: none;
  }

  .main-image:hover img {
    transform: none;
  }

  .thumbnail:hover {
    transform: none;
  }
}
</style>
