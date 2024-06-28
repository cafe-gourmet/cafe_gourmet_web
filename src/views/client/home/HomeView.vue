<template>
  <v-container fluid class="container">
    <header-component />
    <v-carousel color="primary" cycle height="300" style="width: 100vw; margin-top: 100px">
      <v-carousel-item v-for="(image, index) in carouselImages" :key="index" :src="image" cover />
    </v-carousel>
    <section-component
      title="Nossos Produtos"
      text-button="todos os produtos"
      :items="productItems"
      redirect="/client/products"
    />
    <section-component
      title="Nossos Planos"
      text-button="todos os planos"
      :items="planItems"
      redirect="/client/plans"
    />
  </v-container>
</template>

<script setup lang="ts">
import type { Plan } from '@/entity/Plan';
import PlanServices from '@/services/PlanServices';
import ProductServices from '@/services/ProductServices';
import type { ProductResponseDTO } from '@/types/responses/admin/ProductResponseDTO';
import HeaderComponent from '@/views/client/home/components/HeaderComponent.vue';
import SectionComponent from '@/views/client/home/components/SectionComponent.vue';
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';

const store = useStore();
const toast = useToast();

const carouselImages = ref([
  'https://mediaserver.almg.gov.br/acervo/639/527/1639527.jpg',
  'https://www.supremoarabica.com.br/wp-content/uploads/2019/04/10-curisoidades-sobre-o-caf%C3%A9.jpg',
  'https://static.itdg.com.br/images/auto-auto/a28650d9a16731fcd02b535f3fca1fc8/shutterstock-529515136.jpg'
]);

const productItems = ref<ProductResponseDTO[]>([]);
const planItems = ref<Plan[]>([]);

onMounted(async () => await getAllItems());

async function getAllItems() {
  await getProducts();
  await getPlans()
}

async function getProducts() {
  try {
    const response = await ProductServices.getAll(store);
    productItems.value = response ? response : [];
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    toast.error('Ocorreu um erro ao tentar buscar os produtos.');
  }
}

async function getPlans() {
  try {
    const response = await PlanServices.getAll(store);
    planItems.value = response ? response : [];
  } catch (error) {
    console.error('Erro ao buscar planos:', error);
    toast.error('Ocorreu um erro ao tentar buscar os planos.');
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}
</style>
