<template>
  <v-dialog :model-value="props.show" transition="dialog-bottom-transition" fullscreen>
    <v-card color="primary">
      <v-toolbar color="secondary">
        <v-btn icon="mdi-close" color="primary" @click="$emit('close')"></v-btn>
        <v-toolbar-title class="text-primary text-h5">Seus Dados</v-toolbar-title>
        <v-toolbar-items>
          <v-btn icon="mdi-content-save" size="x-large" color="primary" @click="() => {}" />
        </v-toolbar-items>
      </v-toolbar>
      <div class="text-center px-8">
        <v-row align="center" style="height: 11rem">
          <v-col cols="12">
            <v-badge
              v-if="!selectedImage"
              color="secondary"
              @click="openFileSelector"
              class="cursor-pointer mt-5"
              offset-x="20"
              offset-y="10"
              rounded="true"
            >
              <template v-slot:badge>
                <v-icon size="20" color="primary">mdi-pencil</v-icon>
              </template>
              <v-icon color="secondary" size="110"> mdi-account-circle-outline </v-icon>
            </v-badge>

            <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              "
              v-else
            >
              <v-avatar
                @click="openFileSelector"
                size="110px"
                class="cursor-pointer"
                style="border: 4px solid #5a2e2e"
              >
                <v-img v-if="selectedImage" :src="selectedImage"></v-img>
              </v-avatar>
              <v-btn
                class="mt-2"
                color="primary"
                size="small"
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
              v-model="user.nomeCompleto"
              label="Nome"
              variant="outlined"
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center" style="height: 5rem">
          <v-col cols="12">
            <v-text-field v-model="user.cpf" label="CPF" variant="outlined"></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center" style="height: 5rem">
          <v-col cols="12">
            <v-text-field
              v-model="user.email"
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
              v-model="user.telefone"
              label="Telefone"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center" style="height: 5rem">
          <v-col cols="12">
            <v-text-field
              v-model="user.endereco.cep"
              append-inner-icon="mdi-magnify"
              :loading="loadingFindCep"
              label="CEP"
              variant="outlined"
              @click:append-inner="findAddressByCep"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center" style="height: 5rem">
          <v-col cols="12">
            <v-text-field
              v-model="user.endereco.estado"
              :disabled="true"
              label="Estado"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center" style="height: 5rem">
          <v-col cols="12">
            <v-text-field
              v-model="user.endereco.cidade"
              :disabled="true"
              label="Cidade"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center" style="height: 5rem">
          <v-col cols="12">
            <v-text-field
              v-model="user.endereco.bairro"
              :disabled="true"
              label="Bairro"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center" style="height: 5rem">
          <v-col cols="12">
            <v-text-field
              v-model="user.endereco.rua"
              :disabled="true"
              label="Rua"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center" style="height: 5rem">
          <v-col cols="12">
            <v-text-field
              v-model="user.endereco.numero"
              label="Número"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card variant="outlined" class="my-4 pa-4" style="background-color: transparent">
          <div class="mb-4">Alterar Senha</div>
          <v-row align="center" style="height: 5rem">
            <v-col cols="12">
              <v-text-field
                v-model="changePassword.password"
                label="Senha Atual"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" style="height: 5rem">
            <v-col cols="12">
              <v-text-field
                v-model="changePassword.newPassword"
                label="Nova Senha"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" style="height: 5rem">
            <v-col cols="12">
              <v-text-field
                v-model="changePassword.newPasswordRepeated"
                label="Repita sua senha"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-row align="center" class="mt-6 mb-8">
          <v-col cols="12">
            <v-btn
              width="100%"
              large
              color="secondary text-primary"
              class="mb-4 text-h6"
              @click="cadastrate()"
            >
              salvar
            </v-btn>
            <v-btn width="100%" large color="secondary" variant="outlined" @click="$emit('close')">
              voltar
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import router from '@/router';
import { ExternalServices } from '@/services/ExternalServices';
import type { UserAddress } from '@/entity/User';
import { User } from '@/entity/User';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const props = defineProps(['show']);
const user = ref(new User());
const changePassword = ref({ password: '', newPassword: '', newPasswordRepeated: '' });
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

    reader.onload = () => {
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
    const addressResponse = await ExternalServices.getAddressByCep(user.value.endereco.cep);
    user.value.endereco.fillByApiCepResponse(addressResponse);
  } catch (error) {
    console.error(error);
  } finally {
    loadingFindCep.value = false;
  }
}

function canCadastrateUser(): boolean {
  const userValues: User = user.value;
  let haveEmptyField: boolean = false;

  Object.keys(userValues).map((field) => {
    const fieldValue: string | UserAddress | null = userValues[field as keyof typeof userValues];

    if (!fieldValue) {
      haveEmptyField = true;
    }
  });

  if (!user.value.endereco.cep) haveEmptyField = true;
  if (!user.value.endereco.numero) haveEmptyField = true;

  if (haveEmptyField) {
    toast.error('Preencha todos os campos.');
    return false;
  }

  if (changePassword.value.newPassword !== changePassword.value.newPasswordRepeated) {
    toast.error('As senhas devem ser iguais.');
    return false;
  }

  return true;
}

function cadastrate() {
  if (canCadastrateUser()) router.push('/client');
}
</script>
