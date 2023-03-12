<template>
  <div>
    <div class="i-card" style="width: 100%">
      <a-descriptions layout="vertical" style="width: 100%">
        <a-descriptions-item :label="isPay ? '付款单编号：' : '收款单编号'">
          {{ info?.refundDetail?.refundCode }}
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <div class="i-card">
      <a-descriptions :column="4" layout="vertical" title="账单信息">
        <a-descriptions-item label="归属项目：">{{
          billOutput.projectName
        }}</a-descriptions-item>
        <a-descriptions-item label="商户名称：">{{
          billOutput.merchantName
        }}</a-descriptions-item>
        <a-descriptions-item label="店铺名：">{{
          billOutput.storeName
        }}</a-descriptions-item>
        <a-descriptions-item label="合同号：">{{
          billOutput.contractCode
        }}</a-descriptions-item>
      </a-descriptions>
      <div style="margin-top: 20px">
        <i-table :options="billOptions" :data="billOutputList">
          <template #header>
            <div class="flex align-center justify-between">
              <div style="font-size: 16px">账单详情</div>
            </div>
          </template>
          <template #expenseItemsNameCell="{ record }">
            {{ `${record.expenseItemsName}(${record.paymentDays})` }}
          </template>
          <template v-if="!disabled" #optionalCell="{ record }">
            <a-button type="text" @click="onBillDetail(record)">
              查看
            </a-button>
          </template>
        </i-table>
      </div>
    </div>
    <div class="i-card">
      <i-table :options="backOptions" :data="paymentInfoList">
        <template #header>
          <div class="flex align-center justify-between">
            <div style="font-size: 16px">收款记录/返款记录</div>
          </div>
        </template>
        <template v-if="!disabled" #optionalCell="{ record }">
          <a-button type="text" @click="onCollectPayDetail(record)">
            查看
          </a-button>
        </template>
      </i-table>
    </div>
    <div class="i-card">
      <i-table :options="refundOptions" :data="refundDetailList">
        <template #header>
          <div class="flex align-center justify-between">
            <div style="font-size: 16px">退款记录</div>
          </div>
        </template>
      </i-table>
    </div>
    <div v-if="fileList && fileList.length" class="i-card">
      <div class="block-title" style="padding-top: 0">附件信息</div>
      <i-custom-upload
        v-model="fileList"
        list-type="picture-card"
        url-key="previewAddress"
        :options="{
          limit: 1,
          showRemoveButton: false,
          showUploadButton: false
        }"
      ></i-custom-upload>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch, PropType } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import { formatPrice } from '@/utils';
  import { CbdApiProjectMisPaymentRefundDetailGetResponse } from '@/api';

  type BillModel =
    Required<CbdApiProjectMisPaymentRefundDetailGetResponse>['billOutput'];

  const props = defineProps({
    info: {
      type: Object as PropType<CbdApiProjectMisPaymentRefundDetailGetResponse>,
      default: () => {
        return {};
      }
    },
    disabled: {
      type: Boolean
    }
  });
  const emits = defineEmits(['showBillDetail', 'showCollectPayDetail']);

  const info = computed(() => {
    return props.info;
  });
  const isPay = computed(() => {
    return !!(info.value &&
    info.value.billOutput &&
    info.value.billOutput.billType === 1
      ? false
      : true);
  });
  const billOutput = computed(() => {
    return (info.value?.billOutput || {}) as BillModel;
  });

  const billOptions = computed(() => {
    return {
      pageShow: false,
      menu: false,
      tableCard: false,
      columns: [
        {
          label: '账单编号',
          width: 120,
          prop: 'billNum'
        },
        {
          label: '费用项目',
          width: 200,
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
          formatter: (row: BillModel): string => {
            return row.receivableAmount
              ? `￥${formatPrice(row.receivableAmount)}`
              : '--';
          }
        },
        {
          label: isPay.value ? '已付' : '已收',
          width: 120,
          prop: 'collectionAndPaymentAmount',
          formatter: (row: BillModel): string => {
            return row.collectionAndPaymentAmount
              ? `￥${formatPrice(row.collectionAndPaymentAmount)}`
              : '--';
          }
        },
        {
          label: isPay.value ? '未付' : '未收',
          width: 120,
          prop: 'amountNotReceived',
          formatter: (row: BillModel): string => {
            return row.amountNotReceived
              ? `￥${formatPrice(row.amountNotReceived)}`
              : '--';
          }
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
  const backOptions = computed(() => {
    return {
      pageShow: false,
      menu: false,
      index: true,
      indexTitle: '序号',
      tableCard: false,
      columns: [
        {
          label: isPay.value ? '返款单据号' : '收款单据号',
          width: 120,
          prop: 'paymentNum'
        },
        {
          label: '费用项目',
          width: 120,
          prop: 'expenseItemName'
        },
        {
          label: '支付金额',
          width: 120,
          prop: 'amount'
        },
        {
          label: '到账日期',
          width: 120,
          prop: 'payDay'
        },
        {
          label: '支付方式',
          width: 120,
          prop: 'payMethodStr'
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
          label: '操作',
          width: 120,
          prop: 'optional'
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
          label: '退款单号',
          width: 230,
          prop: 'refundCode'
        },
        {
          label: '费用项目',
          width: 160,
          prop: 'expenseItemName'
        },
        {
          label: '可退金额',
          width: 120,
          prop: 'refundAbleAmount'
        },
        {
          label: '退款金额',
          width: 120,
          prop: 'refundAmount'
        },
        {
          label: '退款日期',
          width: 160,
          prop: 'refundAt'
        },
        {
          label: '退款方式',
          width: 130,
          prop: 'payMethodName'
        },
        {
          label: '操作人',
          width: 130,
          prop: 'updateBy'
        },
        {
          label: '操作时间',
          width: 130,
          prop: 'updateTime'
        }
      ]
    };
  });

  const billOutputList = computed(() => {
    return info.value?.billOutput ? [info.value.billOutput] : [];
  });
  const paymentInfoList = computed(() => {
    return info.value?.paymentInfo ? [info.value.paymentInfo] : [];
  });
  const refundDetailList = computed(() => {
    return info.value?.refundDetail ? [info.value.refundDetail] : [];
  });

  const fileList = ref<any[]>([]);

  watch(
    () => props.info.resourceFilesRespList,
    (v: any[]) => {
      if (v) {
        fileList.value = v;
      }
    },
    {
      immediate: true,
      deep: true
    }
  );

  // 账单详情
  const onBillDetail = (record: BillModel) => {
    emits('showBillDetail', String(record.id));
  };
  const onCollectPayDetail = (
    record: Required<CbdApiProjectMisPaymentRefundDetailGetResponse>['paymentInfo']
  ) => {
    emits('showCollectPayDetail', String(record.id));
  };
</script>
