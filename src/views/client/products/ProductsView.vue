<template>
  <v-container class="bg-primary text-secondary container" fluid>
    <header-component />
    <v-container fluid style="margin-top: 80px">
      <v-btn color="secondary text-primary" class="mb-4" to="/client">
        <v-icon icon="mdi-keyboard-backspace" size="x-large" />
        Voltar
      </v-btn>
      <v-row class="font-weight-bold" style="font-size: 1.5rem; width: 100%">
        <v-col cols="9">Nossos Produtos</v-col>
        <v-col
          cols="3"
          align-self="end"
          style="display: flex; justify-content: end; align-items: end"
        >
          <v-btn variant="outlined">
            <v-icon icon="mdi-filter-outline" size="25" />
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="mt-8">
        <v-col
          v-for="(item, index) in productItems"
          :key="index"
          cols="6"
          sm="3"
          md="3"
          lg="2"
          align-self="center"
          class="d-flex justify-center"
        >
          <item-component :item="item" @click="showProductDialog(item)" class="product-item" />
        </v-col>
      </v-row>
    </v-container>
    <product-item-dialog
      :show="showProductItemDialog"
      :item="productSelected"
      @close="closeProductDialog()"
    />
  </v-container>
</template>

<script setup lang="ts">
import HeaderComponent from './../home/components/HeaderComponent.vue';
import ItemComponent from '../home/components/ItemComponent.vue';
import ProductItemDialog from './dialogs/ProductItemDialog.vue';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'vue-toastification';
import type { ProductResponseDTO } from '@/types/responses/admin/ProductResponseDTO';
import ProductServices from '@/services/ProductServices';

const store = useStore();
const toast = useToast();
const showProductItemDialog = ref(false);
const productItems = ref<ProductResponseDTO[]>([]);
const productSelected = ref<ProductResponseDTO>();

onMounted(async () => await getProducts());

async function getProducts() {
  try {
    const response = await ProductServices.getAll(store);
    productItems.value = response ? response : [];
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    toast.error('Ocorreu um erro ao tentar buscar os produtos.');
  }
}

function showProductDialog(item: any) {
  productSelected.value = item;
  showProductItemDialog.value = true;
}

function closeProductDialog() {
  productSelected.value = undefined;
  showProductItemDialog.value = false;
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}

.product-item {
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 18rem;
  overflow: hidden;
}
</style>
