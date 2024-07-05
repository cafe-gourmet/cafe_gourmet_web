<template>
  <v-container class="bg-primary text-secondary container" fluid>
    <header-component />
    <v-container fluid style="margin-top: 80px">
      <v-btn color="secondary text-primary" class="mb-4" to="/client">
        <v-icon icon="mdi-keyboard-backspace" size="x-large" />
        Voltar
      </v-btn>
      <v-row class="font-weight-bold" style="font-size: 1.5rem; width: 100%">
        <v-col cols="9">Nossos Planos</v-col>
        <v-col
          cols="3"
          align-self="end"
          style="display: flex; justify-content: end; align-items: end"
        >
          <v-btn color="secondary">
            <v-icon icon="mdi-filter-outline" size="25" />
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="mt-8">
        <v-col
          v-for="(item, index) in planItems"
          :key="index"
          cols="6"
          sm="3"
          md="3"
          lg="2"
          align-self="center"
        >
          <item-component :item="item" @click="showProductDialog(item)" class="product-item" />
        </v-col>
      </v-row>
    </v-container>
    <plan-item-dialog
      :show="showPlanItemDialog"
      :item="planSelected"
      @close="closeProductDialog()"
    />
  </v-container>
</template>

<script setup lang="ts">
import HeaderComponent from './../home/components/HeaderComponent.vue';
import ItemComponent from '../home/components/ItemComponent.vue';
import { onMounted, ref } from 'vue';
import type { Plan } from '@/entity/Plan';
import PlanServices from '@/services/PlanServices';
import { useStore } from 'vuex';
import { useToast } from 'vue-toastification';
import PlanItemDialog from './PlanItemDialog.vue';

const store = useStore();
const toast = useToast();
const showPlanItemDialog = ref(false);
const planItems = ref<Plan[]>([]);
const planSelected = ref<Plan>();

onMounted(async () => await getPlans());

async function getPlans() {
  try {
    const response = await PlanServices.getAll(store);
    planItems.value = response ? response : [];
  } catch (error) {
    console.error('Erro ao buscar planos:', error);
    toast.error('Ocorreu um erro ao tentar buscar os planos.');
  }
}

function showProductDialog(item: any) {
  planSelected.value = item;
  showPlanItemDialog.value = true;
}

function closeProductDialog() {
  planSelected.value = undefined;
  showPlanItemDialog.value = false;
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}

.product-item {
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 18rem;
  overflow: hidden;
}
</style>
