<template>
  <v-container style="width: 90vw">
    <header-component />
    <v-btn color="secondary text-primary" style="margin-top: 120px" class="mb-10" to="/admin">
      <v-icon icon="mdi-keyboard-backspace" size="x-large" />
      Voltar
    </v-btn>
    <v-card
      class="bg-primary text-secondary pb-4"
      style="width: 100%;"
      elevation="24"
    >
      <template v-slot:title>
        <div class="mt-4 mb-4 break-text">Baixar Relatórios</div>
      </template>
      <template v-slot:text>
        <div class="pa-4">
          <v-row class="text-center">
            <v-col cols="12" sm="6" md="4" lg="4">
              <div class="d-flex justify-center">
                <v-btn
                  size="x-large"
                  color="secondary text-primary"
                  @click="gerarRelatorioProdutos()"
                  elevation="15"
                  stacked
                  class="report-btn"
                >
                  <v-icon size="large">mdi-coffee-outline</v-icon>
                  <div class="mt-2 text-h5">Relatório de Produtos</div>
                </v-btn>
              </div>
            </v-col>

            <v-col cols="12" sm="6" md="4" lg="4">
              <div class="d-flex justify-center">
                <v-btn
                  size="x-large"
                  color="secondary text-primary"
                  @click="gerarRelatorioPlanos()"
                  elevation="15"
                  stacked
                  class="report-btn"
                >
                  <v-icon size="large">mdi-calendar-month-outline</v-icon>
                  <div class="mt-2 text-h5">Relatório de Planos</div>
                </v-btn>
              </div>
            </v-col>

            <v-col cols="12" sm="6" md="4" lg="4">
              <div class="d-flex justify-center">
                <v-btn
                  size="x-large"
                  color="secondary text-primary"
                  @click="gerarRelatorioVendas()"
                  elevation="15"
                  stacked
                  class="report-btn"
                >
                  <v-icon size="large">mdi-cart-outline</v-icon>
                  <div class="mt-2 text-h5">Relatório de Vendas</div>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </div>
      </template>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import HeaderComponent from '../home/components/HeaderComponent.vue';
import ProductServices from '@/services/ProductServices';
import { useStore } from 'vuex';
import type { ProductResponseDTO } from '@/types/responses/admin/ProductResponseDTO';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import type { Plan } from '@/entity/Plan';
import PlanServices from '@/services/PlanServices';
import type { Cart } from '@/entity/Cart';
import CartServices from '@/services/CartServices';
const store = useStore();
const toast = useToast();

async function gerarRelatorioProdutos() {
  try {
    const products = ref<ProductResponseDTO[]>([]);
    const data: any[] = [];
    const response = await ProductServices.getAll(store);
    products.value = response ? response : [];

    const head = [
      [
        'Produto',
        'Marca',
        'Preco',
        'Cód. Barras',
        'Categoria',
        'Qnt',
        'Desc. Mensal',
        'Desc. Anual'
      ]
    ];

    products.value.forEach((product) => {
      data.push([
        product.nome,
        product.marca,
        product.preco,
        product.codigoBarras,
        product.categoria.nome,
        product.quantidade,
        product.percentualDescontoMensal,
        product.percentualDescontoAnual
      ]);
    });

    gerarPDF('Relatório de Produtos', head, data);
  } catch (error) {
    console.error('Erro ao gerar o relatório de produtos:', error);
    toast.error('Erro ao gerar o relatório de produtos.');
  }
}

async function gerarRelatorioPlanos() {
  try {
    const plans = ref<Plan[]>([]);
    const data: any[] = [];
    const response = await PlanServices.getAll(store);
    plans.value = response ? response : [];

    const head = [['Plano', 'Preco', 'Descrição', 'Situação', 'Período']];

    plans.value.forEach((plan) => {
      data.push([
        plan.nome,
        plan.preco,
        plan.descricao,
        plan.situacao.descricao,
        plan.periodo.descricao
      ]);
    });

    gerarPDF('Relatório de Planos', head, data);
  } catch (error) {
    console.error('Erro ao gerar o relatório de planos:', error);
    toast.error('Erro ao gerar o relatório de planos.');
  }
}
async function gerarRelatorioVendas() {
  try {
    const carts = ref<Cart[]>([]);
    const data: any[] = [];
    const response = await CartServices.getAll(store);
    carts.value = response ? response : [];

    const head = [['Nome do Cliente', 'Produto', 'Quantidade', 'Plano', 'Status da Compra']];

    carts.value.forEach((cart) => {
      data.push([
        cart.cliente.usuario.nomeCompleto,
        cart.produto ? cart.produto!.nome : '-',
        cart.qntProduto ?? '1',
        cart.plano ? cart.plano!.nome : '-',
        cart.statusCompra && !cart.statusCarrinho
          ? 'Aprovada'
          : !cart.statusCompra && !cart.statusCarrinho
            ? 'Cancelada'
            : 'Aguardando Aprovação'
      ]);
    });

    gerarPDF('Relatório de Vendas', head, data);
  } catch (error) {
    console.error('Erro ao gerar o relatório de vendas:', error);
    toast.error('Erro ao gerar o relatório de vendas.');
  }
}
function gerarPDF(nomeRel: string, head: string[][], data: any[]) {
  const doc = new jsPDF('l', 'mm', 'a4');

  doc.text(nomeRel, doc.internal.pageSize.width / 2, 15, { align: 'center' });

  autoTable(doc, {
    head: head,
    body: data,
    startY: 25
  });

  doc.save(`${nomeRel}.pdf`);
}
</script>

<style scoped>
.break-text {
  font-size: 2.1rem;
}
.report-btn {
  height: 10rem;
  width: 100%;
}

@media (max-width: 600px) {
  .btn-add {
    width: 100%;
  }
  .break-text {
    font-size: 1.8rem;
  }
}
</style>
