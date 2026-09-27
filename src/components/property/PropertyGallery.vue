<script setup>
import { ref } from 'vue'
const props = defineProps({ images: { type: Array, default: () => [] }, title: String })
const active = ref(0)
const full = ref(false)
</script>

<template>
  <div>
    <button class="main" type="button" @click="full = true">
      <img :src="images[active]" :alt="`${title} photo ${active + 1}`" />
    </button>
    <div class="thumbs">
      <button v-for="(img, i) in images" :key="img" type="button" :class="{ on: i === active }" @click="active = i">
        <img :src="img" :alt="`${title} thumbnail ${i + 1}`" />
      </button>
    </div>
    <teleport to="body">
      <div v-if="full" class="fs" role="dialog" aria-label="Fullscreen gallery" @click.self="full = false">
        <button class="btn btn-secondary" type="button" @click="full = false">Close</button>
        <img :src="images[active]" :alt="title" />
        <div class="row" style="justify-content: center; margin-top: 12px">
          <button class="btn btn-secondary" type="button" :disabled="active === 0" @click="active--">Previous</button>
          <button class="btn btn-secondary" type="button" :disabled="active === images.length - 1" @click="active++">Next</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<style scoped>
.main {
  border: 0;
  padding: 0;
  width: 100%;
  cursor: zoom-in;
  background: none;
}
.main img {
  width: 100%;
  height: 380px;
  object-fit: cover;
  border-radius: 12px;
}
.thumbs {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  overflow: auto;
}
.thumbs button {
  border: 2px solid transparent;
  padding: 0;
  background: none;
  cursor: pointer;
}
.thumbs .on {
  border-color: var(--color-primary);
}
.thumbs img {
  width: 88px;
  height: 64px;
  object-fit: cover;
  border-radius: 6px;
}
.fs {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 90;
  display: grid;
  place-items: center;
  padding: 24px;
}
.fs img {
  max-height: 70vh;
  max-width: 100%;
}
</style>
