<script setup>
import { MAX_PROPERTY_IMAGES } from '../../utils/constants'

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  max: { type: Number, default: MAX_PROPERTY_IMAGES },
})
const emit = defineEmits(['update:modelValue'])

function onFiles(files) {
  const next = [...props.modelValue]
  Array.from(files).forEach((file) => {
    if (next.length >= props.max) return
    const url = URL.createObjectURL(file)
    next.push({ url, name: file.name, file, primary: next.length === 0 })
  })
  emit('update:modelValue', next)
}

function drop(e) {
  e.preventDefault()
  onFiles(e.dataTransfer.files)
}

function remove(i) {
  const next = props.modelValue.filter((_, idx) => idx !== i)
  if (next.length && !next.some((x) => x.primary)) next[0].primary = true
  emit('update:modelValue', next)
}

function primary(i) {
  emit(
    'update:modelValue',
    props.modelValue.map((img, idx) => ({ ...img, primary: idx === i })),
  )
}

function move(i, dir) {
  const j = i + dir
  if (j < 0 || j >= props.modelValue.length) return
  const next = [...props.modelValue]
  ;[next[i], next[j]] = [next[j], next[i]]
  emit('update:modelValue', next)
}
</script>

<template>
  <div>
    <label
      class="drop"
      @dragover.prevent
      @drop="drop"
    >
      Drag and drop or choose images (max {{ max }})
      <input class="sr-only" type="file" accept="image/*" multiple @change="onFiles($event.target.files)" />
    </label>
    <ul class="previews">
      <li v-for="(img, i) in modelValue" :key="img.url">
        <img :src="img.url" :alt="img.name || `Photo ${i + 1}`" />
        <div class="row">
          <button class="btn btn-ghost" type="button" @click="primary(i)">{{ img.primary ? 'Primary' : 'Set primary' }}</button>
          <button class="btn btn-ghost" type="button" @click="move(i, -1)">Up</button>
          <button class="btn btn-ghost" type="button" @click="move(i, 1)">Down</button>
          <button class="btn btn-ghost" type="button" @click="remove(i)">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.drop {
  display: grid;
  place-items: center;
  min-height: 120px;
  border: 1px dashed var(--color-border);
  border-radius: 8px;
  cursor: pointer;
  background: #fff;
}
.previews {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 12px;
  margin-top: 12px;
}
.previews img {
  height: 120px;
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
}
</style>
