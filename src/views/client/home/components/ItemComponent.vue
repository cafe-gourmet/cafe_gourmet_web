<template>
  <v-card class="bg-secondary pa-2 ma-auto" max-width="9rem">
    <v-img
      src="https://cdn.irmaospatrocinio.com.br/img/p/1/7/4/1/6/0/174160-large_default.jpg"
      width="150"
      style="border: 2px solid #5a2e2e; border-radius: 5px"
    />
    <div class="mt-2">{{ props.item.nome }}</div>
    <v-row class="mt-4">
      <v-col>R$ {{ formatCurrency(props.item.preco) }}</v-col>
    </v-row>
    <v-row class="pa-2">
      <v-btn color="primary" width="100%" @click="addItemToCart()">
        <v-icon class="cursor-pointer" color="secondary" size="25"
          >mdi-cart-plus</v-icon
        >
      </v-btn>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import type { MainState } from '@/config/MainStore';
import { formatCurrency } from '@brazilian-utils/brazilian-utils';
import { useStore } from 'vuex';

const props = defineProps(['item']);
const store = useStore<MainState>();

function addItemToCart() {
  if (props.item.descricao) {
    store.commit('addPlanToCart', props.item);
  } else {
    store.commit('addProductToCart', props.item);
  }
}
</script>
