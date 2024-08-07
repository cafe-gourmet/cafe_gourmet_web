<template>
  <v-container style="width: 90vw">
    <header-component />
    <v-btn color="secondary text-primary" style="margin-top: 80px" class="mb-10" to="/admin">
      <v-icon icon="mdi-keyboard-backspace" size="x-large" />
      Voltar
    </v-btn>
    <v-card class="bg-primary text-secondary pb-4" style="width: 100%" elevation="24">
      <template v-slot:title>
        <div class="mt-4 mb-4 break-text">Gerenciar Produtos</div>
      </template>
      <template v-slot:text>
        <v-row style="width: 100%" justify="space-between">
          <v-col cols="12" sm="7" md="6" lg="6">
            <v-text-field
              v-model="search"
              bg-color="secondary"
              color="primary"
              label="Buscar produto"
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
              @click="openAddProductDialog()"
            />
          </v-col>
        </v-row>
      </template>
      <div class="pr-8">
        <v-data-table
          :headers="tableHeaders"
          :items="products"
          :search="search"
          :hover="true"
          style="max-width: 100%; border-radius: 5px"
          class="ma-4 bg-secondary text-primary"
          no-data-text="Nenhum produto encontrado"
          items-per-page-text="Itens por página"
        >
          <template v-slot:[`item.preco`]="{ item }">
            <span>{{ 'R$ ' + formatCurrency(item.preco) }}</span>
          </template>

          <template v-slot:[`item.percentualDescontoMensal`]="{ item }">
            <span>{{ item.percentualDescontoMensal + '%' }}</span>
          </template>

          <template v-slot:[`item.percentualDescontoAnual`]="{ item }">
            <span>{{ item.percentualDescontoAnual + '%' }}</span>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <div style="display: flex">
              <v-icon @click="openEditProductDialog(item)"> mdi-pencil </v-icon>
              <v-icon @click="openDeleteProductDialog(item)"> mdi-delete </v-icon>
            </div>
          </template>
        </v-data-table>
      </div>
    </v-card>
    <delete-product-dialog
      :show="showDeleteProductDialog"
      :product="productSelected"
      @close="showDeleteProductDialog = false"
    />
    <add-product-dialog
      :show="showAddProductDialog"
      :product="productSelected"
      @close="showAddProductDialog = false"
    />
  </v-container>
</template>

<script setup lang="ts">
import AddProductDialog from './dialogs/AddProductDialog.vue';
import DeleteProductDialog from './dialogs/DeleteProductDialog.vue';
import HeaderComponent from '../home/components/HeaderComponent.vue';
import { onMounted, ref } from 'vue';
import ProductServices from '@/services/ProductServices';
import { useStore } from 'vuex';
import type { MainState } from '@/config/MainStore';
import { formatCurrency } from '@brazilian-utils/brazilian-utils';
import type { ProductResponseDTO } from '@/types/responses/admin/ProductResponseDTO';
import { useToast } from 'vue-toastification';

const search = ref('');
const showAddProductDialog = ref(false);
const showDeleteProductDialog = ref(false);
const productSelected = ref(undefined);
const products = ref<ProductResponseDTO[]>([]);
const toast = useToast();
const store = useStore<MainState>();

onMounted(async () => await getProducts());

async function getProducts() {
  try {
    const response = await ProductServices.getAll(store);
    products.value = response ? response : [];
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    toast.error('Ocorreu um erro ao tentar buscar os produtos.');
  }
}

function openAddProductDialog() {
  productSelected.value = undefined;
  showAddProductDialog.value = true;
}

function openDeleteProductDialog(item: any) {
  productSelected.value = item;
  showDeleteProductDialog.value = true;
}

function openEditProductDialog(item: any) {
  productSelected.value = item;
  showAddProductDialog.value = true;
}

const tableHeaders = [
  { title: 'ID', value: 'id' },
  { title: 'Nome', value: 'nome', align: 'center' },
  { title: 'Marca', value: 'marca', align: 'center' },
  {
    title: 'Preço',
    key: 'preco',
    value: (item: ProductResponseDTO) => `${item.preco}`,
    sortable: false,
    align: 'center'
  },
  { title: 'Categoria', value: 'categoria.nome', align: 'center' },
  { title: 'Quantidade', value: 'quantidade', align: 'center' },
  { title: 'Desconto Mensal', value: 'percentualDescontoMensal', align: 'center' },
  { title: 'Desconto Anual', value: 'percentualDescontoAnual', align: 'center' },
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
