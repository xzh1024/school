<template>
  <div>
    <i-drawer v-model="visible">
      <cost-info></cost-info>
    </i-drawer>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import IDrawer from '@/components/drawer/drawer.vue';
  import CostInfo from './__components__/cost-info/index.vue';
  const visible = ref(true);
</script>

<style scoped></style>
