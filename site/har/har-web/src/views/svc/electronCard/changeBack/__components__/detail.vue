<template>
  <drawer
    v-model="visible"
    title="退卡单查询"
    :footer="false"
    :show-log="false"
  >
    <div class="warp">
      <div class="block-title">基本信息</div>
      <a-descriptions
        layout="vertical"
        :label-style="{ 'margin-bottom': '20px' }"
        :column="2"
      >
        <a-descriptions-item label="单号：" :span="1">{{
          info.orderNo || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="项目：" :span="1">{{
          info.projectName || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="卡名：" :span="1">{{
          info.cardName || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="卡号：" :span="1">{{
          info.memberCardCode || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="姓名：" :span="1">{{
          info.memberName || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="电话：" :span="1">{{
          info.memberPhone || '--'
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
        <a-descriptions-item label="退卡人：" :span="1">{{
          info.createBy || '--'
        }}</a-descriptions-item>

        <a-descriptions-item label="退卡时间：" :span="1">{{
          info.createTime || '--'
        }}</a-descriptions-item>
      </a-descriptions>
      <i-table
        :options="listOptions"
        :data="info.modeList || []"
        style="width: 100%"
      >
        <template #paymentCell="{ record }">
          {{
            record.payment === 1
              ? '现金'
              : record.payment === 1
              ? '支付宝'
              : '微信'
          }}
        </template>
      </i-table>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { svcWebMemberCardCancelDetailIdGet } from '@/api/svc-web';
  import type { SvcWebMemberCardCancelDetailIdGetResponse } from '@/api/svc-web';

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

  //记录表格定义
  const listOptions = computed(() => {
    return {
      index: true,
      indexTitle: '序号',
      tableCard: false,
      menu: false,
      pageShow: false,
      columns: [
        {
          label: '退款方式',
          prop: 'payment'
        },
        {
          label: '退款金额（¥）',
          prop: 'amount'
        }
      ]
    };
  });
  const info = ref<SvcWebMemberCardCancelDetailIdGetResponse>(
    {} as SvcWebMemberCardCancelDetailIdGetResponse
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
    svcWebMemberCardCancelDetailIdGet;
    info.value = await svcWebMemberCardCancelDetailIdGet({
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
