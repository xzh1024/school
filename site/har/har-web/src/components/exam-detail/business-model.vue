<template>
  <drawer
    v-model="progressObj.showBusiness"
    :title="progressObj.drawerTitle"
    no-padding
    :footer="false"
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
          <i-cell label="审批单编号：" :value="examineCode" width="auto" />
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
          </div>
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
        <a-button
          class="i-btn bg-blue-dark margin-right-8"
          type="primary"
          @click="onClose('')"
          >返回</a-button
        >
        <a-button
          v-if="buttons.includes('revoke') && [1, 2].includes(dataType)"
          type="primary"
          :loading="btnLoading"
          @click="onRevoke"
          >撤销</a-button
        >
        <a-button
          v-if="buttons.includes('reject') && dataType === 1"
          class="i-btn bg-blue-dark margin-right-8"
          :loading="btnLoading"
          @click="onReject"
          >驳回</a-button
        >
        <a-button
          v-if="buttons.includes('transfer') && dataType === 1"
          class="i-btn margin-right-8"
          type="primary"
          :loading="btnLoading"
          @click="onForward"
          >转签</a-button
        >
        <a-button
          v-if="buttons.includes('sign') && dataType === 1"
          class="i-btn margin-right-8"
          type="primary"
          :loading="btnLoading"
          @click="onPlus"
          >加签</a-button
        >
        <a-button
          v-if="buttons.includes('agree') && dataType === 1"
          class="i-btn"
          type="primary"
          :loading="btnLoading"
          @click="onAgree"
          >同意</a-button
        >
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
  import BerthTable from '@/views/homePage/_components_/berth-table.vue';
  import ExamTemplate from '@/components/exam-template/index.vue';
  import ExamineDetail from '@/views/homePage/_components_/examine-detail.vue';
  import IModalProcess from '@/views/homePage/_components_/i-modal-process.vue';
  import BillDetail from '@/views/finance-manage/bill/__components__/detail-info.vue';
  import CpDetail from '@/views/finance-manage/collect-pay/__components__/detailInfo.vue';
  import RefundDetail from '@/views/finance-manage/collect-pay-refund/__components__/detailContent.vue';
  import DepositDetail from '@/views/finance-manage/deposit/_components_/examInfo.vue';
  import MerchantFeeDetail from '@/views/attract-merchant/fee/__components__/detailInfo.vue';
  import { useProgressStore } from '@/store';
  import { examStatusList } from '@/utils/dic';
  import { valueFindLabel } from '@/utils';
  import {
    cbdApiProjectPageApprovalAgreePost,
    cbdApiProjectPageApprovalInfoGet,
    cbdApiProjectPageApprovalRejectPost,
    cbdApiProjectPageApprovalRevokePost,
    cbdApiProjectPageApprovalSignPost,
    cbdApiProjectPageApprovalTransferPost,
    cbdApiProjectPageApprovalUserGet,
    CbdApiProjectPageApprovalUserGetResponse
  } from '@/api';
  import { Message } from '@arco-design/web-vue';
  import { useFloorAdjustTemp } from '@/components/exam-detail/hooks/useFloorAdjustTemp';
  import { useInvestPlanTemp } from '@/components/exam-detail/hooks/useInvestPlanTemp';
  import { useContractTemp } from '@/components/exam-detail/hooks/useContractTemp';

  const progressObj = useProgressStore();

  watch(
    () => progressObj.showBusiness,
    (val) => {
      if (val) {
        getApprovalInfo();
      } else {
        console.log('重置搜索数据');
        progressObj.resetSearchData();
      }
    }
  );

  //审批单号
  const examineCode = ref('');
  //审批状态
  const examineStatus = ref();
  const XMLData = ref('');
  const xmlFlowViewer = ref<any>({});
  const bizInfo = ref<any>({});
  const processType = ref('');
  //按钮权限
  const buttons = ref<string[]>([]);
  //业务审核详情接口
  const getApprovalInfo = async () => {
    const { procInsId, deployId, taskId } = progressObj.examineSearchData;
    try {
      const d = await cbdApiProjectPageApprovalInfoGet({
        procInsId,
        deployId,
        taskId
      });
      examineCode.value = d.code;
      examineStatus.value = d.status;
      buttons.value = d.buttons || [];
      // 具体业务内容(铺位、招商) d.dataJson
      processList.value = d.historyInstanceInfoList || [];
      XMLData.value = d.nodeImg || '';
      xmlFlowViewer.value = d.flowViewer || {};
      bizInfo.value = d.bizInfo?.info || {};
      processType.value = d.bizInfo!.type || '';
    } catch (e) {
      console.error(e);
    }
  };

  //流程审核状态
  // const newExamineCode = computed(() => (val: number) => {
  //   return Examine_Status.find((item) => item.value === val)?.label || '--';
  // });

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
  const selectOptions = ref<CbdApiProjectPageApprovalUserGetResponse>([]);

  //1铺位调整 2招商计划
  // const processType = computed(() => {
  //   return progressObj.examineSearchData.businessType;
  // });

  //流程id
  const processInstanceId = computed(() => {
    return progressObj.examineSearchData.procInsId;
  });
  //流程 taskId
  const taskId = computed(() => {
    return progressObj.examineSearchData.taskId;
  });
  //数据类型 1待办 2发起 3已办 4抄送
  const dataType = computed(() => {
    return progressObj.examineSearchData.dataType;
  });

  // 操作 1转发 2加签 3同意 4驳回 5撤销
  const handleType = ref(1);
  const tabActive = ref(1);
  const oldBerthInfo: any = ref([]);
  const newBerthInfo: any = ref([]);
  const processList: any = ref([]);
  const onTabChange = (value: number) => {
    if (value === tabActive.value) return;
    tabActive.value = value;
  };
  const remark = ref('');
  const handleOk = () => {
    // console.log('--记录id--', processId.value);
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
  const btnLoading = ref(false);
  //撤销
  const doRevoke = async () => {
    console.log('请求撤销接口');
    btnLoading.value = true;
    try {
      await cbdApiProjectPageApprovalRevokePost({
        processInstanceId: processInstanceId.value,
        taskId: taskId.value,
        userCode: '',
        remarks: ''
      });
      onClose('撤销成功');
    } catch (e) {
      console.error(e);
    } finally {
      btnLoading.value = false;
    }
  };
  //驳回
  const doReject = async () => {
    console.log('请求驳回接口');
    btnLoading.value = true;
    try {
      await cbdApiProjectPageApprovalRejectPost({
        processInstanceId: processInstanceId.value,
        userCode: '',
        taskId: taskId.value,
        remarks: remark.value
      });
      onClose('驳回成功');
    } catch (e) {
      console.error(e);
    } finally {
      btnLoading.value = false;
    }
  };
  //转签
  const doForward = async () => {
    console.log('请求转签接口');
    btnLoading.value = true;
    try {
      await cbdApiProjectPageApprovalTransferPost({
        processInstanceId: processInstanceId.value,
        userCode: selectValue.value.toString(),
        taskId: taskId.value,
        remarks: remark.value
      });
      onClose('转签成功');
    } catch (e) {
      console.error(e);
    } finally {
      btnLoading.value = false;
    }
  };
  //加签
  const doPlus = async () => {
    console.log('请求加签接口');
    btnLoading.value = true;
    try {
      await cbdApiProjectPageApprovalSignPost({
        processInstanceId: processInstanceId.value,
        taskId: taskId.value,
        userCode: selectValue.value.toString(),
        remarks: remark.value
      });
      onClose('加签成功');
    } catch (e) {
      console.error(e);
    } finally {
      btnLoading.value = false;
    }
  };
  //同意
  const doAgree = async () => {
    console.log('请求同意接口');
    btnLoading.value = true;
    try {
      await cbdApiProjectPageApprovalAgreePost({
        processInstanceId: processInstanceId.value,
        taskId: taskId.value,
        userCode: '',
        remarks: remark.value
      });
      onClose('操作成功');
    } catch (e) {
      console.error(e);
    } finally {
      btnLoading.value = false;
    }
  };

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
      selectOptions.value = await cbdApiProjectPageApprovalUserGet({
        processInstanceId: processInstanceId.value,
        taskId: taskId.value
      });
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
  .page-container {
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
    z-index: 999;
    display: flex;
    justify-content: flex-end;
    width: 60vw;
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
