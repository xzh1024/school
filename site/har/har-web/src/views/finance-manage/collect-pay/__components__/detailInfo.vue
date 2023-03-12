<template>
  <div>
    <div class="i-card" style="width: 100%">
      <a-descriptions
        table-layout="fixed"
        layout="vertical"
        style="width: 100%"
      >
        <a-descriptions-item :label="isPay ? '付款单编号：' : '收款单编号'">{{
          detail.paymentNum
        }}</a-descriptions-item>
      </a-descriptions>
    </div>
    <div class="i-card">
      <a-descriptions
        table-layout="fixed"
        :column="4"
        layout="vertical"
        title="账单信息"
      >
        <a-descriptions-item label="归属项目：">{{
          detail.billOutput && detail.billOutput.projectName
        }}</a-descriptions-item>
        <a-descriptions-item label="商户名称：">{{
          detail.billOutput && detail.billOutput.merchantName
        }}</a-descriptions-item>
        <a-descriptions-item label="店铺名：">{{
          detail.billOutput && detail.billOutput.storeName
        }}</a-descriptions-item>
        <a-descriptions-item label="合同号：">{{
          detail.billOutput && detail.billOutput.contractCode
        }}</a-descriptions-item>
      </a-descriptions>
      <div style="margin-top: 20px">
        <i-table :options="billOptions" :data="billList">
          <template #header>
            <div style="font-size: 16px">账单详情</div>
          </template>
          <template #optionalCell="{ record }">
            <a-button
              :disabled="disabled"
              type="text"
              @click="showBillDetail(record)"
              >查看</a-button
            >
          </template>
        </i-table>
      </div>
    </div>
    <div v-if="isPay" class="i-card">
      <i-table :options="backOptions" :data="detail.recordOutputList">
        <template #header>
          <div style="font-size: 16px">返款记录</div>
        </template>
        <template #doneDateCell="{ record }">{{
          formatTime(record.doneDate, 'YYYY-MM-DD')
        }}</template>
      </i-table>
    </div>
    <template v-else>
      <div class="i-card">
        <i-table :options="discountOptions" :data="detail.cutOutputList">
          <template #header>
            <div class="flex align-center justify-between">
              <div style="font-size: 16px">抵扣记录</div>
            </div>
          </template>
        </i-table>
      </div>
      <div class="i-card">
        <i-table
          :options="collectRecordOptions"
          :data="detail.recordOutputList"
        >
          <template #header>
            <div class="flex align-center justify-between">
              <div style="font-size: 16px">收款记录</div>
            </div>
          </template>
          <template #doneDateCell="{ record }">{{
            formatTime(record.doneDate, 'YYYY-MM-DD')
          }}</template>
        </i-table>
      </div>
    </template>
    <div class="i-card">
      <i-table :options="refundOptions" :data="detail.refundDetailList">
        <template #header>
          <div style="font-size: 16px">退款记录</div>
        </template>
        <template #businessStatCell="{ record }">
          {{ handleText(record.businessStat) }}
        </template>
        <template #optionalCell="{ record }">
          <a-button
            type="text"
            :disabled="disabled"
            @click="onShowRefund(record)"
            >查看</a-button
          >
        </template>
      </i-table>
    </div>
    <div class="i-card">
      <i-table :options="receiptOptions" :data="receiptList">
        <template #header>
          <div style="font-size: 16px">发票记录</div>
        </template>
        <template #typeCell="{ record }">{{
          record.type === 1 ? '蓝字发票' : '红字发票'
        }}</template>
      </i-table>
    </div>
    <div class="i-card">
      <a-descriptions
        table-layout="fixed"
        :column="4"
        layout="vertical"
        title="付款方信息"
      >
        <a-descriptions-item label="账号名称：">{{
          detail.payAccountName
        }}</a-descriptions-item>
        <a-descriptions-item label="银行：">{{
          detail.payBankName
        }}</a-descriptions-item>
        <a-descriptions-item label="账户名：">{{
          detail.payAccountNum
        }}</a-descriptions-item>
        <a-descriptions-item label="支付凭证号：">{{
          detail.payNum || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="备注：">{{
          detail.payRemark || '--'
        }}</a-descriptions-item>
      </a-descriptions>
    </div>
    <div class="i-card">
      <a-descriptions
        table-layout="fixed"
        :column="4"
        layout="vertical"
        title="收款方信息"
      >
        <a-descriptions-item label="账号名称：">{{
          detail.receiptAccountName
        }}</a-descriptions-item>
        <a-descriptions-item label="银行：">{{
          detail.receiptBankName
        }}</a-descriptions-item>
        <a-descriptions-item label="账户名：">{{
          detail.receiptAccountNum
        }}</a-descriptions-item>
        <a-descriptions-item label="支付凭证号：">{{
          detail.receiptNum || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="备注：">{{
          detail.receiptRemark || '--'
        }}</a-descriptions-item>
      </a-descriptions>
    </div>
    <div class="i-card">
      <a-descriptions :column="4" layout="vertical" title="附件信息">
        <a-descriptions-item>
          <i-custom-upload
            v-model="detail.resourceFilesRespList"
            url-key="previewAddress"
            :options="{
              showUploadButton: false,
              showRemoveButton: false
            }"
          ></i-custom-upload>
        </a-descriptions-item>
      </a-descriptions>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, PropType } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import { CbdApiProjectMisPaymentDetailGetResponse } from '@/api';
  import { formatPrice, formatTime } from '@/utils';

  const props = defineProps({
    disabled: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object as PropType<CbdApiProjectMisPaymentDetailGetResponse>,
      default: () => {}
    }
  });
  const emits = defineEmits([
    'update:modelValue',
    'update',
    'refresh',
    'showBillDetail',
    'showRefund'
  ]);
  const isPay = computed(() => {
    return detail.value?.billOutput?.billType === 2;
  });
  type BillType = CbdApiProjectMisPaymentDetailGetResponse['billOutput'];
  type RefundType =
    CbdApiProjectMisPaymentDetailGetResponse['refundDetailList'][0];
  const billList = computed(() => {
    return [detail.value.billOutput || {}];
  });
  const receiptList = computed(() => {
    return detail.value.invoiceId ? [detail.value.invoiceInfo] : [];
  });
  const billOptions = computed(() => {
    return {
      pageShow: false,
      tableCard: false,
      menu: false,
      columns: [
        {
          label: '账单编号',
          width: 200,
          prop: 'billNum'
        },
        {
          label: '费用项目',
          width: 150,
          prop: 'expenseItemsName'
        },
        {
          label: '费用期间',
          width: 220,
          prop: 'expensePeriod'
        },
        {
          label: isPay.value ? '应付' : '应收',
          width: 120,
          prop: 'receivableAmount',
          formatter: (e: Recordable) => formatPrice(e.receivableAmount)
        },
        {
          label: isPay.value ? '已付' : '已收',
          width: 120,
          prop: 'collectionAndPaymentAmount',
          formatter: (e: Recordable) =>
            formatPrice(e.collectionAndPaymentAmount)
        },
        {
          label: isPay.value ? '未付' : '未收',
          width: 120,
          prop: 'amountNotReceived',
          formatter: (e: Recordable) => formatPrice(e.amountNotReceived)
        },
        {
          label: '操作',
          prop: 'optional',
          fixed: 'right',
          width: 100
        }
      ]
    };
  });
  const backOptions = computed(() => {
    return {
      pageShow: false,
      menu: false,
      index: true,
      indexTitle: '序号',
      tableCard: false,
      columns: [
        {
          label: '费用项目',
          width: 120,
          prop: 'expenseItemName'
        },
        {
          label: '支付金额',
          width: 120,
          prop: 'amount',
          formatter: (e: Recordable) => formatPrice(e.amount)
        },
        {
          label: '到账日期',
          width: 120,
          prop: 'doneDate'
        },
        {
          label: '支付方式',
          width: 120,
          prop: 'payMethodName'
        },
        {
          label: '操作人',
          width: 120,
          prop: 'createBy'
        },
        {
          label: '操作时间',
          width: 120,
          prop: 'createTime'
        }
      ]
    };
  });
  const refundOptions = computed(() => {
    return {
      pageShow: false,
      menu: false,
      index: true,
      indexTitle: '序号',
      tableCard: false,
      columns: [
        {
          label: '退款单据号',
          width: 120,
          prop: 'refundCode'
        },
        {
          label: '费用项目',
          width: 120,
          prop: 'expenseItemName'
        },
        {
          label: '退款金额',
          width: 120,
          prop: 'refundAmount'
        },
        {
          label: '业务状态',
          width: 120,
          prop: 'businessStat'
        },
        {
          label: '到账日期',
          width: 120,
          prop: 'refundAt'
        },
        {
          label: '支付方式',
          width: 120,
          prop: 'payMethodName'
        },
        {
          label: '操作人',
          width: 120,
          prop: 'updateBy'
        },
        {
          label: '操作时间',
          width: 120,
          prop: 'updateTime'
        },
        {
          label: '备注',
          width: 120,
          prop: 'remark'
        },
        {
          label: '操作',
          width: 120,
          fixed: 'right',
          prop: 'optional'
        }
      ]
    };
  });
  const receiptOptions = computed(() => {
    return {
      pageShow: false,
      menu: false,
      index: true,
      indexTitle: '序号',
      tableCard: false,
      columns: [
        {
          label: '发票单据号',
          width: 120,
          prop: 'misPaymentCode'
        },
        {
          label: '分类',
          width: 120,
          prop: 'type'
        },
        {
          label: '开票金额',
          width: 120,
          prop: 'amount',
          formatter: (e: Recordable) => formatPrice(e.amount)
        },
        {
          label: '开票日期',
          width: 120,
          prop: 'updateTime',
          formatter: (e: Recordable) => formatPrice(e.updateTime)
        },
        {
          label: '操作人',
          width: 120,
          prop: 'updateBy'
        }
      ]
    };
  });
  const discountOptions = computed(() => {
    return {
      pageShow: false,
      menu: false,
      index: true,
      indexTitle: '序号',
      tableCard: false,
      columns: [
        {
          label: '费用项目',
          width: 200,
          prop: 'billItemName'
        },
        {
          label: '抵扣费用项目',
          width: 120,
          prop: 'expenseItemName'
        },
        {
          label: '抵扣金额',
          width: 120,
          prop: 'cutAmount',
          formatter: (e: Recordable) => formatPrice(e.cutAmount)
        },
        {
          label: '可用余额',
          width: 120,
          prop: 'usableAmount',
          formatter: (e: Recordable) => formatPrice(e.usableAmount)
        },
        {
          label: '备注',
          width: 120,
          prop: 'remark'
        }
      ]
    };
  });
  const collectRecordOptions = computed(() => {
    return {
      pageShow: false,
      menu: false,
      index: true,
      indexTitle: '序号',
      tableCard: false,
      columns: [
        {
          label: '费用项目',
          width: 120,
          prop: 'expenseItemName'
        },
        {
          label: '支付金额',
          width: 120,
          prop: 'amount',
          formatter: (e: Recordable) => formatPrice(e.amount)
        },
        {
          label: '到账日期',
          width: 130,
          prop: 'doneDate'
        },
        {
          label: '支付方式',
          width: 130,
          prop: 'payMethodName'
        },
        {
          label: '付款人',
          width: 130,
          prop: 'payUserName'
        },
        {
          label: '操作人',
          width: 130,
          prop: 'createBy'
        },
        {
          label: '操作时间',
          width: 180,
          prop: 'createTime'
        },
        {
          label: '备注',
          width: 120,
          prop: 'remark'
        }
      ]
    };
  });
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
  const onShowRefund = (record: RefundType) => {
    emits('showRefund', record.id);
  };
  const billId = ref('');
  const showBill = ref(false);
  const showBillDetail = (record: BillType) => {
    billId.value = String(record.id);
    showBill.value = true;
    emits('showBillDetail', record.id);
  };
  const detail = computed(() => {
    return props.info;
  });
</script>
