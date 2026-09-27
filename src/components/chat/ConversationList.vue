<script setup>
import ConversationItem from './ConversationItem.vue'
defineProps({ items: Array, activeId: String })
defineEmits(['select'])
</script>

<template>
  <div class="list">
    <ConversationItem
      v-for="item in items"
      :key="item.id"
      :item="item"
      :active="item.id === activeId"
      @click="$emit('select', item.id)"
    />
  </div>
</template>
