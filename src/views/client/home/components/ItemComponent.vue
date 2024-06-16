<template>
  <v-card class="bg-secondary pa-2 ma-auto" max-width="9rem">
    <v-img
      src="https://cdn.irmaospatrocinio.com.br/img/p/1/7/4/1/6/0/174160-large_default.jpg"
      width="150"
      style="border: 2px solid #5a2e2e; border-radius: 5px"
    />
    <div class="mt-2" >{{ props.text }}</div>
    <v-row class="mt-4">
      <v-col>{{ props.amount }}</v-col>
    </v-row>
    <v-row class="pa-2">
      <v-btn color="primary" width="100%">
        <v-icon class="cursor-pointer" color="secondary" size="25">mdi-cart-plus</v-icon>
      </v-btn>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps(['text', 'amount'])
</script>
