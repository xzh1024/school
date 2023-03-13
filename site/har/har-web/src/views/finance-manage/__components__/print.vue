<template>
  <drawer v-model="visible" title="账单打印">
    <div class="print-box">
      <a-divider orientation="left">打印设置</a-divider>
      <i-form ref="refForm" v-model="editForm" :options="formProps">
        <template #menuForm>
          <a-button type="primary" @click="doPreview">生成预览</a-button>
        </template>
      </i-form>
      <a-divider orientation="left">打印预览</a-divider>
      <div v-if="detail && detail.length" ref="printEl" class="outer">
        <div v-for="(item, idx) in detail" :key="idx" class="preview-box">
          <h4 class="bill-title">{{ calcTitle(item) }}</h4>
          <h4>基础信息</h4>
          <a-descriptions
            v-if="source === 'collect-pay' && item.billType === 1"
            :column="2"
            :label-style="{ color: '#333' }"
          >
            <a-descriptions-item label="项目名称：">{{
              item.projectName || '--'
            }}</a-descriptions-item>
            <a-descriptions-item label="商户名称：">{{
              item.merchantName || '--'
            }}</a-descriptions-item>
            <a-descriptions-item label="店铺名称：">{{
              item.storeName
            }}</a-descriptions-item>
            <a-descriptions-item label="合同号：">{{
              item.contractCode
            }}</a-descriptions-item>
            <a-descriptions-item label="应付金额：">{{
              item.receivableAmountCapital || '--'
            }}</a-descriptions-item>
            <a-descriptions-item label="已付金额：">{{
              item.collectionAndPaymentAmountCapital || '--'
            }}</a-descriptions-item>
            <a-descriptions-item label="本次抵扣金额：">{{
              `￥${(item.cutAmount || 0).toFixed(2)}(${
                item.cutAmountCapital || ''
              })`
            }}</a-descriptions-item>
            <a-descriptions-item label="本次支付金额：">{{
              `￥${(item.recordAmount || 0).toFixed(2)}(${
                item.recordAmountCapital || ''
              })`
            }}</a-descriptions-item>
            <a-descriptions-item label="未付金额：">{{
              item.amountNotReceivedCapital
            }}</a-descriptions-item>
          </a-descriptions>
          <a-descriptions
            v-if="source === 'collect-pay' && item.billType === 2"
            :column="2"
            :label-style="{ color: '#333' }"
          >
            <a-descriptions-item label="项目名称：">{{
              item.projectName || '--'
            }}</a-descriptions-item>
            <a-descriptions-item label="商户名称：">{{
              item.merchantName || '--'
            }}</a-descriptions-item>
            <a-descriptions-item label="店铺名称：">{{
              item.storeName
            }}</a-descriptions-item>
            <a-descriptions-item label="合同号：">{{
              item.contractCode
            }}</a-descriptions-item>
            <a-descriptions-item label="销售额：">{{
              item.billSaleAmountCapital || '--'
            }}</a-descriptions-item>
            <a-descriptions-item label="手续费：">{{
              item.billFeeAmountCapital || '--'
            }}</a-descriptions-item>
            <a-descriptions-item label="返款金额：">{{
              item.billBackAmountCapital || '--'
            }}</a-descriptions-item>
            <a-descriptions-item label="转预付款金额：">{{
              item.billTurnPreAmountCapital || '--'
            }}</a-descriptions-item>
            <a-descriptions-item label="应付金额：">{{
              item.receivableAmountCapital || '--'
            }}</a-descriptions-item>
            <a-descriptions-item label="已付金额：">{{
              item.collectionAndPaymentAmountCapital || '--'
            }}</a-descriptions-item>
            <a-descriptions-item label="本次付款金额：">{{
              `￥${(item.recordAmount || 0).toFixed(2)}(${
                item.recordAmountCapital || ''
              })`
            }}</a-descriptions-item>
            <a-descriptions-item label="未付金额：">{{
              item.amountNotReceivedCapital || '--'
            }}</a-descriptions-item>
          </a-descriptions>
          <a-descriptions
            v-if="source === 'refund'"
            :column="2"
            :label-style="{ color: '#333' }"
          >
            <a-descriptions-item label="项目名称：">{{
              item.projectName
            }}</a-descriptions-item>
            <a-descriptions-item label="商户名称：">{{
              item.merchantName
            }}</a-descriptions-item>
            <a-descriptions-item label="店铺名称：">{{
              item.storeName
            }}</a-descriptions-item>
            <a-descriptions-item label="合同号：">{{
              item.contractCode
            }}</a-descriptions-item>
            <a-descriptions-item label="应收金额：">{{
              `¥${item.afterShouldAmount}（${item.afterShouldAmountStr}）`
            }}</a-descriptions-item>
            <a-descriptions-item label="实收金额：">{{
              `¥${item.handleAmount}（${item.handleAmountStr}）`
            }}</a-descriptions-item>
            <a-descriptions-item label="本次退款金额：">{{
              `¥${item.thisTimeRefundAmountTotal}（${item.thisTimeRefundAmountTotalStr}）`
            }}</a-descriptions-item>
          </a-descriptions>
          <h4>{{
            props.source === 'refund'
              ? '退款详情'
              : item.billType === 2
              ? '付款详情'
              : '收款详情'
          }}</h4>
          <custom-table
            :columns="getColumns(item)"
            :data="item.detailList || item.refundPrintInfos"
            :column-num="7"
          >
            <div class="total flex align-center justify-end">
              <div v-if="source === 'urge'" class="flex">
                <div style="width: 104px">本次退款合计</div>
                <div style="width: 104px"
                  >￥{{ item.thisTimeRefundAmountTotal }}</div
                >
              </div>
              <div v-if="source === 'collect-pay'" class="flex">
                <div style="width: 104px">{{
                  item.billType === 1 ? '本次收款合计' : '本次返款合计'
                }}</div>
                <div style="width: 104px"
                  >￥{{
                    NP.plus(item.recordAmount, item.cutAmount).toFixed(2)
                  }}</div
                >
              </div>
              <iv v-if="source === 'refund'" class="flex">
                <div>本次退款合计</div>
                <div>￥{{ item.thisTimeRefundAmountTotal }}</div>
              </iv>
            </div>
          </custom-table>
          <template v-if="item.merchantList && item.merchantList.length">
            <h4>收款账户</h4>
            <i-table
              :options="accountOptions"
              :data="item.merchantList"
            ></i-table>
          </template>
          <template v-if="['refund', 'collect-pay'].includes(source)">
            <a-row style="padding-top: 15px">
              <a-col :span="12"> 制单人： </a-col>
              <a-col :span="12"> 制单时间： </a-col>
            </a-row>
          </template>
          <div v-if="editForm.hasSignature" class="sig-box">
            <img class="img" src="@/assets/images/logo.png" alt="" />
          </div>
          <div class="signature">
            <div>{{ item.projectName }}</div>
            <div>{{ dayjs().format('YYYY-MM-DD') }}</div>
          </div>
        </div>
      </div>
      <a-empty v-else />
    </div>
    <template #footer>
      <a-button @click="visible = false">取消</a-button>
      <a-button type="primary" @click="onCertain">打印</a-button>
    </template>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, Ref, PropType } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import dayjs from 'dayjs';
  import IForm from '@/components/i-form/index.vue';
  import ITable from '@/components/i-table/index.vue';
  import CustomTable from './custom-table.vue';
  import NP from 'number-precision';
  import {
    cbdApiProjectMisPaymentPrintPost,
    cbdApiProjectMisPaymentRefundPrintPost
  } from '@/api';
  import { useRequest } from '@har/use';
  import { getHtml2Pdf, toPrint } from '@/utils/print';
  import { formatPrice, formatTime } from '@/utils';

  const refForm: Ref = ref(null);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    ids: {
      type: Array as PropType<number[]>,
      default: () => [],
      required: true
    },
    column: {
      type: Number,
      default: 7
    },
    source: {
      type: String,
      default: 'collect-pay', // 'collect-pay' 'refund',
      required: true
    }
  });
  const detail = ref<any>([]);
  const printTypeList = computed(() => {
    if (props.source === 'collect-pay') {
      return [
        {
          label: '按收付款单打印',
          value: 1
        },
        {
          label: '按账单打印',
          value: 2
        }
      ];
    } else {
      return [
        {
          label: '按退款单打印',
          value: 1
        },
        {
          label: '按账单打印',
          value: 2
        }
      ];
    }
  });
  const emits = defineEmits(['update:modelValue', 'refresh']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const editForm = ref({
    hasSignature: false,
    printType: 1
  });
  const formProps: Ref = computed(() => {
    return {
      layout: 'vertical',
      menuSpan: 12,
      columns: [
        {
          label: '是否电子签章',
          type: 'switch',
          options: {
            disabled: true
          },
          prop: 'hasSignature'
        },
        {
          label: '打印方式',
          type: 'select',
          prop: 'printType',
          dic: printTypeList,
          options: {
            disabled: props.ids.length === 1
          }
        }
      ]
    };
  });
  // 表格列
  const cpColumnsDic: { [index: number]: any } = {
    // bill 1存款2滞纳金3能耗4其他
    1: [
      {
        label: '履约保证金',
        prop: 'expenseItemsName'
      },
      {
        label: '应收日期',
        prop: 'billCreateAt',
        formatter: (e: Recordable) => formatTime(e.billCreateAt, 'YYYY-MM-DD')
      },
      {
        label: '费用期间',
        prop: 'expensePeriod'
      },
      {
        label: '应付金额',
        prop: 'receivableAmount',
        formatter: (e: Recordable) => formatPrice(e.receivableAmount)
      },
      {
        label: '已付金额',
        prop: 'collectionAndPaymentAmount',
        formatter: (e: Recordable) => formatPrice(e.collectionAndPaymentAmount)
      },
      {
        label: '已处理金额',
        prop: 'depositHandleAmount',
        formatter: (e: Recordable) => formatPrice(e.depositHandleAmount)
      },
      {
        label: '可用余额',
        prop: 'depositAvailableAmount',
        formatter: (e: Recordable) => formatPrice(e.depositAvailableAmount)
      },
      {
        label: '本次支付金额',
        prop: 'recordAmount',
        formatter: (e: Recordable) => formatPrice(e.recordAmount)
      },
      {
        label: '本次支付方式',
        prop: 'payMethodStr'
      },
      {
        label: '未付金额',
        prop: 'notPayAmount',
        formatter: (e: Recordable) => formatPrice(e.notPayAmount)
      }
    ],
    2: [
      {
        label: '费用项目',
        prop: 'expenseItemsName'
      },
      {
        label: '原费用项目',
        prop: 'originExpenseItemsName'
      },
      {
        label: '本次收款金额',
        prop: 'thisTimeCollection',
        formatter: (e: Recordable) => formatPrice(e.thisTimeCollection)
      },
      {
        label: '滞纳金期间',
        prop: 'overdueFineDay'
      },
      {
        label: '应付金额',
        prop: 'receivableAmount',
        formatter: (e: Recordable) => formatPrice(e.receivableAmount)
      },
      {
        label: '已付金额',
        prop: 'collectionAndPaymentAmount',
        formatter: (e: Recordable) => formatPrice(e.collectionAndPaymentAmount)
      },
      {
        label: '本次抵扣费用项目',
        prop: 'cutExpenseItemName'
      },
      {
        label: '抵扣金额',
        prop: 'cutSumAmount',
        formatter: (e: Recordable) => formatPrice(e.cutSumAmount)
      },
      {
        label: '本次付款金额',
        prop: 'recordAmount',
        formatter: (e: Recordable) => formatPrice(e.recordAmount)
      },
      {
        label: '本次支付方式',
        prop: 'payMethodStr'
      },
      {
        label: '未付金额',
        prop: 'notPayAmount',
        formatter: (e: Recordable) => formatPrice(e.notPayAmount)
      }
    ],
    3: [
      {
        label: '费用项目',
        prop: 'expenseItemsName'
      },
      {
        label: '抄表日期',
        prop: 'readingDate'
      },
      {
        label: '能耗单价',
        prop: 'price',
        formatter: (e: Recordable) => formatPrice(e.price)
      },
      {
        label: '费用期间',
        prop: 'expensePeriod'
      },
      {
        label: '应付金额',
        prop: 'receivableAmount',
        formatter: (e: Recordable) => formatPrice(e.receivableAmount)
      },
      {
        label: '已付金额',
        prop: 'collectionAndPaymentAmount',
        formatter: (e: Recordable) => formatPrice(e.collectionAndPaymentAmount)
      },
      {
        label: '本次抵扣费用项目',
        prop: 'cutExpenseItemName'
      },
      {
        label: '抵扣金额',
        prop: 'cutSumAmount',
        formatter: (e: Recordable) => formatPrice(e.cutSumAmount)
      },
      {
        label: '本次支付金额',
        prop: 'recordAmount',
        formatter: (e: Recordable) => formatPrice(e.recordAmount)
      },
      {
        label: '本次支付方式',
        prop: 'payMethodStr'
      },
      {
        label: '未付金额',
        prop: 'notPayAmount',
        formatter: (e: Recordable) => formatPrice(e.notPayAmount)
      }
    ],
    4: [
      {
        label: '费用项目',
        prop: 'expenseItemsName'
      },
      {
        label: '收费方式',
        prop: 'chargeTypeName'
      },
      {
        label: '账单生成日',
        prop: 'billCreateAt',
        formatter: (e: Recordable) => formatTime(e.billCreateAt, 'YYYY-MM-DD')
      },
      {
        label: '账期',
        prop: 'paymentDays'
      },
      {
        label: '费用期间',
        prop: 'expensePeriod'
      },
      {
        label: '应付金额',
        prop: 'receivableAmount',
        formatter: (e: Recordable) => formatPrice(e.receivableAmount)
      },
      {
        label: '已付金额',
        prop: 'collectionAndPaymentAmount',
        formatter: (e: Recordable) => formatPrice(e.collectionAndPaymentAmount)
      },
      {
        label: '本次抵扣费用项目',
        prop: 'cutExpenseItemName'
      },
      {
        label: '抵扣金额',
        prop: 'cutSumAmount',
        formatter: (e: Recordable) => formatPrice(e.cutSumAmount)
      },
      {
        label: '本次支付金额',
        prop: 'recordAmount',
        formatter: (e: Recordable) => formatPrice(e.recordAmount)
      },
      {
        label: '本次支付方式',
        prop: 'payMethodStr'
      },
      {
        label: '未付金额',
        prop: 'notPayAmount',
        formatter: (e: Recordable) => formatPrice(e.notPayAmount)
      }
    ]
  };
  const cpPayColumns = ref([
    {
      label: '费用项目',
      prop: 'expenseItemsName'
    },
    {
      label: '账单生成日',
      prop: 'billCreateAt',
      formatter: (e: Recordable) => formatTime(e.billCreateAt, 'YYYY-MM-DD')
    },
    {
      label: '账期',
      prop: 'paymentDays'
    },
    {
      label: '费用期间',
      prop: 'expensePeriod'
    },
    {
      label: '返款金额',
      prop: 'backAmount'
    },
    {
      label: '手续费',
      prop: 'fee',
      formatter: (e: Recordable) => formatPrice(e.fee)
    },
    {
      label: '转预付款金额',
      prop: 'billTurnPreAmount',
      formatter: (e: Recordable) => formatPrice(e.billTurnPreAmount)
    },
    {
      label: '应返金额',
      prop: 'receivableAmount',
      formatter: (e: Recordable) => formatPrice(e.receivableAmount)
    },
    {
      label: '已返金额',
      prop: 'collectionAndPaymentAmount',
      formatter: (e: Recordable) => formatPrice(e.collectionAndPaymentAmount)
    },
    {
      label: '本次返款金额',
      prop: 'recordAmount',
      formatter: (e: Recordable) => formatPrice(e.recordAmount)
    },
    {
      label: '未返金额',
      prop: 'notPayAmount',
      formatter: (e: Recordable) => formatPrice(e.notPayAmount)
    },
    {
      label: '本次支付方式',
      prop: 'payMethodStr'
    }
  ]);
  const refundColumns = ref([
    {
      label: '费用项目',
      prop: 'expenseName'
    },
    {
      label: '账期',
      prop: 'paymentDays'
    },
    {
      label: '费用期间',
      prop: 'billType',
      formatter: (e: Recordable) => e.billStartAt + '~' + e.billEndAt
    },
    {
      label: '应收金额',
      prop: 'afterShouldAmount',
      formatter: (e: Recordable) => formatPrice(e.afterShouldAmount)
    },
    {
      label: '实收金额',
      prop: 'handleAmount',
      formatter: (e: Recordable) => formatPrice(e.handleAmount)
    },
    {
      label: '已退款金额',
      prop: 'refundedAmount',
      formatter: (e: Recordable) => formatPrice(e.refundedAmount)
    },
    {
      label: '可退款金额',
      prop: 'refundUseAbleAmount',
      formatter: (e: Recordable) => formatPrice(e.refundUseAbleAmount)
    },
    {
      label: '本次退款金额',
      prop: 'thisTimeRefundAmount',
      formatter: (e: Recordable) => formatPrice(e.thisTimeRefundAmount)
    },
    {
      label: '本次退款方式',
      prop: 'thisTimeRefundPayMethodName'
    },
    {
      label: '退款日期',
      prop: 'refundAt',
      formatter: (e: Recordable) => formatTime(e.refundAt, 'YYYY-MM-DD')
    }
  ]);
  const refundPayColumns = ref([
    {
      label: '费用项目',
      prop: 'expenseName'
    },
    {
      label: '账期',
      prop: 'paymentDays'
    },
    {
      label: '费用期间',
      prop: 'billType',
      formatter: (e: Recordable) => e.billStartAt + '~' + e.billEndAt
    },
    {
      label: '应付金额',
      prop: 'afterShouldAmount',
      formatter: (e: Recordable) => formatPrice(e.afterShouldAmount)
    },
    {
      label: '实付金额',
      prop: 'handleAmount',
      formatter: (e: Recordable) => formatPrice(e.handleAmount)
    },
    {
      label: '已退款金额',
      prop: 'refundedAmount',
      formatter: (e: Recordable) => formatPrice(e.refundedAmount)
    },
    {
      label: '可退款金额',
      prop: 'refundUseAbleAmount',
      formatter: (e: Recordable) => formatPrice(e.refundUseAbleAmount)
    },
    {
      label: '本次退款金额',
      prop: 'thisTimeRefundAmount',
      formatter: (e: Recordable) => formatPrice(e.thisTimeRefundAmount)
    },
    {
      label: '本次退款方式',
      prop: 'thisTimeRefundPayMethodName'
    },
    {
      label: '退款日期',
      prop: 'refundAt',
      formatter: (e: Recordable) => formatTime(e.refundAt, 'YYYY-MM-DD')
    }
  ]);
  const calcTitle = (record: any) => {
    if (props.source === 'collect-pay') {
      if (record.billType === 2) {
        return record.brandName + '付款单';
      } else {
        return record.brandName + '收据';
      }
    } else if (props.source === 'refund') {
      return record.brandName + '退款单';
    }
  };
  const getColumns = (record: any) => {
    // 收付款页
    if (props.source === 'collect-pay') {
      // 付款单
      if (record.billType === 2) {
        return cpPayColumns.value;
      } else {
        // 收款 多类型
        return cpColumnsDic[record.printModelType];
      }
    } else {
      // 退款单页
      if (record.billType === 1) {
        return refundColumns.value;
      } else {
        return refundPayColumns.value;
      }
    }
  };

  const accountOptions = ref({
    pageShow: false,
    tableCard: false,
    menu: false,
    columns: [
      {
        label: '商户名称',
        prop: 'merchantName'
      },
      {
        label: '收款账户号',
        prop: 'accountNo'
      },
      {
        label: '收款账户名称',
        prop: 'accountName'
      },
      {
        label: '银行',
        prop: 'bankName'
      }
    ]
  });
  const { run: getData } = useRequest(cbdApiProjectMisPaymentPrintPost, {
    manual: true,
    onSuccess(res) {
      detail.value = res || [];
    }
  });
  const { run: getRefundData } = useRequest(
    cbdApiProjectMisPaymentRefundPrintPost,
    {
      manual: true,
      onSuccess(res) {
        detail.value = res || [];
      }
    }
  );
  const doPreview = () => {
    if (props.source === 'collect-pay') {
      getData({
        resourceIdList: props.ids,
        printType: editForm.value.printType
      });
    } else if (props.source === 'refund') {
      getRefundData({
        ids: props.ids,
        printType: editForm.value.printType
      });
    }
  };
  const printEl: Ref<HTMLElement | undefined> = ref();
  async function onCertain() {
    if (printEl.value) {
      const canvas = await getHtml2Pdf(printEl.value);
      toPrint(canvas as any);
    }
  }
</script>
<style scoped lang="less">
  .print-box {
    position: relative;
    width: 100%;
    background-color: #ffffff;
    overflow-x: scroll;
    .outer {
      width: 794px;
      margin: 10px auto;
    }
    .preview-box {
      width: 100%;
      box-sizing: border-box;
      padding: 25px 30px;
      border: 1px solid #000;
      margin-bottom: 20px;
      .bill-title {
        width: 100%;
        font-size: 18px;
        text-align: center;
        padding: 0;
        margin: 0;
      }
      .tips {
        padding-left: 20px;
      }
      .sig-box {
        width: 120px;
        position: absolute;
        right: 100px;
        bottom: 80px;
        .img {
          width: 100%;
          height: auto;
        }
      }
      .signature {
        width: 200px;
        margin-left: auto;
        margin-top: 50px;
        margin-bottom: 50px;
        text-align: center;
      }
    }
    .total {
      height: 60px;
      background-color: #f2f2f2;
      width: 100%;
    }
  }
</style>
