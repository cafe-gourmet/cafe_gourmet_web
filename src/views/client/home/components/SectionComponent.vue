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
          <item-component :item="item" class="product-item" />
        </v-col>
      </v-row>
    </div>
    <v-btn
      width="100%"
      size="large"
      color="secondary"
      class="mt-8 text-primary"
      :to="props.redirect"
    >
      <span class="font-weight-bold">{{ textButton }}</span>
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import ItemComponent from './ItemComponent.vue';

const props = defineProps(['title', 'textButton', 'items', 'redirect']);
</script>

<style scoped>
.item-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  max-width: 100%;
}

.product-item {
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 18rem;
  overflow: hidden;
}
</style>
