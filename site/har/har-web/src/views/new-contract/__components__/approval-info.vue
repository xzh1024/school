<template>
  <contract-tabs
    v-model:active="tabIndex"
    :tab-options="tabOptions"
    @change="onTabChange"
  >
    <template #1>
      <div class="info-container">
        <abstract-form-single :value="abstractInfoModel" />
      </div>
    </template>
    <template #2>
      <div class="info-container">
        <div class="no-box flex align-center">
          <i-cell label="审批单编号：" :value="examineCode" width="auto" />
          <div class="i-tag i-pass">{{
            examineStatus ? valueFindLabel(examStatusList, examineStatus) : '--'
          }}</div>
        </div>
        <div class="space-box"></div>
        <examine-detail :process-list="processList" :xml-data="XMLData" />
      </div>
    </template>
  </contract-tabs>
  <footer-btn
    :need-save="false"
    :need-next="false"
    :need-update-btn="false"
    @on-cancel="onCancel"
    @on-pre="onPre"
  />
</template>

<script setup lang="ts">
  import ContractTabs from '@/views/new-contract/__components__/contract-tabs.vue';
  import { onMounted, ref } from 'vue';
  import { useContractStore } from '@/store/project/contract';
  import { useRequest } from '@har/use';
  import {
    cbdApiProjectIntentionContractAbstractInfoContractIdGet,
    CbdApiProjectIntentionContractAbstractInfoContractIdGetResponse,
    cbdApiProjectPageApprovalInfoGet,
    cbdApiProjectFormalContractAbstractInfoContractIdGet
  } from '@/api';
  import AbstractFormSingle from '@/views/new-contract/__components__/content/abstract/form-single.vue';
  import ExamineDetail from '@/views/homePage/_components_/examine-detail.vue';
  import FooterBtn from '@/views/new-contract/__components__/footer-btn.vue';
  import ICell from '@/views/homePage/_components_/i-cell.vue';
  import { examStatusList } from '@/utils/dic';
  import { valueFindLabel } from '@/utils';

  const emits = defineEmits(['onCancel', 'onPre']);

  const onCancel = () => {
    emits('onCancel');
  };

  const onPre = () => {
    emits('onPre');
  };

  const { contractInfo } = useContractStore();

  onMounted(() => {
    getInfo();
  });

  //获取合同信息
  const getInfo = () => {
    if (contractInfo.contractType === 1) {
      getIntentionAbstractInfo({ contractId: String(contractInfo.contractId) });
    } else if (contractInfo.contractType === 2) {
      getFormalAbstractInfo({ contractId: String(contractInfo.contractId) });
    }
  };

  //意向合同
  const abstractInfoModel =
    ref<CbdApiProjectIntentionContractAbstractInfoContractIdGetResponse>({});
  const { run: getIntentionAbstractInfo } = useRequest(
    cbdApiProjectIntentionContractAbstractInfoContractIdGet,
    {
      manual: true,
      onSuccess(e) {
        abstractInfoModel.value = e;
      }
    }
  );
  //正式合同
  const { run: getFormalAbstractInfo } = useRequest(
    cbdApiProjectFormalContractAbstractInfoContractIdGet,
    {
      manual: true,
      onSuccess(e) {
        abstractInfoModel.value = e;
      }
    }
  );

  //审批单号
  const examineCode = ref('');
  //审批状态
  const examineStatus = ref();
  const processList: any = ref([]);
  const XMLData = ref('');
  const { run: getApprovalInfo } = useRequest(
    cbdApiProjectPageApprovalInfoGet,
    {
      manual: true,
      onSuccess(e) {
        examineCode.value = e.code;
        examineStatus.value = e.status;
        processList.value = e.historyInstanceInfoList || [];
        XMLData.value = e.nodeImg || '';
      }
    }
  );

  const tabIndex = ref(1);
  const tabOptions = [
    {
      label: '合同信息',
      value: 1
    },
    {
      label: '审批详情',
      value: 2
    }
  ];

  type ChangeArr = {
    label: string;
    value: number;
  };
  const onTabChange = (data: ChangeArr) => {
    tabIndex.value = data.value;
    if (data.value === 1) {
      getInfo();
    } else if (data.value === 2) {
      getApprovalInfo({
        procInsId: abstractInfoModel.value.processInstanceId,
        deployId: '',
        taskId: ''
      });
    }
  };
</script>

<style scoped lang="less">
  .no-box {
    padding: 16px;
    background: #fff;
  }
  .space-box {
    height: 16px;
    background: #eaeaea;
  }
  .i-pass {
    color: #999;
    background: #fff;
    border: 1px solid #999;
  }
  .i-tag {
    margin-left: 16px;
    padding: 4px 12px;
    font-size: 14px;
    line-height: 1.2;
    border-radius: 8px;
  }
  .info-container {
    margin: 16px;
    background: #fff;
  }
</style>
