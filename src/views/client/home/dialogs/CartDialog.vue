<template>
  <v-dialog
    v-if="cart.products.length > 0 || cart.plan"
    :model-value="props.show"
    transition="dialog-bottom-transition"
    fullscreen
  >
    <v-card color="primary">
      <v-toolbar color="secondary">
        <v-btn icon="mdi-close" color="primary" @click="$emit('close')"></v-btn>
        <v-toolbar-title class="text-primary text-h5">Carrinho</v-toolbar-title>
      </v-toolbar>
      <div class="px-8">
        <div v-if="cart.products.length > 0">
          <v-row align="center" style="margin-top: 30px">
            <v-col cols="12" class="text-h5 text-secondary"> Seus Produtos </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="6"
              lg="6"
              v-for="(product, index) in cart.products"
              :key="index"
            >
              <v-card variant="outlined" class="my-4 pa-4" style="background-color: transparent">
                <v-row>
                  <v-col cols="12" sm="12" md="4" lg="4">
                    <v-img
                      :src="
                        product.imgProduto1 ||
                        product.imgProduto2 ||
                        product.imgProduto3 ||
                        genericImage
                      "
                      style="border: 2px solid #5a2e2e; border-radius: 5px; width: 200px"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="8" lg="8">
                    <div class="mt-2 text-h6">{{ product.nome }}</div>
                    <div class="mt-2 text-subtitle-1">
                      Quantidade:
                      <span>{{ product.quantidadeSelecionada }}</span>
                    </div>
                    <div class="mt-2 text-subtitle-1">
                      <span class="cursor-pointer" @click="showProductDialog(product)"
                        >visualizar</span
                      >
                      <span class="ml-4 cursor-pointer" @click="excludeProduct(product.id)"
                        >excluir</span
                      >
                    </div>
                    <div class="text-subtitle-1 mt-2">R$ {{ formatCurrency(product.preco) }}</div>
                  </v-col>
                  <div>{{ calculateTotal() }}</div>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <div v-if="cart.plan">
          <v-row align="center" style="margin-top: 50px">
            <v-col cols="12" class="text-h5 text-secondary"> Seu Plano </v-col>
          </v-row>

          <v-col cols="12" sm="6" md="6" lg="6">
            <v-card variant="outlined" class="my-4 pa-4" style="background-color: transparent">
              <v-row>
                <v-col cols="12" sm="12" md="4" lg="4">
                  <v-img
                    :src="
                      cart.plan.imgPlano1 ||
                      cart.plan.imgPlano2 ||
                      cart.plan.imgPlano3 ||
                      genericImage
                    "
                    style="border: 2px solid #5a2e2e; border-radius: 5px; width: 200px"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="8" lg="8">
                  <div class="mt-2 text-h6">{{ cart.plan?.nome }}</div>
                  <div class="mt-2 text-subtitle-1">
                    <span class="cursor-pointer" @click="showProductItemDialog = true"
                      >visualizar</span
                    >
                    <span class="ml-4 cursor-pointer" @click="excludePlan()">excluir</span>
                  </div>
                  <div class="text-subtitle-1 mt-2">
                    R$ {{ formatCurrency(cart.plan ? cart.plan.preco : 0) }}
                  </div>
                </v-col>
              </v-row>
              <div>{{ calculateTotal() }}</div>
            </v-card>
          </v-col>
        </div>

        <v-divider color="secondary" :thickness="2" class="border-opacity-50 my-4" />
        <v-row align="center" style="height: 4rem">
          <v-col class="text-h6" cols="6"> Total </v-col>
          <v-col class="text-h6 text-end" cols="6"> R$ {{ formatCurrency(totalPrice) }} </v-col>
        </v-row>
        <v-row align="center" style="height: 4rem">
          <v-col class="text-h6" cols="6"> Com plano mensal </v-col>
          <v-col class="text-h6 text-end" cols="6">
            R$ {{ formatCurrency(totalPriceMonthly) }}
          </v-col>
        </v-row>
        <v-row align="center" style="height: 4rem">
          <v-col class="text-h6" cols="6"> Com plano anual </v-col>
          <v-col class="text-h6 text-end" cols="6"> {{ formatCurrency(totalPriceYear) }} </v-col>
        </v-row>

        <v-row align="center" class="mt-10 mb-8">
          <v-col cols="12">
            <v-btn width="100%" large color="secondary text-primary" class="mb-4 text-h6">
              Realizar Pagamento
            </v-btn>
            <v-btn width="100%" large color="secondary" variant="outlined" @click="$emit('close')">
              Continuar Comprando
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card>
    <product-item-dialog
      :show="showProductItemDialog"
      @close="closeProductDialog"
      :cart="true"
      :item="productSelected"
    />
  </v-dialog>
</template>

<script setup lang="ts">
import { ProductResponseDTO } from '@/types/responses/admin/ProductResponseDTO';
import ProductItemDialog from '../../products/dialogs/ProductItemDialog.vue';
import type { CartStore, MainState } from '@/config/MainStore';
import { formatCurrency } from '@brazilian-utils/brazilian-utils';
import { onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';

const props = defineProps(['show']);
const store = useStore<MainState>();
const cart = ref<CartStore>(store.getters.getCart);
const totalPrice = ref(0);
const totalPriceMonthly = ref(0);
const totalPriceYear = ref(0);
const showProductItemDialog = ref(false);
const productSelected = ref<ProductResponseDTO>();
const genericImage =
  'https://s.tmimgcdn.com/scr/800x500/273800/modelo-de-logotipo-de-cafeteria-ilustracao-vetorial-v3_273846-original.jpg';

onMounted(() => {
  calculateTotal();
});

function showProductDialog(item: any) {
  productSelected.value = item;
  showProductItemDialog.value = true;
}

function closeProductDialog() {
  productSelected.value = undefined;
  showProductItemDialog.value = false;
}

function excludeProduct(id: number) {
  store.commit('removeProductInCart', id);
  calculateTotal();
}

function excludePlan() {
  store.commit('removePlanInCart');
  calculateTotal();
}

watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      calculateTotal();
    }
  }
);

watch(
  () => store.getters.getCart.products,
  (newValue) => {
    if (newValue) {
      calculateTotal();
    }
  }
);

function calculateTotal() {
  calculateTotalPrice();
  calculateTotalMonthly();
  calculateTotalYear();
  return '';
}

function calculateTotalPrice() {
  let total = 0;
  if (cart.value.products.length > 0) {
    cart.value.products.forEach(
      (product) => (total += product.preco * product.quantidadeSelecionada)
    );
  }

  total += cart.value.plan ? cart.value.plan.preco : 0;
  totalPrice.value = total;
}

function calculateTotalMonthly() {
  let total = 0;
  if (cart.value.products.length > 0) {
    cart.value.products.forEach(
      (product) =>
        (total +=
          (product.preco - (product.preco * product.percentualDescontoMensal) / 100) *
          product.quantidadeSelecionada)
    );
  }

  total += cart.value.plan ? cart.value.plan.preco : 0;
  totalPriceMonthly.value = total;
}

function calculateTotalYear() {
  let total = 0;
  if (cart.value.products.length > 0) {
    cart.value.products.forEach(
      (product) =>
        (total +=
          (product.preco - (product.preco * product.percentualDescontoAnual) / 100) *
          product.quantidadeSelecionada)
    );
  }

  total += cart.value.plan ? cart.value.plan.preco : 0;
  totalPriceYear.value = total;
}
</script>

<style scoped>
.img-item {
  width: 250px;
}
@media (min-width: 400px) {
}
</style>
