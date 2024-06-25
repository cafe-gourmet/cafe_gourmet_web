<template>
  <v-dialog
    :model-value="props.show"
    @update:model-value="$emit('close')"
    max-width="600px"
    scrim="#262626"
    opacity="0.74"
  >
    <v-card class="ma-auto pa-2" width="80%" text="Tem certeza que deseja excluir esse produto?" color="secondary text-primary" title="Excluir Produto">
      <v-card-actions>
        <v-btn variant="outlined" text="fechar" color="primary" @click="$emit('close')" />
        <v-btn base-color="primary" variant="flat" text="confirmar" @click="$emit('close')" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps(['show', 'product']);
</script>
