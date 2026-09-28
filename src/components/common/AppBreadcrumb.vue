<script setup>
defineProps({
  items: { type: Array, required: true },
})
</script>


<template>
  <nav class="crumbs" aria-label="Breadcrumb">
    <ol>
      <li
        v-for="(item, i) in items"
        :key="item.label"
        class="crumb-item"
        :class="{ current: i === items.length - 1 }"
      >
        <router-link
          v-if="item.to && i < items.length - 1"
          :to="item.to"
          class="crumb-link"
        >
          <svg
            v-if="i === 0"
            class="home-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M3 10.5 12 3l9 7.5" />
            <path d="M5.5 9.5V21h13V9.5" />
            <path d="M9 21v-6h6v6" />
          </svg>

          <span>{{ item.label }}</span>
        </router-link>

        <span
          v-else
          class="crumb-current"
          aria-current="page"
        >
          {{ item.label }}
        </span>

        <svg
          v-if="i < items.length - 1"
          class="separator"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.crumbs {
  width: 100%;
  margin: 0 0 16px;
}

.crumbs ol {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 3px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.crumb-item {
  display: inline-flex;
  align-items: center;
  min-width: 0;
}

.crumb-link,
.crumb-current {
  display: inline-flex;
  align-items: center;
  min-width: 0;
  max-width: 240px;
  color: #7b8780;
  font-size: 11px;
  font-weight: 650;
  line-height: 1.4;
  text-decoration: none;
  transition:
    color 0.18s ease,
    background 0.18s ease;
}

.crumb-link {
  gap: 5px;
  padding: 5px 7px;
  border-radius: 7px;
}

.crumb-link:hover {
  background: #eef8f1;
  color: #19864c;
}

.crumb-current {
  padding: 5px 7px;
  color: #344239;
  font-weight: 750;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.home-icon {
  width: 13px;
  height: 13px;
  flex: 0 0 auto;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.separator {
  width: 13px;
  height: 13px;
  flex: 0 0 auto;
  margin: 0 1px;
  color: #b4bdb8;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Mobile */
@media (max-width: 600px) {
  .crumbs {
    margin-bottom: 12px;
  }

  .crumb-link,
  .crumb-current {
    max-width: 180px;
    font-size: 10px;
  }

  .crumb-link,
  .crumb-current {
    padding: 4px 5px;
  }

  .separator {
    width: 11px;
    height: 11px;
  }
}

@media (max-width: 420px) {
  .crumb-link,
  .crumb-current {
    max-width: 130px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .crumb-link {
    transition: none;
  }
}
</style>
