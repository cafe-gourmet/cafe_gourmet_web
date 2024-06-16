<template>
  <v-container fluid class="container">
    <header-component />
    <v-carousel color="primary" cycle height="300" style="width: 100vw; margin-top: 100px;" >
      <v-carousel-item v-for="(image, index) in carouselImages" :key="index" :src="image" cover />
    </v-carousel>
    <section-component
      title="Nossos Produtos"
      text-button="todos os produtos"
      :items="productItems"
      redirect="/client/products"
    />
    <section-component title="Nossos Planos" text-button="todos os planos" :items="planItems" redirect="/plans"/>
  </v-container>
</template>

<script setup lang="ts">
import HeaderComponent from '@/views/client/home/components/HeaderComponent.vue';
import SectionComponent from '@/views/client/home/components/SectionComponent.vue';
import { ref } from 'vue';

const carouselImages = ref([
  'https://mediaserver.almg.gov.br/acervo/639/527/1639527.jpg',
  'https://www.supremoarabica.com.br/wp-content/uploads/2019/04/10-curisoidades-sobre-o-caf%C3%A9.jpg',
  'https://static.itdg.com.br/images/auto-auto/a28650d9a16731fcd02b535f3fca1fc8/shutterstock-529515136.jpg'
]);

const productItems = [
  { text: 'Café 3 corações, gourmet, dark roast - 250g', amount: 'R$ 20,00' },
  { text: 'Café 3 corações, gourmet, dark roast - 250g', amount: 'R$ 20,00' },
  { text: 'Café 3 corações, gourmet, dark roast - 250g', amount: 'R$ 20,00' },
  { text: 'Café 3 corações, gourmet, dark roast - 250g', amount: 'R$ 20,00' }
];

const planItems = [
  { text: 'Plano simlpes - mensal', amount: 'R$ 20,00/mês' },
  { text: 'Plano simlpes - anual', amount: 'R$ 200,00/anual' },
  { text: 'Plano premium - mensal', amount: 'R$ 30,00/mês' },
  { text: 'Plano premium - anual', amount: 'R$ 300,00/anual' }
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
