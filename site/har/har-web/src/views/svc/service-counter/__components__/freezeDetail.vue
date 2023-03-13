<template>
  <div class="padding-sm">
    <basic-info :info="info" source="freeze"></basic-info>
  </div>
</template>

<script setup lang="ts">
  import BasicInfo from './basic-info.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { onMounted, ref } from 'vue';
  import { svcWebMemberCardFreezeDetailIdGet } from '@/api/svc-web';

  const props = defineProps({
    id: {
      type: [Number, String]
    }
  });
  const info = ref({});

  onMounted(() => {
    getData();
  });

  const [getData] = useFuncProxy(async () => {
    info.value = await svcWebMemberCardFreezeDetailIdGet({ id: props.id + '' });
  });
</script>

<style scoped lang="less">
  .padding-sm {
    padding: 16px;
    background-color: #fff;
  }
</style>
