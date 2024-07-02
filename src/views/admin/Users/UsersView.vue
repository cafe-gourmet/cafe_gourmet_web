<template>
  <v-container style="width: 90vw">
    <header-component />
    <v-card
      class="bg-primary text-secondary pb-4"
      style="width: 100%; margin-top: 100px"
      elevation="24"
    >
      <template v-slot:title>
        <div class="mt-4 mb-4 break-text">Gerenciar Usuários</div>
      </template>
      <template v-slot:text>
        <v-row style="width: 100%" justify="space-between">
          <v-col cols="12" sm="7" md="6" lg="6">
            <v-text-field
              v-model="search"
              bg-color="secondary"
              color="primary"
              label="Buscar usuário"
              append-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="5" md="6" lg="6" class="text-end">
            <v-btn
              text="Adicionar"
              size="x-large"
              color="secondary text-primary"
              class="btn-add"
              append-icon="mdi-plus"
              @click="openAddUserDialog()"
            />
          </v-col>
        </v-row>
      </template>
      <div class="pr-8">
        <v-data-table
          :headers="tableHeaders"
          :items="users"
          :search="search"
          :hover="true"
          style="max-width: 100%; border-radius: 5px"
          class="ma-4 bg-secondary text-primary"
          no-data-text="Nenhum usuário encontrado"
          items-per-page-text="Itens por página"
        >
          <template v-slot:[`item.idSituacao`]="{ item }">
            <span>{{ item.idSituacao === 1 ? 'Ativo' : 'Inativo' }}</span>
          </template>

          <template v-slot:[`item.idCargo`]="{ item }">
            <span>{{ RoleDictionary.translate(item.idCargo) }}</span>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <div style="display: flex">
              <v-icon @click="openEditUserDialog(item)"> mdi-pencil </v-icon>
              <v-icon @click="openDeleteUserDialog(item)"> mdi-delete </v-icon>
            </div>
          </template>
        </v-data-table>
      </div>
    </v-card>
    <delete-user-dialog
      :show="showDeleteUsertDialog"
      :user="userSelected"
      @close="showDeleteUsertDialog = false"
    />
    <add-user-dialog
      :show="showAddUserDialog"
      :user="userSelected"
      @close="showAddUserDialog = false"
    />
  </v-container>
</template>

<script setup lang="ts">
import HeaderComponent from '../home/components/HeaderComponent.vue';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import type { MainState } from '@/config/MainStore';
import { useToast } from 'vue-toastification';
import UserServices from '@/services/UserServices';
import type { AuthUser } from '@/entity/AuthUser';
import AddUserDialog from './dialogs/AddUserDialog.vue';
import DeleteUserDialog from './dialogs/DeleteUserDialog.vue';
import { RoleDictionary } from '@/types/dictionarys/RoleDicitionary';

const search = ref('');
const showAddUserDialog = ref(false);
const showDeleteUsertDialog = ref(false);
const userSelected = ref(undefined);
const users = ref<AuthUser[]>([]);
const toast = useToast();
const store = useStore<MainState>();

onMounted(async () => await getUsers());

async function getUsers() {
  try {
    const response = await UserServices.findAll(store);
    users.value = response ? response : [];
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    toast.error('Ocorreu um erro ao tentar buscar os usuários.');
  }
}

function openAddUserDialog() {
  userSelected.value = undefined;
  showAddUserDialog.value = true;
}

function openDeleteUserDialog(item: any) {
  userSelected.value = item;
  showDeleteUsertDialog.value = true;
}

function openEditUserDialog(item: any) {
  userSelected.value = item;
  showAddUserDialog.value = true;
}

const tableHeaders = [
  { title: 'ID', value: 'id' },
  { title: 'Nome', value: 'nomeCompleto', align: 'center' },
  { title: 'Cargo', value: 'cargo.nome', align: 'center' },
  { title: 'Email', value: 'email', align: 'center' },
  { title: 'Situação', value: 'idSituacao', align: 'center' },
  { title: 'Ações', key: 'actions', sortable: false }
];
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
