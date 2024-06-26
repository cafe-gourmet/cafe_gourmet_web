<template>
  <v-container style="width: 90vw">
    <header-component />
    <v-card
      class="bg-primary text-secondary pb-4"
      style="width: 100%; margin-top: 100px"
      elevation="24"
    >
      <template v-slot:title>
        <div class="mt-4 mb-4 break-text">Gerenciar Categorias</div>
      </template>
      <template v-slot:text>
        <v-row style="width: 100%" justify="space-between">
          <v-col cols="12" sm="7" md="6" lg="6">
            <v-text-field
              v-model="search"
              bg-color="secondary"
              color="primary"
              label="Buscar categoria"
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
              @click="openAddCategoryDialog()"
            />
          </v-col>
        </v-row>
      </template>
      <div class="pr-8">
        <v-data-table
          :headers="tableHeaders"
          :items="categories"
          :search="search"
          :hover="true"
          style="max-width: 100%; border-radius: 5px"
          class="ma-4 bg-secondary text-primary"
          no-data-text="Nenhuma categoria encontrada"
          items-per-page-text="Itens por página"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <div style="display: flex">
              <v-icon @click="openEditCategoryDialog(item)"> mdi-pencil </v-icon>
              <v-icon @click="openDeleteCategoryDialog(item)"> mdi-delete </v-icon>
            </div>
          </template>
        </v-data-table>
      </div>
    </v-card>
    <delete-category-dialog
      :show="showDeleteCategoryDialog"
      :category="categorySelected"
      @close="showDeleteCategoryDialog = false"
    />
    <add-category-dialog
      :show="showAddCategoryDialog"
      :category="categorySelected"
      @close="showAddCategoryDialog = false"
    />
  </v-container>
</template>

<script setup lang="ts">
import AddCategoryDialog from './dialogs/AddCategoryDialog.vue';
import DeleteCategoryDialog from './dialogs/DeleteCategoryDialog.vue';
import HeaderComponent from '../home/components/HeaderComponent.vue';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import type { AuthState } from '@/config/AuthStore';
import type { Category } from '@/entity/Category';
import CategoryServices from '@/services/CategoryServices';
import { useToast } from 'vue-toastification';

const search = ref('');
const showAddCategoryDialog = ref(false);
const showDeleteCategoryDialog = ref(false);
const categorySelected = ref(undefined);
const categories = ref<Category[]>([]);
const toast = useToast()
const store = useStore<AuthState>();

onMounted(async () => await getCategories());

async function getCategories() {
  try {
    const response = await CategoryServices.getAll(store);
    categories.value = response ? response : [];
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    toast.error('Ocorreu um erro ao tentar buscar as categorias.')
  }
}

function openAddCategoryDialog() {
  categorySelected.value = undefined;
  showAddCategoryDialog.value = true;
}

function openDeleteCategoryDialog(item: any) {
  categorySelected.value = item;
  showDeleteCategoryDialog.value = true;
}

function openEditCategoryDialog(item: any) {
  categorySelected.value = item;
  showAddCategoryDialog.value = true;
}

const tableHeaders = [
  { title: 'ID', value: 'id' },
  { title: 'Nome', value: 'nome', align: 'center' },
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
