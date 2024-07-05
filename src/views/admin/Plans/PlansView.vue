<template>
  <v-container style="width: 90vw">
    <header-component />
    <v-btn color="secondary text-primary" style="margin-top: 80px" class="mb-10" to="/admin">
      <v-icon icon="mdi-keyboard-backspace" size="x-large" />
      Voltar
    </v-btn>
    <v-card class="bg-primary text-secondary pb-4" style="width: 100%" elevation="24">
      <template v-slot:title>
        <div class="mt-4 mb-4 break-text">Gerenciar Planos</div>
      </template>
      <template v-slot:text>
        <v-row style="width: 100%" justify="space-between">
          <v-col cols="12" sm="7" md="6" lg="6">
            <v-text-field
              v-model="search"
              bg-color="secondary"
              color="primary"
              label="Buscar plano"
              append-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="5" md="6" lg="6" class="text-end">
            <v-btn
              text="Adicionar"
              size="x-large"
              color="secondary text-primary"
              class="btn-add"
              append-icon="mdi-plus"
              @click="openAddPlanDialog()"
            />
          </v-col>
        </v-row>
      </template>
      <div class="pr-8">
        <v-data-table
          :headers="tableHeaders"
          :items="plans"
          :search="search"
          :hover="true"
          style="max-width: 100%; border-radius: 5px"
          class="ma-4 bg-secondary text-primary"
          no-data-text="Nenhum plano encontrado"
          items-per-page-text="Itens por página"
        >
          <template v-slot:[`item.preco`]="{ item }">
            <span>{{ 'R$ ' + formatCurrency(item.preco) }}</span>
          </template>

          <template v-slot:[`item.idPeriodo`]="{ item }">
            <span>{{ item.idPeriodo === 1 ? 'mensal' : 'anual' }}</span>
          </template>

          <template v-slot:[`item.idSituacao`]="{ item }">
            <span>{{ item.idSituacao === 1 ? 'Ativo' : 'Inativo' }}</span>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <div style="display: flex">
              <v-icon @click="openEditPlanDialog(item)"> mdi-pencil </v-icon>
              <v-icon @click="openDeletePlanDialog(item)"> mdi-delete </v-icon>
            </div>
          </template>
        </v-data-table>
      </div>
    </v-card>
    <delete-plan-dialog
      :show="showDeletePlantDialog"
      :plan="planSelected"
      @close="showDeletePlantDialog = false"
    />
    <add-plan-dialog
      :show="showAddPlanDialog"
      :plan="planSelected"
      @close="showAddPlanDialog = false"
    />
  </v-container>
</template>

<script setup lang="ts">
import AddPlanDialog from './dialogs/AddPlanDialog.vue';
import DeletePlanDialog from './dialogs/DeletePlanDialog.vue';
import HeaderComponent from '../home/components/HeaderComponent.vue';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import type { MainState } from '@/config/MainStore';
import { formatCurrency } from '@brazilian-utils/brazilian-utils';
import { useToast } from 'vue-toastification';
import type { Plan } from '@/entity/Plan';
import PlanServices from '@/services/PlanServices';

const search = ref('');
const showAddPlanDialog = ref(false);
const showDeletePlantDialog = ref(false);
const planSelected = ref(undefined);
const plans = ref<Plan[]>([]);
const toast = useToast();
const store = useStore<MainState>();

onMounted(async () => await getPlans());

async function getPlans() {
  try {
    const response = await PlanServices.getAll(store);
    plans.value = response ? response : [];
  } catch (error) {
    console.error('Erro ao buscar planos:', error);
    toast.error('Ocorreu um erro ao tentar buscar os planos.');
  }
}

function openAddPlanDialog() {
  planSelected.value = undefined;
  showAddPlanDialog.value = true;
}

function openDeletePlanDialog(item: any) {
  planSelected.value = item;
  showDeletePlantDialog.value = true;
}

function openEditPlanDialog(item: any) {
  planSelected.value = item;
  showAddPlanDialog.value = true;
}

const tableHeaders = [
  { title: 'ID', value: 'id' },
  { title: 'Nome', value: 'nome', align: 'center' },
  {
    title: 'Preço',
    value: 'preco',
    sortable: false,
    align: 'center'
  },
  { title: 'Descrição', value: 'descricao', align: 'center' },
  { title: 'Situação', value: 'idSituacao', align: 'center' },
  { title: 'Período', value: 'idPeriodo', align: 'center' },
  { title: 'Ações', key: 'actions', sortable: false }
];
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
}
</style>
