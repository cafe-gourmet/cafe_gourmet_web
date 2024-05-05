<template>
  <v-container class="container">
    <v-row align="center" justify="center">
      <v-col cols="9">
        <v-card color="secondary" class="text-center px-8 py-2 mb-8">
          <v-row align="center" style="height: 14rem">
            <v-col cols="12">
              <div class="text-h5 text-primary mb-8">CADASTRO</div>

              <v-badge
                v-if="!selectedImage"
                color="primary"
                @click="openFileSelector"
                class="cursor-pointer"
                style="position: relative; z-index: 1"
              >
                <template v-slot:badge>
                  <v-icon size="20" color="secondary">mdi-pencil</v-icon>
                </template>
                <v-icon color="primary" size="100"> mdi-account-circle-outline </v-icon>
              </v-badge>

              <div v-else>
                <v-avatar
                  @click="openFileSelector"
                  size="100px"
                  class="cursor-pointer"
                  style="border: 4px solid #5a2e2e"
                >
                  <v-img v-if="selectedImage" :src="selectedImage"></v-img>
                </v-avatar>
                <v-btn
                  class="mt-2"
                  color="primary"
                  size="x-small"
                  append-icon="mdi-delete"
                  @click="selectedImage = null"
                  >excluir imagem</v-btn
                >
              </div>

              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                style="display: none"
                @change="onFileChange"
              />
            </v-col>
          </v-row>
          <v-row style="height: 5rem">
            <v-img v-if="selectedImage" :src="selectedImage" contain></v-img>
            <v-col cols="12">
              <v-text-field
                v-model="form.name"
                label="Nome"
                variant="outlined"
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" style="height: 5rem">
            <v-col cols="12">
              <v-text-field v-model="form.cpf" label="CPF" variant="outlined"></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" style="height: 5rem">
            <v-col cols="12">
              <v-text-field
                v-model="form.email"
                class="text-left"
                type="email"
                label="Email"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" style="height: 5rem">
            <v-col cols="12">
              <v-text-field
                v-model="form.telephone"
                label="Telefone"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" style="height: 5rem">
            <v-col cols="12">
              <v-text-field
                v-model="form.address.cep"
                append-inner-icon="mdi-magnify"
                :loading="loadingFindCep"
                label="CEP"
                variant="outlined"
                color="primary"
                @click:append-inner="findAddressByCep"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" style="height: 5rem">
            <v-col cols="12">
              <v-text-field
                v-model="form.address.state"
                :disabled="true"
                label="Estado"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" style="height: 5rem">
            <v-col cols="12">
              <v-text-field
                v-model="form.address.city"
                :disabled="true"
                label="Cidade"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" style="height: 5rem">
            <v-col cols="12">
              <v-text-field
                v-model="form.address.neighborhood"
                :disabled="true"
                label="Bairro"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" style="height: 5rem">
            <v-col cols="12">
              <v-text-field
                v-model="form.address.street"
                :disabled="true"
                label="Rua"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" style="height: 5rem">
            <v-col cols="12">
              <v-text-field
                v-model="form.address.number"
                label="Número"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" style="height: 5rem">
            <v-col cols="12">
              <v-text-field v-model="form.password" label="Senha" variant="outlined"></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" style="height: 5rem">
            <v-col cols="12">
              <v-text-field
                v-model="form.passwordRepeated"
                label="Repita sua senha"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" class="mt-8 mb-4">
            <v-col cols="12">
              <v-btn
                width="100%"
                large
                color="primary text-secondary"
                class="mb-2"
                @click="cadastrate()"
              >
                cadastrar
              </v-btn>
              <v-btn width="100%" large color="primary" variant="outlined">voltar</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import router from '@/router';
import { ExternalServices } from '@/services/ExternalServices';
import type { RegisterFormAddress } from '@/types/register/RegisterForm';
import { RegisterForm } from '@/types/register/RegisterForm';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const form = ref(new RegisterForm());
const toast = useToast();
const loadingFindCep = ref(false);
const selectedImage = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

function openFileSelector() {
  fileInput.value!.click();
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (reader.result) {
        selectedImage.value = reader.result.toString();
      }
    };
    reader.readAsDataURL(file);
  } else {
    toast.error('Selecione um arquivo de imagem.');
  }
}

async function findAddressByCep() {
  try {
    loadingFindCep.value = true;
    const addressResponse = await ExternalServices.getAddressByCep(form.value.address.cep);
    form.value.address.fillByApiCepResponse(addressResponse);
  } catch (error) {
    console.error(error);
  } finally {
    loadingFindCep.value = false;
  }
}

function canCadastrateUser(): boolean {
  const formValues: RegisterForm = form.value;
  let haveEmptyField: boolean = false;

  Object.keys(formValues).map((field) => {
    const fieldValue: string | RegisterFormAddress = formValues[field as keyof typeof formValues];

    if (!fieldValue) {
      haveEmptyField = true;
    }
  });

  if (!form.value.address.cep) haveEmptyField = true;
  if (!form.value.address.number) haveEmptyField = true;

  if (haveEmptyField) {
    toast.error('Preencha todos os campos.');
    return false;
  }

  if (formValues.password !== formValues.passwordRepeated) {
    toast.error('As senhas devem ser iguais.');
    return false;
  }

  return true;
}

function cadastrate() {
  if (canCadastrateUser())
    router.push('/home');
}
</script>

<style scoped>
.container {
  display: flex;
  min-height: 100vh;
  align-items: center;
}

span[aria-label='Badge'],
.chooseImage {
  left: calc(77% - 12px) !important;
  bottom: calc(80% - 12px) !important;
  height: fit-content !important;
  border-radius: 30px;
}

span[aria-label='Badge'] .deleteImage {
  left: calc(57% - 12px) !important;
  bottom: calc(80% - 12px) !important;
  height: fit-content !important;
  border-radius: 30px;
}
</style>
