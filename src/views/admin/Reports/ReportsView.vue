<template>
  <v-container style="width: 90vw">
    <header-component />
    
    <v-btn @click="gerarRelatorioProdutos()">Relatório de Produtos</v-btn>
    <br/>
    <br/>
    <v-btn @click="gerarRelatorioPlanos()">Relatório de Planos</v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import HeaderComponent from '../home/components/HeaderComponent.vue';
import ProductServices from "@/services/ProductServices";
import { useStore } from "vuex";
import type { ProductResponseDTO } from "@/types/responses/admin/ProductResponseDTO";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import type { Plan } from "@/entity/Plan";
import PlanServices from "@/services/PlanServices";
const store = useStore(); 
const toast = useToast();
    
async function gerarRelatorioProdutos () {
  try {
    const products = ref<ProductResponseDTO[]>([]);
    const data: any[] = [];
    const response = await ProductServices.getAll(store);
    products.value = response ? response : [];

    const doc = new jsPDF('l', 'mm', 'a4'); 

    doc.text("Relatório de Produtos",doc.internal.pageSize.width / 2, 15,{ align: 'center' })
  
    const head = [['Produto', 'Marca', 'Preco','Cód. Barras','Categoria','Qnt','Desc. Mensal','Desc. Anual']]

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

    autoTable(doc, {
        head: head,
        body: data,
        startY: 25
    });

    doc.save('produtos.pdf');
  } catch(error){
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

    const doc = new jsPDF('l', 'mm', 'a4'); 

    doc.text("Relatório de Planos",doc.internal.pageSize.width / 2, 15,{ align: 'center' })
  
    const head = [['Plano','Preco','Descrição','Situação','Período']]

    plans.value.forEach((plan) => {
      data.push([
        plan.nome,       
        plan.preco,        
        plan.descricao,   
        plan.situacao.descricao, 
        plan.periodo.descricao      
      ]);
    });

    autoTable(doc, {
        head: head,
        body: data,
        startY: 25
    });

    doc.save('planos.pdf');
  } catch(error){
    console.error('Erro ao gerar o relatório de planos:', error);
    toast.error('Erro ao gerar o relatório de planos.');
  }
}
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
