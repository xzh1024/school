<template>
  <a-tabs type="card">
    <a-tab-pane
      v-if="receiptBasic.data && receiptBasic.data.paymentMethod === 1"
      key="1"
      title="线下支付"
      style="padding: 0 20px 20px"
    >
      <receipt-info
        v-if="Object.keys(receiptBasic.data).length"
        :info="receiptBasic.data"
      />
    </a-tab-pane>
    <a-tab-pane
      v-if="showHistory && receiptBasic.data.paymentMethod === 1"
      key="2"
      title="审批流程"
      style="padding: 0 20px 20px"
    >
      <approval-process :data="progressList" />
    </a-tab-pane>
    <a-tab-pane
      v-if="receiptBasic.data && receiptBasic.data.paymentMethod === 2"
      key="3"
      title="线上支付"
      style="padding: 0 20px 20px"
    >
      <receipt-info
        v-if="Object.keys(receiptBasic.data).length"
        :info="receiptBasic.data"
      />
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
  import { ref, reactive, watch, computed } from 'vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectReceiptInfoIdGet,
    cbdApiProjectApprovalProcessGetRecordPost,
    type CbdApiProjectApprovalProcessGetRecordPostResponse
  } from '@/api';
  import ApprovalProcess from '@/components/approvalProcess/index.vue';
  import ReceiptInfo from './receipt-info.vue';
  type RowData =
    Required<CbdApiProjectApprovalProcessGetRecordPostResponse>['approvalProcessBusinessVos'];

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    refresh: {
      type: Boolean,
      default: false
    },
    billId: {
      type: Number
    }
  });
  const emits = defineEmits(['update:modelValue', 'update:refresh']);
  const isRefresh = computed({
    get() {
      return props.refresh;
    },
    set(v) {
      emits('update:refresh', v);
    }
  });
  const RECEIPT_AUDIT_INFO_CODE = '00002';
  const receiptBasic = reactive<any>({
    data: {}
  });
  const showHistory = ref<boolean>(false);
  const progressList = ref<RowData>([]);

  const [getRecord] = useFuncProxy(async () => {
    const result = await cbdApiProjectApprovalProcessGetRecordPost({
      approvalProcessCode: RECEIPT_AUDIT_INFO_CODE,
      businessId: props.billId!
    });
    showHistory.value = result.history!;
    progressList.value = result.approvalProcessBusinessVos!;
  });
  const [getData] = useFuncProxy(async () => {
    const res = await cbdApiProjectReceiptInfoIdGet({
      id: String(props.billId!)
    });
    receiptBasic.data = res || {};
    isRefresh.value = false;
    emits('update:modelValue', res.permissions);
    getRecord();
  });

  watch(
    () => props.billId,
    (v) => {
      if (v) {
        getData();
      }
    },
    { deep: true, immediate: true }
  );
  watch(isRefresh, (v) => {
    if (v) {
      getData();
    }
  });
</script>

<style scoped></style>
