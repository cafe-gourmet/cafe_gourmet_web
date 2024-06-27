<template>
  <v-container fluid class="container">
    <header-component />
    <div style="margin-top: 100px" class="text-h4">Principais Funcionalidades</div>
    <v-row class="mt-8">
      <v-col
        v-for="(option, index) in cardOptions"
        :key="index"
        cols="6"
        sm="3"
        md="3"
        lg="3"
        align-self="center"
        style="max-width: 250px"
      >
        <card-component :icon="option.icon" :text="option.text" :redirect="option.redirect" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue';
import CardComponent from './components/CardComponent.vue';

const cardOptions = [
  {
    icon: 'mdi-account-outline',
    text: 'Usuários',
    redirect: '/admin/users'
  },
  {
    icon: 'mdi-view-list-outline',
    text: 'Categorias',
    redirect: '/admin/categories'
  },
  {
    icon: 'mdi-briefcase-account-outline',
    text: 'Cargos',
    redirect: '/admin/users'
  },
  {
    icon: 'mdi-coffee-outline',
    text: 'Produtos',
    redirect: '/admin/products'
  },
  {
    icon: 'mdi-calendar-month-outline',
    text: 'Planos',
    redirect: '/admin/plans'
  },
  {
    icon: 'mdi-file-chart-outline',
    text: 'Relatórios',
    redirect: '/admin/users'
  },
  {
    icon: 'mdi-contacts-outline',
    text: 'Contato',
    redirect: '/admin/users'
  },
  {
    icon: 'mdi-account-group-outline',
    text: 'Sobre Nós',
    redirect: '/admin/users'
  }
];
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
