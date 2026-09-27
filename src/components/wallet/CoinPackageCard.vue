<script setup>
import { formatBdt } from '../../utils/format'
defineProps({ pack: Object })
defineEmits(['buy'])
</script>

<template>
  <article class="card" style="padding: 16px">
    <h3>{{ pack.coins }} Coin{{ pack.coins > 1 ? 's' : '' }}</h3>
    <p class="muted">{{ formatBdt(pack.amount) }}</p>
    <button class="btn btn-primary btn-block" type="button" @click="$emit('buy', pack)">Buy</button>
  </article>
</template>
