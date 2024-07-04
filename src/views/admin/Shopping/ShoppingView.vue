<template>
  <v-container style="width: 90vw">
    <header-component />
    <v-card
      class="bg-primary text-secondary pb-4"
      style="width: 100%; margin-top: 100px"
      elevation="24"
    >
      <template v-slot:title>
        <div class="mt-4 mb-4 break-text">Gerenciar Compras</div>
      </template>
      <template v-slot:text>
        <v-row style="width: 100%" justify="space-between">
          <v-col cols="12" sm="7" md="6" lg="6">
            <v-text-field
              v-model="search"
              bg-color="secondary"
              color="primary"
              label="Buscar compras"
              append-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
            ></v-text-field>
          </v-col>
        </v-row>
      </template>
      <div class="pr-8">
        <v-data-table
          :headers="tableHeaders"
          :items="shoppings"
          :search="search"
          :hover="true"
          style="max-width: 100%; border-radius: 5px"
          class="ma-4 bg-secondary text-primary"
          no-data-text="Nenhuma compra encontrada"
          items-per-page-text="Itens por página"
        >
          <template v-slot:[`item.produto.nome`]="{ item }">
            <span>{{ item.produto?.nome ? item.produto?.nome : '-' }}</span>
          </template>
          <template v-slot:[`item.plano.nome`]="{ item }">
            <span>{{ item.plano?.nome ? item.plano?.nome : '-' }}</span>
          </template>
          <template v-slot:[`item.qntProduto`]="{ item }">
            <span>{{ item.qntProduto ? item.qntProduto : 1 }}</span>
          </template>
          <template v-slot:[`item.status`]="{ item }">
            <span>{{ getStatus(item) }}</span>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <div style="display: flex">
              <v-icon @click="openConfirmShoopingDialog(item)" class="mr-2">
                mdi-check-circle-outline
              </v-icon>
              <v-icon @click="openCancelShoppingDialog(item)"> mdi-close-circle-outline </v-icon>
            </div>
          </template>
        </v-data-table>
      </div>
    </v-card>
    <cancel-shopping-dialog
      :show="showCancelShoppingDialog"
      :shopping="shoppingSelected"
      @close="showCancelShoppingDialog = false"
    />
    <confirm-shopping-dialog
      :show="showConfirmShoppingDialog"
      :shopping="shoppingSelected"
      @close="showConfirmShoppingDialog = false"
    />
  </v-container>
</template>

<script setup lang="ts">
import type { MainState } from '@/config/MainStore';
import type { Cart } from '@/entity/Cart';
import CartServices from '@/services/CartServices';
import CancelShoppingDialog from '@/views/admin/Shopping/dialogs/CancelShoppingDialog.vue';
import ConfirmShoppingDialog from './dialogs/ConfirmShoppingDialog.vue';
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';
import HeaderComponent from '../home/components/HeaderComponent.vue';

const search = ref('');
const showConfirmShoppingDialog = ref(false);
const showCancelShoppingDialog = ref(false);
const shoppingSelected = ref(undefined);
const shoppings = ref<Cart[]>([]);
const toast = useToast();
const store = useStore<MainState>();

onMounted(async () => await getShoppings());

async function getShoppings() {
  try {
    const response = await CartServices.getAll(store);
    shoppings.value = response ? response : [];
  } catch (error) {
    console.error('Erro ao buscar as compras:', error);
    toast.error('Ocorreu um erro ao tentar buscar as compras.');
  }
}

function openCancelShoppingDialog(item: any) {
  shoppingSelected.value = item;
  showCancelShoppingDialog.value = true;
}

function openConfirmShoopingDialog(item: any) {
  shoppingSelected.value = item;
  showConfirmShoppingDialog.value = true;
}

function getStatus(item: any) {
  if (item.statusCarrinho && !item.statusCompra) return 'Aguardando pagamento';
  if (!item.statusCarrinho && item.statusCompra) return 'Compra aprovada';
  if (!item.statusCarrinho && !item.statusCompra) return 'Compra cancelada';
}

const tableHeaders = [
  { title: 'ID', value: 'id' },
  { title: 'Nome do Produto', value: 'produto.nome', align: 'center' },
  { title: 'Quantidade do Produto', value: 'qntProduto', align: 'center' },
  { title: 'Nome do Plano', value: 'plano.nome', align: 'center' },
  { title: 'Cliente', value: 'cliente.usuario.nomeCompleto', align: 'center' },
  { title: 'Status', align: 'center', key: 'status', sortable: false },
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
