<template>
  <v-container style="height: 100vh">
    <v-row class="h-100" align="center" justify="center">
      <v-col cols="11" style="height: 70vh">
        <v-card height="100%" color="secondary" class="text-center px-8 py-2">
          <v-row align="center" style="height: 45%">
            <v-col cols="12">
              <v-img
                style="margin: auto"
                :width="140"
                aspect-ratio="16/9"
                cover
                src="src/assets/images/logo.png"
              ></v-img>
              <div class="text-h5">Café Gourmet</div>
            </v-col>
          </v-row>
          <v-row style="height: 15%">
            <v-col cols="12">
              <v-text-field
                label="Email"
                v-model="auth.email"
                variant="outlined"
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" style="height: 13%">
            <v-col cols="12">
              <v-text-field
                label="Senha"
                v-model="auth.senha"
                type="password"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" style="height: 30%">
            <v-col cols="12">
              <v-btn
                width="100%"
                large
                color="primary"
                class="mb-2"
                block:loading="loadingAuth"
                @click="Authenticate()"
                >entrar</v-btn
              >
              <v-btn width="100%" large color="primary" to="/register">cadastrar</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { Auth } from '@/entity/Auth';
import UserServices from '@/services/UserServices';
import { useStore } from 'vuex';
import type { AuthState } from '@/config/AuthStore';
import router from '@/router';

const loadingAuth = ref(false);
const toast = useToast();
const auth = ref(new Auth());
const store = useStore<AuthState>();

async function Authenticate() {
  try {
    loadingAuth.value = true;
    const response: any = await UserServices.login(auth.value, store);
    store.commit('setTokenJwt', response);
    router.push('/client')
  } catch (error) {
    toast.error('Email ou senha errados!');
  } finally {
    loadingAuth.value = false;
  }
}
</script>
