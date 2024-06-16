<template>
  <v-btn class="bg-secondary card" stacked :to="props.redirect">
    <v-icon :icon="props.icon" size="x-large" class="mb-4" />
    <div class="text-h6">{{ props.text }}</div>
  </v-btn>
</template>

<script setup lang="ts">
const props = defineProps(['icon', 'text', 'redirect'])
</script>

<style scoped>
.card{
  width: 10rem;
  height: 10rem;
  border-radius: 25px;
}

@media (max-width: 400px) {
.card{
  width: 8rem;
  height: 8rem;
  border-radius: 25px;
}
}
</style>