<template>
  <drawer v-model="visible" title="充值详情" :footer="false" :show-log="false">
    <div class="warp">
      <div class="block-title">基本信息</div>
      <a-descriptions
        :label-style="{ 'margin-bottom': '20px' }"
        :column="2"
        layout="vertical"
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

        <a-descriptions-item label="卡内余额（¥）：" :span="1">{{
          info.balance ? formatPrice(info.balance) : '--'
        }}</a-descriptions-item>

        <a-descriptions-item label="充值人：" :span="1">{{
          info.createBy || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="充值时间：" :span="1">{{
          info.createTime || '--'
        }}</a-descriptions-item>
      </a-descriptions>
      <div class="block-title">充值明细</div>
      <a-descriptions>
        <a-descriptions-item label="活动名称：" :span="1">{{
          info.activityName || '--'
        }}</a-descriptions-item>
      </a-descriptions>
      <i-table :options="options" :data="data"></i-table>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { svcWebMemberCardRechargeDetailIdGet } from '@/api/svc-web';
  import { formatPrice } from '@/utils';
  import type { SvcWebMemberCardRechargeDetailIdGetResponse } from '@/api/svc-web';
  import NP from 'number-precision';
  import { payWayList } from '@/utils/dic';

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
  interface modelListType {
    payment: number;
    amount: number;
  }

  const options = computed(() => {
    return {
      pageShow: false,
      menu: false,
      header: false,
      tableCard: false,
      menuOtherOptions: {
        summaryText: '合计',
        summary({ data = [] }) {
          const { discountAmount = 0, receivedAmount = 0 } = info.value;
          const countData = {
            payment: '合计',
            amount: 0,
            discountPrice: formatPrice(discountAmount),
            rechargePrice: formatPrice(receivedAmount)
          };
          data.forEach((i: modelListType) => {
            countData.amount = NP.plus(countData.amount, i.amount);
          });
          return [countData];
        }
      },
      columns: [
        {
          prop: 'payment',
          label: '支付方式',
          formatter: (record: modelListType) => {
            return payWayList.find((i) => i.value === record.payment)?.label;
          }
        },
        {
          prop: 'amount',
          label: '充值金额(￥)',
          formatter: (record: modelListType) => {
            return formatPrice(record.amount);
          }
        },
        // 仅展示字段
        {
          prop: 'discountPrice',
          label: '优惠金额(￥)'
        },
        {
          prop: 'rechargePrice',
          label: '充值到账(￥)'
        }
      ]
    };
  });

  const data = computed(() => {
    const { modeList = [] } = info.value;
    return modeList;
  });

  const info = ref<Partial<SvcWebMemberCardRechargeDetailIdGetResponse>>({});
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const [getData] = useFuncProxy(async () => {
    svcWebMemberCardRechargeDetailIdGet;
    info.value = await svcWebMemberCardRechargeDetailIdGet({
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
