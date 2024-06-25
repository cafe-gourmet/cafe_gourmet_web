<template>
  <v-dialog :model-value="props.show" transition="dialog-bottom-transition" fullscreen>
    <v-card color="primary">
      <v-toolbar color="secondary">
        <v-btn icon="mdi-close" color="primary" @click="$emit('close')"></v-btn>
        <v-toolbar-title v-if="props.product" class="text-primary text-h5"
          >Editar Produto</v-toolbar-title
        >
        <v-toolbar-title v-else class="text-primary text-h5">Criar Produto</v-toolbar-title>
      </v-toolbar>
      <div class="text-center px-8" style="margin-top: 50px">
        <v-form @submit.prevent ref="register">
          <v-row>
            <v-col cols="12" sm="6" md="4" lg="4">
              <v-text-field
                label="Nome do produto"
                variant="solo"
                v-model="newProduct.nome"
                bg-color="secondary"
                color="primary"
              />
            </v-col>

            <v-col cols="12" sm="6" md="4" lg="4">
              <v-text-field
                label="Marca do produto"
                variant="solo"
                v-model="newProduct.marca"
                bg-color="secondary"
                color="primary"
              />
            </v-col>

            <v-col cols="12" sm="6" md="4" lg="4">
              <v-text-field
                label="Código de Barras"
                variant="solo"
                v-model="newProduct.codigoBarras"
                bg-color="secondary"
                color="primary"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="4">
              <v-autocomplete
                clearable
                label="Categoria do Produto"
                v-model="newProduct.idCategoria"
                bg-color="secondary"
                base-color="primary"
                item-color="secondary"
                list
                color="primary"
                :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                variant="solo"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="4">
              <v-text-field
                label="Preço do Produto"
                variant="solo"
                v-model="newProduct.preco"
                bg-color="secondary"
                color="primary"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="4">
              <v-text-field
                label="Quantidade do Produto"
                variant="solo"
                type="number"
                v-model="newProduct.quantidade"
                bg-color="secondary"
                color="primary"
              />
            </v-col>

            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                label="Desconto no plano mensal (em %)"
                variant="solo"
                bg-color="secondary"
                color="primary"
                type="number"
                v-model="newProduct.percentualDescontoMensal"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                label="Desconto no plano anual (em %)"
                type="number"
                variant="solo"
                v-model="newProduct.percentualDescontoAnual"
                bg-color="secondary"
                color="primary"
              />
            </v-col>
          </v-row>
        </v-form>
        <v-row align="center">
          <v-col cols="12">
            <v-carousel v-if="haveImage()" color="primary" cycle height="30rem" style="width: 100%">
              <div v-for="(image, index) in carouselImages" :key="index">
                <v-carousel-item v-if="image" :src="image" cover />
              </div>
            </v-carousel>
          </v-col>
        </v-row>

        <v-row class="mt-5 mb-10">
          <v-col cols="12" sm="6" md="4" lg="4">
            <v-file-input
              label="Escolher arquivo da imagem 1"
              variant="outlined"
              v-model="file1"
              hide-details
              single-line
              bg-color="secondary"
              color="primary"
              append-inner-icon="mdi-download"
              prepend-icon=""
              accept="image/*"
              @change="saveFileImageString(file1, 0)"
              @click:clear="clearFileInput(0)"
            ></v-file-input>
          </v-col>

          <v-col cols="12" sm="6" md="4" lg="4">
            <v-file-input
              label="Escolher arquivo da imagem 2"
              variant="outlined"
              v-model="file2"
              hide-details
              single-line
              bg-color="secondary"
              color="primary"
              append-inner-icon="mdi-download"
              prepend-icon=""
              accept="image/*"
              @change="saveFileImageString(file2, 1)"
              @click:clear="clearFileInput(1)"
            ></v-file-input>
          </v-col>

          <v-col cols="12" sm="6" md="4" lg="4">
            <v-file-input
              label="Escolher arquivo da imagem 3"
              variant="outlined"
              v-model="file3"
              hide-details
              single-line
              bg-color="secondary"
              color="primary"
              append-inner-icon="mdi-download"
              prepend-icon=""
              accept="image/*"
              @change="saveFileImageString(file3, 2)"
              @click:clear="clearFileInput(2)"
            ></v-file-input>
          </v-col>
        </v-row>

        <div class="text-end my-8">
          <v-btn
            text="cancelar"
            variant="outlined"
            size="large"
            color="secondary text-primary"
            class="mr-4 btn-full"
            @click="$emit('close')"
          />
          <v-btn text="confirmar" class="btn-full btn-confirmar" size="large" color="secondary text-primary" />
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { Product } from '@/entity/Product';
import { ref } from 'vue';

const props = defineProps(['show', 'product']);
const file1 = ref(undefined);
const file2 = ref(undefined);
const file3 = ref(undefined);
const carouselImages = ref([undefined, undefined, undefined]);
const newProduct = ref(props.product ? props.product : new Product());

function saveFileImageString(file: any, position: number) {
  if (!file) return;

  const reader = new FileReader();

  reader.onload = async (event: any) => {
    //@ts-ignore
    const fileContent: never = event.target.result;
    carouselImages.value[position] = fileContent; // For preview
  };

  // Read the file as a Data URL
  reader.readAsDataURL(file);
}

function clearFileInput(position: number) {
  //@ts-ignore
  carouselImages.value.splice(position, 1);
  console.log(carouselImages.value);
}

function haveImage() {
  return carouselImages.value.filter((image) => image).length;
}
</script>

<style scoped>
@media (max-width: 600px) {
  .btn-full {
    width: 100%;
  }
  .btn-confirmar {
    margin-top: 20px;
  }
}
</style>