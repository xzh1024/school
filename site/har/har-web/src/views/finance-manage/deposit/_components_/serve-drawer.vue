<template>
  <drawer
    v-model="visible"
    :title="title"
    :footer="false"
    :no-padding="true"
    unmount-on-close
    show-log
    :log-options="{
      modeId: props.changeId,
      logUrl: cbdApiProjectSysOptPageOptListPost,
      mode: 'cbd_mis_deposit_change'
    }"
    @cancel="onClose"
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
      <div class="drawer-content-box">
        <div v-if="tabActive === 1">
          <div class="change-no-box">
            <div class="inner-box">
              <div class="inner-title">存款处理单号：</div>
              <div class="inner-no">{{ changeNo || '系统自动生成' }}</div>
            </div>
          </div>
          <div style="padding: 0 16px 16px">
            <cost-bill-info-box
              :need-edit="handleType === 1 && canChooseProject"
              :relation-list="relationList"
              @show-project-choose="onShowProjectChoose"
            />
            <collection-table :table-data="collectionTableData" />
            <return-table
              v-if="recordType === 1"
              v-model:return-table-data="returnTableList"
              :need-edit="handleType !== 3"
            />
            <transfer-table
              v-if="recordType === 2"
              v-model:transfer-table-data="transferTableData"
              :need-edit="handleType !== 3"
            />
            <file-list
              v-model:file-data="fileData"
              :need-edit="handleType !== 3"
            />
          </div>
        </div>
        <div v-if="tabActive === 2" class="examine-box">
          <examine-detail :process-list="processList" :xml-data="XMLData" />
        </div>
      </div>
      <div class="footer-box">
        <a-button
          class="i-dark-btn i-btn margin-right-8"
          type="primary"
          @click="onClose"
          >取消</a-button
        >
        <a-button
          v-if="
            handleType === 3 &&
            ((businessStat === 0 && auditStat === 1) ||
              (businessStat === 1 && auditStat === 1) ||
              (businessStat === 1 && auditStat === 4) ||
              (businessStat === 1 && auditStat === 5))
          "
          v-permission="['deposit:change:update', 'deposit:change:info']"
          class="i-btn margin-right-8"
          type="primary"
          @click="onUpdate"
          >修改</a-button
        >
        <a-button
          v-if="
            (businessStat === 1 && auditStat === 1 && handleType !== 3) ||
            [1, 2].includes(handleType)
          "
          :loading="btnLoading"
          class="i-btn margin-right-8"
          type="primary"
          @click="onConfirm('', false)"
          >保存</a-button
        >
        <!-- <a-button class="i-btn" type="primary">修改</a-button> -->
        <a-button
          v-if="
            ((businessStat === 0 && auditStat === 1) ||
              (businessStat === 1 && auditStat === 1) ||
              (businessStat === 1 && auditStat === 4) ||
              (businessStat === 1 && auditStat === 5)) &&
            handleType !== 1
          "
          v-permission="['deposit:change:delete']"
          class="i-btn margin-right-8"
          type="primary"
          @click="onDel"
          >删除</a-button
        >
        <a-button
          v-if="
            (businessStat === 1 && [1, 4, 5].includes(auditStat)) ||
            (businessStat === -1 && auditStat === -1) ||
            [1, 2].includes(handleType)
          "
          v-permission="['deposit:change:commit']"
          class="i-btn margin-right-8"
          type="primary"
          @click="openSubmitApproval"
          >确认</a-button
        >
        <a-button
          v-if="businessStat === 2 && auditStat === 3"
          v-permission="['deposit:change:discard']"
          class="i-btn"
          type="primary"
          @click="onVoid"
          >作废</a-button
        >
        <a-button
          v-if="businessStat === 1 && auditStat === 2"
          v-permission="['deposit:change:cance']"
          class="i-btn"
          type="primary"
          @click="onCancelAudit"
          >撤销</a-button
        >
      </div>
    </div>
  </drawer>
  <drawer
    v-model:model-value="drawerVisible"
    title="提请审核"
    width="40%"
    :no-padding="true"
    unmount-on-close
  >
    <template #footer>
      <a-button
        class="i-dark-btn i-btn margin-right-8"
        @click="drawerVisible = false"
        >取消</a-button
      >
      <a-button class="i-btn" type="primary" @click="onOk">确定</a-button>
    </template>
    <div class="drawer-content">
      <div>数据确认后无法删除，是否提交审批？</div>
      <div class="write-box margin-top-xl">
        <div class="margin-bottom-xs">备注：</div>
        <a-textarea
          v-model="remarks"
          placeholder="请输入长度不超过200个字符的内容"
          :max-length="200"
          allow-clear
          show-word-limit
        />
      </div>
      <!-- <div class="margin-top-xl">
        <div class="margin-bottom-xs">附件：</div>
        <i-custom-upload
          v-model="file"
          :options="{
            draggable: true,
            listType: 'text',
            accept:
              'application/vnd.ms-excel,' +
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,' +
              'image/jpeg,image/png,image/jpg' +
              'application/vnd.msword,' +
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document,' +
              'application/pdf'
          }"
        />
      </div> -->
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import Drawer from '@/components/drawer/drawer.vue';
  import { computed, ref, watch } from 'vue';
  import CostBillInfoBox from '@/views/finance-manage/deposit/_components_/cost-bill-info-box.vue';
  import CollectionTable from '@/views/finance-manage/deposit/_components_/collection-table.vue';
  import { useDepositStore } from '@/store/project/deposit';
  import { useRequest } from '@har/use';
  import {
    cbdApiProjectDepositReceiptListPost,
    cbdApiProjectDepositInfoChangeIdGet,
    cbdApiProjectSysOptPageOptListPost,
    CbdApiProjectDepositReceiptListPostResponse,
    cbdApiProjectDepositReturnPost,
    cbdApiProjectDepositTransferPost,
    cbdApiProjectDepositUpdatePost,
    cbdApiProjectPageApprovalInfoGet,
    CbdApiProjectPageApprovalInfoGetResponse,
    cbdApiProjectDepositDeleteChangeIdGet,
    cbdApiProjectDepositDiscardChangeIdGet,
    cbdApiProjectDepositCancelAuditPost
    // cbdApiProjectDepositCommitPost
  } from '@/api';
  import ReturnTable from '@/views/finance-manage/deposit/_components_/return-table.vue';
  import TransferTable from '@/views/finance-manage/deposit/_components_/transfer-table.vue';
  import { Message } from '@arco-design/web-vue';
  import FileList from '@/views/finance-manage/deposit/_components_/file-list.vue';
  import ExamineDetail from '@/views/homePage/_components_/examine-detail.vue';
  import { modalConfirm } from '@/utils';
  // import ICustomUpload from '@/components/i-custom-upload/index.vue';

  const emits = defineEmits([
    'update:showDrawer',
    'showProjectChoose',
    'doUpdateHandle'
  ]);

  const props = defineProps({
    title: {
      type: String
    },
    //弹窗类型 1新增 2编辑 3查看
    handleType: {
      type: Number,
      default: 0
    },
    //允许选择费用项目
    canChooseProject: {
      type: Boolean,
      default: true
    },
    //处理类型 1归还 2转移
    recordType: {
      type: Number,
      default: 0
    },
    //存款id
    changeId: {
      type: String,
      default: ''
    },
    showDrawer: {
      type: Boolean,
      default: false
    }
  });

  const tabActive = ref(1);
  const tabArr = [
    {
      label: '存款处理单信息',
      value: 1
    },
    {
      label: '审批详情',
      value: 2
    }
  ];
  const onTabChange = (value: number) => {
    if (value === tabActive.value) return;
    if (flowId.value === '') return Message.error({ content: '暂无审批详情' });
    tabActive.value = value;
  };

  watch(
    () => tabActive.value,
    (val) => {
      if (val === 2) {
        getExamineDetail({ procInsId: flowId.value, deployId: '', taskId: '' });
      }
    }
  );

  const XMLData = ref('');
  const processList = ref<
    CbdApiProjectPageApprovalInfoGetResponse['historyInstanceInfoList']
  >([]);

  const { run: getExamineDetail } = useRequest(
    cbdApiProjectPageApprovalInfoGet,
    {
      manual: true,
      onSuccess(e) {
        console.log(e, '--*--');
        processList.value = e.historyInstanceInfoList || [];
        XMLData.value = e.nodeImg || '';
      }
    }
  );

  const visible = computed({
    get() {
      return props.showDrawer;
    },
    set(v) {
      emits('update:showDrawer', v);
    }
  });

  watch(
    () => visible.value,
    (val) => {
      if (val) {
        [2, 3].includes(props.handleType)
          ? getDepositInfo({ changeId: props.changeId || '' })
          : '';
      } else {
        depositStore.clearCostInfo();
        collectionTableData.value = [];
        returnTableList.value = [];
        transferTableData.value = [];
        fileData.value = [];
        flowId.value = '';
      }
    }
  );

  const onShowProjectChoose = () => {
    emits('showProjectChoose');
  };

  const onClose = () => {
    visible.value = false;
    drawerVisible.value = false;
    remarks.value = '';
    tabActive.value = 1;
    businessStat.value = 0;
    auditStat.value = 1;
    depositStore.clearSearchData();
  };

  //修改
  const onUpdate = () => {
    visible.value = false;
    setTimeout(() => {
      emits('doUpdateHandle', {
        changeId: props.changeId,
        changeType: props.recordType
      });
    }, 500);
  };

  const depositStore = useDepositStore();

  type FileInfo = {
    key?: string | undefined;
    id?: string | undefined;
    name?: string | undefined;
    type?: string | undefined;
    format?: string | undefined;
    size?: number | undefined;
    previewAddress?: string | undefined;
  };

  //打开确认弹窗
  const openSubmitApproval = () => {
    if (props.recordType === 1) {
      const flag = returnTableList.value.every((item) => !item.isEdit);
      if (!flag) {
        Message.error({ content: '请先完成归还列表的编写' });
      } else {
        drawerVisible.value = true;
      }
    } else if (props.recordType === 2) {
      const flag = transferTableData.value.every((item) => !item.isEdit);
      if (!flag) {
        Message.error({ content: '请先完成转移列表的编写' });
      } else {
        drawerVisible.value = true;
      }
    }
  };

  const onConfirm = (remark = '', commit = false) => {
    console.log('完成存款单处理');
    if (props.recordType === 1) {
      const flag = returnTableList.value.every((item) => !item.isEdit);
      if (!flag) {
        Message.error({ content: '请先完成归还列表的编写' });
      } else {
        if (props.changeId !== '') {
          const returnList =
            returnTableList.value.map((item) => {
              return {
                ...item,
                expenseItemId: Number(item.expenseItemId),
                changeAmount: Number(item.changeAmount),
                payMethodId: Number(item.payMethodId)
              };
            }) || [];
          doUpdateDepositServe(returnList, [], remark, commit);
        } else {
          doAddReturnServe(remark, commit);
        }
      }
    } else if (props.recordType === 2) {
      const flag = transferTableData.value.every((item) => !item.isEdit);
      if (!flag) {
        Message.error({ content: '请先完成转移列表的编写' });
      } else {
        if (props.changeId !== '') {
          const transferList =
            transferTableData.value.map((item) => {
              return {
                ...item,
                expenseItemId: Number(item.expenseItemId),
                changeAmount: Number(item.changeAmount),
                acceptExpenseItemId: Number(item.acceptExpenseItemId)
              };
            }) || [];
          doUpdateDepositServe([], transferList, remark, commit);
        } else {
          doAddTransferServe(remark, commit);
        }
      }
    }
  };

  //新增归还记录
  const doAddReturnServe = (remark: string, commit: boolean) => {
    const returnDataObj = {
      contractCode: depositStore.costInfo.contractCode || '',
      expenseItemIds:
        depositStore.costInfo.constProjectList.map((item) =>
          Number(item.expenseItemId)
        ) || [],
      returnList:
        returnTableList.value.map((item) => {
          return {
            ...item,
            expenseItemId: Number(item.expenseItemId),
            changeAmount: Number(item.changeAmount),
            payMethodId: Number(item.payMethodId)
          };
        }) || [],
      attachmentIds: fileData.value.map(
        (item: FileInfo) => item.id || item.key || ''
      ),
      remark,
      commit
    };
    if (returnDataObj.expenseItemIds.length < 1)
      return Message.error({ content: '费用项目不能为空' });
    doReturnServe({ ...returnDataObj });
  };

  //修改存款处理
  const doUpdateDepositServe = (
    returnList: ReturnList[],
    transferList: TransferList[],
    remark: string,
    commit: boolean
  ) => {
    const updateData = {
      changeId: Number(props.changeId),
      returnList,
      transferList,
      attachmentIds: fileData.value.map(
        (item: FileInfo) => item.id || item.key || ''
      ),
      remark,
      commit
    };
    doUpdateDeposit({ ...updateData });
  };

  //新增转移记录
  const doAddTransferServe = (remark: string, commit: boolean) => {
    const transferDataObj = {
      contractCode: depositStore.costInfo.contractCode || '',
      expenseItemIds:
        depositStore.costInfo.constProjectList.map((item) =>
          Number(item.expenseItemId)
        ) || [],
      transferList:
        transferTableData.value.map((item) => {
          return {
            ...item,
            expenseItemId: Number(item.expenseItemId),
            changeAmount: Number(item.changeAmount),
            acceptExpenseItemId: Number(item.acceptExpenseItemId)
          };
        }) || [],
      attachmentIds: fileData.value.map(
        (item: FileInfo) => item.id || item.key || ''
      ),
      remark,
      commit
    };
    if (transferDataObj.expenseItemIds.length < 1)
      return Message.error({ content: '费用项目不能为空' });
    doTransferServe({ ...transferDataObj });
  };

  const btnLoading = ref(false);

  //修改存款处理
  const { run: doUpdateDeposit } = useRequest(cbdApiProjectDepositUpdatePost, {
    manual: true,
    onBefore() {
      btnLoading.value = true;
    },
    onSuccess() {
      Message.success({ content: '修改成功' });
      onClose();
    },
    onFinally() {
      btnLoading.value = false;
    }
  });

  //新增归还
  const { run: doReturnServe } = useRequest(cbdApiProjectDepositReturnPost, {
    manual: true,
    onBefore() {
      btnLoading.value = true;
    },
    onSuccess() {
      Message.success({ content: '添加成功' });
      onClose();
    },
    onFinally() {
      btnLoading.value = false;
    }
  });

  //新增转移
  const { run: doTransferServe } = useRequest(
    cbdApiProjectDepositTransferPost,
    {
      manual: true,
      onBefore() {
        btnLoading.value = true;
      },
      onSuccess() {
        Message.success({ content: '添加成功' });
        onClose();
      },
      onFinally() {
        btnLoading.value = false;
      }
    }
  );

  //删除操作
  const onDel = () => {
    modalConfirm('确认删除？', () => {
      doDelServe({ changeId: changeId.value });
    });
  };
  const { run: doDelServe } = useRequest(
    cbdApiProjectDepositDeleteChangeIdGet,
    {
      manual: true,
      onBefore() {
        btnLoading.value = true;
      },
      onSuccess() {
        Message.success({ content: '删除成功' });
        visible.value = false;
      },
      onFinally() {
        btnLoading.value = false;
      }
    }
  );

  //提交审批弹窗
  const drawerVisible = ref(false);
  const remarks = ref('');
  // const file: any = ref([]);
  //确认提交审批
  const onOk = () => {
    onConfirm(remarks.value, true);
    // console.log(changeId.value, '存款处理id');
    // console.log(remarks.value, '备注');
    // doCommitDeposit({
    //   changeIds: [Number(changeId.value)],
    //   remark: remarks.value
    // });
    // const sourceCodeList = file.value.map((item: any) => item.key);
    // console.log(sourceCodeList, '文件列表');
  };

  // const { run: doCommitDeposit } = useRequest(cbdApiProjectDepositCommitPost, {
  //   manual: true,
  //   onSuccess() {
  //     Message.success({ content: '提交审批成功' });
  //     visible.value = false;
  //   }
  // });

  //撤销
  const onCancelAudit = () => {
    modalConfirm('确认撤销？', () => {
      doCancelAudit({ changeId: Number(changeId.value), remark: '' });
    });
  };
  const { run: doCancelAudit } = useRequest(
    cbdApiProjectDepositCancelAuditPost,
    {
      manual: true,
      onBefore() {
        btnLoading.value = true;
      },
      onSuccess() {
        Message.success({ content: '撤销成功' });
        visible.value = false;
      },
      onFinally() {
        btnLoading.value = false;
      }
    }
  );

  //作废
  const onVoid = () => {
    modalConfirm('确认作废？', () => {
      doVoidServe({ changeId: changeId.value });
    });
  };
  const { run: doVoidServe } = useRequest(
    cbdApiProjectDepositDiscardChangeIdGet,
    {
      manual: true,
      onBefore() {
        btnLoading.value = true;
      },
      onSuccess() {
        Message.success({ content: '作废成功' });
        visible.value = false;
      },
      onFinally() {
        btnLoading.value = false;
      }
    }
  );

  watch(
    () => depositStore.costInfo,
    (val) => {
      console.log(val, '--costInfo--');
      const expenseItemIds = val.constProjectList.map((item) =>
        Number(item.expenseItemId)
      );
      props.handleType === 1
        ? getReceiptList({
            contractCode: val.contractCode || '',
            expenseItemIds
          })
        : '';
    },
    { deep: true }
  );

  //存款处理id
  const changeId = ref('');

  //存款处理单号
  const changeNo = ref('');

  //流程id
  const flowId = ref('');

  //业务状态
  const businessStat = ref(-1);
  //审批状态
  const auditStat = ref(-1);

  const { run: getDepositInfo } = useRequest(
    cbdApiProjectDepositInfoChangeIdGet,
    {
      manual: true,
      onSuccess(e) {
        console.log(e);
        changeId.value = e.changeId + '';
        changeNo.value = e.changeNo || '';
        flowId.value = e.flowId || '';
        businessStat.value = e.businessStat || -1;
        auditStat.value = e.auditStat || -1;
        const costInfoObj = {
          projectId: e.projectId,
          projectName: e.projectName,
          merchantId: e.merchantId,
          merchantName: e.merchantName,
          storeId: e.storeId,
          storeName: e.storeName,
          contractCode: e.contractCode,
          constProjectList: e.expenseItem || []
        };
        depositStore.setCostInfo(costInfoObj);
        collectionTableData.value = e.receiptList || [];
        returnTableList.value = e.returnRecord || [];
        transferTableData.value =
          e.transferRecord?.map((item) => {
            return {
              ...item,
              expenseItemName: item.expenseItemName || '',
              availableAmount: String(item.availableAmount),
              acceptExpenseItemName: undefined
            };
          }) || [];
        fileData.value = e.resourceList || [];
      }
    }
  );

  const collectionTableData = ref<CbdApiProjectDepositReceiptListPostResponse>(
    []
  );
  const { run: getReceiptList } = useRequest(
    cbdApiProjectDepositReceiptListPost,
    {
      manual: true,
      onSuccess(e) {
        console.log(e);
        collectionTableData.value = e;
      }
    }
  );

  //归还列表
  type ReturnList = {
    isEdit?: number;
    expenseItemId: number;
    changeAmount: number;
    changeDate: string;
    payMethodId: number;
    payMethodName: string;
    operationName: string;
    operationDate: string;
  };
  const returnTableList = ref<Array<ReturnList>>([]);

  type TransferList = {
    isEdit?: number;
    expenseItemId: number;
    expenseItemName: string;
    changeAmount: number;
    changeDate: string;
    acceptExpenseItemId: number;
    acceptExpenseItemName?: string;
    operationName: string;
    operationDate: string;
  };
  const transferTableData = ref<Array<TransferList>>([]);

  type FileList = {
    id?: string;
    name?: string;
    type?: string;
    format?: string;
    size?: number;
    previewAddress?: string;
  };

  const fileData = ref<Array<FileList>>([]);

  const relationList = computed(() => {
    if (props.recordType === 1) {
      return returnTableList.value;
    } else if (props.recordType === 2) {
      return transferTableData.value;
    }
  });
</script>
<style scoped lang="less">
  .content-container {
    width: 100%;
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
    color: #999;
    font-size: 16px;
    cursor: pointer;
  }
  .i-active {
    color: #4c8af7;
  }
  .i-solid {
    position: absolute;
    bottom: 0;
    width: 110px;
    height: 2px;
    background: transparent;
  }
  .bg-blue {
    background: #4c8af7 !important;
  }
  .drawer-content-box {
    height: calc(100vh - 48px - 48px - 66px);
    overflow-y: auto;
  }
  .i-dark-btn {
    color: #4c8af7 !important;
    background: #dbe8fd !important;
  }
  .i-btn {
    //width: 104px;
    //height: 40px;
    //background: #4c8af7;
    //border-radius: 4px;
  }
  .margin-right-8 {
    margin-right: 8px;
  }
  .change-no-box {
    padding: 16px 16px 0 16px;
    .inner-box {
      padding: 16px;
      background: #fff;
      .inner-title {
        color: #333;
        font-size: 14px;
      }
      .inner-no {
        margin-top: 8px;
        color: #999;
        font-size: 16px;
      }
    }
  }
  .examine-box {
    padding: 16px;
  }
  .footer-box {
    position: fixed;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    width: 60vw;
    padding: 12px 25px;
    background: #fff;
  }
  .drawer-content {
    width: 100%;
    padding: 16px;
    background: #fff;
  }
</style>
