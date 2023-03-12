<template>
  <a-config-provider>
    <router-view v-if="isShow" />
    <global-setting />
  </a-config-provider>
</template>

<script lang="ts" setup>
  import GlobalSetting from '@/components/global-setting/index.vue';
  import resize from '@/utils/resize';
  import { ref, provide, nextTick, onMounted } from 'vue';
  const isShow = ref(true);
  function reload() {
    isShow.value = false;
    nextTick(() => {
      isShow.value = true;
    });
  }
  provide('reload', reload);
  onMounted(() => {
    window.addEventListener('resize', () => {
      resize.update();
    });
  });
</script>
