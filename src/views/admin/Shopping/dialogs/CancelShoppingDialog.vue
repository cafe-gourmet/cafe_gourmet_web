<template>
  <v-dialog
    :model-value="props.show"
    @update:model-value="$emit('close')"
    max-width="600px"
    scrim="#262626"
    opacity="0.74"
  >
    <v-card
      class="ma-auto pa-2"
      width="80%"
      text="Tem certeza que deseja cancelar essa compra?"
      color="secondary text-primary"
      title="Cancelar Compra"
    >
      <v-card-actions>
        <v-btn variant="outlined" text="fechar" color="primary" @click="$emit('close')" />
        <v-btn base-color="primary" variant="flat" text="confirmar" @click="cancelShopping()" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { MainState } from '@/config/MainStore';
import CartServices from '@/services/CartServices';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';

const props = defineProps(['show', 'shopping']);
const toast = useToast();
const store = useStore<MainState>();

async function cancelShopping() {
  try {
    await CartServices.cancelShopping(props.shopping.id, store);
    window.location.reload();
  } catch (error) {
    console.error(error);
    toast.error('Ocorreu um erro ao tentar cancelar a compra.');
  }
}
</script>
