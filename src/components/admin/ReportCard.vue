<script setup>
import { formatDateTime } from '../../utils/format'
defineProps({ report: Object })
defineEmits(['action'])
</script>

<template>
  <article class="card" style="padding: 16px">
    <p class="badge badge-warning">{{ report.category }}</p>
    <p>{{ report.details }}</p>
    <p class="muted">{{ report.status }} · {{ formatDateTime(report.createdAt) }}</p>
    <div class="row" style="flex-wrap: wrap">
      <button class="btn btn-secondary" type="button" @click="$emit('action', 'investigate')">Investigate</button>
      <button class="btn btn-secondary" type="button" @click="$emit('action', 'dismiss')">Dismiss</button>
      <button class="btn btn-secondary" type="button" @click="$emit('action', 'suspend-listing')">Suspend listing</button>
      <button class="btn btn-secondary" type="button" @click="$emit('action', 'suspend-user')">Suspend user</button>
      <button class="btn btn-danger" type="button" @click="$emit('action', 'block-user')">Block user</button>
    </div>
  </article>
</template>
