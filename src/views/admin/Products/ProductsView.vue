<template>
  <v-container style="width: 90vw">
    <header-component />
    <v-card
      class="bg-primary text-secondary pb-4"
      style="width: 100%; margin-top: 100px"
      elevation="24"
    >
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
              @click="showAddUserDialog = true"
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
          no-data-text="Nenhum usuário encontrado"
          items-per-page-text="Itens por página"
        >
          <template v-slot:[`item.actions`]="{}">
            <div style="display: flex">
              <v-icon @click="showAddUserDialog = true"> mdi-pencil </v-icon>
              <v-icon @click="showDeleteUserDialog = true"> mdi-delete </v-icon>
            </div>
          </template>
        </v-data-table>
      </div>
    </v-card>
    <delete-product-dialog
      :show="showDeleteUserDialog"
      :product="productSelected"
      @close="showDeleteUserDialog = false"
    />
    <add-product-dialog
      :show="showAddUserDialog"
      :product="productSelected"
      @close="showAddUserDialog = false"
    />
  </v-container>
</template>

<script setup lang="ts">
import { Product } from '@/entity/Product';
import AddProductDialog from './dialogs/AddProductDialog.vue';
import DeleteProductDialog from './dialogs/DeleteProductDialog.vue';
import HeaderComponent from '../home/components/HeaderComponent.vue';
import { ref } from 'vue';

const search = ref('');
const showAddUserDialog = ref(false);
const showDeleteUserDialog = ref(false);
const productSelected = ref(undefined);

const tableHeaders = [
  { title: 'ID', value: 'id' },
  { title: 'Nome', value: 'nome', align: 'center' },
  { title: 'Marca', value: 'marca', align: 'center' },
  {
    title: 'Preço',
    key: 'preco',
    value: (item: Product) => `${item.preco}`,
    sortable: false,
    align: 'center'
  },
  { title: 'ID Categoria', value: 'idCategoria', align: 'center' },
  { title: 'Quantidade', value: 'quantidade', align: 'center' },
  { title: 'Desconto Mensal', value: 'percentualDescontoMensal', align: 'center' },
  { title: 'Desconto Anual', value: 'percentualDescontoAnual', align: 'center' },
  { title: 'Ações', key: 'actions', sortable: false }
];

const products: Product[] = [
  {
    id: 1,
    nome: 'Produto A',
    marca: 'Marca X',
    preco: 100.0,
    codigoBarras: '1234567890123',
    idCategoria: 1,
    quantidade: 50,
    percentualDescontoMensal: 5,
    percentualDescontoAnual: 10
  },
  {
    id: 2,
    nome: 'Produto B',
    marca: 'Marca Y',
    preco: 200.5,
    codigoBarras: '0987654321098',
    idCategoria: 2,
    quantidade: 30,
    percentualDescontoMensal: 10,
    percentualDescontoAnual: 15
  },
  {
    id: 3,
    nome: 'Produto C',
    marca: 'Marca Z',
    preco: 300.75,
    codigoBarras: '1122334455667',
    idCategoria: 3,
    quantidade: 20,
    percentualDescontoMensal: 8,
    percentualDescontoAnual: 12
  },
  {
    id: 4,
    nome: 'Produto D',
    marca: 'Marca W',
    preco: 150.25,
    codigoBarras: '2233445566778',
    idCategoria: 4,
    quantidade: 40,
    percentualDescontoMensal: 6,
    percentualDescontoAnual: 11
  },
  {
    id: 5,
    nome: 'Produto E',
    marca: 'Marca V',
    preco: 250.0,
    codigoBarras: '3344556677889',
    idCategoria: 5,
    quantidade: 60,
    percentualDescontoMensal: 7,
    percentualDescontoAnual: 13
  }
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