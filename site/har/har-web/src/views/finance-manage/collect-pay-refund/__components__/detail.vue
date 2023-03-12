<template>
  <drawer
    v-model="visible"
    title="查看"
    show-log
    no-padding
    :log-options="{
      modeId: props.id,
      logUrl: cbdApiProjectSysOptPageOptListPost,
      mode: 'cbd_mis_payment_refund'
    }"
    @cancel="visible = false"
  >
    <a-tabs
      v-model="active"
      default-active-key="1"
      style="width: 100%; height: 100%; background-color: #fff"
    >
      <a-tab-pane key="1" :title="isPay ? '付款单信息' : '收款单信息'">
        <DetailContent
          :info="info"
          :disabled="disabled"
          @show-bill-detail="onBillDetail"
          @show-collect-pay-detail="onCollectPayDetail"
        />
      </a-tab-pane>
      <a-tab-pane key="2" title="审批详情">
        <div>
          <examine-detail :process-list="processList" :xml-data="XMLData" />
        </div>
      </a-tab-pane>
    </a-tabs>
    <template #footer>
      <a-button @click="visible = false">返回</a-button>
      <template v-if="!disabled">
        <a-button
          v-if="editVisible"
          v-permission="['mis:payment_refund:modify']"
          type="primary"
          @click="onEdit"
        >
          修改
        </a-button>
        <a-popconfirm content="数据删除后无法恢复，是否删除？" @ok="onDelete">
          <a-button
            v-if="deleteVisible"
            v-permission="['mis:payment_refund:delete']"
            status="danger"
          >
            删除
          </a-button>
        </a-popconfirm>
        <a-button
          v-if="confirmVisible"
          v-permission="['mis:payment_refund:confirm']"
          type="primary"
          @click="onCertain"
        >
          确认
        </a-button>
        <a-popconfirm content="数据已通过审批，是否作废？" @ok="onCancel">
          <a-button
            v-if="cancelVisible"
            v-permission="['mis:payment_refund:cancel']"
            type="primary"
          >
            作废
          </a-button>
        </a-popconfirm>

        <a-popconfirm
          content="撤销后，将结束审批流程，是否撤销？"
          @ok="onCancelAudit"
        >
          <a-button
            v-if="cancelAuditVisible"
            v-permission="['mis:payment_refund:cancel_audit']"
            type="primary"
          >
            撤销
          </a-button>
        </a-popconfirm>
      </template>
      <a-button
        v-if="showPrintBtn"
        v-permission="['mis:payment_refund:print']"
        type="primary"
        @click="onPrint"
      >
        打印
      </a-button>
    </template>
  </drawer>

  <batch-confirm v-model:visible="batchConfirmVisible" @submit="onSubmit" />
  <print v-if="showPrint" v-model="showPrint" :ids="ids" source="refund" />
</template>

<script setup lang="ts">
  import { ref, computed, PropType } from 'vue';
  import ExamineDetail from '@/views/homePage/_components_/examine-detail.vue';
  import Print from '@/views/finance-manage/__components__/print.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import { Message } from '@arco-design/web-vue';
  import { useRequest } from '@har/use';
  import BatchConfirm from './batchConfirm.vue';
  import DetailContent from './detailContent.vue';
  import {
    cbdApiProjectMisPaymentRefundDetailGet,
    CbdApiProjectMisPaymentRefundDetailGetResponse,
    cbdApiProjectMisPaymentRefundDeletePost,
    cbdApiProjectMisPaymentRefundCancelPost,
    CbdApiProjectMisPaymentRefundPageListGetResponse,
    cbdApiProjectSysOptPageOptListPost,
    cbdApiProjectMisPaymentRefundConfirmPost,
    CbdApiProjectMisPaymentRefundConfirmPostRequest,
    cbdApiProjectPageApprovalInfoGet,
    CbdApiProjectPageApprovalInfoGetResponse,
    cbdApiProjectMisPaymentRefundCancelAuditPost
  } from '@/api';

  type SelectData =
    Required<CbdApiProjectMisPaymentRefundPageListGetResponse>['rows'][0];

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean
    },
    id: {
      type: Number
    },
    rowData: {
      type: Object as PropType<SelectData>,
      default: () => {
        return {};
      }
    }
  });
  const emits = defineEmits([
    'update:modelValue',
    'refresh',
    'showEdit',
    'showBillDetail',
    'showCollectPayDetail'
  ]);
  const visible = computed({
    get() {
      if (props.modelValue && props.id) {
        getInfo();
      }
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });

  const editVisible = computed(() => {
    const { businessStat, auditStat } = props.rowData;
    return (
      (businessStat === 0 && auditStat === 1) ||
      (businessStat === 1 && [1, 4, 5].includes(auditStat))
    );
  });
  const deleteVisible = computed(() => {
    const { businessStat, auditStat } = props.rowData;
    return (
      (businessStat === 0 && auditStat === 1) ||
      (businessStat === 1 && [1, 4, 5].includes(auditStat))
    );
  });
  const confirmVisible = computed(() => {
    return (
      [1, 4, 5].includes(props.rowData.auditStat) &&
      props.rowData.businessStat === 1
    );
  });
  const cancelVisible = computed(() => {
    return (
      props.rowData.auditStat === 3 &&
      props.rowData.businessStat === 2 &&
      props.rowData.invoiceStat !== 1
    );
  });
  const cancelAuditVisible = computed(() => {
    return props.rowData.auditStat === 2;
  });

  const isPay = computed(() => {
    return !!(info.value &&
    info.value.billOutput &&
    info.value.billOutput.billType === 1
      ? false
      : true);
  });
  const active = ref('1');
  const onEdit = () => {
    emits('showEdit');
  };

  const onDelete = async () => {
    if (props.rowData.id) {
      deleteRefund({ idList: [props.rowData.id] });
    }
  };
  const { run: deleteRefund } = useRequest(
    cbdApiProjectMisPaymentRefundDeletePost,
    {
      manual: true,
      onSuccess() {
        Message.success({ content: '删除成功' });
        emits('refresh');
      }
    }
  );
  // 作废
  const onCancel = async () => {
    if (props.rowData.id) {
      cancelRefund({ idList: [props.rowData.id] });
    }
  };
  const { run: cancelRefund } = useRequest(
    cbdApiProjectMisPaymentRefundCancelPost,
    {
      manual: true,
      onSuccess() {
        Message.success({ content: '作废成功' });
        emits('refresh');
      }
    }
  );
  // 撤销审核
  const onCancelAudit = async () => {
    if (props.rowData.id) {
      cancelAuditRefund({ id: props.rowData.id });
    }
  };
  const { run: cancelAuditRefund } = useRequest(
    cbdApiProjectMisPaymentRefundCancelAuditPost,
    {
      manual: true,
      onSuccess() {
        Message.success({ content: '撤销成功' });
        emits('refresh');
      }
    }
  );

  const info = ref<CbdApiProjectMisPaymentRefundDetailGetResponse>();
  // 获取详情
  const { run: getInfo } = useRequest(
    () => cbdApiProjectMisPaymentRefundDetailGet({ id: String(props.id) }),
    {
      manual: true,
      onSuccess(data: CbdApiProjectMisPaymentRefundDetailGetResponse) {
        info.value = data;
        resourceList.value = data.resourceFilesRespList || [];
        getApprovalInfoEngine();
      }
    }
  );

  /* 附件 */
  const resourceList = ref<any[]>([]);

  // 账单详情
  const onBillDetail = (id: string) => {
    emits('showBillDetail', id);
  };
  const onCollectPayDetail = (id: string) => {
    emits('showCollectPayDetail', id);
  };

  // 确认
  const batchConfirmVisible = ref(false);
  const { run: submitBatchConfirm } = useRequest(
    cbdApiProjectMisPaymentRefundConfirmPost,
    {
      manual: true,
      onSuccess() {
        Message.success('操作成功!');
        emits('refresh');
      }
    }
  );
  const refundDetailList = computed(() => {
    return info.value?.refundDetail ? [info.value.refundDetail] : [];
  });

  const onCertain = () => {
    if (!refundDetailList.value.length) return;
    const data = refundDetailList.value[0];
    if (!data.refundAmount) {
      Message.error({ content: '请输入有效的退款金额' });
      return;
    }
    if (!data.refundAt) {
      Message.error({ content: '退款日期不能为空' });
      return;
    }
    if (!data.payMethodId) {
      Message.error({ content: '退款方式不能为空' });
      return;
    }
    batchConfirmVisible.value = true;
  };
  const onSubmit = (params = {}) => {
    const data = refundDetailList.value[0];
    submitBatchConfirm({
      ...params,
      idList: [data.id]
    } as CbdApiProjectMisPaymentRefundConfirmPostRequest);
  };

  const XMLData = ref('');
  const processList = ref<
    CbdApiProjectPageApprovalInfoGetResponse['historyInstanceInfoList']
  >([]);
  //流程引擎详情接口
  const getApprovalInfoEngine = async () => {
    try {
      const d = await cbdApiProjectPageApprovalInfoGet({
        procInsId: info.value?.refundDetail?.flowId
      });
      processList.value = d?.historyInstanceInfoList;
      XMLData.value = d.nodeImg || '';
    } catch (e) {
      console.error(e);
    }
  };
  const showPrintBtn = computed(() =>
    [1, 2].includes(props.rowData.businessStat!)
  );
  const showPrint = ref(false);
  const ids = computed(() => [Number(props.id)]);
  const onPrint = async () => {
    showPrint.value = true;
  };
</script>
<style scoped lang="less">
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
</style>
