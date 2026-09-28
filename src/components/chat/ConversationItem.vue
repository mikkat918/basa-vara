<script setup>
import { formatRelative } from '../../utils/format'
import { initials } from '../../utils/format'
defineProps({ item: Object, active: Boolean })
</script>

```vue
<template>
  <button
    class="item"
    type="button"
    :class="{ active }"
  >
    <!-- Avatar -->
    <span class="avatar">
      {{ initials(item.other?.name) }}

      <span
        v-if="item.unread"
        class="online-indicator"
        aria-hidden="true"
      ></span>
    </span>

    <!-- Conversation details -->
    <span class="meta">
      <span class="top-line">
        <strong>{{ item.other?.name }}</strong>

        <small class="time mobile-time">
          {{ formatRelative(item.lastAt) }}
        </small>
      </span>

      <span class="property">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5.5 9.5V21h13V9.5" />
          <path d="M9 21v-6h6v6" />
        </svg>

        {{ item.property?.title }}
      </span>

      <small
        class="last-message"
        :class="{ unread: item.unread }"
      >
        {{ item.lastMessage }}
      </small>
    </span>

    <!-- Time + unread -->
    <span class="end">
      <small class="time">
        {{ formatRelative(item.lastAt) }}
      </small>

      <span
        v-if="item.unread"
        class="unread-badge"
      >
        {{ item.unread > 99 ? '99+' : item.unread }}
      </span>
    </span>
  </button>
</template>

<style scoped>
.item {
  position: relative;
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr) auto;
  gap: 10px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 11px 9px;
  border: 1px solid transparent;
  border-radius: 12px;
  outline: none;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    background 0.18s ease,
    border-color 0.18s ease,
    transform 0.18s ease;
}

.item:hover {
  border-color: #e3ece7;
  background: #f7faf8;
}

.item.active {
  border-color: #d6e9dd;
  background: #eef8f1;
}

.item.active::before {
  position: absolute;
  top: 9px;
  bottom: 9px;
  left: 0;
  width: 3px;
  border-radius: 0 4px 4px 0;
  background: #1b9253;
  content: "";
}

.item:focus-visible {
  box-shadow: 0 0 0 3px rgba(27, 146, 83, 0.13);
}

/* =========================
   Avatar
========================= */

.avatar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  box-sizing: border-box;
  border: 2px solid #ffffff;
  border-radius: 13px;
  background: linear-gradient(135deg, #dff4e7, #ccebd8);
  color: #187c48;
  font-size: 12px;
  font-weight: 850;
  letter-spacing: 0.02em;
  box-shadow: 0 3px 10px rgba(30, 92, 54, 0.08);
}

.online-indicator {
  position: absolute;
  right: -2px;
  bottom: -2px;
  width: 8px;
  height: 8px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  background: #28a861;
}

/* =========================
   Conversation info
========================= */

.meta {
  display: grid;
  min-width: 0;
  align-content: center;
  gap: 3px;
}

.top-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-width: 0;
}

.meta strong {
  min-width: 0;
  overflow: hidden;
  color: #26342c;
  font-size: 12px;
  font-weight: 800;
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.property {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  overflow: hidden;
  color: #7e8a83;
  font-size: 9px;
  font-weight: 650;
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.property svg {
  width: 11px;
  height: 11px;
  flex: 0 0 auto;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.last-message {
  display: block;
  min-width: 0;
  overflow: hidden;
  color: #919a95;
  font-size: 10px;
  font-weight: 500;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.last-message.unread {
  color: #59665e;
  font-weight: 700;
}

/* =========================
   Right side
========================= */

.end {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  gap: 6px;
  min-width: 30px;
}

.time {
  color: #9aa39e;
  font-size: 8px;
  font-weight: 650;
  line-height: 1.3;
  white-space: nowrap;
}

.unread-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 19px;
  height: 19px;
  padding: 0 5px;
  box-sizing: border-box;
  border-radius: 999px;
  background: #1d9a55;
  color: #ffffff;
  font-size: 8px;
  font-weight: 850;
  line-height: 1;
  box-shadow: 0 3px 8px rgba(29, 154, 85, 0.2);
}

.mobile-time {
  display: none;
}

/* =========================
   Mobile
========================= */

@media (max-width: 480px) {
  .item {
    grid-template-columns: 38px minmax(0, 1fr);
    gap: 9px;
    padding: 10px 8px;
  }

  .avatar {
    width: 38px;
    height: 38px;
    border-radius: 11px;
  }

  .end {
    display: none;
  }

  .mobile-time {
    display: block;
    flex: 0 0 auto;
  }

  .meta strong {
    font-size: 11px;
  }

  .property {
    font-size: 8px;
  }

  .last-message {
    font-size: 9px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .item {
    transition: none;
  }
}
</style>