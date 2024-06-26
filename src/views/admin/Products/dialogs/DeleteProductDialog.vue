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
      text="Tem certeza que deseja excluir esse produto?"
      color="secondary text-primary"
      title="Excluir Produto"
    >
      <v-card-actions>
        <v-btn variant="outlined" text="fechar" color="primary" @click="$emit('close')" />
        <v-btn base-color="primary" variant="flat" text="confirmar" @click="deleteProduct()" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { AuthState } from '@/config/AuthStore';
import ProductServices from '@/services/ProductServices';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';

const props = defineProps(['show', 'product']);
const toast = useToast();
const store = useStore<AuthState>();

async function deleteProduct() {
  try {
    await ProductServices.delete(props.product.id, store);
    window.location.reload();
  } catch (error) {
    console.error(error);
    toast.error('Ocorreu um erro ao tentar excluir o produto.');
  }
}
</script>
