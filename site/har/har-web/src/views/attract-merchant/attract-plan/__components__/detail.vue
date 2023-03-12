<template>
  <drawer
    v-model="visible"
    title="查看"
    show-log
    no-padding
    :mask-close="false"
    :log-options="{
      modeId: props.id,
      logUrl: cbdApiProjectSysOptPageOptListPost,
      mode: 'cbd_invest_plan'
    }"
    @cancel="visible = false"
  >
    <a-tabs
      v-model="active"
      default-active-key="1"
      style="width: 100%; height: 100%; background-color: #fff"
    >
      <a-tab-pane key="1" title="计划详情">
        <plan-detail :data="detail" show-channel />
        <!--        <exam-template-->
        <!--          v-if="Object.keys(detail).length"-->
        <!--          :list="useInvestPlanTemp('business', true, `${detail.projectId}`)"-->
        <!--          :data="detail"-->
        <!--        />-->
      </a-tab-pane>
      <a-tab-pane key="2" title="审批详情">
        <div class="exam-detail">
          <exam-title
            title="招商计划审批"
            :code="examCode"
            :status="status"
          ></exam-title>
          <examine-detail :process-list="processList" :xml-data="XMLData" />
        </div>
      </a-tab-pane>
    </a-tabs>
    <template #footer>
      <a-popconfirm
        v-if="detail.status === 1"
        v-permission="['invest:plan:revoke']"
        content="数据正在审批中，是否撤销？"
        @ok="revoke"
      >
        <a-button type="primary">撤销</a-button>
      </a-popconfirm>
      <a-popconfirm
        v-if="detail.isDelete"
        v-permission="['invest:plan:delete']"
        content="数据删除后无法恢复，是否删除？"
        @ok="onDelete"
      >
        <a-button status="danger">删除</a-button>
      </a-popconfirm>
      <a-popconfirm
        v-if="detail.status === 2"
        content="数据已通过审批，是否作废？"
        @ok="abort"
      >
        <a-button v-permission="['invest:plan:repeal']" type="primary"
          >作废</a-button
        >
      </a-popconfirm>
      <a-button
        v-if="detail.isModify && detail.status !== 2"
        v-permission="['invest:plan:save']"
        type="primary"
        @click="update"
        >修改</a-button
      >
      <a-button @click="visible = false">返回</a-button>
    </template>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import PlanDetail from '../../__components__/plan-detail.vue';
  import ExamineDetail from '@/views/homePage/_components_/examine-detail.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import ExamTitle from '@/components/exam-title/index.vue';
  import { Message } from '@arco-design/web-vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { valueFindLabel } from '@/utils';
  import {
    cbdApiProjectInvestPlanDeleteIdDelete,
    cbdApiProjectSysOptPageOptListPost,
    cbdApiProjectInvestPlanDetailIdGet,
    CbdApiProjectInvestPlanDetailIdGetResponse,
    cbdApiProjectInvestPlanRepealIdDelete,
    cbdApiProjectInvestPlanRevokeIdDelete,
    cbdApiProjectPageApprovalInfoGet,
    cbdApiProjectCommonMisTreeExpenseGet,
    CbdApiProjectCommonMisTreeExpenseGetResponse
  } from '@/api';
  import { ratioLabelList, examStatusList } from '@/utils/dic';
  type FeeItem = CbdApiProjectCommonMisTreeExpenseGetResponse[0];
  type Detail = CbdApiProjectInvestPlanDetailIdGetResponse & {
    floorList: any[];
    showRadio: string;
    feeTypeNames?: string;
  };
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    refresh: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: undefined
    },
    procInsId: {
      type: String,
      default: undefined
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
  const active = ref('1');
  const update = () => {
    emits('update');
  };
  const onDelete = async () => {
    try {
      await cbdApiProjectInvestPlanDeleteIdDelete({ id: props.id! + '' });
      Message.success('保存成功');
      emits('refresh');
      visible.value = false;
    } catch (e) {
    } finally {
    }
  };
  const abort = async () => {
    try {
      await cbdApiProjectInvestPlanRepealIdDelete({ id: props.id! + '' });
      Message.success('保存成功');
      emits('refresh');
      visible.value = false;
    } catch (e) {
    } finally {
    }
  };
  const revoke = async () => {
    try {
      await cbdApiProjectInvestPlanRevokeIdDelete({ id: props.id! + '' });
      Message.success('保存成功');
      emits('refresh');
      visible.value = false;
    } catch (e) {
    } finally {
    }
  };
  const detail = ref<Detail>({} as Detail);
  const feeTypeList = ref<FeeItem[]>([]);
  const [initEditInfo] = useFuncProxy(async () => {
    const res = await cbdApiProjectInvestPlanDetailIdGet({
      id: String(props.id)
    });
    detail.value = {
      ...res,
      floorList: [
        {
          buildingName: res.buildingName,
          floorName: res.floorName,
          acreage: res.acreage,
          useAcreage: res.useAcreage,
          estateName: res.estateName
        }
      ],
      showRadio:
        valueFindLabel(ratioLabelList, detail.value.ratioType) +
        '' +
        (detail.value.ratio || 0) +
        '%',
      feeTypeNames: (detail.value.expenseItemName || []).join('、')
    };
  });
  const XMLData = ref('');
  const processList = ref<any>([]);
  const examCode = ref('');
  const status = ref<number | undefined>(0);
  //流程引擎详情接口
  const getApprovalInfoEngine = async () => {
    try {
      const d = await cbdApiProjectPageApprovalInfoGet({
        procInsId: detail.value.flowProcessId
      });
      processList.value = d?.historyInstanceInfoList;
      XMLData.value = d?.nodeImg || '';
      status.value = d?.status;
      examCode.value = d?.code || '';
    } catch (e) {
      console.error(e);
    }
  };
  const [getFeeTypeList] = useFuncProxy(async () => {
    feeTypeList.value = await cbdApiProjectCommonMisTreeExpenseGet({
      parentExpenseCodes: '202212270002,202212270003'
    });
  });
  onMounted(async () => {
    await getFeeTypeList();
    if (props.id) {
      await initEditInfo();
      await getApprovalInfoEngine();
    }
  });
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

  .exam-detail {
    background-color: #fff;
  }
</style>
