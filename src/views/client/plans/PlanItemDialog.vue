<template>
  <v-dialog
    :model-value="props.show"
    v-if="props.item"
    @update:model-value="close()"
    :scrollable="true"
    max-width="90%"
    scrim="#262626"
    opacity="0.74"
  >
    <v-card class="pa-4" color="secondary" rounded="lg">
      <v-row justify="end" style="height: 80px">
        <v-btn color="text-primary" variant="text" icon="mdi-close" size="large" @click="close()" />
      </v-row>
      <v-container
        class="bg-primary"
        style="background-color: transparent !important"
        height="300px"
      >
        <v-carousel
          color="primary"
          cycle
          height="250"
          style="border-radius: 10px"
          show-arrows="hover"
        >
          <v-carousel-item v-for="(image, index) in carouselImages" :key="index" :src="image" />
        </v-carousel>
      </v-container>
      <div class="mt-2 font-weight-bold" style="font-size: 1.2rem">
        {{ props.item?.nome }}
      </div>
      <div class="mt-1">
        <strong>Período: </strong> {{ props.item.idPeriodo === 1 ? 'Mensal' : 'Anual' }}
      </div>
      <div class="mt-1">
        <strong>Descrição:</strong> Produto com alto requinte para paladares diversos, quase um
        especial de tão saboroso.
      </div>
      <div class="mt-1 font-weight-bold">Valores:</div>
      <div class="mt-1 font-weight-bold" style="font-size: 1.2rem">
        R$ {{ formatCurrency(props.item.preco) }}
      </div>
      <div class="mt-1 font-weight-bold" style="font-size: 1.2rem">
        R$ {{ formatCurrency(props.item.preco) }} no plano mensal
      </div>
      <div class="mt-1 font-weight-bold" style="font-size: 1.2rem">
        R$ {{ formatCurrency(props.item.preco) }} no plano anual
      </div>
      <v-btn
        v-if="!props.cart"
        color="primary"
        class="my-4"
        @click="store.commit('addPlanToCart', props.item)"
        >Adicionar ao Carrinho</v-btn
      >
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { formatCurrency } from '@brazilian-utils/brazilian-utils';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const props = defineProps(['show', 'cart', 'item']);
const carouselImages = ref<any[]>([]);
const genericImage =
  'https://s.tmimgcdn.com/scr/800x500/273800/modelo-de-logotipo-de-cafeteria-ilustracao-vetorial-v3_273846-original.jpg';
const store = useStore();
const emit = defineEmits(['close']);

onMounted(() => getImages());

function getImages() {
  carouselImages.value = [
    props.item?.imgPlano1 || genericImage,
    props.item?.imgPlano2 || genericImage,
    props.item?.imgPlano3 || genericImage
  ];
}

function close() {
  emit('close');
}
</script>

<style scoped>
.mdi-chevron-right {
  color: white;
}
</style>
