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
      <v-col cols="3" class="py-4 px-0">
        <div style="display: flex; justify-content: end">
          <v-badge
            :content="store.getters.getCartQuantity"
            color="primary"
            class="cursor-pointer mr-1"
            @click="showCartDialog = true"
          >
            <v-icon color="primary" size="2.2rem">mdi-shopping-outline</v-icon>
          </v-badge>
          <v-icon
            color="primary"
            size="2.2rem"
            class="cursor-pointer user-icon"
            icon="mdi-account-circle-outline"
            @click="showUserDialog = true"
          />
        </div>
      </v-col>
    </v-row>
    <menu-component :show="showMenu" @close="showMenu = false" />
    <user-dialog :show="showUserDialog" @close="showUserDialog = false" />
    <cart-dialog :show="showCartDialog" @close="showCartDialog = false" />
  </v-container>
</template>

<script setup lang="ts">
import UserDialog from './../dialogs/UserDialog.vue';
import CartDialog from '../dialogs/CartDialog.vue';
import { ref } from 'vue';
import MenuComponent from './MenuComponent.vue';
import { useStore } from 'vuex';
import type { MainState } from '@/config/MainStore';

const showMenu = ref(false);
const showUserDialog = ref(false);
const showCartDialog = ref(false);
const store = useStore<MainState>()
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
.user-icon {
  margin-right: 6px;
}

@media (min-width: 500px) {
  .user-icon {
    margin-right: 20px;
    margin-left: 10px;
  }
}
</style>
