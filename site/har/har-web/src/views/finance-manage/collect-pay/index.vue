<template>
  <div class="page-container">
    <i-table
      ref="tableListRef"
      v-model="search"
      v-model:refresh-now="isRefresh"
      v-model:selectedKeys="selectedKeys"
      :options="options"
      :api="cbdApiProjectMisPaymentListPost"
      @submit="onSubmit"
      @reset="onReset"
    >
      <template #cancelStatForm>
        <a-checkbox v-model="checkValue" :value="1" @change="onCheck"
          >显示已作废数据</a-checkbox
        >
      </template>
      <template #header>
        <div class="flex align-center justify-between">
          <a-space>
            <a-button
              v-permission="['mis:payment:commit']"
              class="i-btn"
              type="primary"
              @click="onAdd"
              >添加</a-button
            >
            <a-button
              v-permission="['mis:payment:export']"
              class="i-btn"
              type="primary"
              @click="onBatchExport"
              >批量导出</a-button
            >
            <a-button
              v-permission="['mis:payment:confirm']"
              :disabled="!selectedKeys.length"
              class="i-btn"
              type="primary"
              @click="onSubmitCertain"
              >确认</a-button
            >
            <a-button
              v-permission="['mis:payment:audit']"
              :disabled="!canExam"
              class="i-btn"
              type="primary"
              @click="onConfirmExamine"
              >审批</a-button
            >
            <a-button
              v-permission="['mis:payment:print']"
              :disabled="!selectedKeys.length"
              class="i-btn"
              type="primary"
              @click="onConfirmPrint"
              >打印</a-button
            >
          </a-space>
          <div class="flex align-center">
            <div
              >已收：￥{{ statistics.collectSum?.totalAmount }}（{{
                statistics.collectSum?.totalCount
              }}笔）</div
            >
            <div
              >已付：￥{{ statistics.paySum?.totalAmount }}（{{
                statistics.paySum?.totalCount
              }}笔）</div
            >
          </div>
        </div>
      </template>
      <template #billTypeCell="{ record }">{{
        valueFindLabel(billTypeList, Number(record.billType))
      }}</template>
      <template #businessStatCell="{ record }">{{
        valueFindLabel(pay_collect_status, record.businessStat)
      }}</template>
      <template #auditStatCell="{ record }">{{
        valueFindLabel(examine_status, record.auditStat)
      }}</template>
      <template #invoiceStatCell="{ record }">{{
        record.invoiceId ? '是' : '否'
      }}</template>
      <template #optionalCell="{ record }">
        <a-space>
          <div
            v-if="showEditBtn(record)"
            v-permission="['mis:payment:modify', 'mis:payment:detail']"
            class="s-btn"
            @click="onEdit(record)"
            >编辑</div
          >
          <div
            v-if="showDetailBtn(record)"
            v-permission="['mis:payment:detail']"
            class="s-btn"
            @click="onSee(record)"
            >查看</div
          >
          <div
            v-if="showDeleteBtn(record)"
            v-permission="['mis:payment:delete']"
            class="s-btn"
            @click="onDelete(record.id)"
            >删除</div
          >
        </a-space>
      </template>
    </i-table>
    <select-list
      v-if="page.showSelect"
      v-model="page.showSelect"
      @select="onSelect"
    />
    <add-page
      v-if="page.showAddPage"
      v-model="page.showAddPage"
      :data="selectBills"
      @refresh="onRefresh"
    />
    <edit-page
      v-if="page.showEditPage"
      :id="page.id"
      v-model="page.showEditPage"
      @refresh="onSuccess"
    />
    <print
      v-if="page.showPrint"
      v-model="page.showPrint"
      :ids="selectedKeys"
      :source="page.source"
      @refresh="isRefresh = true"
    />
    <detail
      v-if="page.showDetail"
      :id="page.id"
      v-model="page.showDetail"
      :refresh="detailRefresh"
      @refresh="onRefresh"
      @update="page.showEditPage = true"
    />
    <batch-exam
      v-if="examineVisible"
      v-model="examineVisible"
      :select-data="selectedKeys"
      source="cp"
      :tasks="taskIds"
      :api="cbdApiProjectMisPaymentAuditPost"
      @success="onExamSuccess"
    ></batch-exam>
    <sub-confirm
      v-if="submitCertainVisible"
      v-model="submitCertainVisible"
      @data="getDataAndSub"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, reactive, ref, watch } from 'vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import ITable from '@/components/i-table/index.vue';
  import SelectList from './__components__/select.vue';
  import AddPage from './__components__/addPage.vue';
  import EditPage from './__components__/editPage.vue';
  import Print from '../__components__/print.vue';
  import Detail from './__components__/detail.vue';
  import BatchExam from '../__components__/batch-exam.vue';
  import SubConfirm from './__components__/subConfirm.vue';
  import {
    CbdApiProjectMisBillAddCollectionPostResponse,
    cbdApiProjectMisPaymentExportPost,
    cbdApiProjectMisPaymentAuditPost,
    cbdApiProjectMisPaymentListPost,
    type CbdApiProjectMisPaymentListPostResponse,
    cbdApiProjectMisPaymentConfirmPost,
    cbdApiProjectMisPaymentDeletePost,
    cbdApiProjectMisPaymentStatisticsPost,
    CbdApiProjectMisPaymentStatisticsPostResponse,
    cbdApiProjectMisPaymentAuditBeforePost,
    cbdApiProjectMisPayMethodListPost
  } from '@/api';
  import {
    billTypeList,
    pay_collect_status,
    examine_status,
    invoiceStatList
  } from '@/utils/dic';
  import {
    projectList,
    merchantDropList,
    storeSelectList,
    getExpenseList,
    getProjectListData,
    getMerchantDropList,
    getStoreSelectList
  } from '@/views/finance-manage/useGetCommonData';
  import {
    exportDownload,
    formatPrice,
    getActiveProjectId,
    hasCapableData,
    modalConfirm,
    valueFindLabel
  } from '@/utils';
  import { useRequest } from '@har/use';
  import useToken from '@/composables/useToken';
  type RowData = Required<CbdApiProjectMisPaymentListPostResponse>['rows'][0];
  type PageConfig = {
    showSelect: boolean;
    showAddPage: boolean;
    showEditPage: boolean;
    showUpdate: boolean;
    showPrint: boolean;
    showDetail: boolean;
    id: string;
    source: string;
  };
  type SelectData = CbdApiProjectMisBillAddCollectionPostResponse[0];
  const statistics = ref<CbdApiProjectMisPaymentStatisticsPostResponse>({
    collectSum: {
      totalCount: 0,
      totalAmount: 0
    },
    paySum: {
      totalCount: 0,
      totalAmount: 0
    }
  });
  const token = useToken();
  const selectBills = ref<SelectData[]>([]);
  const tableListRef = ref<any>(null);
  const page = reactive<PageConfig>({
    showSelect: false,
    showAddPage: false,
    showEditPage: false,
    showPrint: false,
    showUpdate: false,
    showDetail: false,
    source: '',
    id: ''
  });
  const { run: getStatistics } = useRequest(
    cbdApiProjectMisPaymentStatisticsPost,
    {
      manual: true,
      onSuccess(res) {
        statistics.value = res;
      }
    }
  );

  const examineVisible = ref(false);
  const canExam = computed(() => {
    if (!selectedKeys.value?.length) return false;
    return selectedKeys.value.every((item) => {
      const obj = tableListRef.value.data.find(
        (sub: any) => Number(sub.id) === Number(item)
      );
      return obj && obj.businessStat === 1 && obj.auditStat === 2;
    });
  });
  const onConfirmExamine = () => {
    if (selectedKeys.value.length) {
      getTaskStatus({ list: selectedKeys.value });
    }
  };
  const onExamSuccess = () => {
    isRefresh.value = true;
  };
  const detailRefresh = ref(false);
  const onRefresh = () => {
    isRefresh.value = true;
    detailRefresh.value = !detailRefresh.value;
    page.showSelect = false;
  };
  type Tasks = {
    processInstanceId: string;
    taskId: string;
  };
  const taskIds = ref<Tasks[]>([]);
  //获取可审批数量
  const { run: getTaskStatus } = useRequest(
    cbdApiProjectMisPaymentAuditBeforePost,
    {
      manual: true,
      onSuccess(e) {
        taskIds.value = e || [];
        let msg = '';
        if (!e.length) {
          Message.error('暂时没有可审批的数据');
        } else if (e.length === 1) {
          examineVisible.value = true;
        } else {
          msg = `${e.length}条数据在您的审批范围内，是否进行审批？`;
          modalConfirm(msg, () => {
            examineVisible.value = true;
          });
        }
      }
    }
  );
  const onConfirmPrint = async () => {
    const flag = hasCapableData(
      tableListRef.value.data,
      selectedKeys.value,
      [1, 2]
    );
    if (!flag) return Message.error({ content: '选择数据存在不支持打印的' });
    page.showPrint = true;
    page.source = 'collect-pay';
  };
  const onAdd = () => {
    page.showSelect = true;
    console.log('--onAdd --');
  };
  const onBatchExport = () => {
    const length = selectedKeys.value.length;
    const msg = length
      ? `您选择了${length}条数据,确定导出吗?`
      : `您未选择数据,要导出全部吗?`;
    modalConfirm(msg, () => {
      const url = cbdApiProjectMisPaymentExportPost.requestConfig.path;
      exportDownload(
        url,
        { ...search.value, idList: selectedKeys.value },
        '收付款单',
        'application/vnd.ms-excel',
        'post'
      );
    });
  };

  const onSubmitCertain = () => {
    const flag = hasCapableData(
      tableListRef.value.data,
      selectedKeys.value,
      [0, 1],
      [1, 4, 5]
    );
    if (!flag) return Message.error({ content: '选择数据存在不能提交审批的' });
    submitCertainVisible.value = true;
  };
  const onEdit = (record: RowData) => {
    page.showEditPage = true;
    page.id = String(record.id || '');
  };
  const onSee = (record: RowData) => {
    page.id = String(record.id || '');
    page.showDetail = true;
  };
  const onDelete = (recordId: number) => {
    Modal.open({
      title: '警告',
      content: '数据删除后无法恢复,是否删除?',
      onOk: async () => {
        doDelete({
          idList: [recordId]
        });
      }
    });
  };
  const onSubmit = () => {
    getStatistics({ ...search.value });
  };
  const onReset = () => {
    checkValue.value = false;
    search.value = {
      cancelStat: 0,
      projectId: Number(getActiveProjectId() || '')
    };
    getStatistics({ ...search.value });
  };
  const { run: doDelete } = useRequest(cbdApiProjectMisPaymentDeletePost, {
    manual: true,
    onSuccess() {
      isRefresh.value = true;
      getStatistics({ ...search.value });
    }
  });
  const isRefresh = ref(false);
  const search = ref<any>({
    cancelStat: 0,
    projectId: Number(getActiveProjectId() || '')
  });

  const checkValue = ref<boolean | (string | number | boolean)[]>(false);
  const onCheck = (value: boolean | (string | number | boolean)[]) => {
    search.value.cancelStat = value ? 1 : 0;
  };
  const onSuccess = () => {
    isRefresh.value = true;
    detailRefresh.value = !detailRefresh.value;
    getStatistics({ ...search.value });
  };
  const selectedKeys = ref<Array<number>>([]);
  const payMethodList = ref<any>([]);
  const options = computed(() => {
    return {
      menuOtherOptions: {
        scroll: {
          x: '125%'
        },
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
          showCheckedAll: true
        },
        onSelectionChange: (e: number[]) => {
          console.log(e, '--选择的数据id--');
          selectedKeys.value = e;
        }
      },
      menu: false,
      menuSpan: 6,
      pageShow: true,
      index: true,
      indexWidth: 50,
      indexTitle: '序号',
      columns: [
        {
          label: '项目名称',
          prop: 'projectName',
          type: 'select',
          width: 100,
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
              search.value.storeId = undefined;
              search.value.merchantId = undefined;
              storeSelectList.value = [];
              merchantDropList.value = [];
              getMerchantDropList(val);
              getStoreSelectList(val);
              getPayMethodsList({ projectId: Number(val), scenes: 1 });
            }
          }
        },
        {
          label: '收款单据号',
          width: 120,
          ellipsis: true,
          tooltip: true,
          prop: 'paymentNum'
        },
        {
          label: '支付方式',
          prop: 'payMethodStr',
          type: 'select',
          width: 90,
          options: {
            fieldNames: {
              label: 'label',
              value: 'label'
            }
          },
          dic: payMethodList.value,
          search: true,
          formatter: (e: RowData) => e.payMethodStr || '--'
        },
        // {
        //   label: '支付方式',
        //   width: 100,
        //
        //   prop: 'payMethodStr'
        // },
        {
          label: '商户',
          width: 90,
          prop: 'merchantName'
        },
        {
          label: '商户',
          prop: 'merchantId',
          search: true,
          hide: true,
          type: 'select',
          dic: merchantDropList,
          options: {
            allowSearch: true,
            maxLength: 20,
            onChange(v: any) {
              search.value.storeId = undefined;
              storeSelectList.value = [];
              getStoreSelectList({
                projectId: search.value.projectId,
                merchantId: String(v)
              });
            }
          }
        },
        {
          label: '合同号',
          prop: 'contractCode',
          width: 140,
          ellipsis: true,
          tooltip: true,
        },
        {
          label: '店铺',
          width: 100,
          prop: 'storeName'
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
          label: '账单类型',
          prop: 'billType',
          type: 'select',
          width: 80,
          dic: billTypeList,
          search: true
        },
        {
          label: '收付款金额',
          width: 120,
          prop: 'amount',
          formatter: (e: RowData) => formatPrice(e.amount!)
        },
        {
          label: '收付款日期',
          prop: 'changeDate',
          type: 'dateRange',
          search: true,
          hide: true,
          options: {
            onChange: (val: string[]) => {
              const [collectStart, collectEnd] = val;
              search.value = {
                ...search.value,
                collectStart,
                collectEnd
              };
            }
          }
        },
        {
          label: '收付款日期',
          width: 140,
          prop: 'createTime'
        },
        {
          label: '是否生成滞纳金',
          prop: 'overdueFineAmount',
          width: 120,
          type: 'select',
          formatter: (e: RowData) => (e.overdueFineAmount ? '否' : '否')
        },
        {
          label: '业务状态',
          width: 100,
          prop: 'businessStatList',
          type: 'select',
          dic: pay_collect_status,
          search: true,
          hide: true,
          options: {
            multiple: true
          }
        },
        {
          label: '业务状态',
          width: 100,
          prop: 'businessStat',
          dic: pay_collect_status
        },
        {
          label: '审批状态',
          prop: 'auditStatList',
          width: 80,
          type: 'select',
          dic: examine_status,
          search: true,
          hide: true,
          options: {
            multiple: true
          }
        },
        {
          label: '审批状态',
          prop: 'auditStat',
          width: 80,
          dic: examine_status
        },
        {
          label: '是否已开票',
          width: 80,
          prop: 'invoiceStat',
          type: 'select',
          dic: invoiceStatList,
          search: true,
          span: 12,
          innerWidth: '50%'
        },
        {
          label: '',
          prop: 'cancelStat',
          type: 'checkbox',
          search: true,
          span: 18,
          hide: true
        },
        {
          label: '操作',
          prop: 'optional',
          width: 140,
          fixed: 'right'
        }
      ]
    };
  });
  const onSelect = (data: SelectData[]) => {
    page.showAddPage = true;
    selectBills.value = data;
  };
  const { run: getPayMethodsList } = useRequest(
    cbdApiProjectMisPayMethodListPost,
    {
      manual: true,
      onSuccess(res) {
        payMethodList.value = [];
        res.forEach((el: any) => {
          el.methodDetails.forEach((each: any) => {
            if (each.switchs === 1) {
              payMethodList.value.push({
                value: each.id,
                label: each.paymentMethod
              });
            }
          });
        });
      }
    }
  );
  onMounted(() => {
    getProjectListData();
    getStatistics({ ...search.value });
    getExpenseList({ parentExpenseCode: '0' });
    const id = search.value.projectId;
    if (id) {
      getMerchantDropList(id);
      getStoreSelectList({ projectId: id });
      getPayMethodsList({ projectId: id, scenes: 1 });
    }
  });
  type FormItems = {
    autoOpenInvoice: number;
    remark: string;
  };
  const submitCertainVisible = ref(false);
  const getDataAndSub = (data: FormItems) => {
    onCertain({
      ...data,
      idList: selectedKeys.value
    });
  };
  // 确认
  const { run: onCertain } = useRequest(cbdApiProjectMisPaymentConfirmPost, {
    manual: true,
    onSuccess() {
      isRefresh.value = true;
      submitCertainVisible.value = false;
    }
  });
  const showEditBtn = (record: RowData) => {
    return (
      [0, 1].includes(record.businessStat) &&
      [1, 4, 5].includes(record.auditStat)
    );
  };
  const showDetailBtn = (record: RowData) => {
    return record.businessStat !== 0;
  };
  const showDeleteBtn = (record: RowData) => {
    return (
      [0, 1].includes(record.businessStat) &&
      [1, 4, 5].includes(record.auditStat)
    );
  };
  watch(
    () => isRefresh.value,
    (v) => {
      if (v) {
        selectedKeys.value = [];
      }
    }
  );
</script>

<style scoped lang="less">
  //.i-btn {
  //  min-width: 80px;
  //  height: 30px;
  //  border-radius: 4px;
  //}
  .s-btn {
    color: #4c8af7;
    font-size: 14px;
    cursor: pointer;
  }
</style>
