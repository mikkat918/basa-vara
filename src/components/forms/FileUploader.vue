
<script setup>
import { MAX_PROPERTY_IMAGES } from '../../utils/constants'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },

  max: {
    type: Number,
    default: MAX_PROPERTY_IMAGES,
  },
})

const emit = defineEmits(['update:modelValue'])

function onFiles(files) {
  const next = [...props.modelValue]

  Array.from(files).forEach((file) => {
    if (next.length >= props.max) return

    if (!file.type.startsWith('image/')) return

    const url = URL.createObjectURL(file)

    next.push({
      url,
      name: file.name,
      file,
      primary: next.length === 0,
    })
  })

  emit('update:modelValue', next)
}

function drop(e) {
  e.preventDefault()
  e.currentTarget.classList.remove('is-dragging')
  onFiles(e.dataTransfer.files)
}

function dragEnter(e) {
  e.currentTarget.classList.add('is-dragging')
}

function dragLeave(e) {
  e.currentTarget.classList.remove('is-dragging')
}

function remove(i) {
  const removed = props.modelValue[i]

  if (removed?.url?.startsWith('blob:')) {
    URL.revokeObjectURL(removed.url)
  }

  const next = props.modelValue.filter((_, idx) => idx !== i)

  if (next.length && !next.some((x) => x.primary)) {
    next[0] = {
      ...next[0],
      primary: true,
    }
  }

  emit('update:modelValue', next)
}

function primary(i) {
  emit(
    'update:modelValue',
    props.modelValue.map((img, idx) => ({
      ...img,
      primary: idx === i,
    })),
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
  <div class="image-uploader">

    <!-- Upload area -->
    <label
      class="drop"
      :class="{ 'is-dragging': false }"
      @dragover.prevent="dragEnter"
      @dragleave="dragLeave"
      @drop="drop"
    >
      <input
        class="sr-only"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        :disabled="modelValue.length >= max"
        @change="onFiles($event.target.files)"
      />

      <div class="drop-content">
        <div class="upload-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 16V4"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
            <path
              d="M7.5 8.5L12 4L16.5 8.5"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5 20H19"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
          </svg>
        </div>

        <div class="drop-title">
          {{ modelValue.length >= max
            ? 'Maximum images reached'
            : 'Drag & drop your images here' }}
        </div>

        <div
          v-if="modelValue.length < max"
          class="drop-subtitle"
        >
          or
          <span>choose images</span>
          from your device
        </div>

        <div class="drop-info">
          {{ modelValue.length }} / {{ max }} images selected
        </div>
      </div>
    </label>

    <!-- Image previews -->
    <div
      v-if="modelValue.length"
      class="preview-section"
    >
      <div class="preview-header">
        <div>
          <h3>Property Photos</h3>
          <p>Arrange your photos and select a primary image.</p>
        </div>

        <span class="image-count">
          {{ modelValue.length }} / {{ max }}
        </span>
      </div>

      <ul class="previews">
        <li
          v-for="(img, i) in modelValue"
          :key="img.url"
          class="preview-card"
          :class="{ 'is-primary': img.primary }"
        >
          <!-- Image -->
          <div class="image-wrapper">
            <img
              :src="img.url"
              :alt="img.name || `Photo ${i + 1}`"
            />

            <span
              v-if="img.primary"
              class="primary-badge"
            >
              Primary
            </span>

            <span class="photo-number">
              {{ i + 1 }}
            </span>
          </div>

          <!-- Details -->
          <div class="preview-info">
            <div class="file-name" :title="img.name">
              {{ img.name || `Photo ${i + 1}` }}
            </div>

            <div class="actions">
              <button
                class="action-btn primary-btn"
                type="button"
                :class="{ active: img.primary }"
                @click="primary(i)"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3L14.8 8.7L21 9.6L16.5 14L17.6 20.2L12 17.3L6.4 20.2L7.5 14L3 9.6L9.2 8.7L12 3Z"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linejoin="round"
                  />
                </svg>

                {{ img.primary ? 'Primary' : 'Set primary' }}
              </button>

              <button
                class="action-btn"
                type="button"
                :disabled="i === 0"
                title="Move up"
                aria-label="Move image up"
                @click="move(i, -1)"
              >
                ↑
              </button>

              <button
                class="action-btn"
                type="button"
                :disabled="i === modelValue.length - 1"
                title="Move down"
                aria-label="Move image down"
                @click="move(i, 1)"
              >
                ↓
              </button>

              <button
                class="action-btn delete-btn"
                type="button"
                title="Delete image"
                aria-label="Delete image"
                @click="remove(i)"
              >
                ×
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.image-uploader {
  width: 100%;
}

/* ========================================
   Upload Area
======================================== */

.drop {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-height: 190px;

  padding: 28px 20px;
  box-sizing: border-box;

  border: 1.5px dashed #cbd5e1;
  border-radius: 14px;

  background: #f8fafc;

  cursor: pointer;

  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
}

.drop:hover {
  border-color: #2563eb;
  background: #f8fbff;
}

.drop:focus-within {
  border-color: #2563eb;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

.drop-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Upload icon */

.upload-icon {
  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 12px;

  border-radius: 12px;

  background: #e8f0ff;
  color: #2563eb;
}

.upload-icon svg {
  width: 25px;
  height: 25px;
}

/* Text */

.drop-title {
  color: #1e293b;
  font-size: 15px;
  font-weight: 600;
}

.drop-subtitle {
  margin-top: 5px;

  color: #64748b;
  font-size: 13px;
}

.drop-subtitle span {
  color: #2563eb;
  font-weight: 600;
}

.drop-info {
  margin-top: 12px;

  color: #94a3b8;
  font-size: 12px;
}

/* ========================================
   Preview Section
======================================== */

.preview-section {
  margin-top: 24px;
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 16px;
  margin-bottom: 14px;
}

.preview-header h3 {
  margin: 0;

  color: #1e293b;
  font-size: 16px;
  font-weight: 700;
}

.preview-header p {
  margin: 4px 0 0;

  color: #64748b;
  font-size: 13px;
}

.image-count {
  flex-shrink: 0;

  padding: 5px 10px;

  border-radius: 999px;

  background: #f1f5f9;
  color: #475569;

  font-size: 12px;
  font-weight: 600;
}

/* ========================================
   Preview Grid
======================================== */

.previews {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));

  gap: 16px;

  list-style: none;
  margin: 0;
  padding: 0;
}

.preview-card {
  overflow: hidden;

  background: #ffffff;

  border: 1px solid #e2e8f0;
  border-radius: 12px;

  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);

  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.preview-card:hover {
  transform: translateY(-2px);

  border-color: #cbd5e1;

  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
}

.preview-card.is-primary {
  border-color: #2563eb;
}

/* ========================================
   Image
======================================== */

.image-wrapper {
  position: relative;

  width: 100%;
  height: 170px;

  overflow: hidden;

  background: #f1f5f9;
}

.image-wrapper img {
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;

  transition: transform 0.3s ease;
}

.preview-card:hover .image-wrapper img {
  transform: scale(1.03);
}

.primary-badge {
  position: absolute;
  top: 10px;
  left: 10px;

  padding: 5px 9px;

  border-radius: 6px;

  background: #2563eb;
  color: #ffffff;

  font-size: 11px;
  font-weight: 700;
}

.photo-number {
  position: absolute;
  right: 10px;
  bottom: 10px;

  min-width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 6px;

  background: rgba(15, 23, 42, 0.72);
  color: #ffffff;

  font-size: 11px;
  font-weight: 600;
}

/* ========================================
   Preview Info
======================================== */

.preview-info {
  padding: 12px;
}

.file-name {
  overflow: hidden;

  margin-bottom: 10px;

  color: #334155;
  font-size: 12px;
  font-weight: 500;

  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ========================================
   Actions
======================================== */

.actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.action-btn {
  min-width: 32px;
  height: 32px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0 8px;

  border: 1px solid #e2e8f0;
  border-radius: 7px;

  background: #ffffff;
  color: #64748b;

  font-size: 12px;
  font-weight: 600;

  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.15s ease;
}

.action-btn:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #cbd5e1;
  color: #1e293b;
}

.action-btn:active:not(:disabled) {
  transform: scale(0.95);
}

.action-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.primary-btn {
  flex: 1;
  justify-content: center;
}

.primary-btn svg {
  width: 14px;
  height: 14px;
  margin-right: 4px;
}

.primary-btn.active {
  border-color: #2563eb;
  background: #eff6ff;
  color: #2563eb;
}

.delete-btn {
  color: #ef4444;
}

.delete-btn:hover:not(:disabled) {
  border-color: #fecaca;
  background: #fef2f2;
  color: #dc2626;
}

/* ========================================
   Screen Reader Only
======================================== */

.sr-only {
  position: absolute;

  width: 1px;
  height: 1px;

  padding: 0;
  margin: -1px;

  overflow: hidden;

  clip: rect(0, 0, 0, 0);

  white-space: nowrap;
  border: 0;
}

/* ========================================
   Responsive
======================================== */

@media (max-width: 700px) {
  .drop {
    min-height: 165px;
  }

  .previews {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .image-wrapper {
    height: 145px;
  }

  .preview-header {
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .drop {
    min-height: 150px;
    padding: 20px 14px;
  }

  .upload-icon {
    width: 42px;
    height: 42px;
  }

  .drop-title {
    font-size: 14px;
  }

  .drop-subtitle {
    font-size: 12px;
  }

  .previews {
    grid-template-columns: 1fr;
  }

  .image-wrapper {
    height: 190px;
  }

  .preview-header {
    flex-direction: column;
    gap: 8px;
  }

  .actions {
    flex-wrap: wrap;
  }
}

@media (prefers-reduced-motion: reduce) {
  .drop,
  .preview-card,
  .image-wrapper img,
  .action-btn {
    transition: none;
  }
}
</style>
