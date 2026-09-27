<script setup>
import { onMounted } from 'vue'
import ChatView from '../../components/chat/ChatView.vue'
import { useChatStore } from '../../stores/chatStore'

const chat = useChatStore()

onMounted(() => chat.loadList())
</script>

<template>
  <div class="page">
    <ChatView />
  </div>
</template>
