<template>
  <i-table
    class="i-table"
    :options="feeOptions"
    :data="data"
    :loading="loading"
  >
    <template #header
      ><div>{{ expenseType }}</div></template
    >
    <template #expenseTypeCell="{ record }"
      ><div>{{ record.expenseType }}</div></template
    >
    <template #paymentMethodCell="{ record }"
      ><div>{{ record.paymentMethod }}</div></template
    >
    <template #hasTaxCell="{ record }"
      ><div>{{
        valueFindLabel(contractHasTaxList, record.hasTax)
      }}</div></template
    >
  </i-table>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import NP from 'number-precision';
  import { formatPrice, valueFindLabel } from '@/utils';
  import { contractHasTaxList } from '@/utils/dic';
  import { previewTypeItem } from '@/views/new-contract/__components__/cost-info/index';

  defineProps({
    data: {
      type: Array,
      default: () => []
    },
    expenseType: {
      type: String
    },
    loading: {
      type: Boolean,
      default: false
    }
  });

  interface countDataType {
    isSummary: boolean;
    statementDay: string;
    paymentPeriod?: string;
    contractPayment: string | number;
    taxExcludePayment: string | number;
    taxPayment: string | number;
    freePayment: string | number;
    actPayment: string | number;
  }

  const feeOptions = ref({
    index: true,
    menu: false,
    indexTitle: '序号',
    pageShow: false,

    menuOtherOptions: {
      scroll: {
        x: 1000,
        y: 700
      },
      summaryText: '合计',
      summary({ data = [] }) {
        const countData: countDataType = {
          isSummary: true,
          statementDay: '合计',
          paymentPeriod: '--',
          contractPayment: 0,
          taxExcludePayment: 0,
          taxPayment: 0,
          freePayment: 0,
          actPayment: 0
        };
        data.forEach((record: any) => {
          countData.contractPayment = NP.plus(
            countData.contractPayment,
            record.contractPayment
          );
          countData.taxExcludePayment = NP.plus(
            countData.taxExcludePayment,
            record.taxExcludePayment
          );
          countData.taxPayment = NP.plus(
            countData.taxPayment,
            record.taxPayment
          );
          countData.freePayment = NP.plus(
            countData.freePayment,
            record.freePayment
          );
          countData.actPayment = NP.plus(
            countData.actPayment,
            record.actPayment
          );
        });
        return [countData];
      }
    },
    columns: [
      {
        label: '费用项目',
        width: 120,
        prop: 'expenseType'
      },
      {
        label: '收费方式',
        width: 120,
        prop: 'paymentMethod'
      },
      {
        label: '费用期间',
        width: 200,
        prop: 'paymentPeriod',
        formatter: (record: previewTypeItem) => {
          if (!record.startDate) return '--';
          return `${record.startDate}-${record.endDate}`;
        }
      },
      {
        label: '账单生成日期',
        width: 120,
        prop: 'statementDay'
      },
      {
        label: '合同金额',
        width: 120,
        prop: 'contractPayment',
        formatter: (record: previewTypeItem) => {
          return formatPrice(record.contractPayment || 0);
        }
      },
      {
        label: '是否含税',
        width: 120,
        prop: 'hasTax'
      },
      {
        label: '税率',
        width: 120,
        prop: 'taxRatio'
      },
      {
        label: '不含税金额（元）',
        width: 200,
        prop: 'taxExcludePayment',
        formatter: (record: previewTypeItem) => {
          return formatPrice(record.taxExcludePayment || 0);
        }
      },
      {
        label: '税额',
        width: 120,
        prop: 'taxPayment',
        formatter: (record: previewTypeItem) => {
          return formatPrice(record.taxPayment || 0);
        }
      },
      {
        label: '免租金额',
        width: 120,
        prop: 'freePayment',
        formatter: (record: previewTypeItem) => {
          return formatPrice(record.freePayment || 0);
        }
      },
      {
        label: '总金额',
        width: 120,
        prop: 'actPayment',
        formatter: (record: previewTypeItem) => {
          return formatPrice(record.actPayment || 0);
        }
      }
    ]
  });
</script>

<style scoped lang="less">
  .i-table {
    width: 100%;
  }
</style>
