<script setup>
defineProps({ modelValue: String })
defineEmits(['update:modelValue'])
</script>

<template>
  <label class="field">
    Sort
    <select class="control" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
      <option value="relevance">Relevance</option>
      <option value="newest">Newest</option>
      <option value="rent-asc">Rent: low to high</option>
      <option value="rent-desc">Rent: high to low</option>
    </select>
  </label>
</template>
