<template>
  <v-container style="width: 90vw">
    <header-component />
    <v-card
      class="bg-primary text-secondary pb-4"
      style="width: 100%; margin-top: 100px"
      elevation="24"
    >
      <template v-slot:title>
        <div class="mt-4 mb-4 break-text">Gerenciar Tela de Sobre Nós</div>
      </template>
      <template v-slot:text>
        <div class="pa-4">
          <v-row>
            <v-col cols="12">
              <froala 
                label="Descrição"
                v-model:value="aboutUs.descricao"
                variant="solo"
                bg-color="secondary"
                :loading="loading"></froala>
            </v-col>
          </v-row>
          <v-row class="text-end">
            <v-col cols="12">
              <v-btn
                text="atualizar"
                class="btn-full btn-confirmar"
                size="large"
                color="secondary text-primary"
                @click="updateAboutUs()"
                :loading="loading"
              />
            </v-col>
          </v-row>
        </div>
      </template>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import type { MainState } from '@/config/MainStore';
import { AboutUs } from '@/entity/AboutUs';
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';
import HeaderComponent from '../home/components/HeaderComponent.vue';
import AboutUsServices from '@/services/AboutUsServices';

const aboutUs = ref<AboutUs>(new AboutUs());
const loading = ref(false);
const toast = useToast();
const store = useStore<MainState>();

onMounted(async () => await getAboutUs());

async function getAboutUs() {
  try {
    loading.value = true;
    const response = await AboutUsServices.getAll(store);
    aboutUs.value = response ? response[0] : new AboutUs();
  } catch (error) {
    console.error('Erro ao buscar a descrição da página:', error);
    toast.error('Ocorreu um erro ao tentar buscar a descrição da tela.');
  } finally {
    loading.value = false;
  }
}

async function updateAboutUs() {
  try {
    loading.value = true;
    const response = await AboutUsServices.update(aboutUs.value, store);
    aboutUs.value = response ? response : new AboutUs();
    toast.success('Descrição atualizada com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar a descrição da página:', error);
    toast.error('Ocorreu um erro ao tentar atualizar a descrição da tela.');
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.break-text {
  font-size: 2rem;
}

@media (max-width: 600px) {
  .btn-add {
    width: 100%;
  }
  .break-text {
    font-size: 1.5rem;
  }
  .btn-full {
    width: 100%;
  }
  .btn-confirmar {
    margin-top: 20px;
  }
}
</style>
