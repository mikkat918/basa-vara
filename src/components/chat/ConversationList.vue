<script setup>
import ConversationItem from './ConversationItem.vue'
defineProps({ items: Array, activeId: String })
defineEmits(['select'])
</script>

```vue
<template>
  <div class="list">
    <div v-if="items?.length" class="conversation-list">
      <ConversationItem
        v-for="item in items"
        :key="item.id"
        :item="item"
        :active="item.id === activeId"
        @click="$emit('select', item.id)"
      />
    </div>

    <div v-else class="list-empty">
      <div class="empty-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H7l-3 2v-4.2A7.5 7.5 0 1 1 20 11.5Z"
          />
          <path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01" />
        </svg>
      </div>

      <strong>No conversations</strong>
      <span>Your conversations will appear here.</span>
    </div>
  </div>
</template>

<style scoped>
.list {
  width: 100%;
  min-width: 0;
}

.conversation-list {
  display: grid;
  gap: 3px;
  width: 100%;
}

/* Empty state */
.list-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  padding: 24px 14px;
  box-sizing: border-box;
  text-align: center;
}

.empty-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-bottom: 10px;
  border: 1px solid #dcebe2;
  border-radius: 13px;
  background: #edf8f1;
  color: #218850;
}

.empty-icon svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.list-empty strong {
  color: #3b4941;
  font-size: 12px;
  font-weight: 800;
}

.list-empty span {
  max-width: 180px;
  margin-top: 4px;
  color: #929b96;
  font-size: 9px;
  line-height: 1.5;
}

@media (max-width: 480px) {
  .conversation-list {
    gap: 2px;
  }

  .list-empty {
    min-height: 180px;
  }
}
</style>
