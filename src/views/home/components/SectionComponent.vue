<template>
  <v-container class="mt-4">
    <div class="font-weight-bold" style="font-size: 2rem">{{ props.title }}</div>
    <div class="mt-4">
      <v-row>
        <v-col
          v-for="(item, index) in items"
          :key="index"
          cols="6"
          sm="3"
          md="3"
          lg="3"
          align-self="center"
        >
          <item-component :text="item.text" :amount="item.amount" />
        </v-col>
      </v-row>
    </div>
    <v-btn width="100%" size="large" color="secondary" class="mt-8 text-primary">
      <span class="font-weight-bold">{{ textButton }}</span>
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import ItemComponent from '@/components/ItemComponent.vue';

const props = defineProps(['title', 'textButton', 'items']);
</script>

<style scoped>
.item-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  max-width: 100%;
}
</style>
