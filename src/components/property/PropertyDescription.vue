
<script setup>
defineProps({
  text: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <section class="description">
    <div class="section-heading">
      <div class="heading-icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 4h14a1.5 1.5 0 011.5 1.5v13A1.5 1.5 0 0119 20H5a1.5 1.5 0 01-1.5-1.5v-13A1.5 1.5 0 015 4z"
            stroke="currentColor"
            stroke-width="1.7"
          />

          <path
            d="M8 9h8M8 12.5h8M8 16h5"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
          />
        </svg>
      </div>

      <div>
        <h2>Description</h2>
        <p>About this property</p>
      </div>
    </div>

    <div
      v-if="text?.trim()"
      class="content"
    >
      <p>{{ text }}</p>
    </div>

    <div
      v-else
      class="empty"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z"
          stroke="currentColor"
          stroke-width="1.7"
        />

        <path
          d="M8 9h8M8 13h5"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-linecap="round"
        />
      </svg>

      <span>No description available for this property.</span>
    </div>
  </section>
</template>

<style scoped>
/* ========================================
   Section
======================================== */

.description {
  width: 100%;
}

/* ========================================
   Heading
======================================== */

.section-heading {
  display: flex;
  align-items: center;
  gap: 11px;

  margin-bottom: 16px;
}

.heading-icon {
  display: grid;
  place-items: center;

  width: 38px;
  height: 38px;

  flex: 0 0 auto;

  border-radius: 9px;

  background: #eff6ff;
  color: #2563eb;
}

.heading-icon svg {
  width: 19px;
  height: 19px;
}

.section-heading h2 {
  margin: 0;

  color: #0f172a;

  font-size: 18px;
  font-weight: 700;

  line-height: 1.3;
}

.section-heading p {
  margin: 3px 0 0;

  color: #64748b;

  font-size: 12px;
  line-height: 1.4;
}

/* ========================================
   Content
======================================== */

.content {
  padding: 16px 18px;

  border: 1px solid #e2e8f0;
  border-radius: 10px;

  background: #ffffff;
}

.content p {
  margin: 0;

  color: #475569;

  font-size: 14px;
  font-weight: 400;

  line-height: 1.8;

  white-space: pre-line;
}

/* ========================================
   Empty State
======================================== */

.empty {
  display: flex;
  align-items: center;
  gap: 9px;

  min-height: 70px;

  padding: 14px 16px;

  border: 1px dashed #d7dee8;
  border-radius: 10px;

  background: #f8fafc;

  color: #64748b;

  font-size: 13px;
}

.empty svg {
  width: 18px;
  height: 18px;

  flex: 0 0 auto;
}

/* ========================================
   Responsive
======================================== */

@media (max-width: 600px) {
  .section-heading h2 {
    font-size: 16px;
  }

  .heading-icon {
    width: 35px;
    height: 35px;
  }

  .content {
    padding: 14px;
  }

  .content p {
    font-size: 13px;
    line-height: 1.7;
  }
}
</style>
