<script setup>
defineProps({
  columns: Array,
  rows: Array,
})
</script>

<template>
  <div class="table-wrap table-as-cards">
    <table class="data-table">
      <thead>
        <tr>
          <th v-for="c in columns" :key="c.key">{{ c.label }}</th>
          <th v-if="$slots.actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td v-for="c in columns" :key="c.key" :data-label="c.label">
            <slot :name="c.key" :row="row">{{ c.format ? c.format(row[c.key], row) : row[c.key] }}</slot>
          </td>
          <td v-if="$slots.actions" data-label="Actions">
            <slot name="actions" :row="row" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
