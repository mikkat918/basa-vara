<script setup>
const props = defineProps({
  page: Number,
  pageSize: { type: Number, default: 9 },
  total: Number,
})
const emit = defineEmits(['update:page'])
const pages = () => Math.max(1, Math.ceil(props.total / props.pageSize))
</script>

<template>
  <nav class="pager" aria-label="Pagination" v-if="total > pageSize">
    <button class="btn btn-secondary" type="button" :disabled="page <= 1" @click="emit('update:page', page - 1)">
      Previous
    </button>
    <span>Page {{ page }} of {{ pages() }}</span>
    <button class="btn btn-secondary" type="button" :disabled="page >= pages()" @click="emit('update:page', page + 1)">
      Next
    </button>
  </nav>
</template>

<style scoped>
.pager {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
}
</style>
