<template>
  <v-card class="bg-secondary pa-2 ma-auto" max-width="9rem">
    <v-img :src="getImage()" width="150" max-height="100" style="border: 2px solid #5a2e2e; border-radius: 5px" />
    <div class="mt-2 item-text">{{ props.item.nome }}</div>
    <v-row class="mt-4">
      <v-col>R$ {{ formatCurrency(props.item.preco) }}</v-col>
    </v-row>
    <v-row class="pa-2">
      <v-btn color="primary" width="100%" @click="addItemToCart()">
        <v-icon class="cursor-pointer" color="secondary" size="25">mdi-cart-plus</v-icon>
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
const genericImage =
  'https://s.tmimgcdn.com/scr/800x500/273800/modelo-de-logotipo-de-cafeteria-ilustracao-vetorial-v3_273846-original.jpg';

function getImage() {
  return (
    props.item?.imgProduto1 ||
    props.item?.imgProduto2 ||
    props.item?.imgProduto3 ||
    props.item?.imgPlano1 ||
    props.item?.imgPlano2 ||
    props.item?.imgPlano3 ||
    genericImage
  );
}

function addItemToCart() {
  if (props.item.descricao) {
    store.commit('addPlanToCart', props.item);
  } else {
    store.commit('addProductToCart', props.item);
  }
}
</script>

<style scoped>
.item-text {
  max-width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.9rem;
}
</style>
