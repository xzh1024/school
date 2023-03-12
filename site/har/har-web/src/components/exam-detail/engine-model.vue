<template>
  <drawer
    v-model="progressObj.showEngine"
    :title="progressObj.drawerTitle"
    :footer="false"
    no-padding
    @cancel="onClose('')"
  >
    <div class="content-container">
      <div class="tab-box">
        <div
          v-for="item in tabArr"
          :key="item.value"
          class="i-tab flex-1"
          :class="tabActive === item.value ? 'i-active' : ''"
          @click="onTabChange(item.value)"
          >{{ item.label }}
          <div
            :class="tabActive === item.value ? 'i-solid bg-blue' : 'i-solid'"
          ></div>
        </div>
      </div>
      <div class="content-box">
        <div class="no-box flex align-center" style="margin: 16px 0">
          <i-cell label="审批单编号：" :value="examineNo" width="auto" />
          <!--          <div v-if="finishTime !== ''" class="i-tag i-pass">已通过</div>-->
          <div class="i-tag i-pass" :class="{ green: examineStatus === 1 }">{{
            examineStatus ? valueFindLabel(examStatusList, examineStatus) : '--'
          }}</div>
        </div>
        <div v-if="tabActive === 1">
          <div v-if="processType">
            <exam-template
              v-if="tempList && tempList.length"
              :list="tempList"
              :data="bizInfo"
            >
              <template v-if="isContract" #taxFlagCell="{ record }">{{
                (record.taxFlag === '0' ? '否' : '是') || '--'
              }}</template>
              <template v-if="isContract" #stageStartCell="{ record }">{{
                record.stageStart + '~' + record.stageEnd
              }}</template>
              <template v-if="isContract" #taxCell="{ record }">{{
                record.tax + '%'
              }}</template>
            </exam-template>
          </div>
          <bill-detail
            v-if="processType === 'billApprove'"
            disabled
            :info="bizInfo"
          />
          <cp-detail
            v-else-if="processType === 'paymentHandle'"
            disabled
            :info="bizInfo"
          />
          <refund-detail
            v-else-if="processType === 'paymentRefundHandle'"
            :info="bizInfo"
            disabled
          />
          <deposit-detail
            v-else-if="processType === 'depositHandle'"
            :data="bizInfo"
          />
          <merchant-fee-detail
            v-else-if="processType === 'investExpenses'"
            :info="bizInfo"
          />
          <a-empty v-else class="empty"></a-empty>
        </div>
        <div v-if="tabActive === 2">
          <examine-detail
            :process-list="processList"
            :xml-data="XMLData"
            :xml-flow-viewer="xmlFlowViewer"
          />
        </div>
      </div>
      <div class="footer-box">
        <template v-if="progressObj.examineSearchData.action">
          <a-button
            v-if="buttons.includes('revoke')"
            class="i-btn bg-blue-dark margin-right-8"
            @click="onRevoke"
          >
            撤销
          </a-button>
          <a-button
            v-if="buttons.includes('reject')"
            class="i-btn bg-blue-dark margin-right-8"
            @click="onReject"
          >
            驳回
          </a-button>
          <a-button
            v-if="buttons.includes('transfer')"
            class="i-btn margin-right-8"
            type="primary"
            @click="onForward"
          >
            转签
          </a-button>
          <a-button
            v-if="buttons.includes('sign')"
            class="i-btn margin-right-8"
            type="primary"
            @click="onPlus"
          >
            加签
          </a-button>
          <a-button
            v-if="buttons.includes('agree')"
            class="i-btn margin-right-8"
            type="primary"
            @click="onAgree"
          >
            同意
          </a-button>
        </template>
        <a-button class="i-btn" type="primary" @click="onClose('')">
          返回
        </a-button>
      </div>
    </div>
  </drawer>
  <a-modal
    v-model:visible="visible"
    :title="title"
    @ok="handleOk"
    @cancel="visible = false"
  >
    <div>是否确认撤销审批？</div>
  </a-modal>
  <i-modal-process
    v-if="processVisible"
    v-model:model-value="processVisible"
    v-model:select-value="selectValue"
    v-model:remark-value="remark"
    :handle-type="handleType"
    :select-options="selectOptions"
    @handle-before-ok="handleBeforeOk"
  />
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import ICell from '@/views/homePage/_components_/i-cell.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  // import BerthTable from '@/views/home/_components_/berth-table.vue';
  import ExamineDetail from '@/views/homePage/_components_/examine-detail.vue';
  import ExamTemplate from '@/components/exam-template/index.vue';
  import IModalProcess from '@/views/homePage/_components_/i-modal-process.vue';
  import BillDetail from '@/views/finance-manage/bill/__components__/detail-info.vue';
  import CpDetail from '@/views/finance-manage/collect-pay/__components__/detailInfo.vue';
  import RefundDetail from '@/views/finance-manage/collect-pay-refund/__components__/detailContent.vue';
  import DepositDetail from '@/views/finance-manage/deposit/_components_/examInfo.vue';
  import MerchantFeeDetail from '@/views/attract-merchant/fee/__components__/detailInfo.vue';
  import { useProgressStore } from '@/store';
  import { examStatusList } from '@/utils/dic';
  import { valueFindLabel } from '@/utils';

  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    flowableEngineUserListAllGet,
    flowableEngineInstanceTaskRevokePost,
    flowableEngineInstanceTaskRejectPost,
    flowableEngineInstanceTaskCompletePost,
    flowableEngineInstanceTaskDelegatePost,
    flowableEngineInstanceTaskTransferPost,
    flowableEngineInstanceDetailGet,
    flowableEngineInstanceTaskSelectUserTaskIdGet,
    flowableEngineInstanceTaskSignPost
  } from '@/api/flowable-engine';
  import { Message } from '@arco-design/web-vue';
  import { useInvestPlanTemp } from '@/components/exam-detail/hooks/useInvestPlanTemp';
  import { useFloorAdjustTemp } from '@/components/exam-detail/hooks/useFloorAdjustTemp';
  import { useContractTemp } from '@/components/exam-detail/hooks/useContractTemp';
  import { useInvestFeeTemp } from '@/components/exam-detail/hooks/useInvestFeeTemp';

  const progressObj = useProgressStore();

  watch(
    () => progressObj.showEngine,
    (val) => {
      if (val) {
        getApprovalInfoEngine();
      } else {
        console.log('重置搜索数据');
        progressObj.resetSearchData();
      }
    }
  );

  const XMLData = ref('');
  const xmlFlowViewer = ref<any>({});
  const examineNo = ref('');
  const examineStatus = ref<number | undefined>();
  const finishTime = ref('');
  const processType = ref('');
  const bizInfo = ref<any>({});
  //按钮权限
  const buttons = ref<string[]>([]);
  //流程引擎详情接口
  const getApprovalInfoEngine = async () => {
    const { procInsId, deployId, taskId } = progressObj.examineSearchData;
    try {
      const d = await flowableEngineInstanceDetailGet({
        procInsId,
        deployId,
        taskId
      });
      processList.value = d.historyInstanceInfoList;
      examineNo.value = d.code || '';
      examineStatus.value = d.status || undefined;
      buttons.value = d.buttons || [];
      finishTime.value = d.finishTime || '';
      processType.value = (d.bizInfo && d.bizInfo.type) || '';
      XMLData.value = d.bpmnXml || '';
      xmlFlowViewer.value = d.flowViewer;
      bizInfo.value = (d.bizInfo && d.bizInfo.info) || {};
    } catch (e) {
      console.error(e);
    }
  };

  const visible = ref(false);
  const tabArr = [
    {
      label: '审批内容',
      value: 1
    },
    {
      label: '审批流程',
      value: 2
    }
  ];
  const title = ref('');
  const processVisible = ref(false);
  const selectValue = ref([]);
  const selectOptions = ref<any>([]);

  //流程id
  const processInstanceId = computed(() => {
    return progressObj.examineSearchData.procInsId;
  });
  //taskId
  const taskId = computed(() => {
    return progressObj.examineSearchData.taskId;
  });

  // 操作 1转发 2加签 3同意 4驳回 5撤销
  const handleType = ref(1);
  const tabActive = ref(1);
  const processList: any = ref([]);
  const onTabChange = (value: number) => {
    if (value === tabActive.value) return;
    tabActive.value = value;
  };
  const remark = ref('');
  const handleOk = () => {
    console.log('--确认撤销--');
    doRevoke();
  };
  const onRevoke = () => {
    title.value = '撤销';
    visible.value = true;
  };
  const handleBeforeOk = () => {
    // console.log('关闭之前');
    // console.log(selectValue.value, remark.value);
    switch (handleType.value) {
      case 1:
        doForward();
        break;
      case 2:
        doPlus();
        break;
      case 3:
        doAgree();
        break;
      case 4:
        doReject();
        break;
    }
    selectValue.value = [];
    remark.value = '';
    processVisible.value = false;
  };
  //撤销
  const [doRevoke] = useFuncProxy(async () => {
    await flowableEngineInstanceTaskRevokePost({
      procInsId: processInstanceId.value
    });
    onClose('撤销成功');
  });
  //驳回
  const [doReject] = useFuncProxy(async () => {
    await flowableEngineInstanceTaskRejectPost({
      taskId: taskId.value,
      comment: remark.value,
      procInsId: processInstanceId.value,
      copyUserIds: ''
    });
    onClose('驳回成功');
  });
  //转签
  const [doForward] = useFuncProxy(async () => {
    await flowableEngineInstanceTaskTransferPost({
      taskId: taskId.value,
      comment: remark.value,
      userId: selectValue.value.toString(),
      // procInsId: processId.value,
      copyUserIds: ''
    });
    onClose('转签成功');
  });
  //加签
  const [doPlus] = useFuncProxy(async () => {
    await flowableEngineInstanceTaskSignPost({
      taskId: taskId.value,
      comment: remark.value,
      userIds: selectValue.value
    });
    onClose('加签成功');
  });
  //同意
  const [doAgree] = useFuncProxy(async () => {
    await flowableEngineInstanceTaskCompletePost({
      taskId: taskId.value,
      comment: remark.value,
      procInsId: processInstanceId.value,
      copyUserIds: ''
    });
    onClose('操作成功');
  });

  const onReject = () => {
    handleType.value = 4;
    processVisible.value = true;
  };

  const onForward = () => {
    handleType.value = 1;
    processVisible.value = true;
    getApprovalUser();
  };

  const onPlus = () => {
    handleType.value = 2;
    processVisible.value = true;
    getApprovalUser();
  };
  const onAgree = () => {
    handleType.value = 3;
    processVisible.value = true;
  };

  const onClose = (content: string) => {
    if (content !== '') {
      Message.success({ content });
    }
    tabActive.value = 1;
    progressObj.close();
    progressObj.resetSearchData();
  };

  const getApprovalUser = async () => {
    try {
      selectOptions.value = await flowableEngineInstanceTaskSelectUserTaskIdGet(
        {
          taskId: taskId.value
        }
      );
    } catch (e) {
      console.error(e);
    }
  };
  const contractTypes = [
    'contractOfIntention',
    'contractOfIntentionToFormalContract',
    'formalContract'
  ];
  const isContract = computed(() => {
    return contractTypes.includes(processType.value);
  });
  const tempList = computed<Recordable>(() => {
    if (processType.value === 'floorAdjust') {
      return useFloorAdjustTemp('process', true);
    } else if (processType.value === 'investPlan') {
      return useInvestPlanTemp('process', true);
    }
    // 合同
    else if (isContract.value) {
      return useContractTemp('process', true);
    }
    // 招商费用
    // else if (processType.value === ''){
    //   return useInvestFeeTemp('process', true);
    // }
    else {
      return [];
    }
  });
</script>
<style scoped lang="less">
  .margin-right-8 {
    margin-right: 8px;
  }
  .bg-blue-dark {
    color: #4c8af7 !important;
    background: #dbe8fd !important;
  }
  .i-btn {
    //width: 104px;
    //height: 40px;
    //background: #4c8af7;
    //border-radius: 4px;
  }
  .content-container {
    width: 100%;
  }
  .content-box {
    width: 100%;
    padding: 0 16px;
    margin-bottom: 80px;
  }
  .tab-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    background: #fff;
    border-bottom: 1px solid #ddd;
  }
  .i-tab {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 16px;
    color: #999;
    cursor: pointer;
  }
  .i-active {
    color: #4c8af7;
  }
  .i-solid {
    position: absolute;
    bottom: 0;
    width: 64px;
    height: 2px;
    background: transparent;
  }
  .bg-blue {
    background: #4c8af7 !important;
  }
  .no-box {
    padding: 16px;
    background: #fff;
  }
  .i-pass {
    color: #999;
    background: #fff;
    border: 1px solid #999;
    &.green {
      color: green;
    }
  }
  .i-tag {
    margin-left: 16px;
    padding: 4px 12px;
    font-size: 14px;
    line-height: 1.2;
    border-radius: 8px;
  }
  .footer-box {
    position: fixed;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    width: 60vw;
    z-index: 999;
    padding: 12px 25px;
    background: #fff;
  }
  .empty {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 15px;
    height: 71vh;
    background-color: #fff;
  }
</style>
