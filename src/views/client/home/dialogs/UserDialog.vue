<template>
  <v-dialog :model-value="props.show" transition="dialog-bottom-transition" fullscreen>
    <v-card color="primary">
      <v-toolbar color="secondary">
        <v-btn icon="mdi-close" color="primary" @click="$emit('close')"></v-btn>
        <v-toolbar-title class="text-primary text-h5">Seus Dados</v-toolbar-title>
      </v-toolbar>
      <div class="text-center px-8">
        <v-row align="center" style="height: 11rem">
          <v-col cols="12">
            <v-badge
              v-if="!userAuth.fotoPerfil"
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
                <v-img v-if="userAuth.fotoPerfil" :src="userAuth.fotoPerfil"></v-img>
              </v-avatar>
              <v-btn
                class="mt-2"
                color="primary"
                size="small"
                append-icon="mdi-delete"
                @click="userAuth.fotoPerfil = null"
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
          <v-img v-if="userAuth.fotoPerfil" :src="userAuth.fotoPerfil" contain></v-img>
          <v-col cols="12">
            <v-text-field
              v-model="userAuth.nomeCompleto"
              label="Nome"
              variant="outlined"
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center" style="height: 5rem">
          <v-col cols="12">
            <v-text-field v-model="userAuth.cliente!.cpf" label="CPF" variant="outlined"></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center" style="height: 5rem">
          <v-col cols="12">
            <v-text-field
              v-model="userAuth.email"
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
              v-model="userAuth.cliente!.telefone"
              label="Telefone"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center" style="height: 5rem">
          <v-col cols="12">
            <v-text-field
              v-model="userAuth.cliente!.endereco.cep"
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
              v-model="userAuth.cliente!.endereco.estado"
              :disabled="true"
              label="Estado"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center" style="height: 5rem">
          <v-col cols="12">
            <v-text-field
              v-model="userAuth.cliente!.endereco.cidade"
              :disabled="true"
              label="Cidade"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center" style="height: 5rem">
          <v-col cols="12">
            <v-text-field
              v-model="userAuth.cliente!.endereco.bairro"
              :disabled="true"
              label="Bairro"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center" style="height: 5rem">
          <v-col cols="12">
            <v-text-field
              v-model="userAuth.cliente!.endereco.rua"
              :disabled="true"
              label="Rua"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center" style="height: 5rem">
          <v-col cols="12">
            <v-text-field
              v-model="userAuth.cliente!.endereco.numero"
              label="Número"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card variant="outlined" class="my-4 pa-4" style="background-color: transparent">
          <div class="mb-4">Alterar Senha</div>
          * Caso não queira alterar a senha, favor deixar os campos em branco
          <v-row align="center" style="height: 5rem">
            <v-col cols="12">
              <v-text-field
                v-model="changePassword.newPassword"
                label="Nova Senha*"
                type="password"
                variant="outlined"
                :rules="[rules.validPassword]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" style="height: 5rem">
            <v-col cols="12">
              <v-text-field
                v-model="changePassword.newPasswordRepeated"
                label="Repita sua senha*"
                type="password"
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
import { ExternalServices } from '@/services/ExternalServices';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { AuthUser} from '@/entity/AuthUser';
import { useStore } from 'vuex';
import UserServices from '@/services/UserServices';
import Rules from '@/utils/rules';
const rules = ref(new Rules());

const props = defineProps(['show']);
var userAuth = ref(new AuthUser());
const changePassword = ref({ newPassword: '', newPasswordRepeated: '' });
const toast = useToast();
const loadingFindCep = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const store = useStore();
userAuth.value = store.getters.getAuthUser;

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
        userAuth.value.fotoPerfil =  reader.result.toString();
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
    const addressResponse = await ExternalServices.getAddressByCep(userAuth.value.cliente!.endereco.cep);
    userAuth.value.cliente!.endereco.fillByApiCepResponse(addressResponse);
  } catch (error) {
    console.error(error);
  } finally {
    loadingFindCep.value = false;
  }
}

function canCadastrateUser(): boolean {
  let haveEmptyField: boolean = false;

  if (!userAuth.value.cliente!.endereco.cep) haveEmptyField = true;
  if (!userAuth.value.cliente!.endereco.numero) haveEmptyField = true;
  if (!userAuth.value.email) haveEmptyField = true;
  if (!userAuth.value.nomeCompleto) haveEmptyField = true;
  if (!userAuth.value.cliente.telefone) haveEmptyField = true;
  if (changePassword.value.newPassword && !changePassword.value.newPasswordRepeated || !changePassword.value.newPassword && changePassword.value.newPasswordRepeated) 
    haveEmptyField = true;

  var retorno = rules.value.validPassword(changePassword.value.newPassword);
  if(retorno!=true){
    toast.error(retorno.toString());
    return false;
  }

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

async function cadastrate() {
  try {
    if (canCadastrateUser()){
      const userRequest = userAuth.value;
      userRequest.senha = changePassword.value.newPassword;
      await UserServices.update(userRequest,store);
      toast.success('Usuário atualizado com sucesso!!!');
    }
  } catch (error) {
    console.log(error);
    toast.error('Ocorreu um erro ao cadastrar o usuário, tente novamente.');
  }
}
</script>
