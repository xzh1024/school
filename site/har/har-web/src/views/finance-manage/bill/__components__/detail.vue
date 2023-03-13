<template>
  <drawer
    v-model="visible"
    title="查看"
    show-log
    no-padding
    :log-options="{
      modeId: props.id,
      logUrl: cbdApiProjectSysOptPageOptListPost,
      mode: 'cbd_mis_bill'
    }"
    @cancel="visible = false"
  >
    <!--    <div class="orderNo">{{ data.billNum || '&#45;&#45;' }}</div>-->
    <a-tabs
      v-model="active"
      default-active-key="1"
      style="width: 100%; height: 100%; background-color: #fff"
    >
      <a-tab-pane key="1" title="账单信息" style="height: 100%">
        <div class="i-card">
          <a-descriptions
            layout="vertical"
            :value-style="{ color: '#333333', fontSize: '16px' }"
          >
            <a-descriptions-item label="账单编号：">
              {{ data.billNum || '--' }}
            </a-descriptions-item>
          </a-descriptions>
        </div>
        <detail-info
          :info="data"
          :disabled="props.disabled"
          @show-cp="onShowCP"
          @show-refund="onShowRefund"
          @show-late="onShowLateFee"
        />
      </a-tab-pane>
      <a-tab-pane key="2" title="审批详情">
        <div class="i-card">
          <a-descriptions
            layout="vertical"
            :value-style="{ color: '#333333', fontSize: '16px' }"
          >
            <a-descriptions-item label="账单编号：">
              {{ data.billNum || '--' }}
            </a-descriptions-item>
          </a-descriptions>
        </div>
        <div class="exam-detail">
          <exam-title
            title="账单审批"
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
        v-permission="['formal:bill:adjustable']"
        type="primary"
        @click="update"
        >修改</a-button
      >
      <a-popconfirm
        v-if="showDelete"
        v-permission="['formal:bill:delete']"
        content="数据删除后无法恢复，是否删除？"
        @ok="onDelete({ id: String(props.id || '') })"
      >
        <a-button type="primary">删除</a-button>
      </a-popconfirm>
      <a-popconfirm
        v-if="showConfirmBtn"
        v-permission="['formal:bill:confirm']"
        content="确认提交审批吗？"
        @ok="onCertain({ idList: [Number(props.id)] })"
      >
        <a-button type="primary">确认审批</a-button>
      </a-popconfirm>
      <a-popconfirm
        v-if="data.auditStat === 3 && data.businessStat === 2"
        v-permission="['formal:bill:doScrap']"
        content="数据已通过审批，是否作废？"
        @ok="abort"
      >
        <a-button type="primary">作废</a-button>
      </a-popconfirm>
      <a-popconfirm
        v-if="data.auditStat === 2"
        v-permission="['formal:bill:cancelAudit']"
        content="确定撤销审批吗?"
        @ok="revokeExam({ billId: Number(props.id) })"
      >
        <a-button type="primary">撤销</a-button>
      </a-popconfirm>
      <a-popconfirm
        v-if="
          isCollect &&
          data.auditStat === 3 &&
          isArrIncludes([2, 4], data.businessStat)
        "
        content="确定发送嘛"
      >
        <a-button type="primary">发送催款单</a-button>
      </a-popconfirm>
      <a-button
        v-if="
          isCollect &&
          (data.businessStat === 2 || data.businessStat === 4) &&
          data.auditStat === 3
        "
        v-permission="['mis:payment:commit']"
        type="primary"
        @click="getBillInfo({ idList: [Number(props.id)] })"
        >收款</a-button
      >
      <a-button
        v-if="
          !isCollect &&
          isArrIncludes([2, 4], data.businessStat) &&
          data.auditStat === 3
        "
        v-permission="['mis:payment:commit']"
        type="primary"
        @click="getBillInfo({ idList: [Number(props.id)] })"
        >付款</a-button
      >
      <a-button
        v-if="
          data.auditStat === 3 && isArrIncludes([2, 4, 5], data.businessStat)
        "
        v-permission="['formal:bill:print']"
        type="primary"
        @click="onPrint"
        >打印</a-button
      >
    </template>
    <template v-else #footer>
      <a-button @click="visible = false">返回</a-button>
    </template>
    <collect-pay-detail
      v-if="showDetail"
      :id="cpId"
      v-model="showDetail"
      disabled
    />
    <print v-if="showPrint" v-model="showPrint" :ids="ids" source="bill" />
    <add-page
      v-if="showAddPage"
      v-model="showAddPage"
      hide-select
      :data="selectBills"
    />
    <refund-detail
      v-if="showRefund"
      :id="Number(refundId)"
      v-model="showRefund"
    >
    </refund-detail>
    <late-fee-detail
      v-if="showLateFee"
      :id="lateFeeId"
      v-model="showLateFee"
      @update="onUpdateLateFee"
    />
    <update-bill
      v-if="showUpdate"
      :id="String(lateFeeId)"
      v-model="showUpdate"
    />
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, PropType, watch } from 'vue';
  import ExamineDetail from '@/views/homePage/_components_/examine-detail.vue';
  import ExamTitle from '@/components/exam-title/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import CollectPayDetail from '../../collect-pay/__components__/detail.vue';
  import RefundDetail from '../../collect-pay-refund/__components__/detail.vue';
  import DetailInfo from './detail-info.vue';
  import AddPage from '../../collect-pay/__components__/addPage.vue';
  import Print from './print.vue';
  import LateFeeDetail from './lateFeeDetail.vue';
  import { Message } from '@arco-design/web-vue';
  import UpdateBill from './updateBill.vue';
  import { isArrIncludes } from '@/utils';
  import {
    cbdApiProjectMisBillAddCollectionPost,
    CbdApiProjectMisBillAddCollectionPostResponse,
    cbdApiProjectSysOptPageOptListPost,
    cbdApiProjectMisBillCancelAuditPost,
    cbdApiProjectMisBillConfirmPost,
    cbdApiProjectMisBillDeleteGet,
    cbdApiProjectMisBillDoScrapPost,
    cbdApiProjectMisBillViewGet,
    CbdApiProjectMisBillViewGetResponse,
    cbdApiProjectPageApprovalInfoGet
  } from '@/api';
  import { useRequest } from '@har/use';
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
    id: {
      type: String,
      default: ''
    },
    auditData: {
      type: Object as PropType<CbdApiProjectMisBillViewGetResponse>,
      default: () => {}
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
  const showAddPage = ref(false);
  const showDetail = ref(false);
  const cpId = ref('');
  const onShowCP = (id: string) => {
    cpId.value = id;
    showDetail.value = true;
  };

  const isCollect = computed(() => {
    return data.value.billType === 1;
  });
  const active = ref('1');
  const update = () => {
    emits('update');
  };
  const { run: onDelete } = useRequest(cbdApiProjectMisBillDeleteGet, {
    manual: true,
    onSuccess() {
      emits('refresh');
      visible.value = false;
    }
  });
  const { run: onCertain } = useRequest(cbdApiProjectMisBillConfirmPost, {
    manual: true,
    onSuccess() {
      emits('refresh');
      visible.value = false;
    }
  });
  const { run: revokeExam } = useRequest(cbdApiProjectMisBillCancelAuditPost, {
    manual: true,
    onSuccess() {
      emits('refresh');
      visible.value = false;
    }
  });
  const abort = async () => {
    if (props.id) {
      await cbdApiProjectMisBillDoScrapPost({
        idList: [Number(props.id)]
      });
      Message.success('操作成功!');
      emits('refresh');
      visible.value = false;
    } else {
      Message.error('删除失败,请稍后重试');
    }
  };
  const showPrint = ref(false);
  const ids = computed(() => [Number(props.id)]);
  async function onPrint() {
    showPrint.value = true;
  }
  const data = ref<CbdApiProjectMisBillViewGetResponse>({
    billType: 1
  } as CbdApiProjectMisBillViewGetResponse);
  const { run: getEditInfo } = useRequest(cbdApiProjectMisBillViewGet, {
    manual: true,
    onSuccess(res) {
      data.value = {
        ...res
      };
      getApprovalInfoEngine();
    }
  });
  const XMLData = ref('');
  const examCode = ref('');
  const status = ref<number | undefined>(0);
  const processList = ref<any>([]);
  //流程引擎详情接口
  const getApprovalInfoEngine = async () => {
    try {
      const d = await cbdApiProjectPageApprovalInfoGet({
        procInsId: data.value.flowId
      });
      processList.value = d?.historyInstanceInfoList;
      XMLData.value = d.nodeImg || '';
      status.value = d?.status;
      examCode.value = d?.code || '';
    } catch (e) {
      console.error(e);
    }
  };
  const selectBills = ref<CbdApiProjectMisBillAddCollectionPostResponse>([]);
  const { run: getBillInfo } = useRequest(
    cbdApiProjectMisBillAddCollectionPost,
    {
      manual: true,
      onSuccess(res) {
        selectBills.value = res;
        if (!res.length) {
          Message.error('当前账单不能收付款');
          return false;
        }
        showAddPage.value = true;
      }
    }
  );
  const refundId = ref('');
  const showRefund = ref(false);
  const onShowRefund = (id: string) => {
    refundId.value = id;
    showRefund.value = true;
  };
  const lateFeeId = ref('');
  const showLateFee = ref(false);
  const showUpdate = ref(false);
  const onShowLateFee = (id: string) => {
    lateFeeId.value = id;
    showLateFee.value = true;
  };
  const onUpdateLateFee = (record: any) => {
    refundId.value = record.id;
    showUpdate.value = true;
  };
  onMounted(() => {
    if (props.id) {
      getEditInfo({ id: props.id });
    }
  });
  watch(
    () => props.auditData,
    (v) => {
      if (v && Object.keys(v).length) {
        data.value = v;
      }
    },
    { immediate: true, deep: true }
  );
  const showDelete = computed(
    () =>
      ![2, 3].includes(data.value.auditStat!) &&
      [0, 1].includes(data.value.businessStat!)
  );

  const showEditBtn = computed(
    () =>
      !(data.value.auditStat === 2 || [3, 5].includes(data.value.businessStat!))
  );
  const showConfirmBtn = computed(
    () =>
      [0, 1].includes(data.value.businessStat!) &&
      [1, 4, 5].includes(data.value.auditStat!)
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
