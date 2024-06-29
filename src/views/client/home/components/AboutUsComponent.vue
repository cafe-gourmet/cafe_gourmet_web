<template>
    <v-container fluid class="container" >
      <header-component />
      
      <v-img :src="rimaLogo" width="500" style="margin-top: 100px"/>
      <div>
        <h1 class="text-center">Sobre Nós</h1>
        <br/>
        {{ aboutUs?.descricao }}
      </div>
    </v-container>
  </template>
  
  <script setup lang="ts">
  
  import HeaderComponent from './HeaderComponent.vue';
  import type { AboutUs } from '@/entity/AboutUs';
  import AboutUsServices from '@/services/AboutUsServices';
  import { onMounted, ref } from 'vue';
  import rimaLogo from '../../../../img/sobre-nos.jpeg';
  import { useStore } from 'vuex';
  onMounted(async () => await getDescription());
  const store = useStore();
  const aboutUs = ref<AboutUs>();
  
  async function getDescription() {
    
    try {
      const response = await AboutUsServices.getAll(store);
      aboutUs.value =  response[0];
      console.log(response);
    } catch (error) {
      console.error('Erro ao buscar o texto:', error);
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
  