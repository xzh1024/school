<template>
  <drawer
    v-model="visible"
    title="查看铺位信息"
    show-log
    :log-options="{
      modeId: props.id,
      mode: 'cbd_assets_estate',
      logUrl: cbdApiProjectSysOptPageOptListPost
    }"
    @cancel="visible = false"
  >
    <detail-item :data="data" />
    <template #footer>
      <a-button @click="update">修改</a-button>
      <a-button type="primary" @click="visible = false">返回</a-button>
    </template>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import DetailItem from './detail-item.vue';
  import {
    cbdApiProjectEstateInfoEstateIdGet,
    cbdApiProjectSysOptPageOptListPost
  } from '@/api';
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    refresh: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: undefined
    }
  });
  const emits = defineEmits(['update:modelValue', 'update']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const data = ref<any>({});
  const [getDetailData] = useFuncProxy(async () => {
    const res = await cbdApiProjectEstateInfoEstateIdGet({
      estateId: props.id! + ''
    });
    data.value = res.basic;
    data.value.attachments = res.other!.attachments || [];
    data.value.remark = res.other!.remark || '';
  });
  const update = () => {
    emits('update');
  };
  getDetailData();
  watch(
    () => props.refresh,
    () => {
      if (props.id) {
        getDetailData();
      }
    }
  );
</script>
<style scoped lang="less"></style>
