<!-- eslint-disable vue/valid-v-model -->
<template>
  <v-dialog :model-value="props.show" transition="dialog-bottom-transition" fullscreen>
    <v-card color="primary">
      <v-toolbar color="secondary">
        <v-btn icon="mdi-close" color="primary" @click="close()"></v-btn>
        <v-toolbar-title v-if="props.user" class="text-primary text-h5"
          >Editar Usuário</v-toolbar-title
        >
        <v-toolbar-title v-else class="text-primary text-h5">Criar Usuário</v-toolbar-title>
      </v-toolbar>
      <div class="text-center px-8" style="margin-top: 50px">
        <v-form @submit.prevent>
          <v-row align="center" class="mb-10">
            <v-col cols="12">
              <v-badge
                v-if="!selectedImage"
                color="secondary"
                @click="openFileSelector"
                class="cursor-pointer"
                offset-x="20"
                offset-y="10"
                rounded="true"
              >
                <template v-slot:badge>
                  <v-icon size="20" color="primary">mdi-pencil</v-icon>
                </template>
                <v-icon color="secondary" size="100"> mdi-account-circle-outline </v-icon>
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
                  color="secondary"
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

          <v-row>
            <v-col cols="12" sm="6" md="4" lg="4">
              <v-text-field
                label="Nome do usuário"
                variant="solo"
                v-model="newUser.nomeCompleto"
                bg-color="secondary"
                color="primary"
              />
            </v-col>

            <v-col cols="12" sm="6" md="4" lg="4">
              <v-text-field
                label="Email do usuário"
                variant="solo"
                v-model="newUser.email"
                bg-color="secondary"
                color="primary"
              />
            </v-col>

            <v-col cols="12" sm="6" md="4" lg="4">
              <v-text-field
                :label="props.user?.senha ? 'Trocar senha' : 'Senha do Usuário'"
                variant="solo"
                v-model="newPassword"
                bg-color="secondary"
                color="primary"
              />
            </v-col>

            <v-col cols="12" sm="6" md="4" lg="4">
              <v-autocomplete
                label="Cargo do Usuário"
                v-model="roleSelected"
                item-title="nome"
                item-value="id"
                bg-color="secondary"
                base-color="primary"
                item-color="secondary"
                color="primary"
                :items="roles"
                variant="solo"
              />
            </v-col>

            <v-col
              v-if="props.user?.cliente?.id || roleSelected === 2"
              cols="12"
              sm="6"
              md="4"
              lg="4"
            >
              <v-text-field
                label="CPF do Cliente"
                variant="solo"
                v-model="newUser.cliente.cpf"
                bg-color="secondary"
                color="primary"
              />
            </v-col>
            <v-col
              v-if="props.user?.cliente?.id || roleSelected === 2"
              cols="12"
              sm="6"
              md="4"
              lg="4"
            >
              <v-text-field
                label="Telefone do Cliente"
                variant="solo"
                v-model="newUser.cliente.telefone"
                bg-color="secondary"
                color="primary"
              />
            </v-col>

            <v-col
              v-if="props.user?.cliente?.id || roleSelected === 2"
              cols="12"
              sm="6"
              md="6"
              lg="6"
            >
              <v-autocomplete
                clearable
                label="Plano do Usuário"
                bg-color="secondary"
                base-color="primary"
                item-color="secondary"
                color="primary"
                item-title="nome"
                item-value="id"
                :items="plans"
                v-model="planSelected"
                variant="solo"
              />
            </v-col>

            <v-col
              v-if="props.user?.cliente?.id || roleSelected === 2"
              cols="12"
              sm="6"
              md="6"
              lg="6"
            >
              <v-text-field
                v-model="newUser.cliente.endereco.cep"
                append-inner-icon="mdi-magnify"
                :loading="loadingFindCep"
                label="CEP"
                class="text-start"
                variant="solo"
                color="primary"
                bg-color="secondary"
                base-color="primary"
                item-color="secondary"
                @click:append-inner="findAddressByCep"
              ></v-text-field>
            </v-col>

            <v-col
              v-if="props.user?.cliente?.id || roleSelected === 2"
              cols="12"
              sm="6"
              md="4"
              lg="4"
            >
              <v-text-field
                v-model="newUser.cliente.endereco.estado"
                color="primary"
                bg-color="secondary"
                base-color="primary"
                item-color="secondary"
                label="Estado"
                variant="solo"
              ></v-text-field>
            </v-col>

            <v-col
              v-if="props.user?.cliente?.id || roleSelected === 2"
              cols="12"
              sm="6"
              md="4"
              lg="4"
            >
              <v-text-field
                v-model="newUser.cliente.endereco.cidade"
                color="primary"
                bg-color="secondary"
                base-color="primary"
                item-color="secondary"
                label="Cidade"
                variant="solo"
              ></v-text-field>
            </v-col>

            <v-col
              v-if="props.user?.cliente?.id || roleSelected === 2"
              cols="12"
              sm="6"
              md="4"
              lg="4"
            >
              <v-text-field
                v-model="newUser.cliente.endereco.bairro"
                color="primary"
                bg-color="secondary"
                base-color="primary"
                item-color="secondary"
                label="Bairro"
                variant="solo"
              ></v-text-field>
            </v-col>

            <v-col
              v-if="props.user?.cliente?.id || roleSelected === 2"
              cols="12"
              sm="6"
              md="6"
              lg="6"
            >
              <v-text-field
                v-model="newUser.cliente.endereco.rua"
                color="primary"
                bg-color="secondary"
                base-color="primary"
                item-color="secondary"
                label="Rua"
                variant="solo"
              ></v-text-field>
            </v-col>

            <v-col
              v-if="props.user?.cliente?.id || roleSelected === 2"
              cols="12"
              sm="6"
              md="6"
              lg="6"
            >
              <v-text-field
                v-model="newUser.cliente.endereco.numero"
                label="Número"
                color="primary"
                bg-color="secondary"
                base-color="primary"
                item-color="secondary"
                class="text-start"
                variant="solo"
              ></v-text-field>
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
            @click="close()"
          />
          <v-btn
            text="confirmar"
            class="btn-full btn-confirmar"
            size="large"
            color="secondary text-primary"
            @click="addOrEditUser()"
          />
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { AuthUser } from '@/entity/AuthUser';
import type { Plan } from '@/entity/Plan';
import type { Role } from '@/entity/Role';
import { ExternalServices } from '@/services/ExternalServices';
import PlanServices from '@/services/PlanServices';
import RoleServices from '@/services/RoleServices';
import UserServices from '@/services/UserServices';
import { isValidCEP } from '@brazilian-utils/brazilian-utils';
import { onMounted, ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';

const props = defineProps<{ show: boolean; user: AuthUser | undefined }>();
const roles = ref<Role[]>([]);
const roleSelected = ref<number | undefined | null>(undefined);
const newUser = ref<AuthUser>(props.user || new AuthUser());
const store = useStore();
const toast = useToast();
const loadingFindCep = ref(false);
const newPassword = ref('');
const emit = defineEmits(['close']);
const plans = ref<Plan[]>([]);
const planSelected = ref<number | undefined | null>(undefined);
const selectedImage = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

watch(
  () => props.user,
  (newValue) => {
    if (newValue) {
      newUser.value = newValue;
      roleSelected.value = newValue.idCargo;
      planSelected.value = newValue.cliente?.planoId || undefined;
      selectedImage.value = newUser.value.fotoPerfil;
    } else {
      newUser.value = new AuthUser();
    }
  }
);

onMounted(async () => {
  await getRoles();
  await getPlans();
});

async function getRoles() {
  try {
    const response = await RoleServices.getAll(store);
    roles.value = response ? response : [];
  } catch (error) {
    console.error('Erro ao buscar cargos:', error);
    toast.error('Ocorreu um erro ao buscar os cargos.');
  }
}

async function getPlans() {
  try {
    const response = await PlanServices.getAll(store);
    plans.value = response ? response : [];
  } catch (error) {
    console.error('Erro ao buscar planos:', error);
    toast.error('Ocorreu um erro ao tentar buscar os planos.');
  }
}

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
  if (!newUser.value.cliente?.endereco.cep || !isValidCEP(newUser.value.cliente.endereco.cep))
    return;
  try {
    loadingFindCep.value = true;
    const addressResponse = await ExternalServices.getAddressByCep(
      newUser.value.cliente.endereco.cep
    );
    newUser.value.cliente.endereco.fillByApiCepResponse(addressResponse);
  } catch (error) {
    toast.error('Ocorreu um erro ao buscar as informações do CEP, tente novamente.');
  } finally {
    loadingFindCep.value = false;
  }
}

async function addOrEditUser() {
  if (!props.user) {
    await addUser();
  } else {
    await editUser();
  }
}

async function addUser() {
  try {
    newUser.value.idCargo = roleSelected.value || 3;
    newUser.value.senha = newPassword.value;
    if (newUser.value.cliente && planSelected.value) {
      newUser.value.cliente.planoId = planSelected.value;
    }
    newUser.value.fotoPerfil = selectedImage.value;
    await UserServices.createUser(newUser.value, store);
    window.location.reload();
  } catch (error) {
    console.error(error);
    toast.error('Ocorreu um erro ao criar o usuário, verifique os campos e tente novamente.');
  }
}

async function editUser() {
  try {
    newUser.value.idCargo = roleSelected.value || props.user?.idCargo || 3;
    if (newUser.value.cliente?.id) {
      newUser.value.cliente.planoId = planSelected.value;
    }
    newUser.value.fotoPerfil = selectedImage.value;
    newUser.value.senha = newPassword.value ? newPassword.value : newUser.value.senha;
    await UserServices.updateUser(newUser.value, store);
    window.location.reload();
  } catch (error) {
    console.error(error);
    toast.error('Ocorreu um erro ao editar o usuário, verifique os campos e tente novamente.');
  }
}

function close() {
  newUser.value = new AuthUser();
  newPassword.value = '';
  roleSelected.value = undefined;
  planSelected.value = undefined;
  emit('close');
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
