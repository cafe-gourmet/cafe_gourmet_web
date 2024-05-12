<template>
  <v-dialog :model-value="props.show">
    <v-card>
      <v-toolbar>
        <v-btn icon="mdi-close" @click="$emit('close')"></v-btn>
        <v-toolbar-title>Filtrar Produtos</v-toolbar-title>
      </v-toolbar>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps(['show']);
</script>
