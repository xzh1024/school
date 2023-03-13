<template>
  <div>
    <div class="i-card" style="width: 100%">
      <div class="block-title">基础信息</div>
      <a-descriptions
        table-layout="fixed"
        style="width: 100%; padding-bottom: 16px"
        :column="4"
      >
        <a-descriptions-item label="归属项目：">{{
          data.basicInfo.projectName
        }}</a-descriptions-item>
        <a-descriptions-item label="计划名称：">{{
          data.basicInfo.planName
        }}</a-descriptions-item>
        <a-descriptions-item label="渠道名称：">{{
          data.basicInfo.channelName
        }}</a-descriptions-item>
        <a-descriptions-item label="奖励措施：">{{
          valueFindLabel(calculateTypeList, data.basicInfo.settleMode)
        }}</a-descriptions-item>
        <a-descriptions-item label="比例：">{{
          data.basicInfo.paymentMethod
        }}</a-descriptions-item>
        <a-descriptions-item label="账单生成日期：">{{
          data.basicInfo.billGenDate
        }}</a-descriptions-item>
        <a-descriptions-item label="合同号：">{{
          data.basicInfo.contractCode
        }}</a-descriptions-item>
      </a-descriptions>
    </div>
    <div class="i-card">
      <div class="block-title">原始账单</div>
      <a-descriptions
        style="width: 100%"
        :column="5"
        layout="vertical"
        bordered
      >
        <a-descriptions-item label="费用项目：">
          {{ valueFindLabel(attractBillTypeList, data.originalBill.type) }}
        </a-descriptions-item>
        <a-descriptions-item label="计算方式：">
          {{ valueFindLabel(calculateTypeList, data.originalBill.settleMode) }}
        </a-descriptions-item>
        <a-descriptions-item label="比例：">
          {{ data.originalBill.paymentMethod || '--' }}
        </a-descriptions-item>
        <a-descriptions-item label="账单生成日期：">{{
          data.originalBill.billGenDate || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="账期：">
          {{ data.originalBill.period || '--' }}
        </a-descriptions-item>
        <a-descriptions-item label="金额：">{{
          data.originalBill.amount || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="税率：">{{
          data.originalBill.taxRate ? data.originalBill.taxRate + '%' : '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="不含税金额：">
          {{ data.originalBill.taxExcludedAmount || '--' }}
        </a-descriptions-item>
        <a-descriptions-item label="税额：">
          {{ data.originalBill.taxAmount || '--' }}
        </a-descriptions-item>
        <a-descriptions-item label="总金额：">
          {{ data.originalBill.totalAmount || '--' }}
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <div class="i-card">
      <i-table ref="TableData" :options="options" :data="tableList">
        <template #header>
          <div class="flex justify-between align-center">
            <div class="block-title">账单调整</div>
          </div>
        </template>
        <template #typeCell="{ record }">
          {{ record.type === 1 ? '招商费' : '' }}
        </template>
        <template #afterAmountCell="{ record }">
          <a-input-number
            v-model="record.afterAmount"
            :min="0"
            disabled
          ></a-input-number>
        </template>
      </i-table>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, Ref, PropType } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { type CbdApiProjectInvestExpensesInfoGetResponse } from '@/api';
  import { calculateTypeList, attractBillTypeList } from '@/utils/dic';
  import { valueFindLabel } from '@/utils';
  type Detail = CbdApiProjectInvestExpensesInfoGetResponse;
  type RowData = {
    type: number;
    beforeAmount: number;
    afterAmount: number;
    adjustAmount: number;
    taxAmount: number;
    totalAmount: number;
    remark?: string;
    history: number;
  };
  const props = defineProps({
    info: {
      type: Object as PropType<Detail>,
      default: () => {
        return {
          id: 0,
          basicInfo: {},
          originalBill: {},
          expensesAdjust: []
        };
      }
    }
  });
  const TableData: Ref = ref(null);
  const options = computed(() => {
    return {
      tableCard: false,
      pageShow: false,
      menu: false,
      index: true,
      indexTitle: '序号',
      columns: [
        {
          label: '费用项目',
          prop: 'type',
          width: 100
        },
        {
          label: '可调整金额',
          prop: 'beforeAmount',
          width: 140
        },
        {
          label: '调整后金额',
          prop: 'afterAmount',
          width: 140
        },
        {
          label: '调整金额',
          prop: 'adjustAmount',
          width: 100
        },
        {
          label: '税额',
          prop: 'taxAmount',
          width: 100
        },
        {
          label: '总金额',
          prop: 'totalAmount',
          width: 100
        },
        {
          label: '备注',
          prop: 'remark',
          width: 100
        }
      ]
    };
  });

  const data = computed(() => props.info);
  const tableList = computed<RowData[]>(() => props.info.expensesAdjust || []);
</script>
<style scoped lang="less">
  .i-card {
    margin-bottom: 16px;
    padding-top: 0;
  }
</style>
