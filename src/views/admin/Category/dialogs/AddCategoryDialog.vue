<template>
  <v-dialog :model-value="props.show" transition="dialog-bottom-transition" fullscreen>
    <v-card color="primary">
      <v-toolbar color="secondary">
        <v-btn icon="mdi-close" color="primary" @click="$emit('close')"></v-btn>
        <v-toolbar-title v-if="props.category" class="text-primary text-h5"
          >Editar Categoria</v-toolbar-title
        >
        <v-toolbar-title v-else class="text-primary text-h5">Criar Categoria</v-toolbar-title>
      </v-toolbar>
      <div class="text-center px-8" style="margin-top: 50px">
        <v-form @submit.prevent ref="register">
          <v-row>
            <v-col cols="12" sm="6" md="4" lg="4">
              <v-text-field
                label="Nome da categoria"
                variant="solo"
                v-model="newCategory.nome"
                bg-color="secondary"
                color="primary"
              />
            </v-col>
          </v-row>
        </v-form>

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
            @click="addOrEditCategory()"
          />
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { Category } from '@/entity/Category';
import CategoryServices from '@/services/CategoryServices';
import { ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';

const props = defineProps(['show', 'category']);
const newCategory = ref(props.category || new Category());
const store = useStore();
const toast = useToast();

watch(
  () => props.category,
  (newValue) => {
    if (newValue) {
      newCategory.value = newValue;
    } else {
      newCategory.value = new Category();
    }
  }
);

async function addOrEditCategory() {
  if (!props.category) {
    await addcategory();
  } else {
    await editCategory();
  }
}

async function addcategory() {
  try {
    await CategoryServices.add(newCategory.value, store);
    window.location.reload();
  } catch (error) {
    console.error(error);
    toast.error('Ocorreu um erro ao criar sua categoria, verifique os campos e tente novamente.');
  }
}

async function editCategory() {
  try {
    await CategoryServices.edit(newCategory.value, store);
    window.location.reload();
  } catch (error) {
    console.error(error);
    toast.error('Ocorreu um erro ao editar sua categoria, verifique os campos e tente novamente.');
  }
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
