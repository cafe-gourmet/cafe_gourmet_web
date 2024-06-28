<template>
  <v-dialog :model-value="props.show" transition="dialog-bottom-transition" fullscreen>
    <v-card color="primary">
      <v-toolbar color="secondary">
        <v-btn icon="mdi-close" color="primary" @click="$emit('close')"></v-btn>
        <v-toolbar-title class="text-primary text-h5">Carrinho</v-toolbar-title>
      </v-toolbar>
      <div class="px-8">
        <v-row align="center" style="margin-top: 30px">
          <v-col cols="12" class="text-h5 text-secondary"> Seus Produtos </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="6" lg="6">
            <v-card variant="outlined" class="my-4 pa-4" style="background-color: transparent">
              <v-row>
                <v-col cols="12" sm="12" md="4" lg="4">
                  <v-img
                    src="https://cdn.irmaospatrocinio.com.br/img/p/1/7/4/1/6/0/174160-large_default.jpg"
                    style="border: 2px solid #5a2e2e; border-radius: 5px; width: 200px"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="8" lg="8">
                  <div class="mt-2 text-h6">Nome do Produto</div>
                  <div class="mt-2 text-subtitle-1">
                    Quantidade:
                    <v-icon>mdi-minus</v-icon>
                    <span>1</span>
                    <v-icon>mdi-plus</v-icon>
                  </div>
                  <div>
                    <span>visualizar</span>
                    <span>excluir</span>
                  </div>
                  <div class="text-subtitle-1">R$ 20,00</div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="6" lg="6">
            <v-card variant="outlined" class="my-4 pa-4" style="background-color: transparent">
              <v-row>
                <v-col cols="12" sm="12" md="4" lg="4">
                  <v-img
                    src="https://cdn.irmaospatrocinio.com.br/img/p/1/7/4/1/6/0/174160-large_default.jpg"
                    style="border: 2px solid #5a2e2e; border-radius: 5px; width: 200px"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="8" lg="8">
                  <div class="mt-2 text-h6">Nome do Produto</div>
                  <div class="mt-2 text-subtitle-1">
                    Quantidade:
                    <v-icon>mdi-minus</v-icon>
                    <span>1</span>
                    <v-icon>mdi-plus</v-icon>
                  </div>
                  <div>
                    <span>visualizar</span>
                    <span>excluir</span>
                  </div>
                  <div class="text-subtitle-1">R$ 20,00</div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

        </v-row>

        <v-row align="center" style="height: 11rem">
          <v-col cols="12" class="text-h5 text-secondary"> Seu Plano </v-col>
        </v-row>

        <v-divider color="secondary" :thickness="2" class="border-opacity-50 my-4" />
        <v-row align="center" style="height: 4rem">
          <v-col class="text-h6" cols="6"> Total </v-col>
          <v-col class="text-h6 text-end" cols="6"> R$ 40,00 </v-col>
        </v-row>
        <v-row align="center" style="height: 4rem">
          <v-col class="text-h6" cols="6"> Com plano mensal </v-col>
          <v-col class="text-h6 text-end" cols="6"> R$ 36,00 </v-col>
        </v-row>
        <v-row align="center" style="height: 4rem">
          <v-col class="text-h6" cols="6"> Com plano anual </v-col>
          <v-col class="text-h6 text-end" cols="6"> R$ 32,00 </v-col>
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
  </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps(['show']);
</script>

<style scoped>
.img-item {
  width: 250px;
}
@media (min-width: 400px) {
  
}
</style>
