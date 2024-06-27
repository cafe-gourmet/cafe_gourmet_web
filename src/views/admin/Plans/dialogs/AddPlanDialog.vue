<template>
  <v-dialog :model-value="props.show" transition="dialog-bottom-transition" fullscreen>
    <v-card color="primary">
      <v-toolbar color="secondary">
        <v-btn icon="mdi-close" color="primary" @click="$emit('close')"></v-btn>
        <v-toolbar-title v-if="props.plan" class="text-primary text-h5"
          >Editar Plano</v-toolbar-title
        >
        <v-toolbar-title v-else class="text-primary text-h5">Criar Plano</v-toolbar-title>
      </v-toolbar>
      <div class="text-center px-8" style="margin-top: 50px">
        <v-form @submit.prevent ref="register">
          <v-row>
            <v-col cols="12" sm="6" md="4" lg="4">
              <v-text-field
                label="Nome do plano"
                variant="solo"
                v-model="newPlan.nome"
                bg-color="secondary"
                color="primary"
              />
            </v-col>

            <v-col cols="12" sm="6" md="4" lg="4">
              <v-text-field
                label="Descrição do plano"
                variant="solo"
                v-model="newPlan.descricao"
                bg-color="secondary"
                color="primary"
              />
            </v-col>

            <v-col cols="12" sm="6" md="4" lg="4">
              <v-text-field
                label="Preço do Plano"
                variant="solo"
                v-model="newPlan.preco"
                bg-color="secondary"
                color="primary"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="4">
              <v-autocomplete
                clearable
                label="Período do Plano"
                v-model="periodSelected"
                item-title="nome"
                item-value="id"
                bg-color="secondary"
                base-color="primary"
                item-color="secondary"
                color="primary"
                :items="[
                  { id: 1, nome: 'mensal' },
                  { id: 2, nome: 'anual' }
                ]"
                variant="solo"
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
          <v-btn
            text="confirmar"
            class="btn-full btn-confirmar"
            size="large"
            color="secondary text-primary"
            @click="addOrEditPlan()"
          />
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { Plan } from '@/entity/Plan';
import PlanServices from '@/services/PlanServices';
import { ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';

const props = defineProps(['show', 'plan']);
const file1 = ref(undefined);
const file2 = ref(undefined);
const file3 = ref(undefined);
const carouselImages = ref([undefined, undefined, undefined]);
const periodSelected = ref(1);
const newPlan = ref<Plan>(props.plan || new Plan());
const store = useStore();
const toast = useToast();

watch(
  () => props.plan,
  (newValue) => {
    if (newValue) {
      newPlan.value = newValue;
      periodSelected.value = newValue.idPeriodo;
    } else {
      newPlan.value = new Plan();
    }
  }
);

async function addOrEditPlan() {
  if (!props.plan) {
    await addPlan();
  } else {
    await editPlan();
  }
}

async function addPlan() {
  try {
    newPlan.value.idPeriodo = periodSelected.value;
    newPlan.value.idSituacao = 1;
    await PlanServices.add(newPlan.value, store);
    window.location.reload();
  } catch (error) {
    console.error(error);
    toast.error('Ocorreu um erro ao criar seu plano, verifique os campos e tente novamente.');
  }
}

async function editPlan() {
  try {
    newPlan.value.idPeriodo = periodSelected.value;
    await PlanServices.edit(newPlan.value, store);
    window.location.reload();
  } catch (error) {
    console.error(error);
    toast.error('Ocorreu um erro ao editar seu plano, verifique os campos e tente novamente.');
  }
}

function saveFileImageString(file: any, position: number) {
  if (!file) return;

  const reader = new FileReader();

  reader.onload = async (event: any) => {
    //@ts-ignore
    const fileContent: never = event.target.result;
    carouselImages.value[position] = fileContent;
  };

  reader.readAsDataURL(file);
}

function clearFileInput(position: number) {
  //@ts-ignore
  carouselImages.value.splice(position, 1);
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
