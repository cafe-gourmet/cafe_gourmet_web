<template>
  <v-container class="container">
    <v-row align="center" justify="center">
      <v-col cols="11">
        <v-card color="secondary" class="text-center px-8 py-2 mb-8">
          <v-row align="center" style="height: 14rem">
            <v-col cols="12">
              <div class="text-h5 text-primary mb-8">CADASTRO</div>

              <v-badge
                v-if="!selectedImage"
                color="primary"
                @click="openFileSelector"
                class="cursor-pointer"
                offset-x="20"
                offset-y="10"
                rounded="true"
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
          <v-form @submit.prevent ref="register">
            <v-row style="height: 6rem">
              <v-col cols="12">
                <v-text-field
                  v-model="user.nomeCompleto"
                  label="Nome Completo"
                  variant="outlined"
                  class="text-start"
                  :rules="[rules.required, rules.min4Length]"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center" style="height: 6rem">
              <v-col cols="12">
                <v-text-field
                  v-model="user.cpf"
                  class="text-start"
                  :rules="[rules.required, rules.validCpf]"
                  label="CPF"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center" style="height: 6rem">
              <v-col cols="12">
                <v-text-field
                  v-model="user.email"
                  :rules="[rules.required, rules.validEmail]"
                  class="text-start"
                  type="email"
                  label="Email"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center" style="height: 6rem">
              <v-col cols="12">
                <v-text-field
                  v-model="user.telefone"
                  label="Telefone"
                  class="text-start"
                  :rules="[rules.required, rules.validTelephone]"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center" style="height: 6rem">
              <v-col cols="12">
                <v-text-field
                  v-model="user.endereco.cep"
                  append-inner-icon="mdi-magnify"
                  :loading="loadingFindCep"
                  :rules="[rules.required, rules.validCep]"
                  label="CEP"
                  class="text-start"
                  variant="outlined"
                  color="primary"
                  @click:append-inner="findAddressByCep"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center" style="height: 6rem">
              <v-col cols="12">
                <v-text-field
                  v-model="user.endereco.estado"
                  :disabled="true"
                  label="Estado"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center" style="height: 6rem">
              <v-col cols="12">
                <v-text-field
                  v-model="user.endereco.cidade"
                  :disabled="true"
                  label="Cidade"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center" style="height: 6rem">
              <v-col cols="12">
                <v-text-field
                  v-model="user.endereco.bairro"
                  :disabled="true"
                  label="Bairro"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center" style="height: 6rem">
              <v-col cols="12">
                <v-text-field
                  v-model="user.endereco.rua"
                  :disabled="true"
                  label="Rua"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center" style="height: 6rem">
              <v-col cols="12">
                <v-text-field
                  v-model="user.endereco.numero"
                  :rules="[rules.required, rules.validNumber]"
                  label="Número"
                  class="text-start"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center" style="height: 6rem">
              <v-col cols="12">
                <v-text-field
                  v-model="user.senha"
                  label="Senha"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append-inner="showPassword = !showPassword"
                  :rules="[rules.required, rules.validPassword]"
                  class="text-start"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center" style="height: 6rem">
              <v-col cols="12">
                <v-text-field
                  v-model="repeatedPassword"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append-inner="showPassword = !showPassword"
                  :rules="[rules.required, rules.isEqualTo(user.senha, repeatedPassword)]"
                  label="Repita sua senha"
                  class="text-start"
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
                  type="submit"
                  block
                  :loading="loadingCadastrate"
                  @click="cadastrate()"
                >
                  cadastrar
                </v-btn>
                <v-btn width="100%" large color="primary" variant="outlined" to="/">voltar</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { User } from '@/entity/User';
import router from '@/router';
import { ExternalServices } from '@/services/ExternalServices';
import UserServices from '@/services/UserServices';
import Rules from '@/utils/rules';
import { isValidCEP } from '@brazilian-utils/brazilian-utils';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const rules = ref(new Rules());
const user = ref(new User());
const toast = useToast();
const loadingFindCep = ref(false);
const loadingCadastrate = ref(false);
const showPassword = ref(false);
const repeatedPassword = ref('');
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
  if (!isValidCEP(user.value.endereco.cep)) return;
  try {
    loadingFindCep.value = true;
    const addressResponse = await ExternalServices.getAddressByCep(user.value.endereco.cep);
    user.value.endereco.fillByApiCepResponse(addressResponse);
  } catch (error) {
    toast.error('Ocorreu um erro ao buscar as informações do CEP, tente novamente.');
  } finally {
    loadingFindCep.value = false;
  }
}

async function cadastrate() {
  try {
    loadingCadastrate.value = true;
    const userRequest = user.value;
    userRequest.fotoPerfil = selectedImage.value;
    await UserServices.register(userRequest);
    router.push('/');
  } catch (error) {
    toast.error('Ocorreu um erro ao cadastrar o usuário, tente novamente.');
  } finally {
    loadingCadastrate.value = false;
  }
}
</script>

<style scoped>
.container {
  display: flex;
  min-height: 100vh;
  align-items: center;
}
</style>
