<template>
  <v-dialog
    :model-value="props.show"
    @update:model-value="$emit('close')"
    max-width="600px"
    scrim="#262626"
    opacity="0.74"
  >
    <v-card
      class="ma-auto pa-2"
      width="80%"
      text="Tem certeza que deseja excluir esse plano?"
      color="secondary text-primary"
      title="Excluir Plano"
    >
      <v-card-actions>
        <v-btn variant="outlined" text="fechar" color="primary" @click="$emit('close')" />
        <v-btn base-color="primary" variant="flat" text="confirmar" @click="deletePlan()" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { AuthState } from '@/config/AuthStore';
import PlanServices from '@/services/PlanServices';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';

const props = defineProps(['show', 'plan']);
const toast = useToast();
const store = useStore<AuthState>();

async function deletePlan() {
  try {
    await PlanServices.delete(props.plan.id, store);
    window.location.reload();
  } catch (error) {
    console.error(error);
    toast.error('Ocorreu um erro ao tentar excluir o plano.');
  }
}
</script>
