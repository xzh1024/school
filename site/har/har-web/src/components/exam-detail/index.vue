<template>
  <div>
    <engine-model v-if="p === 'pcs'" />
    <business-model v-else />
  </div>
</template>

<script setup lang="ts">
  import EngineModel from '@/components/exam-detail/engine-model.vue';
  import BusinessModel from '@/components/exam-detail/business-model.vue';
  import { getPlatformFlag } from '@/utils';
  const p = getPlatformFlag();
</script>
<style scoped lang="less"></style>
