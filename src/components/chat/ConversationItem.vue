<script setup>
import { formatRelative } from '../../utils/format'
import { initials } from '../../utils/format'
defineProps({ item: Object, active: Boolean })
</script>

<template>
  <button class="item" type="button" :class="{ active }">
    <span class="av">{{ initials(item.other?.name) }}</span>
    <span class="meta">
      <strong>{{ item.other?.name }}</strong>
      <small>{{ item.property?.title }}</small>
      <small class="muted">{{ item.lastMessage }}</small>
    </span>
    <span class="end">
      <small>{{ formatRelative(item.lastAt) }}</small>
      <span v-if="item.unread" class="badge badge-success">{{ item.unread }}</span>
    </span>
  </button>
</template>

<style scoped>
.item {
  display: grid;
  grid-template-columns: 40px 1fr auto;
  gap: 8px;
  width: 100%;
  text-align: left;
  border: 0;
  background: transparent;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
}
.item.active,
.item:hover {
  background: var(--color-primary-soft);
}
.av {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 12px;
}
.meta {
  display: grid;
}
small {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.end {
  display: grid;
  justify-items: end;
}
</style>
