<template>
  <v-container class="bg-primary text-secondary container" fluid>
    <header-component />
    <v-container fluid style="margin-top: 80px">
      <v-btn color="secondary text-primary" class="mb-4" to="/client">
        <v-icon icon="mdi-keyboard-backspace" size="x-large" />
        Voltar
      </v-btn>
      <v-row class="font-weight-bold" style="font-size: 1.8rem; width: 100%">
        <v-col cols="9">Suas compras</v-col>
      </v-row>
      <div v-if="items.length > 0">
        <v-row>
          <v-col cols="12" sm="6" md="6" lg="6" v-for="(item, index) in items" :key="index">
            <v-card variant="outlined" class="my-4 pa-4" style="background-color: transparent">
              <v-row>
                <v-col cols="12" sm="12" md="4" lg="4">
                  <v-img
                    :src="getImage(item)"
                    min-height="100"
                    max-height="200"
                    style="border: 2px solid #5a2e2e; border-radius: 5px; width: 200px"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="8" lg="8">
                  <div class="mt-2 text-h6">{{ item.produto?.nome || item.plano?.nome }}</div>
                  <div class="mt-2 text-subtitle-1">
                    Quantidade:
                    <span>{{ item.qntProduto || 1 }}</span>
                  </div>
                  <div class="mt-2 text-subtitle-1">Status: {{ getStatus(item) }}</div>
                  <div class="mt-2 text-subtitle-1">
                    <span class="cursor-pointer" @click="showProductDialog(item)">visualizar</span>
                  </div>
                  <div class="text-subtitle-1 mt-2">
                    R$ {{ formatCurrency(item.produto?.preco || item.plano?.preco || 0) }}
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <v-row v-else align="center" justify="center" style="margin-top: 100px">
        <v-col align="center" class="text-center ma-auto text-h5">
          {{ loading ? 'Buscando compras...' : 'Nenhuma compra finalizada ainda.' }}
        </v-col>
      </v-row>
    </v-container>
    <product-item-dialog
      :show="showProductItemDialog"
      :item="itemSelected"
      :cart="true"
      @close="closeProductDialog()"
    />
    <plan-item-dialog
      :show="showPlanItemDialog"
      :item="itemSelected"
      :cart="true"
      @close="closeProductDialog()"
    />
  </v-container>
</template>

<script setup lang="ts">
import PlanItemDialog from '../plans/PlanItemDialog.vue';
import HeaderComponent from '../../../views/client/home/components/HeaderComponent.vue';
import ProductItemDialog from '../../../views/client/products/dialogs/ProductItemDialog.vue';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'vue-toastification';
import type { ProductResponseDTO } from '@/types/responses/admin/ProductResponseDTO';
import { formatCurrency } from '@brazilian-utils/brazilian-utils';
import { Plan } from '@/entity/Plan';
import CartServices from '@/services/CartServices';
import type { Cart } from '@/entity/Cart';
import type { AuthUser } from '@/entity/AuthUser';

const store = useStore();
const toast = useToast();
const showProductItemDialog = ref(false);
const showPlanItemDialog = ref(false);
const itemSelected = ref<ProductResponseDTO | Plan>();
const genericImage =
  'https://s.tmimgcdn.com/scr/800x500/273800/modelo-de-logotipo-de-cafeteria-ilustracao-vetorial-v3_273846-original.jpg';
const items = ref<Cart[]>([]);
const loading = ref(false);

onMounted(async () => await getShoppingItems());

async function getShoppingItems() {
  try {
    loading.value = true;
    const user: AuthUser = store.getters.getAuthUser;
    if (user.cliente.id) {
      const response = await CartServices.getByIdClient(user.cliente.id, store);
      items.value = response ? response : [];
    }
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    toast.error('Ocorreu um erro ao tentar buscar os produtos.');
  }
  loading.value = false;
}

function showProductDialog(item: any) {
  if (item.produto) {
    itemSelected.value = item.produto;
    showProductItemDialog.value = true;
  } else {
    itemSelected.value = item.plano;
    showPlanItemDialog.value = true;
  }
}

function closeProductDialog() {
  itemSelected.value = undefined;
  showProductItemDialog.value = false;
}

function getStatus(item: any) {
  if (item.statusCarrinho && !item.statusCompra) return 'Aguardando pagamento';
  if (!item.statusCarrinho && item.statusCompra) return 'Compra aprovada';
  if (!item.statusCarrinho && !item.statusCompra) return 'Compra cancelada';
}

function getImage(item: any) {
  if (item.produto) {
    return (
      item.produto.imgProduto1 ||
      item.produto.imgProduto2 ||
      item.produto.imgProduto3 ||
      genericImage
    );
  }
  return item.plano?.imgPlano1 || item.plano?.imgPlano2 || item.plano?.imgPlano3 || genericImage;
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}
</style>
