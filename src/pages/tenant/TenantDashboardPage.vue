<script setup>
import { computed, onMounted } from 'vue'
import { usePropertyStore } from '../../stores/propertyStore'
import { useWalletStore } from '../../stores/walletStore'
import { useChatStore } from '../../stores/chatStore'
import { useAuthStore } from '../../stores/authStore'
import { propertyService } from '../../services/propertyService'
import PropertyGrid from '../../components/property/PropertyGrid.vue'

const auth = useAuthStore()
const propertyStore = usePropertyStore()
const walletStore = useWalletStore()
const chatStore = useChatStore()
const saved = computed(() => propertyStore.saved)
const recommended = computed(() => propertyStore.results.slice(0, 3))

onMounted(async () => {
  await walletStore.load()
  await propertyStore.loadSaved('')
  await chatStore.loadList()
  await propertyStore.search({ page: 1, pageSize: 3 })
})

const stats = computed(() => [
  { label: 'Saved properties', value: saved.value.length },
  { label: 'Active conversations', value: chatStore.conversations.length },
  { label: 'Coin balance', value: `${walletStore.coinBalance} coins` },
  { label: 'Unlocked contacts', value: '0' },
])
</script>

<template>
  <div class="page dashboard">
    <h1>Tenant dashboard</h1>
    <div class="stats">
      <div v-for="stat in stats" :key="stat.label" class="card stat-card">
        <span>{{ stat.label }}</span>
        <strong>{{ stat.value }}</strong>
      </div>
    </div>

    <section class="cards-grid">
      <div class="card panel">
        <h2>Recently viewed</h2>
        <div v-if="propertyStore.saved.length">
          <p class="muted">Your browsing history is ready to continue.</p>
        </div>
        <p v-else class="muted">You have not viewed any properties yet.</p>
      </div>

      <div class="card panel">
        <h2>Saved properties</h2>
        <PropertyGrid v-if="saved.length" :items="saved.slice(0, 3)" :loading="propertyStore.loading" />
        <p v-else class="muted">No saved properties yet.</p>
      </div>
    </section>

    <section class="card panel">
      <h2>Recent conversations</h2>
      <ul v-if="chatStore.conversations.length" class="list">
        <li v-for="conversation in chatStore.conversations.slice(0, 3)" :key="conversation.id">
          {{ conversation.other?.name || 'Conversation' }} — {{ conversation.lastMessage || 'No messages yet' }}
        </li>
      </ul>
      <p v-else class="muted">No conversations yet.</p>
    </section>

    <section class="card panel">
      <h2>Recommended properties</h2>
      <PropertyGrid :items="recommended" :loading="propertyStore.loading" />
    </section>
  </div>
</template>

<style scoped>
.dashboard {
  display: grid;
  gap: 20px;
}
.stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}
.stat-card,
.panel {
  padding: 20px;
}
.stat-card {
  display: grid;
  gap: 8px;
}
.stat-card strong {
  font-size: 1.5rem;
  color: var(--color-primary);
}
.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}
.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}
@media (max-width: 820px) {
  .stats,
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
