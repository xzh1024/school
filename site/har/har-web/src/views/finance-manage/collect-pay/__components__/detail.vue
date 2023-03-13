<template>
  <drawer
    v-model="visible"
    title="查看"
    show-log
    no-padding
    :log-options="{
      modeId: props.id,
      logUrl: cbdApiProjectSysOptPageOptListPost,
      mode: 'cbd_mis_payment'
    }"
    @cancel="visible = false"
  >
    <a-tabs
      v-model="active"
      default-active-key="1"
      style="width: 100%; height: 100%; background-color: #fff"
    >
      <a-tab-pane key="1" :title="isPay ? '付款单信息' : '收款单信息'">
        <detail-info
          :info="detail"
          :disabled="props.disabled"
          @show-bill-detail="showBillDetail"
          @show-refund="onShowRefund"
        ></detail-info>
      </a-tab-pane>
      <a-tab-pane key="2" title="审批详情">
        <div class="exam-detail">
          <exam-title
            title="收付款单审批"
            :code="examCode"
            :status="status"
          ></exam-title>
          <examine-detail :process-list="processList" :xml-data="XMLData" />
        </div>
      </a-tab-pane>
    </a-tabs>
    <template v-if="!disabled" #footer>
      <a-button @click="visible = false">返回</a-button>
      <a-button
        v-if="showEditBtn"
        v-permission="['mis:payment:modify']"
        type="primary"
        @click="update"
        >修改</a-button
      >
      <a-popconfirm
        v-if="showDeleteBtn"
        v-permission="['mis:payment:delete']"
        content="数据删除后无法恢复，是否删除？"
        @ok="onDelete"
      >
        <a-button status="danger">删除</a-button>
      </a-popconfirm>
      <a-button
        v-if="showCertainBtn"
        v-permission="['mis:payment:confirm']"
        type="primary"
        @click="submitCertainVisible = true"
        >确认</a-button
      >
      <a-button
        v-if="detail.auditStat === 2"
        v-permission="['mis:payment:cancel_audit']"
        type="primary"
        @click="cancelApproval"
        >撤销</a-button
      >
      <a-popconfirm
        v-if="
          detail.auditStat === 3 &&
          detail.businessStat === 2 &&
          !Object.keys(detail.invoiceInfo).length
        "
        v-permission="['mis:payment:cancel']"
        content="数据已通过审批，是否作废？"
        @ok="abort"
      >
        <a-button type="primary">作废</a-button>
      </a-popconfirm>
      <a-button
        v-if="showPrintBtn"
        v-permission="['mis:payment:print']"
        type="primary"
        @click="onPrint"
        >打印</a-button
      >
    </template>
    <template v-else #footer>
      <a-button @click="visible = false">返回</a-button>
    </template>
    <print
      v-if="showPrint"
      v-model="showPrint"
      :ids="ids"
      source="collect-pay"
    />
    <sub-confirm
      v-if="submitCertainVisible"
      v-model="submitCertainVisible"
      @data="getDataAndSub"
    />
    <refund-detail
      v-if="showRefund"
      :id="Number(refundId)"
      v-model="showRefund"
    />
    <bill-detail v-if="showBill" :id="billId" v-model="showBill" disabled />
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import ExamineDetail from '@/views/homePage/_components_/examine-detail.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import Print from '@/views/finance-manage/__components__/print.vue';
  import RefundDetail from '../../collect-pay-refund/__components__/detail.vue';
  import BillDetail from '../../bill/__components__/detail.vue';
  import SubConfirm from './subConfirm.vue';
  import DetailInfo from './detailInfo.vue';
  import ExamTitle from '@/components/exam-title/index.vue';
  import { Message } from '@arco-design/web-vue';
  import {
    cbdApiProjectMisPaymentCancelAuditPost,
    cbdApiProjectMisPaymentCancelPost,
    cbdApiProjectMisPaymentConfirmPost,
    cbdApiProjectMisPaymentDeletePost,
    cbdApiProjectMisPaymentDetailGet,
    cbdApiProjectSysOptPageOptListPost,
    CbdApiProjectMisPaymentDetailGetResponse,
    cbdApiProjectPageApprovalInfoGet
  } from '@/api';
  import { useRequest } from '@har/use';

  const props = defineProps({
    disabled: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    refresh: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  });
  const emits = defineEmits(['update:modelValue', 'update', 'refresh']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const isPay = computed(() => {
    return detail.value?.billOutput?.billType === 2;
  });
  const active = ref('1');
  const update = () => {
    emits('update');
  };
  const onDelete = () => {
    exeDelete({ idList: [Number(props.id)] });
  };
  const { run: exeDelete } = useRequest(cbdApiProjectMisPaymentDeletePost, {
    manual: true,
    onSuccess() {
      visible.value = false;
      Message.success('保存成功!');
      emits('refresh');
    }
  });
  const abort = async () => {
    exeRevoke({
      idList: [Number(props.id)]
    });
  };
  const { run: exeRevoke } = useRequest(cbdApiProjectMisPaymentCancelPost, {
    manual: true,
    onSuccess() {
      Message.success('保存成功');
      emits('refresh');
      visible.value = false;
    }
  });
  const confirmForm = ref({
    autoOpenInvoice: 1,
    remark: ''
  });
  const submitCertainVisible = ref(false);
  const { run: onCertain } = useRequest(cbdApiProjectMisPaymentConfirmPost, {
    manual: true,
    onSuccess() {
      visible.value = false;
      Message.success('保存成功!');
      emits('refresh');
    }
  });
  const { run: doCancelAudit } = useRequest(
    cbdApiProjectMisPaymentCancelAuditPost,
    {
      manual: true,
      onSuccess() {
        visible.value = false;
        Message.success('保存成功!');
        emits('refresh');
      }
    }
  );

  const showPrint = ref(false);
  const ids = computed(() => [Number(props.id)]);
  const onPrint = async () => {
    showPrint.value = true;
  };
  const cancelApproval = async () => {
    doCancelAudit({
      id: Number(props.id)
    });
  };
  const detail = ref<CbdApiProjectMisPaymentDetailGetResponse>(
    {} as CbdApiProjectMisPaymentDetailGetResponse
  );
  const XMLData = ref('');
  const examCode = ref('');
  const status = ref<number | undefined>(0);
  const processList = ref<any>([]);
  //流程引擎详情接口
  const getApprovalInfoEngine = async () => {
    try {
      const d = await cbdApiProjectPageApprovalInfoGet({
        procInsId: detail.value.flowId || ''
      });
      processList.value = d?.historyInstanceInfoList;
      XMLData.value = d.nodeImg || '';
      status.value = d?.status;
      examCode.value = d?.code || '';
    } catch (e) {
      console.error(e);
    }
  };
  const { run: initEditInfo } = useRequest(cbdApiProjectMisPaymentDetailGet, {
    manual: true,
    onSuccess(res) {
      detail.value = res;
      getApprovalInfoEngine();
    }
  });
  type FormItems = {
    autoOpenInvoice: number;
    remark: string;
  };
  const configData = ref({
    autoOpenInvoice: 1,
    remark: ''
  });
  const getDataAndSub = (d: FormItems) => {
    configData.value = d;
    onCertain({
      idList: [Number(props.id)],
      ...confirmForm.value
    });
  };
  const refundId = ref('');
  const showRefund = ref(false);
  const onShowRefund = (id: string) => {
    refundId.value = id;
    showRefund.value = true;
  };
  const billId = ref('');
  const showBill = ref(false);
  const showBillDetail = (id: string) => {
    billId.value = id;
    showBill.value = true;
  };
  watch(
    () => props.id,
    async (v) => {
      if (v) {
        await initEditInfo({
          id: props.id
        });
      }
    },
    { immediate: true }
  );
  watch(
    () => props.refresh,
    async () => {
      if (props.id) {
        await initEditInfo({
          id: props.id
        });
      }
    },
    { immediate: true }
  );
  const showEditBtn = computed(
    () =>
      [0, 1].includes(detail.value.businessStat!) &&
      [1, 4, 5].includes(detail.value.auditStat)
  );
  const showDeleteBtn = computed(
    () =>
      [0, 1].includes(detail.value.businessStat!) &&
      [1, 4, 5].includes(detail.value.auditStat!)
  );
  const showCertainBtn = computed(
    () =>
      [0, 1].includes(detail.value.businessStat!) &&
      [1, 4, 5].includes(detail.value.auditStat!)
  );
  const showPrintBtn = computed(() =>
    [1, 2].includes(detail.value.businessStat!)
  );
</script>
<style scoped lang="less">
  .orderNo {
    width: 100%;
    padding: 10px 20px;
    font-weight: bold;
    background-color: #fff;
  }
  :deep(.arco-tabs-pane) {
    max-height: 80vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  :deep(.arco-card-actions) {
    margin-top: 0;
  }
  :deep(.arco-tabs-content) {
    padding: 12px 16px;
    background-color: #efefef;
  }
  :deep(.arco-tabs-nav-tab-list) {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .exam-detail {
    background-color: #fff;
  }
</style>
