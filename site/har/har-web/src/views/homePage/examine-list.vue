<template>
  <div class="page-container">
    <examine-list v-if="tabActive" :tab-active="tabActive" />
  </div>
</template>

<script setup lang="ts">
  import ExamineList from './_components_/examine-list.vue';
  import { useRoute } from 'vue-router';
  import { onMounted, ref } from 'vue';

  const tabActive = ref();

  const route = useRoute();
  onMounted(() => {
    console.log('---onMounted---', route.query);
    tabActive.value = Number(route.query.tabActive) || 1;
  });
</script>

<style scoped lang="less"></style>
