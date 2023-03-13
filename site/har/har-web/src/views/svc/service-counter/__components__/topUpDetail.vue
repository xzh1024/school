<template>
  <div class="detail">
    <div class="detail-box">
      <basic-info :info="info" source="topUp"></basic-info>
    </div>
    <div class="detail-box margin-top-xs">
      <a-descriptions title="充值明细" :column="1">
        <a-descriptions-item label="活动名称">
          <span>{{ info.activityName }}</span>
        </a-descriptions-item>
      </a-descriptions>
      <div class="margin-top-xs"></div>
      <i-table
        :options="options"
        :table-loading="loading"
        :data="data"
      ></i-table>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { onMounted, ref, computed } from 'vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import ITable from '@/components/i-table/index.vue';
  import BasicInfo from './basic-info.vue';
  import {
    svcWebMemberCardRechargeDetailIdGet,
    SvcWebMemberCardRechargeDetailIdGetResponse
  } from '@/api/svc-web';
  import { formatPrice } from '@/utils';
  import NP from 'number-precision';
  import { payWayList } from '@/utils/dic';

  const props = defineProps({
    id: {
      type: [String, Number]
    }
  });

  const info = ref<Partial<SvcWebMemberCardRechargeDetailIdGetResponse>>({});
  onMounted(() => {
    getData();
  });
  const [getData, loading] = useFuncProxy(async () => {
    info.value = await svcWebMemberCardRechargeDetailIdGet({
      id: props.id + ''
    });
  });

  const data = computed(() => {
    const { modeList = [] } = info.value;
    return modeList;
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
</script>
<style scoped lang="less">
  .margin-top-xs {
    margin-top: 16px;
  }
  .detail-box {
    background: #fff;
    padding: 16px;
    :deep(.arco-descriptions-title) {
      display: block;
    }
  }
  :deep(.arco-descriptions-title) {
    display: none;
  }
  :deep(.basic-info) {
    padding: 0;
  }
  :deep(.i-card) {
    padding: 0 16px;
    & > .margin-bottom-xs {
      margin-bottom: 0;
    }
  }
</style>
