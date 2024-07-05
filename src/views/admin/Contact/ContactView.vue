<template>
  <v-container style="width: 90vw">
    <header-component />
    <v-card
      class="bg-primary text-secondary pb-4"
      style="width: 100%; margin-top: 100px"
      elevation="24"
    >
      <template v-slot:title>
        <div class="mt-4 mb-4 break-text">Gerenciar Tela de Contato</div>
      </template>
      <template v-slot:text>
        <div class="pa-4">
          <v-row>
            <v-col cols="12" sm="6" md="4" lg="4">
              <v-text-field
                label="Nome"
                variant="solo"
                v-model="contact.nome"
                bg-color="secondary"
                color="primary"
                :loading="loading"
              />
            </v-col>

            <v-col cols="12" sm="6" md="4" lg="4">
              <v-text-field
                label="Email"
                variant="solo"
                v-model="contact.email"
                bg-color="secondary"
                color="primary"
                :loading="loading"
              />
            </v-col>

            <v-col cols="12" sm="6" md="4" lg="4">
              <v-text-field
                label="Telefone"
                variant="solo"
                v-model="contact.telefone"
                bg-color="secondary"
                color="primary"
                :loading="loading"
              />
            </v-col>

            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                label="Endereço"
                variant="solo"
                bg-color="secondary"
                color="primary"
                v-model="contact.endereco"
                :loading="loading"
              />
            </v-col>

            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                label="Link do Google Maps"
                variant="solo"
                v-model="contact.linkGoogleMaps"
                bg-color="secondary"
                color="primary"
                :loading="loading"
              />
            </v-col>

            <v-col cols="12">
              <v-textarea
                label="Descrição"
                v-model="contact.descricao"
                variant="solo"
                bg-color="secondary"
                :loading="loading"
              />
            </v-col>
          </v-row>

          <v-row class="text-end">
            <v-col cols="12">
              <v-btn
                text="atualizar"
                class="btn-full btn-confirmar"
                size="large"
                color="secondary text-primary"
                @click="updateContact()"
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
import Contact from '@/entity/Contact';
import ContactServices from '@/services/ContactServices';
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';
import HeaderComponent from '../home/components/HeaderComponent.vue';

const contact = ref<Contact>(new Contact());
const loading = ref(false);
const toast = useToast();
const store = useStore<MainState>();

onMounted(async () => await getContact());

async function getContact() {
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

async function updateContact() {
  try {
    loading.value = true;
    const response = await ContactServices.update(contact.value, store);
    contact.value = response ? response : new Contact();
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
