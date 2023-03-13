<template>
  <drawer
    v-model="visible"
    title="冻结/解冻单查询"
    :footer="false"
    :show-log="false"
  >
    <div class="warp">
      <div class="block-title">基本信息</div>
      <a-descriptions
        :label-style="{ 'margin-bottom': '20px' }"
        :column="2"
        layout="vertical"
      >
        <a-descriptions-item label="单号：" :span="1">{{
          info.orderNo ? info.orderNo : '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="项目：" :span="1">{{
          info.projectName ? info.projectName : '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="卡名：" :span="1">{{
          info.cardName ? info.cardName : '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="卡号：" :span="1">{{
          info.memberCardCode ? info.memberCardCode : '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="姓名：" :span="1">{{
          info.memberName ? info.memberName : '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="电话：" :span="1">{{
          info.memberPhone ? info.memberPhone : '--'
        }}</a-descriptions-item>

        <a-descriptions-item label="卡内余额（¥）：" :span="2">{{
          info.balance ? formatPrice(info.balance) : '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="当前状态：" :span="1">{{
          info.currentStatus === 1
            ? '使用中'
            : info.currentStatus === 2
            ? '已冻结'
            : '已退卡'
        }}</a-descriptions-item>
        <a-descriptions-item label="更改前状态：" :span="1">{{
          info.beforeStatus === 1
            ? '使用中'
            : info.beforeStatus === 2
            ? '已冻结'
            : '已退卡'
        }}</a-descriptions-item>
        <a-descriptions-item label="冻结人：" :span="1">{{
          info.freezeBy ? info.freezeBy : '--'
        }}</a-descriptions-item>

        <a-descriptions-item label="冻结时间：" :span="1">{{
          info.freezeTime ? info.freezeTime : '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="解冻人：" :span="1">{{
          info.unfreezeBy ? info.unfreezeBy : '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="解冻时间：" :span="1">{{
          info.unfreezeTime ? info.unfreezeTime : '--'
        }}</a-descriptions-item>
      </a-descriptions>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import type { SvcWebMemberCardFreezeDetailIdGetResponse } from '@/api/svc-web';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { formatPrice } from '@/utils';
  import { svcWebMemberCardFreezeDetailIdGet } from '@/api/svc-web';

  const emits = defineEmits(['update:modelValue']);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    bannerId: {
      type: Number,
      required: true
    }
  });
  const info = ref<SvcWebMemberCardFreezeDetailIdGetResponse>(
    {} as SvcWebMemberCardFreezeDetailIdGetResponse
  );
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const [getData] = useFuncProxy(async () => {
    info.value = await svcWebMemberCardFreezeDetailIdGet({
      id: String(props.bannerId)
    });
  });
  watch(
    () => props.bannerId,
    () => {
      getData();
    },
    { immediate: true }
  );
</script>
<style scoped lang="less">
  .warp {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 16px;
  }
  .right-item {
    width: 100%;
    height: 100%;
    border-left: 1px dashed #333;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
