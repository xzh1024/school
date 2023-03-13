<template>
  <div style="overflow-y: scroll">
    <div class="i-card" style="width: 100%">
      <a-descriptions
        table-layout="fixed"
        title="基础信息"
        layout="vertical"
        style="width: 100%"
        :column="4"
        :value-style="{ paddingBottom: '16px' }"
      >
        <a-descriptions-item label="归属项目：">{{
          data.projectName || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="商户名称：">
          {{ data.merchantName || '--' }}</a-descriptions-item
        >
        <a-descriptions-item label="店铺名称：">{{
          data.storeName || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="合同号：">{{
          data.contractCode || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="账单类型：">{{
          valueFindLabel(billTypeList, data.billType)
        }}</a-descriptions-item>
        <a-descriptions-item label="审批状态：">{{
          valueFindLabel(examine_status, data.auditStat)
        }}</a-descriptions-item>
        <a-descriptions-item label="支付状态：">{{
          valueFindLabel(business_status, data.businessStat)
        }}</a-descriptions-item>
      </a-descriptions>
    </div>
    <div class="i-card">
      <!--            收付款都可能展示-->
      <!--      能耗类型-->
      <a-descriptions
        v-if="data.expenseKey === ENERGY_BILL_CODE"
        style="width: 100%"
        title="原始账单"
        :column="5"
        layout="vertical"
        bordered
      >
        <a-descriptions-item label="费用项目：">{{
          data.expenseItemsName || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="抄表日期：">
          {{ formatTime(data.readingDate, 'YYYY-MM-DD') }}
        </a-descriptions-item>
        <a-descriptions-item label="能耗单价：">{{
          formatPrice(data.price)
        }}</a-descriptions-item>
        <a-descriptions-item label="费用期间：">{{
          data.expensePeriod || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="本期用量：">
          {{ data.currentDosage || '--' }}
        </a-descriptions-item>
        <a-descriptions-item label="本期费用：">{{
          data.currentFees || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="税率：">{{
          (Number(data.taxRate || 0).toFixed(2) || 0) + '%'
        }}</a-descriptions-item>
        <a-descriptions-item label="不含税金额：">
          {{ formatPrice(data.taxExclusiveAmount || '') }}
        </a-descriptions-item>
        <a-descriptions-item label="税额：">
          {{ formatPrice(data.taxAmount || '') }}
        </a-descriptions-item>
        <a-descriptions-item
          :label="data.billType === 1 ? '应收金额：' : '应付金额：'"
        >
          {{ formatPrice(data.receivableAmount || '') }}
        </a-descriptions-item>
      </a-descriptions>
      <!--      滞纳金-->
      <a-descriptions
        v-if="data.expenseKey === LATE_FEE_CODE"
        style="width: 100%"
        title="原始账单"
        :column="5"
        layout="vertical"
        bordered
      >
        <a-descriptions-item label="费用项目：">{{
          data.expenseItemsName || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="原费用项目：">
          {{ data.originExpenseItemsName || '--' }}
        </a-descriptions-item>
        <a-descriptions-item label="本次收款金额：">{{
          formatPrice(data.thisTimeCollection)
        }}</a-descriptions-item>
        <a-descriptions-item label="滞纳金区间：">{{
          data.overdueFinePeriod || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="滞纳金方式：">
          {{ data.unitAmount }}
        </a-descriptions-item>
        <a-descriptions-item label="滞纳金金额：">{{
          formatPrice(data.overdueFineAmount)
        }}</a-descriptions-item>
        <a-descriptions-item label="税率：">{{
          (Number(data.taxRate || 0).toFixed(2) || 0) + '%'
        }}</a-descriptions-item>
        <a-descriptions-item label="不含税金额：">
          {{ formatPrice(data.taxExclusiveAmount || '') }}
        </a-descriptions-item>
        <a-descriptions-item label="税额：">
          {{ formatPrice(data.taxAmount || '') }}
        </a-descriptions-item>
        <a-descriptions-item
          :label="data.billType === 1 ? '应收金额：' : '应付金额：'"
        >
          {{ formatPrice(data.receivableAmount || '') }}
        </a-descriptions-item>
      </a-descriptions>
      <!--      存款类型-->
      <a-descriptions
        v-if="DEPOSIT_CODE.includes(data && String(data.expenseKey))"
        style="width: 100%"
        title="原始账单"
        :column="5"
        layout="vertical"
        bordered
      >
        <a-descriptions-item label="费用项目：">{{
          data.expenseItemsName || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="账单生成日期：">{{
          data.billCreateAt || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="合同期间：">{{
          data.expensePeriod || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="费用金额：">{{
          formatPrice(data.amount || '')
        }}</a-descriptions-item>
        <a-descriptions-item
          :label="data.billType === 1 ? '应收金额：' : '应付金额：'"
        >
          {{ formatPrice(data.receivableAmount || '') }}
        </a-descriptions-item>
      </a-descriptions>
      <!--            收款单才展示-->
      <!--      其他类型收款-->
      <a-descriptions
        v-if="isCollect && isOther"
        style="width: 100%"
        title="原始账单"
        :column="5"
        layout="vertical"
        bordered
      >
        <a-descriptions-item label="费用项目：">{{
          data.expenseItemsName || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="收费方式：">
          {{ valueFindLabel(chargingMethodList, data.billType) }}
        </a-descriptions-item>
        <a-descriptions-item label="账单生成日期：">{{
          data.billCreateAt || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="账期：">
          {{ data.paymentDays || '--' }}
        </a-descriptions-item>
        <a-descriptions-item label="费用期间：">{{
          data.expensePeriod || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="合同金额：">{{
          formatPrice(data.amount || '')
        }}</a-descriptions-item>
        <a-descriptions-item label="税率：">{{
          (Number(data.taxRate || 0).toFixed(2) || 0) + '%'
        }}</a-descriptions-item>
        <a-descriptions-item label="不含税金额：">
          {{ formatPrice(data.taxExclusiveAmount || '') }}
        </a-descriptions-item>
        <a-descriptions-item label="税额：">
          {{ formatPrice(data.taxAmount || '') }}
        </a-descriptions-item>
        <a-descriptions-item
          :label="data.billType === 1 ? '应收金额：' : '应付金额：'"
        >
          {{ formatPrice(data.receivableAmount || '') }}
        </a-descriptions-item>
      </a-descriptions>
      <!--            付款单才展示-->
      <a-descriptions
        v-if="!isCollect && isOther"
        style="width: 100%"
        title="原始账单"
        :column="5"
        layout="vertical"
        bordered
      >
        <a-descriptions-item label="费用项目：">{{
          data.expenseItemsName || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="账单生成日期：">{{
          data.billCreateAt || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="账期：">
          {{ data.paymentDays || '--' }}
        </a-descriptions-item>
        <a-descriptions-item label="费用期间：">{{
          data.expensePeriod || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="返款金额：">{{
          formatPrice(data.amount || '')
        }}</a-descriptions-item>
        <a-descriptions-item label="手续费：">
          {{ formatPrice(data.feeAmount || '') }}
        </a-descriptions-item>
        <a-descriptions-item label="转预付款：">
          {{ formatPrice(data.advanceAmount || '') }}
        </a-descriptions-item>
        <a-descriptions-item label="应返款金额：">
          {{ formatPrice(data.shouldRevertAmount || '') }}
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <div class="i-card">
      <i-table :options="billOptions" :data="data.billAdjustableDetails">
        <template #header>
          <div style="font-size: 16px">账单调整</div>
        </template>
        <template #changeAmountCell="scope">
          <a-input-group>
            <a-select
              v-model="scope.record.changeType"
              :options="changeTypeList"
              placeholder="请选择"
              disabled
            />
            <a-input
              :model-value="Number(scope.record.changeAmount).toFixed(2)"
              disabled
            />
          </a-input-group>
        </template>
        <template #originalBillAmountCell="{ record }">
          {{ Number(record.originalBillAmount).toFixed(2) }}
        </template>
        <template #adjustableAmountCell="{ record }">
          {{ Number(record.adjustableAmount).toFixed(2) }}
        </template>
        <template #afterAdjustableTaxAmountCell="{ record }">
          {{ Number(record.afterAdjustableTaxAmount).toFixed(2) }}
        </template>
        <template #afterShouldAmountCell="{ record }">
          {{ Number(record.afterShouldAmount).toFixed(2) }}
        </template>
        <template #afterNotAmountCell="{ record }">
          {{ Number(record.afterNotAmount).toFixed(2) }}
        </template>
        <template #remarksCell="{ record }">
          <a-textarea
            v-model="record.remarks"
            disabled
            :max-length="100"
          ></a-textarea>
        </template>
      </i-table>
    </div>
    <div v-if="isCollect" class="i-card">
      <i-table :options="collectOptions" :data="data.paymentBillModel">
        <template #header>
          <div style="font-size: 16px">收款记录</div>
        </template>
        <template #businessStatCell="{ record }">
          {{ handleText(record.businessStat) }}
        </template>
        <template #optionCell="{ record }">
          <a-button
            :disabled="disabled"
            type="text"
            @click="onShowCP(record.id)"
            >查看</a-button
          >
        </template>
      </i-table>
    </div>
    <div v-else class="i-card">
      <i-table :options="backOptions" :data="data.paymentBillModel">
        <template #header>
          <div style="font-size: 16px">返款记录</div>
        </template>
        <template #optionCell="{ record }">
          <a-button
            :disabled="disabled"
            type="text"
            @click="onShowCP(record.id)"
            >查看</a-button
          >
        </template>
      </i-table>
    </div>
    <div class="i-card">
      <i-table :options="refundOptions" :data="data.paymentRefundBillModel">
        <template #header>
          <div style="font-size: 16px">退款记录</div>
        </template>
        <template #businessStatCell="{ record }">
          {{ handleText(record.businessStat) }}
        </template>
        <template #optionCell="{ record }">
          <a-button
            :disabled="disabled"
            type="text"
            @click="onShowRefund(record)"
            >查看</a-button
          >
        </template>
      </i-table>
    </div>
    <template v-if="isCollect">
      <div v-if="data.expenseKey !== LATE_FEE_CODE" class="i-card">
        <i-table :options="lateOptions" :data="data.overdueFineInfos">
          <template #header>
            <div style="font-size: 16px">滞纳金</div>
          </template>
          <template #businessStatCell="{ record }">
            {{ handleBillText(record.businessStat) }}
          </template>
          <template #optionCell="{ record }">
            <a-button
              :disabled="disabled"
              type="text"
              @click="onShowLateFee(record)"
              >查看</a-button
            >
          </template>
        </i-table>
      </div>
      <div class="i-card">
        <i-table :options="receiptOptions" :data="data.invoiceList">
          <template #header>
            <div style="font-size: 16px">发票记录</div>
          </template>
          <template #typeCell="{ record }">
            {{ valueFindLabel(invoiceTypeList, record.type) || '--' }}
          </template>
        </i-table>
      </div>
    </template>
    <div class="i-card">
      <a-descriptions :column="4" layout="vertical" table-layout="fixed">
        <a-descriptions-item
          :label="data.billType === 1 ? '应收金额：' : '应付金额：'"
          >{{ formatPrice(data.initReceivableAmount || '') }}
        </a-descriptions-item>
        <a-descriptions-item v-if="data.billType === 1" label="抵扣金额：">
          {{ formatPrice(data.deductionAmount || '') }}
        </a-descriptions-item>
        <a-descriptions-item
          :label="data.billType === 1 ? '已收金额：' : '已付金额：'"
        >
          {{ hasCollectExcludeDiscount }}
        </a-descriptions-item>
        <a-descriptions-item
          :label="data.billType === 1 ? '未收金额：' : '未付金额：'"
        >
          {{ formatPrice(data.amountNotReceived || '') }}
        </a-descriptions-item>
      </a-descriptions>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, PropType } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { valueFindLabel, formatPrice, formatTime } from '@/utils';
  import { invoiceTypeList } from '@/utils/dic';
  import { CbdApiProjectMisBillViewGetResponse } from '@/api';
  import NP from 'number-precision';
  import {
    changeTypeList,
    chargingMethodList,
    business_status,
    billTypeList,
    examine_status
  } from '@/utils/dic';
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    refresh: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object as PropType<CbdApiProjectMisBillViewGetResponse>,
      default: () => {}
    }
  });
  const ENERGY_BILL_CODE = '202212270006';
  const LATE_FEE_CODE = '202212270005';
  const DEPOSIT_CODE = ['202212270004', '202212270003', '202212270009'];
  const isOther = computed(() => {
    const t = data.value.expenseKey!;
    return (
      t !== ENERGY_BILL_CODE && t !== LATE_FEE_CODE && !DEPOSIT_CODE.includes(t)
    );
  });
  const emits = defineEmits([
    'update:modelValue',
    'update',
    'refresh',
    'showCp',
    'showRefund',
    'showLate'
  ]);
  const showDetail = ref(false);
  const onShowCP = (id: string) => {
    emits('showCp', id);
    showDetail.value = true;
  };
  const handleText = (num?: number) => {
    let text = '';
    switch (num) {
      case 0:
        text = '草稿';
        break;
      case 1:
        text = '待确认';
        break;
      case 2:
        text = '已确认';
        break;
      case 3:
        text = '已作废';
        break;
      default:
        text = '--';
        break;
    }
    return text;
  };
  const handleBillText = (num?: number) => {
    let text = '';
    switch (num) {
      case 0:
        text = '草稿';
        break;
      case 1:
        text = '待确认';
        break;
      case 2:
        text = '未支付';
        break;
      case 3:
        text = '已作废';
        break;
      case 4:
        text = '部分支付';
        break;
      case 5:
        text = '已结清';
        break;
      default:
        text = '--';
        break;
    }
    return text;
  };
  const isCollect = computed(() => {
    return data.value.billType === 1;
  });
  const billOptions = computed(() => {
    return {
      tableCard: false,
      pageShow: false,
      index: true,
      indexTitle: '序号',
      menu: false,
      columns: [
        {
          label: '原账单金额',
          prop: 'originalBillAmount',
          formatter: (e: Recordable) => formatPrice(e.originalBillAmount),
          width: 120
        },
        {
          label: '可调整金额',
          prop: 'adjustableAmount',
          formatter: (e: Recordable) => formatPrice(e.adjustableAmount),
          width: 120
        },
        {
          label: '调整金额',
          prop: 'changeAmount',
          formatter: (e: Recordable) => formatPrice(e.changeAmount),
          width: 200
        },
        {
          label: '调整税额',
          prop: 'afterAdjustableTaxAmount',
          formatter: (e: Recordable) => formatPrice(e.afterAdjustableTaxAmount),
          width: 120,
          hide: !isCollect.value
        },
        {
          label: isCollect.value ? '调整后应收金额' : '调整后应付金额',
          prop: 'afterShouldAmount',
          formatter: (e: Recordable) => formatPrice(e.afterShouldAmount),
          width: 150
        },
        {
          label: isCollect.value ? '调整后未收金额' : '调整后未付金额',
          prop: 'afterNotAmount',
          formatter: (e: Recordable) => formatPrice(e.afterNotAmount),
          width: 150
        },
        {
          label: '备注',
          prop: 'remarks',
          width: 150
        }
      ]
    };
  });
  const collectOptions = computed(() => {
    return {
      tableCard: false,
      pageShow: false,
      menu: false,
      columns: [
        {
          label: '收款单据号',
          prop: 'paymentNum',
          width: 120
        },
        {
          label: '费用项目',
          prop: 'expenseItemName',
          width: 120
        },
        {
          label: '收款金额',
          prop: 'amount',
          formatter: (e: Recordable) =>
            formatPrice(NP.plus(Number(e.amount), Number(e.cutAmount))),
          width: 120
        },
        {
          label: '业务状态',
          prop: 'businessStat',
          width: 120
        },
        {
          label: '到账日期',
          prop: 'payDay',
          width: 120
        },
        {
          label: '付款人',
          prop: 'payAccountName',
          width: 100
        },
        {
          label: '操作人',
          prop: 'updateBy',
          width: 100
        },
        {
          label: '操作时间',
          prop: 'updateTime',
          width: 150,
          formatter: (e: Recordable) => formatTime(e.updateTime)
        },
        {
          label: '操作',
          prop: 'option',
          width: 80,
          fixed: 'right'
        }
      ]
    };
  });
  const backOptions = computed(() => {
    return {
      tableCard: false,
      pageShow: false,
      menu: false,
      columns: [
        {
          label: '交易流水号',
          prop: 'paymentNum',
          width: 120
        },
        {
          label: '费用项目',
          prop: 'expenseItemName',
          width: 120
        },
        {
          label: '支付金额',
          prop: 'amount',
          formatter: (e: Recordable) => formatPrice(e.amount),
          width: 120
        },
        {
          label: '到账日期',
          prop: 'payDay',
          width: 120
        },
        {
          label: '操作人',
          prop: 'updateBy',
          width: 100
        },
        {
          label: '操作时间',
          prop: 'updateTime',
          width: 150,
          formatter: (e: Recordable) => formatTime(e.updateTime)
        },
        {
          label: '操作',
          prop: 'option',
          width: 80,
          hide: !isCollect.value,
          fixed: 'right'
        }
      ]
    };
  });
  const refundOptions = computed(() => {
    return {
      tableCard: false,
      pageShow: false,
      menu: false,
      columns: [
        {
          label: '收款单据号',
          prop: 'refundCode',
          width: 120
        },
        {
          label: '费用项目',
          prop: 'expenseItemName',
          width: 120
        },
        {
          label: '退款金额',
          prop: 'refundAmount',
          formatter: (e: Recordable) => formatPrice(e.refundAmount),
          width: 120
        },
        {
          label: '业务状态',
          prop: 'businessStat',
          width: 120
        },
        {
          label: '到账日期',
          prop: 'refundAt',
          width: 120,
          formatter: (e: Recordable) => formatTime(e.refundAt, 'YYYY-MM-DD')
        },
        {
          label: '退款方式',
          prop: 'payMethodName',
          width: 100
        },
        {
          label: '操作人',
          prop: 'updateBy',
          width: 100
        },
        {
          label: '操作时间',
          prop: 'updateTime',
          width: 150,
          formatter: (e: Recordable) => formatTime(e.updateTime)
        },
        {
          label: '操作',
          prop: 'option',
          width: 80,
          hide: !isCollect.value,
          fixed: 'right'
        }
      ]
    };
  });
  const lateOptions = computed(() => {
    return {
      tableCard: false,
      pageShow: false,
      index: true,
      indexTitle: '序号',
      menu: false,
      columns: [
        {
          label: '滞纳金单据号',
          prop: 'overdueFineCode',
          width: 120
        },
        {
          label: '费用项目',
          prop: 'overdueFineExpenseItemName',
          width: 120
        },
        {
          label: '生成日期',
          prop: 'buildAt',
          width: 120
        },
        {
          label: '金额',
          prop: 'finalOverdueFindAmount',
          formatter: (e: Recordable) => formatPrice(e.finalOverdueFindAmount),
          width: 100
        },
        {
          label: '业务状态',
          prop: 'businessStat',
          width: 100
        },
        {
          label: '操作',
          prop: 'option',
          width: 80,
          fixed: 'right'
        }
      ]
    };
  });
  const receiptOptions = computed(() => {
    return {
      tableCard: false,
      pageShow: false,
      index: true,
      indexTitle: '序号',
      menu: false,
      columns: [
        {
          label: '发票单据号',
          prop: 'misPaymentCode',
          width: 120
        },
        {
          label: '发票分类',
          prop: 'type',
          width: 120
        },
        {
          label: '开票金额',
          prop: 'amount',
          width: 120
        },
        {
          label: '开票日期',
          prop: 'updateTime',
          width: 120
        },
        {
          label: '操作人',
          prop: 'updateBy',
          width: 80
        }
      ]
    };
  });
  const hasCollectExcludeDiscount = computed(() => {
    const t = NP.minus(
      data.value.collectionAndPaymentAmount || 0,
      data.value.deductionAmount || 0
    );
    return formatPrice(t);
  });
  const data = computed(() => {
    return props.info;
  });
  const onShowRefund = (record: any) => {
    emits('showRefund', record.id);
  };
  const onShowLateFee = (record: any) => {
    emits('showLate', record.id);
  };
</script>
