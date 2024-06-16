<template>
  <v-container class="header bg-secondary">
    <v-icon color="primary" size="2.4rem" class="cursor-pointer" @click="showMenu = true">
      mdi-menu
    </v-icon>
    <menu-component :show="showMenu" @close="showMenu = false" />
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MenuComponent from './MenuComponent.vue';

const showMenu = ref(false);
</script>

<style scoped>
.header {
  position: absolute;
  left: 0;
  z-index: 20;
  margin-left: 16px;
  margin-right: 16px;
  max-height: 65px;
  border-radius: 10px;
  padding: 8px;
  box-sizing: border-box;
  max-width: 50px;
}
</style>
