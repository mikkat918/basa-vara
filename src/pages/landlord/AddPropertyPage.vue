<script setup>
import { reactive } from 'vue'

const form = reactive({
  title: '',
  type: 'Apartment',
  price: '',
  city: 'Dhaka',
  bedrooms: 2,
  bathrooms: 1,
})

const submit = () => {
  console.log('New property draft:', form)
}
</script>

```vue
<template>
  <div class="page">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <span class="eyebrow">Property management</span>
        <h1>Add property</h1>
        <p class="muted">
          Create a new rental listing and add it to the platform.
        </p>
      </div>

      <div class="header-badge">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M3 10.5 12 3l9 7.5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.5 9.5V21h13V9.5M9 21v-6h6v6"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linejoin="round"
          />
        </svg>
        <span>New listing</span>
      </div>
    </div>

    <!-- Form -->
    <form class="card panel" @submit.prevent="submit">
      <div class="panel-header">
        <div class="panel-title">
          <div class="title-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4 21V9.5L12 3l8 6.5V21"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
              />
              <path
                d="M8 21v-6h8v6M8 11h8M10 7h4"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>
          </div>

          <div>
            <span class="section-eyebrow">Listing information</span>
            <h2>Property details</h2>
          </div>
        </div>

        <span class="required-note">
          * Required
        </span>
      </div>

      <div class="form-section">
        <div class="section-heading">
          <span class="step-number">01</span>
          <div>
            <h3>Basic information</h3>
            <p>Provide the main details of the property.</p>
          </div>
        </div>

        <div class="grid two-col">
          <!-- Title -->
          <label class="field field-full">
            <span class="label-text">
              Property title
              <small>*</small>
            </span>

            <div class="input-wrap">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M5 5h14v14H5z"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linejoin="round"
                />
                <path
                  d="M8 9h8M8 13h6M8 17h4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
              </svg>

              <input
                v-model="form.title"
                type="text"
                placeholder="Modern apartment in Dhanmondi"
              />
            </div>
          </label>

          <!-- Type -->
          <label class="field">
            <span class="label-text">
              Property type
              <small>*</small>
            </span>

            <div class="input-wrap">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                />
                <path
                  d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
              </svg>

              <select v-model="form.type">
                <option>Apartment</option>
                <option>House</option>
                <option>Studio</option>
                <option>Commercial</option>
              </select>
            </div>
          </label>

          <!-- Monthly Rent -->
          <label class="field">
            <span class="label-text">
              Monthly rent
              <small>*</small>
            </span>

            <div class="input-wrap">
              <span class="currency">৳</span>

              <input
                v-model="form.price"
                type="number"
                placeholder="25000"
              />

              <span class="input-suffix">/ month</span>
            </div>
          </label>

          <!-- City -->
          <label class="field">
            <span class="label-text">
              City
              <small>*</small>
            </span>

            <div class="input-wrap">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                />
                <circle
                  cx="12"
                  cy="9"
                  r="2.3"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                />
              </svg>

              <input
                v-model="form.city"
                type="text"
                placeholder="Dhaka"
              />
            </div>
          </label>
        </div>
      </div>

      <div class="divider"></div>

      <div class="form-section">
        <div class="section-heading">
          <span class="step-number">02</span>
          <div>
            <h3>Property capacity</h3>
            <p>Specify the number of bedrooms and bathrooms.</p>
          </div>
        </div>

        <div class="grid two-col">
          <!-- Bedrooms -->
          <label class="field">
            <span class="label-text">
              Bedrooms
            </span>

            <div class="input-wrap">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 18v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
                <path
                  d="M4 18v2M20 18v2M4 15h16M7 11V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
              </svg>

              <input
                v-model.number="form.bedrooms"
                type="number"
                min="0"
                placeholder="2"
              />
            </div>
          </label>

          <!-- Bathrooms -->
          <label class="field">
            <span class="label-text">
              Bathrooms
            </span>

            <div class="input-wrap">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M5 12h14v3a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-3Z"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linejoin="round"
                />
                <path
                  d="M7 12V6a2 2 0 0 1 4 0v1M7 8h5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
                <path
                  d="M8 19v2M16 19v2"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
              </svg>

              <input
                v-model.number="form.bathrooms"
                type="number"
                min="0"
                placeholder="2"
              />
            </div>
          </label>
        </div>
      </div>

      <!-- Form Footer -->
      <div class="form-footer">
        <div class="footer-note">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle
              cx="12"
              cy="12"
              r="9"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
            />
            <path
              d="M12 10v5M12 7.5v.01"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
          </svg>

          <span>
            Make sure the property information is accurate before saving.
          </span>
        </div>

        <button
          class="btn btn-primary"
          type="submit"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M5 4h11l3 3v13H5z"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linejoin="round"
            />
            <path
              d="M8 4v6h8V4M8 20v-6h8v6"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linejoin="round"
            />
          </svg>

          <span>Save listing</span>
        </button>
      </div>
    </form>
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
  font-size: clamp(25px, 3vw, 34px);
  line-height: 1.1;
  font-weight: 850;
  letter-spacing: -0.04em;
}

.muted {
  color: #7b8881;
}

.page-header p {
  margin: 6px 0 0;
  font-size: 12px;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  border: 1px solid #dceae3;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.84);
  color: #557066;
  font-size: 10px;
  font-weight: 800;
  white-space: nowrap;
}

.header-badge svg {
  width: 17px;
  height: 17px;
  color: #17845f;
}

/* =========================
   Main Form Card
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
  padding: clamp(20px, 3vw, 30px);
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
  margin-bottom: 27px;
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 11px;
}

.title-icon {
  width: 43px;
  height: 43px;
  flex: 0 0 43px;
  display: grid;
  place-items: center;
  border-radius: 13px;
  background: #edf8f3;
  border: 1px solid #dceee6;
  color: #16805c;
}

.title-icon svg {
  width: 22px;
  height: 22px;
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
  color: #24322b;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.required-note {
  color: #929c97;
  font-size: 9px;
  font-weight: 700;
}

/* =========================
   Form Sections
========================= */

.form-section {
  width: 100%;
}

.section-heading {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  margin-bottom: 18px;
}

.step-number {
  width: 31px;
  height: 31px;
  flex: 0 0 31px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  background: #f0f8f4;
  border: 1px solid #dceee6;
  color: #16805c;
  font-size: 9px;
  font-weight: 850;
}

.section-heading h3 {
  margin: 1px 0 0;
  color: #33433a;
  font-size: 14px;
  font-weight: 800;
}

.section-heading p {
  margin: 4px 0 0;
  color: #8a958f;
  font-size: 10px;
}

/* =========================
   Grid
========================= */

.grid {
  display: grid;
  gap: 17px;
}

.two-col {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

/* =========================
   Fields
========================= */

.field {
  min-width: 0;
  display: grid;
  gap: 7px;
}

.field-full {
  grid-column: 1 / -1;
}

.label-text {
  color: #405047;
  font-size: 10px;
  font-weight: 800;
}

.label-text small {
  color: #d35d5d;
  font-size: 10px;
}

.input-wrap {
  position: relative;
  min-width: 0;
  display: flex;
  align-items: center;
}

.input-wrap > svg {
  position: absolute;
  left: 13px;
  width: 17px;
  height: 17px;
  color: #8a9991;
  pointer-events: none;
}

input,
select {
  width: 100%;
  height: 46px;
  box-sizing: border-box;
  padding: 0 14px 0 42px;
  border: 1px solid #dfe7e3;
  border-radius: 11px;
  outline: none;
  background: #fbfdfc;
  color: #293930;
  font-family: inherit;
  font-size: 11px;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    background-color 0.18s ease;
}

input::placeholder {
  color: #a5afa9;
}

input:hover,
select:hover {
  border-color: #cddbd4;
}

input:focus,
select:focus {
  border-color: #4aa984;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(23, 132, 95, 0.09);
}

select {
  cursor: pointer;
  appearance: auto;
}

/* Rent */

.currency {
  position: absolute;
  left: 14px;
  color: #16805c;
  font-size: 15px;
  font-weight: 850;
  pointer-events: none;
}

.input-wrap .currency + input {
  padding-left: 34px;
  padding-right: 72px;
}

.input-suffix {
  position: absolute;
  right: 13px;
  color: #98a29d;
  font-size: 9px;
  pointer-events: none;
}

/* =========================
   Divider
========================= */

.divider {
  height: 1px;
  margin: 28px 0;
  background: #e9efec;
}

/* =========================
   Form Footer
========================= */

.form-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-top: 29px;
  padding-top: 20px;
  border-top: 1px solid #e9efec;
}

.footer-note {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #89958e;
  font-size: 9px;
  line-height: 1.4;
}

.footer-note svg {
  width: 15px;
  height: 15px;
  flex: 0 0 15px;
}

/* =========================
   Button
========================= */

.btn {
  min-height: 43px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 18px;
  border: 1px solid transparent;
  border-radius: 10px;
  font-family: inherit;
  font-size: 10px;
  font-weight: 850;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    background-color 0.18s ease;
}

.btn svg {
  width: 16px;
  height: 16px;
}

.btn-primary {
  background: #17845f;
  border-color: #17845f;
  color: #fff;
  box-shadow: 0 6px 16px rgba(23, 132, 95, 0.18);
}

.btn-primary:hover {
  background: #126e4f;
  box-shadow: 0 8px 20px rgba(23, 132, 95, 0.23);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0);
}

/* =========================
   Responsive
========================= */

@media (max-width: 700px) {
  .page {
    padding: 22px 18px;
  }

  .header-badge {
    display: none;
  }

  .two-col {
    grid-template-columns: 1fr;
  }

  .panel {
    padding: 20px;
  }

  .form-footer {
    align-items: stretch;
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .page {
    padding: 18px 14px;
  }

  .page-header h1 {
    font-size: 27px;
  }

  .panel {
    padding: 16px;
    border-radius: 17px;
  }

  .panel-header {
    align-items: flex-start;
  }

  .panel-header h2 {
    font-size: 16px;
  }

  .title-icon {
    width: 39px;
    height: 39px;
    flex-basis: 39px;
  }

  .required-note {
    display: none;
  }

  .section-heading {
    margin-bottom: 15px;
  }

  .divider {
    margin: 24px 0;
  }

  .form-footer {
    margin-top: 24px;
  }

  .footer-note {
    align-items: flex-start;
  }
}

@media (prefers-reduced-motion: reduce) {
  input,
  select,
  .btn {
    transition: none;
  }
}
</style>