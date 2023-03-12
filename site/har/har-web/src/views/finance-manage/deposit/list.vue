<template>
  <div class="page-container">
    <i-table
      ref="tableListRef"
      v-model="search"
      v-model:refresh-now="doRefresh"
      v-model:selectedKeys="selectedKeys"
      :options="options"
      :api="cbdApiProjectDepositChangePageGet"
      @reset="onReset"
      @submit="doSearch"
    >
      <template #showAbandonForm>
        <a-checkbox v-model="search.displayDiscard" :value="1" @change="onCheck"
          >显示已作废数据</a-checkbox
        >
      </template>
      <template #header>
        <div class="flex align-center justify-between">
          <a-space>
            <a-button
              v-permission="['deposit:change:return']"
              class="i-btn"
              type="primary"
              @click="onReturn"
              >归还</a-button
            >
            <a-button
              v-permission="['deposit:change:transfer']"
              class="i-btn"
              type="primary"
              @click="onTransfer"
              >转移</a-button
            >
            <a-button
              v-permission="['deposit:change:export']"
              class="i-btn"
              type="primary"
              @click="onBatchExport"
              >批量导出</a-button
            >
            <a-button
              v-permission="['deposit:change:commit']"
              class="i-btn"
              type="primary"
              @click="onSubmitExamine"
              >确认</a-button
            >
            <a-button
              v-permission="['deposit:change:batch:approve']"
              class="i-btn"
              type="primary"
              @click="onConfirmExamine"
              >审批</a-button
            >
          </a-space>
          <div class="flex align-center">
            <div
              >所有单据：{{
                `￥${statistics.totalAmount || 0}（${
                  statistics.totalCount || 0
                }笔）`
              }}</div
            >
            <div
              >审核中：{{
                `￥${statistics.approvingAmount || 0}（${
                  statistics.approvingCount || 0
                }笔）`
              }}</div
            >
            <div
              >已通过：{{
                `￥${statistics.passedAmount || 0}（${
                  statistics.passedCount || 0
                }笔）`
              }}</div
            >
          </div>
        </div>
      </template>
      <template #changeTypeCell="{ record }">{{
        handleTypeName(record.changeType)
      }}</template>
      <template #businessStatCell="{ record }">{{
        businessName(record.businessStat)
      }}</template>
      <template #auditStatCell="{ record }">{{
        examineName(record.auditStat)
      }}</template>
      <template #optionalCell="{ record }">
        <a-space>
          <div
            v-if="
              (record.businessStat === 0 && record.auditStat === 1) ||
              (record.businessStat === 1 && record.auditStat === 1) ||
              (record.businessStat === 1 && record.auditStat === 4) ||
              (record.businessStat === 1 && record.auditStat === 5)
            "
            v-permission="['deposit:change:update', 'deposit:change:info']"
            class="s-btn"
            @click="onEdit(record)"
            >编辑</div
          >
          <div
            v-permission="['deposit:change:info']"
            class="s-btn"
            @click="onSee(record)"
            >查看</div
          >
          <div
            v-if="
              (record.businessStat === 0 && record.auditStat === 1) ||
              (record.businessStat === 1 && record.auditStat === 1) ||
              (record.businessStat === 1 && record.auditStat === 4) ||
              (record.businessStat === 1 && record.auditStat === 5)
            "
            v-permission="['deposit:change:delete']"
            class="s-btn"
            @click="onDel(record.changeId)"
            >删除</div
          >
        </a-space>
      </template>
    </i-table>

    <cost-project-drawer
      v-model:show-drawer="showCostDrawer"
      @confirm-choose="onCostProjectConfirm"
    />

    <serve-drawer
      v-model:show-drawer="showDrawer"
      :title="drawerTitle"
      :change-id="costChangeId"
      :handle-type="drawerHandleType"
      :record-type="drawerRecordType"
      @show-project-choose="doShowProjectChoose"
      @do-update-handle="onEdit"
    />

    <a-modal
      v-model:visible="exportVisible"
      title="提示"
      title-align="start"
      @ok="confirmExport"
      @cancel="exportVisible = false"
    >
      <div>{{ exportContent }}</div>
    </a-modal>

    <a-modal
      v-model:visible="delVisible"
      title="提示"
      title-align="start"
      @ok="confirmDel"
      @cancel="delVisible = false"
    >
      <div>数据删除后无法恢复，是否删除？</div>
    </a-modal>

    <a-modal
      v-model:visible="examineSubmitVisible"
      title="提示"
      title-align="start"
      @ok="confirmExamine"
      @cancel="examineSubmitVisible = false"
    >
      <div>数据确认后无法删除，是否提交审批？</div>
      <div class="margin-top-xl">
        <div class="margin-bottom-xs">备注：</div>
        <a-textarea
          v-model="examineSubmitRemarks"
          placeholder="请输入长度不超过200个字符的内容"
          :max-length="200"
          allow-clear
          show-word-limit
        />
      </div>
    </a-modal>

    <a-modal
      v-model:visible="examineVisible"
      title="批量审批"
      title-align="start"
      :footer="false"
      unmount-on-close
    >
      <div class="textarea-box">
        <div class="prompt-title">备注：</div>
        <a-textarea
          v-model="remarks"
          placeholder="请输入长度不超过200个字符的内容"
          :max-length="200"
          allow-clear
          show-word-limit
        />
      </div>
      <template
        v-if="
          permissionArr.includes('transfer') || permissionArr.includes('sign')
        "
      >
        <div class="prompt-title">转签/加签人</div>
        <a-select
          v-model:model-value="selectArr"
          :options="selectOptions"
          placeholder="请选择"
          :field-names="{ value: 'userCode', label: 'username' }"
          allow-search
        >
          <template #option="{ data }">
            <div class="select-cell flex align-center">
              <a-avatar v-if="data.avatar" class="margin-right-16">
                {{ data.avatar }}
              </a-avatar>
              <div class="margin-right-16">
                {{ data.username || data.userName }}
              </div>
              <div class="margin-right-16">{{ data.phoneNumber }}</div>
              <div class="margin-right-16">{{ data.deptName }}</div>
              <div>{{ data.roleName }}</div>
            </div>
          </template>
        </a-select>
      </template>
      <div class="btn-box">
        <a-button
          v-if="permissionArr.includes('transfer')"
          class="h-btn"
          type="primary"
          :loading="btnLoading"
          :disabled="selectArr.length < 1"
          @click="onBitchTurn"
          >转签</a-button
        >
        <a-button
          v-if="permissionArr.includes('sign')"
          class="h-btn"
          type="primary"
          :loading="btnLoading"
          :disabled="selectArr.length < 1"
          @click="onBitchPlus"
          >加签</a-button
        >
        <a-button
          v-if="permissionArr.includes('reject')"
          class="h-btn h-disabled"
          type="primary"
          :loading="btnLoading"
          @click="onBitchReject"
          >驳回</a-button
        >
        <a-button
          v-if="permissionArr.includes('agree')"
          class="h-btn"
          type="primary"
          :loading="btnLoading"
          @click="onBitchAgree"
          >同意</a-button
        >
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, reactive, ref, watch } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import {
    cbdApiProjectCommonProjectSelectListGet,
    cbdApiProjectCommonMerchantListGet,
    cbdApiProjectCommonContractStoreSelectGet,
    cbdApiProjectCommonMerchantBrandListGet,
    cbdApiProjectDepositChangePageGet,
    cbdApiProjectDepositStatisticsGet,
    CbdApiProjectDepositExportPostRequest,
    cbdApiProjectDepositCommitPost,
    cbdApiProjectDepositTaskStatusPost,
    cbdApiProjectDepositBatchApprovePost,
    cbdApiProjectPageApprovalUserGet,
    cbdApiProjectDepositExportPost,
    cbdApiProjectDepositDeleteChangeIdGet
  } from '@/api';
  import {
    CbdApiProjectCommonMerchantListGetResponse,
    CbdApiProjectCommonProjectSelectListGetResponse,
    CbdApiProjectCommonContractStoreSelectGetResponse,
    CbdApiProjectCommonMerchantBrandListGetResponse,
    CbdApiProjectDepositStatisticsGetResponse,
    CbdApiProjectPageApprovalUserGetResponse
  } from '@/api';
  import { exportDownload, modalConfirm } from '@/utils';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { useRequest } from '@har/use';
  import ServeDrawer from '@/views/finance-manage/deposit/_components_/serve-drawer.vue';
  import CostProjectDrawer from '@/views/finance-manage/deposit/_components_/cost-project-drawer.vue';
  import Np from 'number-precision';
  import NP from 'number-precision';

  const handle_type = [
    {
      label: '归还',
      value: 1
    },
    {
      label: '转移',
      value: 2
    }
  ];
  const business_status = [
    {
      label: '草稿',
      value: 0
    },
    {
      label: '待确认',
      value: 1
    },
    {
      label: '已确认',
      value: 2
    },
    {
      label: '已作废',
      value: 3
    }
  ];
  const examine_status = [
    {
      label: '未提交',
      value: 1
    },
    {
      label: '审批中',
      value: 2
    },
    {
      label: '已通过',
      value: 3
    },
    {
      label: '已驳回',
      value: 4
    },
    {
      label: '已撤销',
      value: 5
    }
  ];

  onMounted(() => {
    getProjectList();
    getStatisticsInfo();
    getMerchantList('');
    getStoreSelectList('');
    getMerchantBrandList('');
  });

  const getStatisticsInfo = () => {
    const {
      projectId = '',
      changeType = '',
      merchantId = '',
      startDate = '',
      endDate = '',
      storeId = '',
      businessStat = '',
      auditStat = ''
    } = search.value;
    getStatistics({
      projectId: String(projectId),
      changeType: String(changeType),
      merchantId: String(merchantId),
      startDate,
      endDate,
      storeId: String(storeId),
      businessStat: String(businessStat),
      auditStat: String(auditStat)
    });
  };

  const tableListRef = ref<any>(null);

  const statistics = ref<CbdApiProjectDepositStatisticsGetResponse>({});
  //统计数据
  const { run: getStatistics } = useRequest(cbdApiProjectDepositStatisticsGet, {
    manual: true,
    onSuccess(e) {
      statistics.value = e;
    }
  });

  //项目下拉列表
  const projectList = ref<CbdApiProjectCommonProjectSelectListGetResponse>([]);
  const [getProjectList] = useFuncProxy(async () => {
    projectList.value = await cbdApiProjectCommonProjectSelectListGet({});
  });
  //商户下拉列表
  const merchantList = ref<CbdApiProjectCommonMerchantListGetResponse>([]);
  const [getMerchantList] = useFuncProxy(async (projectId: string) => {
    merchantList.value = await cbdApiProjectCommonMerchantListGet({
      projectId
    });
  });
  //合同-店铺下拉
  const storeSelectList =
    ref<CbdApiProjectCommonContractStoreSelectGetResponse>([]);
  const [getStoreSelectList] = useFuncProxy(async (projectId: string) => {
    storeSelectList.value = await cbdApiProjectCommonContractStoreSelectGet({
      projectId
    });
  });
  //商户品牌下拉
  const merchantBrandList =
    ref<CbdApiProjectCommonMerchantBrandListGetResponse>([]);
  const [getMerchantBrandList] = useFuncProxy(async (projectId: string) => {
    merchantBrandList.value = await cbdApiProjectCommonMerchantBrandListGet({
      projectId
    });
  });

  const exportVisible = ref(false);
  const exportContent = ref('');
  const onBatchExport = () => {
    exportContent.value = selectedKeys.value.length
      ? '是否导出选中数据？'
      : '是否导出结果页全部数据？';
    exportVisible.value = true;
  };
  const confirmExport = () => {
    console.log({ ...search.value });
    const params = Object.keys(search.value)
      .filter(
        (key) =>
          search.value[key as keyof CbdApiProjectDepositExportPostRequest] !==
          undefined
      )
      .reduce(
        (acc, key) => ({
          ...acc,
          [key]:
            search.value[key as keyof CbdApiProjectDepositExportPostRequest]
        }),
        {}
      );
    const url = cbdApiProjectDepositExportPost.requestConfig.path;
    if (selectedKeys.value.length > 0) {
      console.log('导出指定数据', params);
      exportDownload(
        url,
        { ...params, selectIds: selectedKeys.value },
        '存款处理',
        'application/vnd.ms-excel',
        'post'
      );
    } else {
      console.log('导出结果页所有数据', params);
      exportDownload(
        url,
        { ...params, selectIds: [] },
        '存款处理',
        'application/vnd.ms-excel',
        'post'
      );
    }
  };

  const delVisible = ref(false);
  // const delHandleType = ref(0); // 1列表内容删除 2顶部删除按钮
  const contractIds = ref<Array<number>>([]);
  // const onHandleDel = () => {
  //   if (selectedKeys.value.length < 1)
  //     return Message.error({ content: '请先择删除项' });
  //   const flag = selectedKeys.value.every((item) => {
  //     const obj = tableListRef.value.data.find(
  //       (sub: any) => Number(sub.id) === Number(item)
  //     );
  //     return (
  //       obj &&
  //       ((obj.businessStatus === 1 && obj.verifyStatus === 1) ||
  //         (obj.businessStatus === 2 && obj.verifyStatus === 1) ||
  //         (obj.businessStatus === 2 && [3, 4].includes(obj.verifyStatus)))
  //     );
  //   });
  //   if (!flag) return Message.error({ content: '选择数据存在不能删除项' });
  //   contractIds.value = selectedKeys.value;
  //   delVisible.value = true;
  //   delHandleType.value = 2;
  // };
  const confirmDel = async () => {
    console.log('确认删除');
  };

  const examineVisible = ref(false);
  const remarks = ref(''); //备注
  const onConfirmExamine = () => {
    if (selectedKeys.value.length < 1)
      return Message.error({ content: '请先择审批项' });
    const flag = selectedKeys.value.every((item) => {
      const obj = tableListRef.value.data.find(
        (sub: any) => Number(sub.changeId) === Number(item)
      );
      return obj && obj.businessStat === 1 && obj.auditStat === 2;
    });
    if (!flag)
      return Message.error({ content: '请确认选择数据是否都为待确认-审批中' });
    getTaskStatus({ changeIds: selectedKeys.value });
  };

  const permissionArr = ref<string[]>([]);
  //获取可审批数量
  const { run: getTaskStatus } = useRequest(
    cbdApiProjectDepositTaskStatusPost,
    {
      manual: true,
      onSuccess(e) {
        const { successCount = 0, totalCount = 0, menus = [] } = e;
        if (successCount < 1)
          return Message.error({ content: '勾选数据不在您的审核范围内！' });
        //不可操作数量
        const noHandleCount = NP.minus(totalCount, successCount);
        //操作按钮权限
        permissionArr.value = menus;
        if (noHandleCount > 0) {
          const prompt = `${noHandleCount}条数据不在您的审批范围内，是否对可审批数据进行审批？`;
          modalConfirm(prompt, () => {
            getApprovalUser({ processInstanceId: '' });
            examineVisible.value = true;
          });
        } else {
          getApprovalUser({ processInstanceId: '' });
          examineVisible.value = true;
        }
      }
    }
  );

  const selectOptions = ref<CbdApiProjectPageApprovalUserGetResponse>([]);
  const selectArr = ref([]);
  const { run: getApprovalUser } = useRequest(
    cbdApiProjectPageApprovalUserGet,
    {
      manual: true,
      onSuccess(e) {
        selectOptions.value = e;
      }
    }
  );

  const btnLoading = ref(false);

  //驳回
  const onBitchReject = () => {
    doExamineServe({
      changeIds: selectedKeys.value,
      comment: remarks.value,
      approvalType: 3,
      userCode: ''
    });
  };

  //转签
  const onBitchTurn = () => {
    doExamineServe({
      changeIds: selectedKeys.value,
      comment: remarks.value,
      approvalType: 1,
      userCode: selectArr.value.toString()
    });
  };

  //加签
  const onBitchPlus = () => {
    doExamineServe({
      changeIds: selectedKeys.value,
      comment: remarks.value,
      approvalType: 2,
      userCode: selectArr.value.toString()
    });
  };

  //同意
  const onBitchAgree = async () => {
    console.log('--确认审批--');
    doExamineServe({
      changeIds: selectedKeys.value,
      comment: remarks.value,
      approvalType: 2,
      userCode: ''
    });
  };

  const { run: doExamineServe } = useRequest(
    cbdApiProjectDepositBatchApprovePost,
    {
      manual: true,
      onBefore() {
        btnLoading.value = true;
      },
      onSuccess() {
        Message.success({ content: '审批成功' });
        examineVisible.value = false;
        selectedKeys.value = [];
        doRefresh.value = true;
        getStatisticsInfo();
      },
      onFinally() {
        btnLoading.value = false;
      }
    }
  );

  //选择费用弹窗
  const showCostDrawer = ref(false);

  //弹窗标题
  const drawerTitle = ref('');
  //是否显示弹窗
  const showDrawer = ref(false);
  //弹窗类型
  const drawerHandleType = ref(0);
  //存款id
  const costChangeId = ref('');
  //存款处理方式
  const drawerRecordType = ref(0);

  //确认选择费用项目
  const onCostProjectConfirm = () => {
    !showDrawer.value ? (showDrawer.value = true) : '';
  };

  watch(
    () => showDrawer.value,
    (val) => {
      if (!val) {
        doRefresh.value = true;
        getStatisticsInfo();
      }
    }
  );

  //弹窗内再次选择费用项目
  const doShowProjectChoose = () => {
    showCostDrawer.value = true;
  };

  const onReturn = () => {
    console.log('--onReturn 归还--');
    drawerTitle.value = '添加存款处理';
    drawerHandleType.value = 1;
    costChangeId.value = '';
    drawerRecordType.value = 1;
    showCostDrawer.value = true;
  };
  const onTransfer = () => {
    console.log('--onTransfer 转移--');
    drawerTitle.value = '添加存款处理';
    drawerHandleType.value = 1;
    costChangeId.value = '';
    drawerRecordType.value = 2;
    showCostDrawer.value = true;
  };
  // const onBatchExport = () => {
  //   console.log('--onBatchExport 批量导出--');
  // };

  const examineSubmitVisible = ref(false);
  const onSubmitExamine = () => {
    console.log('--onSubmitExamine 确认提交审批--');
    if (selectedKeys.value.length < 1)
      return Message.error({ content: '请先选择确认审批项' });
    const flag = selectedKeys.value.every((item) => {
      const obj = tableListRef.value.data.find(
        (sub: any) => Number(sub.changeId) === Number(item)
      );
      return obj && obj.businessStat === 1 && [1, 4, 5].includes(obj.auditStat);
    });
    if (!flag) return Message.error({ content: '选择数据存在不能提交审批项' });
    examineSubmitVisible.value = true;
    // modalConfirm('确认提交审批', () => {
    //   doCommitDeposit({ changeIds: selectedKeys.value });
    // });
  };

  const examineSubmitRemarks = ref('');
  const confirmExamine = () => {
    doCommitDeposit({
      changeIds: selectedKeys.value,
      remark: examineSubmitRemarks.value
    });
  };

  const { run: doCommitDeposit } = useRequest(cbdApiProjectDepositCommitPost, {
    manual: true,
    onSuccess(e) {
      console.log(e);
      Message.success({ content: '提交审批成功' });
      selectedKeys.value = [];
      doRefresh.value = true;
      getStatisticsInfo();
    },
    onFinally() {
      examineSubmitRemarks.value = '';
    }
  });

  const onEdit = (record: any) => {
    console.log(record, '--编辑--');
    drawerTitle.value = '编辑存款处理';
    drawerHandleType.value = 2;
    costChangeId.value = record.changeId + '';
    drawerRecordType.value = record.changeType;
    showDrawer.value = true;
  };
  const onSee = (record: any) => {
    console.log(record, '--查看--');
    drawerTitle.value = '查看存款处理';
    drawerHandleType.value = 3;
    costChangeId.value = record.changeId + '';
    drawerRecordType.value = record.changeType;
    showDrawer.value = true;
  };
  const onDel = (recordId: string | number) => {
    modalConfirm('确认删除？', () => {
      doDelServe({ changeId: recordId + '' });
    });
    console.log(recordId, '--删除--');
  };
  const { run: doDelServe } = useRequest(
    cbdApiProjectDepositDeleteChangeIdGet,
    {
      manual: true,
      onSuccess() {
        Message.success({ content: '删除成功' });
        doRefresh.value = true;
        getStatisticsInfo();
      }
    }
  );

  const doRefresh = ref(false);
  const search = ref<CbdApiProjectDepositExportPostRequest>({});

  //条件搜索列表
  const doSearch = () => {
    getStatisticsInfo();
  };

  const checkValue = ref<boolean | (string | number | boolean)[]>(false);
  const onCheck = (value: boolean | (string | number | boolean)[]) => {
    console.log(value, '---');
    checkValue.value = value;
    search.value.displayDiscard = Boolean(value);
  };

  //重置列表
  const onReset = () => {
    search.value = {
      startDate: '',
      endDate: '',
      displayDiscard: false
    };
    // search.value.startDate = '';
    // search.value.endDate = '';
    // search.value.displayDiscard = false;
    checkValue.value = false;
    selectedKeys.value = [];
    getMerchantList('');
    getStoreSelectList('');
    getStatisticsInfo();
  };

  const selectedKeys = ref<Array<number>>([]);
  const options = reactive({
    menuOtherOptions: {
      scroll: {
        x: '140%'
      },
      rowKey: 'changeId',
      rowSelection: {
        type: 'checkbox',
        showCheckedAll: true
      },
      onSelect: (e: number[]) => {
        console.log(e, '--选择的数据id--');
        selectedKeys.value = e;
      }
    },
    menu: false,
    menuSpan: 12,
    pageShow: true,
    index: true,
    indexTitle: '序号',
    columns: [
      {
        label: '项目名称',
        prop: 'projectName',
        type: 'select',
        width: 124,
        ellipsis: true,
        tooltip: true,
        dic: projectList
      },
      {
        label: '项目名称',
        prop: 'projectId',
        search: true,
        hide: true,
        type: 'select',
        dic: projectList,
        options: {
          allowSearch: true,
          onChange: (val: string) => {
            getMerchantList(val);
            getStoreSelectList(val);
            getMerchantBrandList(val);
          }
        }
      },
      {
        label: '处理单据号',
        prop: 'changeNo',
        ellipsis: true,
        tooltip: true
      },
      {
        label: '处理方式',
        prop: 'changeType',
        type: 'select',
        dic: handle_type,
        search: true
      },
      {
        label: '商户',
        prop: 'merchantName',
        ellipsis: true,
        tooltip: true
      },
      {
        label: '商户',
        prop: 'merchantId',
        search: true,
        hide: true,
        type: 'select',
        dic: merchantList,
        options: {
          allowSearch: true,
          maxLength: 20
        }
      },
      {
        label: '合同号',
        prop: 'contractCode',
        width: 186,
        ellipsis: true,
        tooltip: true
      },
      {
        label: '店铺',
        prop: 'storeName',
        ellipsis: true,
        tooltip: true
      },
      {
        label: '店铺',
        prop: 'storeId',
        search: true,
        hide: true,
        type: 'select',
        dic: storeSelectList,
        options: {
          allowSearch: true,
          maxLength: 20
        }
      },
      {
        label: '合同区间',
        prop: 'contractRange',
        ellipsis: true,
        tooltip: true
      },
      {
        label: '处理金额',
        prop: 'changeAmount'
      },
      {
        label: '处理日期',
        prop: 'changeDate',
        type: 'dateRange',
        search: true,
        options: {
          onChange: (val: string[]) => {
            const [start, end] = val;
            search.value.startDate = start;
            search.value.endDate = end;
            console.log(start, end);
          }
        }
      },
      {
        label: '业务状态',
        prop: 'businessStat',
        type: 'select',
        dic: business_status,
        search: true
      },
      {
        label: '审批状态',
        prop: 'auditStat',
        type: 'select',
        dic: examine_status,
        search: true
      },
      {
        label: '',
        prop: 'showAbandon',
        type: 'checkbox',
        span:12,
        search: true,
        hide: true
      },
      {
        label: '操作',
        prop: 'optional',
        width: 140,
        fixed: 'right'
      }
    ]
  });

  const handleTypeName = computed(() => (val: number) => {
    return (
      handle_type.find((item) => Number(item.value) === Number(val))?.label ||
      '--'
    );
  });

  const businessName = computed(() => (val: number) => {
    return (
      business_status.find((item) => Number(item.value) === Number(val))
        ?.label || '--'
    );
  });

  const examineName = computed(() => (val: number) => {
    return (
      examine_status.find((item) => Number(item.value) === Number(val))
        ?.label || '--'
    );
  });
</script>

<style scoped lang="less">
  .margin-right-16 {
    margin-right: 16px;
  }
  .i-btn {
    //min-width: 80px;
    //height: 30px;
    //border-radius: 4px;
  }
  .s-btn {
    color: #4c8af7;
    font-size: 14px;
    cursor: pointer;
  }
  .textarea-box {
    margin-bottom: 12px;
  }
  .prompt-title {
    margin-bottom: 12px;
  }
  .select-cell {
    height: 50px;
  }
  .btn-box {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 24px;
    .h-disabled {
      color: #4c8af7;
      background: #dbe8fd;
    }
    .h-btn {
      width: 104px;
      height: 40px;
      border-radius: 4px;
    }
  }
</style>
