<template>
  <div v-if="isMobile">
    <mobile-client-template v-if="!isAdmin" />
    <mobile-admin-template v-else />
  </div>
  <div v-else>
    <desktop-client-template v-if="!isAdmin" />
    <desktop-admin-template v-else />
  </div>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import DesktopAdminTemplate from '@/templates/DesktopAdminTemplate.vue';
import DesktopClientTemplate from '@/templates/DesktopClientTemplate.vue';
import MobileClientTemplate from './templates/MobileClientTemplate.vue';
import MobileAdminTemplate from './templates/MobileAdminTemplate.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue';

const isMobile: Ref<boolean> = ref(window.innerWidth < 768);
const isAdmin: Ref<boolean> = ref(false);

const verifyIsMobileScreen = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  window.addEventListener('resize', verifyIsMobileScreen);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', verifyIsMobileScreen);
});
</script>
