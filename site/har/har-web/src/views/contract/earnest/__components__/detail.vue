<template>
  <drawer
    v-model:visible="visible"
    title="查询保证金"
    :footer="[1, 2, 4].includes(data.status)"
  >
    <template #footer>
      <a-button
        v-permission="['bond:detail']"
        type="primary"
        @click="showReceiveBond"
        >去收款</a-button
      >
    </template>
    <div v-if="loading">
      <a-skeleton>
        <a-space direction="vertical" :style="{ width: '100%' }" size="large">
          <a-skeleton-line :rows="15" />
        </a-space>
      </a-skeleton>
    </div>
    <div v-else>
      <a-divider orientation="left">账单基本信息</a-divider>
      <a-descriptions>
        <a-descriptions-item label="合同编号：">
          {{ data.contractCode }}
        </a-descriptions-item>
        <!--        <a-descriptions-item label="保证金账单号：">-->
        <!--          {{ data.code }}-->
        <!--        </a-descriptions-item>-->
        <a-descriptions-item label="状态：">
          {{ billStatusHash[data.status] || '--' }}
        </a-descriptions-item>
        <a-descriptions-item label="商户 / 企业名称：">
          {{ data.merchantName }}
        </a-descriptions-item>
        <a-descriptions-item v-if="data.status === 1" label="缴费截止日：">
          {{ data.billingDate }}
        </a-descriptions-item>
        <a-descriptions-item label="欠费时长：">
          {{ data.arrearsTime || '--' }}
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions
        :label-style="{ color: '#333', fontWeight: 'bold' }"
        :value-style="{ color: '#333', fontWeight: 'bold' }"
      >
        <a-descriptions-item label="应收总金额（¥）：">
          {{ data.actualAmount }}
        </a-descriptions-item>
        <a-descriptions-item label="已收总金额（¥）：">
          {{ data.receivedAmount }}
        </a-descriptions-item>
        <a-descriptions-item label="待收总金额（¥）：">
          {{ data.dueInAmount }}
        </a-descriptions-item>
      </a-descriptions>
      <a-divider orientation="left">付款信息</a-divider>
      <i-table
        v-model="search"
        v-model:refresh-now="payInfoRefresh"
        :table-loading="payInfoRefresh"
        :options="payInfoOptions"
        :api="cbdApiProjectBondReceiptListGet"
      >
        <template #paymentMethodCell="{ record }">
          {{ paymentMethodHash[record.paymentMethod] }}
        </template>
        <template #statusCell="{ record }">
          {{ billAuditStatusHash[record.status] }}
        </template>
        <template #menu="{ record }">
          <a-button type="text" @click="showReceiptBill(record.id)"
            >查看收款单</a-button
          >
        </template>
      </i-table>
      <a-divider orientation="left">扣款信息</a-divider>
      <i-table
        v-model="search"
        v-model:refresh-now="deductionRefresh"
        :options="deductionOptions"
        :api="cbdApiProjectBondDeductionListGet"
      >
        <template #typeCell="{ record }">
          {{ chargeTypeHash[record.type] }}
        </template>
        <!--        <template #menu="{ record }">-->
        <!--          <a-button type="text" @click="showReceiptBill(record.id)"-->
        <!--            >查看收款单</a-button-->
        <!--          >-->
        <!--        </template>-->
      </i-table>
    </div>
    <receive-modal
      v-if="showReceiptModel"
      :id="String(id)"
      v-model="showReceiptModel"
      is-bond
      :amount-info="{
        actualAmount: data.actualAmount,
        amountReceived: data.receivedAmount
      }"
      @submit="onReceiveSubmit"
    />
    <drawer v-model="billCount.showModal" title="查看收款单" :footer="false">
      <receipt-info :id="billCount.billId" />
    </drawer>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, reactive, onMounted } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import { Message } from '@arco-design/web-vue';
  import ITable from '@/components/i-table/index.vue';
  import ReceiveModal from '@/components/receive-modal/index.vue';
  import ReceiptInfo from '@/views/revenue-expenditure/__components__/receipt/receipt-info.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    billStatusHash,
    paymentMethodHash,
    chargeTypeHash,
    billAuditStatusHash
  } from '@/utils/dic';
  import {
    cbdApiProjectBondDetailIdGet,
    cbdApiProjectBondReceiptListGet,
    cbdApiProjectBondDeductionListGet,
    type CbdApiProjectBondDetailIdGetResponse
  } from '@/api';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number
    }
  });
  const emits = defineEmits(['update:modelValue', 'refresh']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emits('update:modelValue', value);
    }
  });
  const search = ref<{ id: number }>({
    id: props.id!
  });
  const payInfoRefresh = ref<boolean>(false);
  const deductionRefresh = ref<boolean>(false);
  const payInfoOptions = ref({
    align: 'center',
    tableCard: false,
    columns: [
      {
        label: '收款方式',
        prop: 'paymentMethod'
      },
      {
        label: '收款单号',
        prop: 'code'
      },
      {
        label: '收款金额（¥）',
        prop: 'receivedAmount'
      },
      {
        label: '收款时间',
        prop: 'collectionDate'
      },
      {
        label: '状态',
        prop: 'status'
      }
    ]
  });
  const deductionOptions = ref({
    align: 'center',
    tableCard: false,
    menu: false,
    columns: [
      {
        label: '扣款流水号',
        prop: 'serialNo'
      },
      {
        label: '扣款金额（¥）',
        prop: 'deductionAmount'
      },
      {
        label: '扣款类型',
        prop: 'type'
      },
      {
        label: '扣款时间',
        prop: 'deductionTime'
      }
    ]
  });
  const data = ref<CbdApiProjectBondDetailIdGetResponse>({
    id: 0,
    contractCode: '',
    status: 0,
    merchantName: '',
    billingDate: '',
    arrearsTime: undefined,
    actualAmount: 0,
    receivedAmount: 0,
    dueInAmount: 0
  });
  const [getData, loading] = useFuncProxy(async () => {
    data.value = await cbdApiProjectBondDetailIdGet({
      id: String(props.id!)
    });
  });
  const showReceiptModel = ref<boolean>(false);
  function showReceiveBond() {
    showReceiptModel.value = true;
  }

  // 查看收款单
  const billCount = reactive<{
    showModal: boolean;
    billId: number | undefined;
  }>({
    showModal: false,
    billId: undefined
  });
  function showReceiptBill(id: number) {
    billCount.showModal = true;
    billCount.billId = id;
  }
  // 提交后页面刷新
  function onReceiveSubmit() {
    getData();
    // 后台异步代码 表格加载不及时
    setTimeout(() => {
      Message.success('操作成功!');
      emits('refresh');
      payInfoRefresh.value = true;
      deductionRefresh.value = true;
    }, 1000);
  }
  onMounted(() => {
    if (props.id) getData();
  });
</script>

<style scoped lang="less"></style>
