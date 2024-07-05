<template>
  <v-container fluid class="container">
    <header-component />
    <v-sheet
      style="margin-top: 100px"
      :height="200"
      width="100%"
      color="primary text-secondary"
      class="d-flex align-center justify-center text-h4"
    >
      {{ contact.descricao }}
    </v-sheet>
    <v-sheet
      :height="200"
      width="100%"
      color="secondary text-primary"
      class="d-flex align-center justify-center"
    >
      <v-row style="max-width: 80%; margin: auto">
        <v-col cols="12" sm="6" md="4" lg="4">
          <div class="d-flex flex-column justify-center">
            <v-icon size="x-large">mdi-email-outline</v-icon>
            <div class="text-h6 my-2">E-mail</div>
            <div class="text-subtitle-1 mb-2">Tem alguma dúvida?</div>
            <div class="text-subtitle-1 font-weight-bold">{{ contact.email }}</div>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="4">
          <div class="d-flex flex-column justify-center">
            <v-icon size="x-large">mdi-phone-outline</v-icon>
            <div class="text-h6 my-2">Telefone</div>
            <div class="text-subtitle-1 mb-2">Ligações e Whatsapp</div>
            <div class="text-subtitle-1 font-weight-bold">{{ contact.telefone }}</div>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="4">
          <div class="d-flex flex-column justify-center">
            <v-icon size="x-large">mdi-map-outline</v-icon>
            <div class="text-h6 my-2">Pessoalmente</div>
            <div class="text-subtitle-1 mb-2">Venha nos visitar</div>
            <div class="text-subtitle-1 font-weight-bold">{{ contact.endereco }}</div>
          </div>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import HeaderComponent from '../home/components/HeaderComponent.vue';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'vue-toastification';
import Contact from '@/entity/Contact';
import ContactServices from '@/services/ContactServices';

const store = useStore();
const contact = ref<Contact>(new Contact());
const loading = ref(false);
const toast = useToast();

onMounted(async () => await getContactData());

async function getContactData() {
  try {
    loading.value = true;
    const response = await ContactServices.getAll(store);
    contact.value = response ? response[0] : new Contact();
  } catch (error) {
    console.error('Erro ao buscar a descrição da página:', error);
    toast.error('Ocorreu um erro ao tentar buscar a descrição da tela.');
  } finally {
    loading.value = false;
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
