<template>
  <v-dialog
    :model-value="props.show"
    @update:model-value="$emit('close')"
    :scrollable="true"
    max-width="90%"
    scrim="#262626"
    opacity="0.74"
  >
    <v-card class="pa-4" color="secondary" rounded="lg">
      <v-row justify="end" style="height: 80px">
        <v-btn
          color="text-primary"
          variant="text"
          icon="mdi-close"
          size="large"
          @click="$emit('close')"
        />
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
        Café 3 corações, gourmet, dark roast - 250g
      </div>
      <div class="mt-1"><strong>Marca:</strong> 3 corações</div>
      <div class="mt-1"><strong>Categoria:</strong> Café gourmet</div>
      <div class="mt-1">
        <strong>Descrição:</strong> Produto com alto requinte para paladares diversos, quase um
        especial de tão saboroso.
      </div>
      <div class="mt-1 font-weight-bold">Valores:</div>
      <div class="mt-1 font-weight-bold" style="font-size: 1.2rem">R$ 20,00 à vista</div>
      <div class="mt-1 font-weight-bold" style="font-size: 1.2rem">R$ 18,00 no plano mensal</div>
      <div class="mt-1 font-weight-bold" style="font-size: 1.2rem">R$ 16,00 no plano anual</div>
      <div class="mt-1">
        <span class="font-weight-bold">Quantidade: </span>
        <v-icon icon="mdi-minus-circle-outline" class="mx-2" @click="subtractQuantity" />
        <span class="font-weight-bold"> {{ quantity }} </span>
        <v-icon icon="mdi-plus-circle-outline" class="mx-2" @click="addQuantity" />
      </div>
      <v-btn color="primary" class="my-4">Adicionar ao Carrinho</v-btn>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps(['show']);

const quantity = ref(0);

const carouselImages = ref([
  'https://cdn.irmaospatrocinio.com.br/img/p/1/7/4/1/6/0/174160-large_default.jpg',
  'https://mercafefaststore.vtexassets.com/arquivos/ids/552291/02326_kit-9.png?v=638373958180430000',
  'https://www.cafe3coracoes.com.br/wp-content/uploads/2022/05/gourmet-dark-min.jpg'
]);

function addQuantity() {
  quantity.value += 1;
}

function subtractQuantity() {
  if (quantity.value > 0) {
    quantity.value -= 1;
  }
}
</script>

<style scoped>
.mdi-chevron-right {
  color: white;
}
</style>
