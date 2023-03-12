<template>
  <view :style="{ height: top }"></view>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { useAppStore } from "@/stores/app";
  const store = useAppStore();
  const top = computed(() => {
    return store.sysNavBar + "px";
  });
</script>
