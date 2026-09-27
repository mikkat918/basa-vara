<template>
  <div class="page">
    <h1>Settings</h1>
    <div class="card panel">
      <label class="field">
        Email notifications
        <input class="control" type="checkbox" checked />
      </label>
      <label class="field">
        SMS notifications
        <input class="control" type="checkbox" />
      </label>
      <button class="btn btn-primary" type="button">Save changes</button>
    </div>
  </div>
</template>

<style scoped>
.panel { padding: 20px; display: grid; gap: 16px; }
.field { display: grid; gap: 8px; }
</style>
