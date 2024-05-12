<template>
  <v-container class="bg-primary text-secondary container" fluid>
    <header-component />
    <v-container fluid style="margin-top: 80px">
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
          v-for="(item, index) in items"
          :key="index"
          cols="6"
          sm="3"
          md="3"
          lg="2"
          align-self="center"
        >
          <item-component :text="item.text" :amount="item.amount" @click="showProductItemDialog = true" />
        </v-col>
      </v-row>
    </v-container>
    <product-item-dialog :show="showProductItemDialog" @close="showProductItemDialog = false" />
  </v-container>
</template>

<script setup lang="ts">
import HeaderComponent from './../home/components/HeaderComponent.vue';
import ItemComponent from '../home/components/ItemComponent.vue';
import ProductItemDialog from './dialogs/ProductItemDialog.vue';
import { ref } from 'vue';

const showProductItemDialog = ref(false);

const items = [
  { text: 'Café 3 corações, gourmet, dark roast - 250g', amount: 'R$ 20,00' },
  { text: 'Café 3 corações, gourmet, dark roast - 250g', amount: 'R$ 20,00' },
  { text: 'Café 3 corações, gourmet, dark roast - 250g', amount: 'R$ 20,00' },
  { text: 'Café 3 corações, gourmet, dark roast - 250g', amount: 'R$ 20,00' },
  { text: 'Café 3 corações, gourmet, dark roast - 250g', amount: 'R$ 20,00' },
  { text: 'Café 3 corações, gourmet, dark roast - 250g', amount: 'R$ 20,00' },
  { text: 'Café 3 corações, gourmet, dark roast - 250g', amount: 'R$ 20,00' },
  { text: 'Café 3 corações, gourmet, dark roast - 250g', amount: 'R$ 20,00' },
  { text: 'Café 3 corações, gourmet, dark roast - 250g', amount: 'R$ 20,00' },
  { text: 'Café 3 corações, gourmet, dark roast - 250g', amount: 'R$ 20,00' }
];
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}
</style>
