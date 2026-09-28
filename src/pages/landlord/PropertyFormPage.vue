<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { propertyService } from '../../services/propertyService'
import { useAuthStore } from '../../stores/authStore'
import { useUiStore } from '../../stores/uiStore'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const ui = useUiStore()
const isEdit = computed(() => Boolean(route.params.id))
const loading = ref(false)
const form = reactive({ title: '', rent: 25000, area: 'Dhaka', bedrooms: 2, bathrooms: 1, status: 'draft', description: '', type: 'Apartment' })

onMounted(async () => {
  if (isEdit.value) {
    loading.value = true
    try {
      const item = (await propertyService.forLandlord(auth.user.id)).find((property) => property.id === route.params.id)
      if (!item) throw new Error('Property not found')
      Object.assign(form, { title: item.title, rent: item.rent, area: item.location.area, bedrooms: item.bedrooms, bathrooms: item.bathrooms, status: item.status, description: item.description, type: item.type })
    } catch (error) { ui.toast(error.message || 'Unable to load property', 'error') } finally { loading.value = false }
  }
})

async function save() {
  if (!form.title.trim() || form.rent <= 0) return ui.toast('Add a title and valid monthly rent.', 'error')
  loading.value = true
  const payload = { title: form.title.trim(), rent: Number(form.rent), bedrooms: Number(form.bedrooms), bathrooms: Number(form.bathrooms), status: form.status, type: form.type, listingType: 'Rent', securityDeposit: Number(form.rent) * 2, size: 800, floor: 1, totalFloors: 1, location: { division: 'Dhaka', district: 'Dhaka', area: form.area, subArea: form.area, address: form.area }, description: form.description || 'Details will be added by the landlord.', amenities: [], images: [], availableFrom: new Date().toISOString().slice(0, 10), preferredTenant: 'Anyone', furnishing: 'Unfurnished', nearby: [] }
  try { const result = isEdit.value ? await propertyService.update(route.params.id, auth.user.id, payload) : await propertyService.create(auth.user.id, payload); ui.toast(isEdit.value ? 'Listing updated.' : 'Listing created and saved as draft.', 'success'); router.push(`/landlord/properties/${result.id}/edit`) } catch (error) { ui.toast(error.message || 'Unable to save property', 'error') } finally { loading.value = false }
}
</script>

<template>
  <div class="page property-editor">
    <!-- Page Header -->
    <header class="page-header">
      <div class="header-copy">
        <span class="eyebrow">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 10.5 12 3l9 7.5"></path>
            <path d="M5 9.5V21h14V9.5"></path>
            <path d="M9 21v-6h6v6"></path>
          </svg>
          Property management
        </span>

```
    <h1>{{ isEdit ? 'Edit property' : 'Add property' }}</h1>

    <p>
      {{ isEdit
        ? 'Update your property details and keep your listing information accurate.'
        : 'Create a professional property listing and submit it for approval.' }}
    </p>
  </div>

  <div class="header-status">
    <span class="status-dot"></span>
    {{ isEdit ? 'Editing listing' : 'New listing' }}
  </div>
</header>

<!-- Form Card -->
<form class="card panel" @submit.prevent="save">
  <!-- Basic Information -->
  <section class="form-section">
    <div class="section-heading">
      <div class="section-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 18.5z"></path>
          <path d="M8 8h8M8 12h8M8 16h5"></path>
        </svg>
      </div>

      <div>
        <span class="section-label">01 · Listing details</span>
        <h2>Basic information</h2>
        <p>Provide the essential information tenants need to understand your property.</p>
      </div>
    </div>

    <div class="grid two-col">
      <!-- Title -->
      <label class="field">
        <span class="field-label">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 4h14v16H5z"></path>
            <path d="M8 8h8M8 12h6M8 16h8"></path>
          </svg>
          Property title
        </span>

        <input
          v-model="form.title"
          type="text"
          placeholder="e.g. Spacious 2 Bedroom Apartment"
        />
      </label>

      <!-- Rent -->
      <label class="field">
        <span class="field-label">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9"></circle>
            <path d="M15 8.5c-.7-.6-1.7-.9-2.8-.9-1.7 0-2.8.8-2.8 2 0 1.2 1.1 1.7 2.8 2 1.7.3 2.8.8 2.8 2s-1.1 2-2.8 2c-1.1 0-2.1-.3-2.9-.9"></path>
            <path d="M12 6v12"></path>
          </svg>
          Monthly rent
        </span>

        <div class="input-with-prefix">
          <span>৳</span>
          <input
            v-model.number="form.rent"
            type="number"
            min="1"
            placeholder="25000"
          />
        </div>
      </label>

      <!-- Area -->
      <label class="field">
        <span class="field-label">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 5h6v6H4zM14 5h6v6h-6zM4 15h6v6H4zM14 15h6v6h-6z"></path>
          </svg>
          Area / Location
        </span>

        <input
          v-model="form.area"
          type="text"
          placeholder="e.g. Mirpur, Dhaka"
        />
      </label>

      <!-- Status -->
      <label class="field">
        <span class="field-label">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12.5 9.2 17 19 7"></path>
            <circle cx="12" cy="12" r="9"></circle>
          </svg>
          Listing status
        </span>

        <div class="select-wrap">
          <select v-model="form.status">
            <option value="draft">Draft</option>
            <option value="pending">Submit for approval</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
          </select>

          <svg class="select-arrow" viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </div>
      </label>
    </div>
  </section>

  <!-- Property Capacity -->
  <section class="form-section">
    <div class="section-heading">
      <div class="section-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 19V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12"></path>
          <path d="M4 17h16"></path>
          <path d="M7 13h4M13 13h4"></path>
        </svg>
      </div>

      <div>
        <span class="section-label">02 · Property capacity</span>
        <h2>Rooms &amp; capacity</h2>
        <p>Tell tenants how much space and how many rooms the property offers.</p>
      </div>
    </div>

    <div class="grid two-col">
      <!-- Bedrooms -->
      <label class="field">
        <span class="field-label">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 18v-7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7"></path>
            <path d="M4 15h16M7 9V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"></path>
            <path d="M3 18h18v2H3z"></path>
          </svg>
          Bedrooms
        </span>

        <input
          v-model.number="form.bedrooms"
          type="number"
          min="0"
          placeholder="2"
        />
      </label>

      <!-- Bathrooms -->
      <label class="field">
        <span class="field-label">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 11h14v3a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5z"></path>
            <path d="M7 11V6a3 3 0 0 1 5-2"></path>
            <path d="M12 4h3v3"></path>
            <path d="M7 21h10"></path>
          </svg>
          Bathrooms
        </span>

        <input
          v-model.number="form.bathrooms"
          type="number"
          min="0"
          placeholder="2"
        />
      </label>
    </div>
  </section>

  <!-- Description -->
  <section class="form-section">
    <div class="section-heading">
      <div class="section-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 4h14v16H5z"></path>
          <path d="M8 8h8M8 12h8M8 16h5"></path>
        </svg>
      </div>

      <div>
        <span class="section-label">03 · Property description</span>
        <h2>Tell tenants about this property</h2>
        <p>
          Add useful details about amenities, availability and what makes
          this property suitable for tenants.
        </p>
      </div>
    </div>

    <label class="field description-field">
      <span class="field-label">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 4h14v16H5z"></path>
          <path d="M8 8h8M8 12h8M8 16h6"></path>
        </svg>
        Description
      </span>

      <textarea
        v-model="form.description"
        rows="5"
        placeholder="Describe the property, amenities, nearby facilities, availability and other important details..."
      ></textarea>
    </label>
  </section>

  <!-- Footer -->
  <div class="form-footer">
    <div class="footer-info">
      <div class="info-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9"></circle>
          <path d="M12 10v6"></path>
          <path d="M12 7.5h.01"></path>
        </svg>
      </div>

      <div>
        <strong>{{ isEdit ? 'Keep your listing updated' : 'Ready to publish?' }}</strong>
        <span>
          {{ isEdit
            ? 'Make sure the information is accurate before saving your changes.'
            : 'You can submit your listing for approval after completing the details.' }}
        </span>
      </div>
    </div>

    <button
      class="btn btn-primary submit-btn"
      type="submit"
      :disabled="loading"
    >
      <svg v-if="!loading" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12.5 9.5 17 19 7"></path>
      </svg>

      <svg v-else class="spinner" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9"></circle>
      </svg>

      {{ loading ? 'Saving…' : isEdit ? 'Update listing' : 'Create listing' }}
    </button>
  </div>
</form>
```

  </div>
</template>

<style scoped>
.page {
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: clamp(22px, 4vw, 42px);
  background:
    radial-gradient(circle at 8% 0%, rgba(23, 132, 95, 0.10), transparent 30%),
    radial-gradient(circle at 95% 15%, rgba(31, 167, 122, 0.08), transparent 28%),
    #f6f8f7;
  color: #18231f;
}

.property-editor {
  display: grid;
  gap: 24px;
}

/* Header */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

.header-copy {
  min-width: 0;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 9px;
  color: #17845f;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.eyebrow svg {
  width: 15px;
  height: 15px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.page-header h1 {
  margin: 0;
  color: #15211c;
  font-size: clamp(1.7rem, 3vw, 2.35rem);
  line-height: 1.1;
  letter-spacing: -0.035em;
}

.page-header p {
  max-width: 680px;
  margin: 9px 0 0;
  color: #6d7b75;
  font-size: 0.94rem;
  line-height: 1.65;
}

.header-status {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 10px 14px;
  border: 1px solid #d9ebe3;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.84);
  color: #397360;
  font-size: 0.78rem;
  font-weight: 800;
  white-space: nowrap;
  box-shadow: 0 6px 18px rgba(28, 73, 57, 0.05);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #1a9b6c;
  box-shadow: 0 0 0 4px rgba(26, 155, 108, 0.10);
}

/* Main card */
.panel {
  width: 100%;
  box-sizing: border-box;
  padding: clamp(20px, 3vw, 34px);
  overflow: hidden;
  border: 1px solid #e3ebe7;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.97);
  box-shadow: 0 14px 40px rgba(26, 55, 44, 0.07);
}

/* Sections */
.form-section {
  padding: 4px 0 30px;
}

.form-section + .form-section {
  padding-top: 30px;
  border-top: 1px solid #edf1ef;
}

.section-heading {
  display: flex;
  align-items: flex-start;
  gap: 13px;
  margin-bottom: 23px;
}

.section-icon {
  flex: 0 0 42px;
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border: 1px solid #dcefe7;
  border-radius: 12px;
  background: #eff9f5;
  color: #17845f;
}

.section-icon svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.section-label {
  display: block;
  margin-bottom: 4px;
  color: #7b8983;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.section-heading h2 {
  margin: 0;
  color: #1b2923;
  font-size: 1.05rem;
  letter-spacing: -0.015em;
}

.section-heading p {
  max-width: 700px;
  margin: 5px 0 0;
  color: #7a8782;
  font-size: 0.82rem;
  line-height: 1.55;
}

/* Grid */
.grid {
  display: grid;
  gap: 19px;
}

.two-col {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

/* Fields */
.field {
  min-width: 0;
  display: grid;
  gap: 9px;
  color: #26352e;
  font-size: 0.83rem;
  font-weight: 750;
}

.field-label {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.field-label svg {
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
  fill: none;
  stroke: #5e766b;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

input,
select,
textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #dbe5e0;
  border-radius: 11px;
  outline: none;
  background: #fbfdfc;
  color: #1d2b25;
  font: inherit;
  font-size: 0.9rem;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

input,
select {
  height: 48px;
  padding: 0 14px;
}

textarea {
  min-height: 132px;
  padding: 13px 14px;
  resize: vertical;
  line-height: 1.6;
}

input::placeholder,
textarea::placeholder {
  color: #a4afaa;
}

input:hover,
select:hover,
textarea:hover {
  border-color: #bfd4ca;
  background: #ffffff;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #1a9569;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(26, 149, 105, 0.10);
}

/* Rent */
.input-with-prefix {
  position: relative;
}

.input-with-prefix > span {
  position: absolute;
  left: 14px;
  top: 50%;
  z-index: 1;
  transform: translateY(-50%);
  color: #17845f;
  font-size: 0.95rem;
  font-weight: 850;
  pointer-events: none;
}

.input-with-prefix input {
  padding-left: 34px;
}

/* Select */
.select-wrap {
  position: relative;
}

.select-wrap select {
  appearance: none;
  padding-right: 42px;
  cursor: pointer;
}

.select-arrow {
  position: absolute;
  top: 50%;
  right: 14px;
  width: 16px;
  height: 16px;
  transform: translateY(-50%);
  pointer-events: none;
  fill: none;
  stroke: #71817a;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Description */
.description-field {
  width: 100%;
}

/* Footer */
.form-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-top: 24px;
  border-top: 1px solid #edf1ef;
}

.footer-info {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 11px;
}

.info-icon {
  flex: 0 0 38px;
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  background: #f2f7f5;
  color: #4f7164;
}

.info-icon svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.footer-info strong,
.footer-info span {
  display: block;
}

.footer-info strong {
  margin-bottom: 2px;
  color: #2a3932;
  font-size: 0.79rem;
}

.footer-info span {
  max-width: 560px;
  color: #7d8984;
  font-size: 0.73rem;
  line-height: 1.45;
}

/* Button */
.submit-btn {
  flex: 0 0 auto;
  min-width: 175px;
  min-height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0;
  padding: 0 18px;
  border: 0;
  border-radius: 11px;
  background: #17845f;
  color: #ffffff;
  font-size: 0.84rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(23, 132, 95, 0.18);
  transition:
    transform 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease,
    opacity 0.2s ease;
}

.submit-btn svg {
  width: 17px;
  height: 17px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.9;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  background: #116f50;
  box-shadow: 0 11px 23px rgba(23, 132, 95, 0.23);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.submit-btn:disabled {
  cursor: not-allowed;
  opacity: 0.68;
  box-shadow: none;
}

.spinner {
  animation: spin 0.85s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Tablet */
@media (max-width: 850px) {
  .page {
    padding: 24px 20px;
  }

  .page-header {
    align-items: flex-start;
  }

  .panel {
    padding: 24px;
  }
}

/* Mobile */
@media (max-width: 700px) {
  .page {
    padding: 20px 14px;
  }

  .page-header {
    flex-direction: column;
    gap: 13px;
  }

  .header-status {
    align-self: flex-start;
  }

  .two-col {
    grid-template-columns: 1fr;
  }

  .form-footer {
    align-items: stretch;
    flex-direction: column;
  }

  .submit-btn {
    width: 100%;
  }
}

/* Small mobile */
@media (max-width: 480px) {
  .property-editor {
    gap: 18px;
  }

  .page-header h1 {
    font-size: 1.55rem;
  }

  .page-header p {
    font-size: 0.84rem;
  }

  .panel {
    padding: 18px;
    border-radius: 16px;
  }

  .form-section {
    padding-bottom: 25px;
  }

  .form-section + .form-section {
    padding-top: 25px;
  }

  .section-heading {
    gap: 10px;
    margin-bottom: 19px;
  }

  .section-icon {
    flex-basis: 38px;
    width: 38px;
    height: 38px;
    border-radius: 10px;
  }

  .section-icon svg {
    width: 18px;
    height: 18px;
  }

  .section-heading p {
    font-size: 0.77rem;
  }

  input,
  select {
    height: 46px;
  }

  textarea {
    min-height: 120px;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
</style>
