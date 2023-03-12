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
            v-if="source === 'bill' && item.billType === 1"
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
            <a-descriptions-item label="合同金额：">{{
              item.amount || ''
            }}</a-descriptions-item>
            <a-descriptions-item label="账单调整金额：">{{
              item.adjustAmount || ''
            }}</a-descriptions-item>
            <a-descriptions-item label="税额：">{{
              item.afterAdjustableTaxAmount || ''
            }}</a-descriptions-item>
            <a-descriptions-item
              :label="item.billType === 1 ? '应收金额：' : '应付金额：'"
              >{{ item.afterShouldAmount || '' }}</a-descriptions-item
            >
            <a-descriptions-item
              :label="item.billType === 1 ? '已收金额：' : '已付金额：'"
              >{{ item.handleAmount || '' }}</a-descriptions-item
            >
            <a-descriptions-item
              :label="item.billType === 1 ? '未收金额：' : '未付金额：'"
              >{{ item.afterNotAmount || '' }}</a-descriptions-item
            >
          </a-descriptions>
          <a-descriptions
            v-if="source === 'bill' && item.billType === 2"
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
              item.saleAmount || ''
            }}</a-descriptions-item>
            <a-descriptions-item label="手续费：">{{
              item.feeAmount || ''
            }}</a-descriptions-item>
            <a-descriptions-item label="返款金额：">{{
              item.rebateAmount || ''
            }}</a-descriptions-item>
            <a-descriptions-item label="转预付款金额：">{{
              item.advanceAmount || ''
            }}</a-descriptions-item>
            <a-descriptions-item label="应付金额：">{{
              item.afterShouldAmount
            }}</a-descriptions-item>
            <a-descriptions-item label="已付金额：">{{
              item.handleAmount || ''
            }}</a-descriptions-item>
            <a-descriptions-item label="未付金额：">{{
              item.amountNotReceived || ''
            }}</a-descriptions-item>
          </a-descriptions>
          <a-descriptions
            v-if="source === 'urge'"
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
              item.storeName || ''
            }}</a-descriptions-item>
            <a-descriptions-item label="合同号：">{{
              item.contractCode || ''
            }}</a-descriptions-item>
            <a-descriptions-item label="合同金额：">{{
              item.amount || ''
            }}</a-descriptions-item>
            <a-descriptions-item label="账单调整金额：">{{
              item.adjustAmount || ''
            }}</a-descriptions-item>
            <a-descriptions-item label="税额：">{{
              item.afterAdjustableTaxAmount || ''
            }}</a-descriptions-item>
            <a-descriptions-item label="应付金额：">{{
              item.afterShouldAmount || ''
            }}</a-descriptions-item>
            <a-descriptions-item label="已付金额：">{{
              item.handleAmount || ''
            }}</a-descriptions-item>
            <a-descriptions-item label="欠缴金额：">{{
              item.amountOwed || ''
            }}</a-descriptions-item>
            <a-descriptions-item label="滞纳金金额：">{{
              item.overdueFineAmount || ''
            }}</a-descriptions-item>
          </a-descriptions>
          <h4>账单详情</h4>
          <custom-table
            v-for="(a, num) in item.printModelType"
            :key="a"
            :columns="getColumns(item, a)"
            :data="item.billDetailPrintMap && item.billDetailPrintMap[a]"
          >
            <div
              v-if="num === item.printModelType.length - 1"
              class="total flex align-center justify-end"
            >
              <a-space v-if="source === 'urge'" style="margin-right: 208px">
                <div>合计</div>
                <div style="width: 104px; text-align: center">{{
                  handleSummary(item.amountOwed)
                }}</div>
                <div style="width: 104px; text-align: center">{{
                  handleSummary(item.overdueFineAmount)
                }}</div>
              </a-space>
              <div
                v-else
                style="width: 100%; margin-right: 98px"
                class="flex justify-end"
              >
                <div style="width: 104px">合计</div>
                <div style="width: 104px; text-align: left">{{
                  handleSummary(item.afterShouldAmount)
                }}</div>
                <div style="width: 104px">{{
                  handleSummary(item.handleAmount)
                }}</div>
                <div style="width: 104px">{{
                  handleSummary(item.afterNotAmount)
                }}</div>
              </div>
            </div>
          </custom-table>
          <div
            v-if="
              item.billPrintAccountRespList &&
              item.billPrintAccountRespList.length
            "
          >
            <h4>收款账户</h4>
            <i-table
              :options="accountOptions"
              :data="item.billPrintAccountRespList"
            ></i-table>
          </div>
          <template v-if="source === 'bill' && item.billType === 1">
            <h4>温馨提示</h4>
            <div class="tips"
              >请在期限内付清上述费用，期限内未付清，将按合同约定计算滞纳金！</div
            >
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
      <a-button
        v-if="source === 'urge'"
        v-permission="['formal:bill:reminders']"
        type="primary"
        @click="onSend"
        >发送</a-button
      >
      <a-button @click="visible = false">取消</a-button>
      <a-button type="primary" @click="onCertain">打印</a-button>
    </template>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, Ref, PropType } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import IForm from '@/components/i-form/index.vue';
  import ITable from '@/components/i-table/index.vue';
  import dayjs from 'dayjs';
  import CustomTable from '../../__components__/custom-table.vue';
  import {
    cbdApiProjectMisBillPrintPost,
    cbdApiProjectMisBillRemindersPost
  } from '@/api';
  import { useRequest } from '@har/use';
  import { getHtml2Pdf, toPrint } from '@/utils/print';
  import { Message } from '@arco-design/web-vue';
  import { formatTime, formatPrice } from '@/utils';

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
      default: 'bill', // 'bill' 'urge' 'collect-pay' 'refund',
      required: true
    }
  });
  const detail = ref<any>([]);
  const printTypeList = [
    {
      label: '按账单打印',
      value: 1
    },
    {
      label: '按合同(店铺)打印',
      value: 2
    }
  ];
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
  const formProps: Recordable = computed(() => {
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
  // 催款单表格列
  const urgeColumns = ref([
    {
      label: '费用项目',
      prop: 'expenseItemsName'
    },
    {
      label: '收费方式',
      prop: 'chargingMethod'
    },
    {
      label: '账单生成日',
      prop: 'billCreateAt',
      formatter: (a: any) => formatTime(a.billCreateAt, 'YYYY-MM-DD')
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
      prop: 'afterShouldAmount',
      formatter: (e: Recordable) => formatPrice(e.afterShouldAmount)
    },
    {
      label: '已付金额',
      prop: 'handleAmount',
      formatter: (e: Recordable) => formatPrice(e.handleAmount)
    },
    {
      label: '欠缴金额',
      prop: 'afterNotAmount',
      formatter: (e: Recordable) => formatPrice(e.afterNotAmount)
    },
    {
      label: '最迟缴费日期',
      prop: 'latestPaymentDate',
      formatter: (e: Recordable) =>
        formatTime(e.latestPaymentDate, 'YYYY-MM-DD')
    },
    {
      label: '滞纳金方式',
      prop: 'unitAmount'
    },
    {
      label: '滞纳金天数',
      prop: 'overdueFineDay'
    },
    {
      label: '滞纳金',
      prop: 'overdueFineAmount',
      formatter: (e: Recordable) => formatPrice(e.overdueFineAmount)
    }
  ]);
  const billSaleReturnColumns = ref([
    {
      label: '费用项目',
      prop: 'expenseItemsName'
    },
    {
      label: '账单生成日',
      prop: 'billCreateAt',
      formatter: (a: any) => formatTime(a.billCreateAt, 'YYYY-MM-DD')
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
      prop: 'rebateAmount',
      formatter: (e: Recordable) => formatPrice(e.rebateAmount)
    },
    {
      label: '手续费',
      prop: 'feeAmount',
      formatter: (e: Recordable) => formatPrice(e.feeAmount)
    },
    {
      label: '转预付款金额',
      prop: 'advanceAmount',
      formatter: (e: Recordable) => formatPrice(e.advanceAmount)
    },
    {
      label: '应付金额',
      prop: 'afterShouldAmount',
      formatter: (e: Recordable) => formatPrice(e.afterShouldAmount)
    },
    {
      label: '已付金额',
      prop: 'handleAmount',
      formatter: (e: Recordable) => formatPrice(e.handleAmount)
    },
    {
      label: '未付金额',
      prop: 'afterNotAmount',
      formatter: (e: Recordable) => formatPrice(e.afterNotAmount)
    }
  ]);
  const billColumnsDic = (billType = 1): { [key: number]: any } => {
    // bill 1存款2滞纳金3能耗4其他
    return {
      1: [
        {
          label: '履约保证金',
          prop: 'expenseItemsName'
        },
        {
          label: '账单生成日',
          prop: 'billCreateAt',
          formatter: (a: any) => formatTime(a.billCreateAt, 'YYYY-MM-DD')
        },
        {
          label: '费用期间',
          prop: 'expensePeriod'
        },
        {
          label: '费用金额',
          prop: 'amount',
          formatter: (e: Recordable) => formatPrice(e.amount)
        },
        {
          label: billType === 1 ? '应收金额' : '应付金额',
          prop: 'afterShouldAmount',
          formatter: (e: Recordable) => formatPrice(e.afterShouldAmount)
        },
        {
          label: billType === 1 ? '已收金额' : '已付金额',
          prop: 'handleAmount',
          formatter: (e: Recordable) => formatPrice(e.handleAmount)
        },
        {
          label: '已处理金额',
          prop: 'handleAmount',
          formatter: (e: Recordable) => formatPrice(e.handleAmount)
        },
        {
          label: '可用余额',
          prop: 'availableBalance',
          formatter: (e: Recordable) => formatPrice(e.availableBalance)
        },
        {
          label: billType === 1 ? '未收金额' : '未付金额',
          prop: 'afterNotAmount',
          formatter: (e: Recordable) => formatPrice(e.afterNotAmount)
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
          prop: 'overdueFinePeriod'
        },
        {
          label: '滞纳金方式',
          prop: 'unitAmount'
        },
        {
          label: '滞纳金金额',
          prop: 'overdueFineAmount',
          formatter: (e: Recordable) => formatPrice(e.overdueFineAmount)
        },
        {
          label: '调整金额',
          prop: 'adjustAmount',
          formatter: (e: Recordable) => formatPrice(e.adjustAmount)
        },
        {
          label: '税率',
          prop: 'taxRate'
        },
        {
          label: '不含税金额',
          prop: 'afterTaxExclusiveAmount',
          formatter: (e: Recordable) => formatPrice(e.afterTaxExclusiveAmount)
        },
        {
          label: '税额',
          prop: 'afterAdjustableTaxAmount',
          formatter: (e: Recordable) => formatPrice(e.afterAdjustableTaxAmount)
        },
        {
          label: '应收金额',
          prop: 'afterShouldAmount',
          formatter: (e: Recordable) => formatPrice(e.afterShouldAmount)
        },
        {
          label: '已收金额',
          prop: 'handleAmount',
          formatter: (e: Recordable) => formatPrice(e.handleAmount)
        },
        {
          label: '未收金额',
          prop: 'afterNotAmount',
          formatter: (e: Recordable) => formatPrice(e.afterNotAmount)
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
          label: '本期用量',
          prop: 'currentDosage'
        },
        {
          label: '本期费用',
          prop: 'currentFees',
          formatter: (e: Recordable) => formatPrice(e.currentFees)
        },
        {
          label: '调整金额',
          prop: 'adjustAmount',
          formatter: (e: Recordable) => formatPrice(e.adjustAmount)
        },
        {
          label: '税率',
          prop: 'taxRate'
        },
        {
          label: '不含税金额',
          prop: 'afterTaxExclusiveAmount',
          formatter: (e: Recordable) => formatPrice(e.afterTaxExclusiveAmou)
        },
        {
          label: '税额',
          prop: 'afterAdjustableTaxAmount',
          formatter: (e: Recordable) => formatPrice(e.afterAdjustableTaxAmo)
        },
        {
          label: '应收金额',
          prop: 'afterShouldAmount',
          formatter: (e: Recordable) => formatPrice(e.afterShouldAmount)
        },
        {
          label: '已收金额',
          prop: 'handleAmount',
          formatter: (e: Recordable) => formatPrice(e.handleAmount)
        },
        {
          label: '未收金额',
          prop: 'afterNotAmount',
          formatter: (e: Recordable) => formatPrice(e.afterNotAmount)
        }
      ],
      4: [
        {
          label: '费用项目',
          prop: 'expenseItemsName'
        },
        {
          label: '收费方式',
          prop: 'chargingMethod'
        },
        {
          label: '账单生成日',
          prop: 'billCreateAt',
          formatter: (a: any) => formatTime(a.billCreateAt, 'YYYY-MM-DD')
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
          label: '合同金额',
          prop: 'amount',
          formatter: (a: any) => formatPrice(a.amount)
        },
        {
          label: '账单调整金额',
          prop: 'adjustAmount',
          formatter: (a: any) => formatPrice(a.adjustAmount)
        },
        {
          label: '税率',
          prop: 'taxRate'
        },
        {
          label: '不含税金额',
          prop: 'afterTaxExclusiveAmount',
          formatter: (a: any) => formatPrice(a.afterTaxExclusiveAmount)
        },
        {
          label: '税额',
          prop: 'afterAdjustableTaxAmount',
          formatter: (a: any) => formatPrice(a.afterAdjustableTaxAmount)
        },
        {
          label: billType === 1 ? '应收金额' : '应付金额',
          prop: 'afterShouldAmount',
          formatter: (a: any) => formatPrice(a.afterShouldAmount)
        },
        {
          label: billType === 1 ? '已收金额' : '已付金额',
          prop: 'handleAmount',
          formatter: (a: any) => formatPrice(a.handleAmount)
        },
        {
          label: billType === 1 ? '未收金额' : '未付金额',
          prop: 'afterNotAmount',
          formatter: (a: any) => formatPrice(a.afterNotAmount)
        }
      ]
    };
  };
  const calcTitle = (record: any) => {
    if (props.source === 'urge') {
      return record.brandName + '催缴单';
    } else {
      if (record.billType === 2) {
        return record.brandName + '返款单';
      } else {
        return record.brandName + '账单';
      }
    }
  };
  const getColumns = (record: any, type: number) => {
    // 催款页
    if (props.source === 'urge') {
      return urgeColumns.value;
      // 账单页的表头
    } else {
      // 付款单
      if (record.billType === 2) {
        return billSaleReturnColumns.value;
        // 收款 多类型
      } else {
        return billColumnsDic(record.billType)[type];
      }
    }
  };
  const handleSummary = (str?: string) => {
    if (!str || str.indexOf('(') < 0) return str;
    return str.substring(0, str.indexOf('('));
  };
  const accountOptions = ref({
    pageShow: false,
    tableCard: false,
    menu: false,
    columns: [
      {
        label: '费用项目',
        width: 300,
        prop: 'expenseItemsName'
      },
      {
        label: '收款账户号',
        prop: 'account'
      },
      {
        label: '收款账户名称',
        prop: 'accountName'
      },
      {
        label: '银行',
        prop: 'backName'
      }
    ]
  });
  const printEl: Ref<HTMLElement | undefined> = ref();
  const { run: onRemind } = useRequest(cbdApiProjectMisBillRemindersPost, {
    manual: true,
    onSuccess() {
      visible.value = false;
    }
  });
  const onSend = () => {
    onRemind({
      resourceIdList: props.ids,
      printType: editForm.value.printType,
      isReminders: 1
    });
  };
  async function onCertain() {
    if (!detail.value?.length) {
      Message.error('请先生成预览数据');
      return false;
    }
    if (printEl.value) {
      const canvas = await getHtml2Pdf(printEl.value);
      toPrint(canvas as any);
    }
  }
  const { run: getData } = useRequest(cbdApiProjectMisBillPrintPost, {
    manual: true,
    onSuccess(res) {
      detail.value = res || [];
    }
  });
  const doPreview = () => {
    getData({ resourceIdList: props.ids, printType: editForm.value.printType });
  };
</script>
<style scoped lang="less">
  .print-box {
    position: relative;
    width: 100%;
    overflow-x: scroll;
    background-color: #ffffff;
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
