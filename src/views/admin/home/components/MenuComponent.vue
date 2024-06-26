<template>
  <v-container class="menuContainer" style="display: flex" v-if="props.show" fluid>
    <v-card
      color="primary text-secondary"
      min-width="220px"
      max-width="400px"
      width="80%"
      height="100%"
      class="py-4 px-4"
    >
      <v-row>
        <v-col
          cols="9"
          class="text-h6 font-weight-bold cursor-pointer"
          @click="router.push('/admin')"
        >
          Café Gourmet
        </v-col>
        <v-col cols="3" class="text-end">
          <v-icon size="large" @click="close">mdi-close</v-icon>
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <v-col cols="12" class="font-weight-bold"> Administração </v-col>
      </v-row>
      <v-divider color="secondary" :thickness="2" class="border-opacity-50 mt-2" />
      <div class="mt-4 mb-2 cursor-pointer" @click="router.push('/admin/products')">Produtos</div>
      <div class="mb-2 cursor-pointer" @click="router.push('/admin/plans')">Planos</div>
      <div class="mb-2 cursor-pointer" @click="router.push('/admin/users')">Usuários</div>
      <div class="mb-8 cursor-pointer" @click="router.push('/admin/categories')">Categorias</div>

      <v-row>
        <v-col cols="12" class="font-weight-bold"> Conta </v-col>
      </v-row>
      <v-divider color="secondary" :thickness="2" class="border-opacity-50 mt-2" />
      <div class="mt-4 mb-2 cursor-pointer" @click="logout()">Sair</div>
    </v-card>
    <v-card width="100%" height="100%" style="background-color: transparent" :onclick="close" />
  </v-container>
</template>

<script setup lang="ts">
import router from '@/router';
import UserServices from '@/services/UserServices';
import { useStore } from 'vuex';

const props = defineProps(['show']);
const emit = defineEmits(['close']);
const store = useStore();

function close() {
  emit('close');
}

function logout() {
  UserServices.logout(store);
}
</script>

<style scoped>
.menuContainer {
  background-color: rgba(26, 26, 26, 0.74);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 0;
  padding: 0;
}
</style>
