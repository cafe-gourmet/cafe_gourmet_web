<template>
  <v-container class="header bg-secondary">
    <v-row>
      <v-col cols="2" class="py-4 pr-0">
        <v-icon color="primary" size="2.4rem" class="cursor-pointer" @click="showMenu = true">
          mdi-menu
        </v-icon>
      </v-col>
      <v-col cols="7" class="px-1">
        <v-text-field
          class="mt-1"
          density="compact"
          placeholder="Buscar café"
          hide-details
          single-line
          append-inner-icon="mdi-magnify"
          bg-color="primary"
          style="color: #fffedf !important"
          variant="outlined"
          @click:append-inner="() => {}"
        />
      </v-col>
      <v-col cols="1" class="py-4 px-0" style="width: fit-content">
        <v-badge :content="0" color="primary" class="cursor-pointer">
          <v-icon color="primary" size="2.4rem">mdi-shopping-outline</v-icon>
        </v-badge>
      </v-col>
      <v-col cols="2" class="py-4">
        <v-icon color="primary" size="2.4rem" class="cursor-pointer"
          >mdi-account-circle-outline</v-icon
        >
      </v-col>
    </v-row>
    <menu-component :show="showMenu" @close="showMenu = false" />
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import menuComponent from './menuComponent.vue';

const showMenu = ref(false);
</script>

<style scoped>
.header {
  position: fixed;
  z-index: 20;
  margin-left: 16px;
  margin-right: 16px;
  max-height: 65px;
  border-radius: 15px;
  padding: 8px 10px 8px 10px;
  box-sizing: border-box;
  max-width: calc(100vw - 16px);
}
</style>
