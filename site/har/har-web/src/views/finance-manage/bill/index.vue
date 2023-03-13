<template>
  <div class="page-container">
    <i-table
      ref="tableListRef"
      v-model="search"
      v-model:selectedKeys="selectedKeys"
      :options="options"
      :data="dataList"
      :page="pageOptions"
      @page-change="pageChange"
      @page-size-change="pageSizeChange"
    >
      <template #menuForm>
        <a-button
          v-permission="['formal:bill:handiwork']"
          type="primary"
          class="btn export"
          @click="formABill"
          >生成账单</a-button
        >
        <a-button type="primary" class="btn" @click="onSubmit">查询</a-button>
        <a-button type="primary" class="btn" @click="onReset">重置</a-button>
      </template>
      <template #showAbandonForm>
        <a-checkbox v-model="checkValue" :value="1" @change="onCheck"
          >显示已作废数据</a-checkbox
        >
      </template>
      <template #header>
        <div class="flex align-center justify-between">
          <a-space>
            <a-button
              v-permission="['mis:bill:back:save']"
              class="i-btn"
              type="primary"
              @click="onAdd"
              >添加</a-button
            >
            <a-button
              v-permission="['formal:bill:confirm']"
              class="i-btn"
              :loading="cerLoading"
              type="primary"
              :disabled="!selectedKeys.length"
              @click="onSubmitExamine"
              >确认</a-button
            >
            <a-button
              v-permission="['mis:payment:confirm']"
              :disabled="!selectCArr.length"
              class="i-btn"
              type="primary"
              :loading="billLoading"
              @click="onBatchCollectPay('c')"
              >批量收款</a-button
            >
            <a-button
              v-permission="['mis:payment:confirm']"
              :disabled="!selectPArr.length"
              class="i-btn"
              type="primary"
              :loading="billLoading"
              @click="onBatchCollectPay('p')"
              >批量付款</a-button
            >
            <a-button
              v-permission="['formal:bill:print']"
              :disabled="!selectedKeys.length"
              class="i-btn"
              type="primary"
              @click="onConfirmPrint"
              >打印</a-button
            >
            <a-button
              :disabled="!selectedKeys.length"
              class="i-btn"
              type="primary"
              @click="onPressCharge"
              >催缴</a-button
            >
            <a-button
              v-permission="['formal:bill:approve']"
              :disabled="!selectedKeys.length"
              class="i-btn"
              type="primary"
              @click="onConfirmExamine"
              >审批</a-button
            >
            <a-button
              v-permission="['formal:bill:export']"
              class="i-btn"
              type="primary"
              @click="onExport()"
              >导出</a-button
            >
          </a-space>
          <div class="flex align-center">
            <div
              >应收：￥{{ statistics.receivableAmount || '--' }}（{{
                statistics.receivableCount || '--'
              }}笔）</div
            >
            <div
              >应付：￥{{ statistics.copeAmount || '--' }}（{{
                statistics.copeCount || '--'
              }}笔）</div
            >
          </div>
        </div>
      </template>
      <template #billTypeCell="{ record }">{{
        valueFindLabel(billTypeList, record.billType)
      }}</template>
      <template #billSourceTypeCell="{ record }">{{
        valueFindLabel(billSourceTypeList, record.billSourceType)
      }}</template>
      <template #businessStatCell="{ record }">{{
        valueFindLabel(business_status, record.businessStat)
      }}</template>
      <template #auditStatCell="{ record }">{{
        valueFindLabel(examine_status, record.auditStat)
      }}</template>
      <template #optionalCell="{ record }">
        <a-space>
          <div
            v-if="showEditBtn(record)"
            v-permission="[
              'formal:bill:adjustable',
              'mis:bill:back:save',
              'formal:bill:info',
              'formal:bill:detail'
            ]"
            class="s-btn"
            @click="onEdit(record)"
            >编辑</div
          >
          <div
            v-if="record.businessStat !== 0"
            v-permission="['formal:bill:view', 'formal:bill:detail']"
            class="s-btn"
            @click="onSee(record)"
            >查看</div
          >
          <div
            v-if="record.businessStat === 0"
            v-permission="['formal:bill:info']"
            class="s-btn"
            @click="onSeeDraft(record)"
            >查看</div
          >
          <div
            v-if="
              record.isDelete === 1 &&
              record.auditStat !== 2 &&
              record.businessStat !== 5
            "
            v-permission="['formal:bill:delete']"
            class="s-btn"
            @click="onDelete(record.id)"
            >删除</div
          >
        </a-space>
      </template>
    </i-table>
    <add
      v-if="page.showAdd"
      :id="String(page.id)"
      v-model="page.showAdd"
      @refresh="doRefresh"
    />
    <update-bill
      v-if="page.showUpdate"
      :id="String(page.id)"
      v-model="page.showUpdate"
      @success="onSuccess"
    />
    <print
      v-if="page.showPrint"
      v-model="page.showPrint"
      :ids="selectedKeys"
      :source="page.source"
      @refresh="doRefresh"
    />
    <detail
      v-if="page.showDetail"
      :id="page.id"
      v-model="page.showDetail"
      @refresh="doRefresh"
      @update="page.showUpdate = true"
      @print="onDetailPrint"
    />
    <batch-collect-pay
      v-if="page.showBatchCP"
      v-model="page.showBatchCP"
      :data="selectBills"
      @refresh="doRefresh"
    >
    </batch-collect-pay>
    <batch-exam
      v-if="examineVisible"
      v-model="examineVisible"
      :select-data="selectedKeys"
      :api="cbdApiProjectMisBillBatchApprovePost"
      @success="onExamSuccess"
    ></batch-exam>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, reactive, Ref, ref, watch } from 'vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import ITable from '@/components/i-table/index.vue';
  import Add from './__components__/add.vue';
  import UpdateBill from './__components__/updateBill.vue';
  import Detail from './__components__/detail.vue';
  import Print from './__components__/print.vue';
  import BatchExam from '../__components__/batch-exam.vue';
  import BatchCollectPay from '../collect-pay/__components__/addPage.vue';
  import {
    cbdApiProjectMisBillListPost,
    cbdApiProjectMisBillConfirmPost,
    cbdApiProjectMisBillBatchApprovePost,
    type CbdApiProjectMisBillListPostResponse,
    cbdApiProjectMisBillDeleteGet,
    cbdApiProjectMisBillAddCollectionPost,
    CbdApiProjectMisBillAddCollectionPostResponse,
    cbdApiProjectMisBillSummaryPost,
    CbdApiProjectMisBillSummaryPostResponse,
    CbdApiProjectMisBillSummaryPostRequest,
    cbdApiProjectMisBillTaskStatusPost,
    CbdApiProjectMisBillListPostRequest,
    cbdApiProjectMisBillHandiworkPost,
    CbdApiProjectMisBillHandiworkPostRequest,
    cbdApiProjectMisBillExportPost
  } from '@/api';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    exportDownload,
    getActiveProjectId,
    setActiveProject,
    modalConfirm,
    valueFindLabel,
    hasCapableData
  } from '@/utils';
  import { useRequest } from '@har/use';
  import {
    projectList,
    merchantDropList,
    storeSelectList,
    expenseList,
    getExpenseList,
    getProjectListData,
    getMerchantDropList,
    getStoreSelectList
  } from '@/views/finance-manage/useGetCommonData';
  import {
    billSourceTypeList,
    billTypeList,
    business_status,
    examine_status
  } from '@/utils/dic';
  import { formatPrice } from '@/utils';

  type RowData = Required<CbdApiProjectMisBillListPostResponse>['rows'][0];

  type PageConfig = {
    showAdd: boolean;
    showBatchCP: boolean;
    showPrint: boolean;
    showUpdate: boolean;
    showDetail: boolean;
    source: string;
    id: string;
  };
  const doRefresh = () => {
    selectedKeys.value = [];
    selectCArr.value = [];
    selectPArr.value = [];
    getDataList({
      ...search.value,
      ...pageOptions.value
    });
    getStatistics({
      ...search.value
    } as unknown as CbdApiProjectMisBillSummaryPostRequest);
  };
  const dataType = ref(false);
  const handList = ref<number[]>([]);
  const onSuccess = () => {
    getDataList({
      ...search.value,
      ...pageOptions.value
    });
    getStatistics({
      ...search.value
    } as unknown as CbdApiProjectMisBillSummaryPostRequest);
    page.showDetail = false;
  };
  const tableListRef: Ref = ref(null);
  const selectBills = ref<CbdApiProjectMisBillAddCollectionPostResponse>([]);
  const page = reactive<PageConfig>({
    showAdd: false,
    showBatchCP: false,
    showPrint: false,
    showUpdate: false,
    showDetail: false,
    source: '',
    id: ''
  });
  const { run: onCertain, loading: cerLoading } = useRequest(
    cbdApiProjectMisBillConfirmPost,
    {
      manual: true,
      onSuccess() {
        doRefresh();
        Modal.open({
          title: '提示',
          content: '是否下载数据',
          onOk: async () => {
            const url = cbdApiProjectMisBillExportPost.requestConfig.path;
            await exportDownload(
              url,
              { ...search.value, idList: certainIds.value },
              '账单',
              'application/vnd.ms-excel',
              'post'
            );
            certainIds.value = [];
          }
        });
      }
    }
  );
  const statistics = ref<CbdApiProjectMisBillSummaryPostResponse>({});
  const { run: getStatistics } = useRequest(cbdApiProjectMisBillSummaryPost, {
    manual: true,
    onSuccess(res) {
      statistics.value = res;
    }
  });
  const pageOptions = ref({
    total: 0,
    pageNum: 1,
    pageSize: 10,
    current: 1
  });
  type TableData = Required<CbdApiProjectMisBillListPostResponse>['rows'][0];
  const dataList = ref<TableData[]>([]);
  const { run: getDataList } = useRequest(cbdApiProjectMisBillListPost, {
    manual: true,
    onSuccess(res) {
      dataList.value = res.rows as TableData[];
      pageOptions.value.total = res.total || 0;
    }
  });
  const certainIds = ref<number[]>([]);
  const onSubmitExamine = () => {
    const total: number = selectedKeys.value.length;
    const tempArr: RowData[] = tableListRef.value.data.filter(
      (el: RowData) =>
        [0, 1].includes(el.businessStat!) &&
        [1, 4, 5].includes(el.auditStat!) &&
        selectedKeys.value.includes(el.id!)
    );
    if (!tempArr.length) {
      Message.error('当前数据不能确认');
      return false;
    }
    Modal.open({
      title: '提示',
      content: tempArr.length
        ? `您勾选了${total} 条数据 , ${tempArr.length} 条可以提交 , 确认提交吗?`
        : `您勾选了${total} 条数据 , ${total > 1 ? '均' : ''}不能提交!`,
      onOk() {
        const ids: number[] = tempArr.map((el: RowData) => el.id!) || [];
        certainIds.value = ids;
        if (ids.length) {
          onCertain({
            idList: ids
          });
        }
      }
    });
  };

  const examineVisible = ref(false);
  const onConfirmExamine = () => {
    const flag = hasCapableData(
      tableListRef.value.data,
      selectedKeys.value,
      [1],
      [2]
    );
    if (!flag) return Message.error({ content: '选择数据存在不能审批项' });
    if (selectedKeys.value.length) {
      getTaskStatus({ billIds: selectedKeys.value });
    }
  };
  //获取可审批数量
  const { run: getTaskStatus } = useRequest(
    cbdApiProjectMisBillTaskStatusPost,
    {
      manual: true,
      onSuccess(e: { totalCount?: number; successCount?: number }) {
        if (e.successCount === 0) {
          Message.error('未找到可审批的数据');
        } else if (e.successCount === 1) {
          examineVisible.value = true;
        } else {
          modalConfirm(
            `${e.successCount}条数据在您的审批范围内，是否进行审批？`,
            () => {
              examineVisible.value = true;
            }
          );
        }
      }
    }
  );
  const onPressCharge = async () => {
    const tempArr = tableListRef.value.data.filter(
      (e: TableData) => e.billType === 1
    );
    const flag = hasCapableData(tempArr, selectedKeys.value, [2, 4], [3]);
    if (!flag) return Message.error({ content: '选择数据存在不能催缴的' });
    page.source = 'urge';
    page.showPrint = true;
  };
  const onConfirmPrint = async () => {
    const flag = hasCapableData(
      tableListRef.value.data,
      selectedKeys.value,
      [2, 4, 5],
      [3]
    );
    if (!flag) return Message.error({ content: '选择数据存在不支持打印的' });
    page.showPrint = true;
    page.source = 'bill';
  };

  const onAdd = () => {
    page.id = '';
    page.showAdd = true;
  };
  const onDetailPrint = () => {
    page.showPrint = true;
  };
  const onExamSuccess = () => {
    doRefresh();
  };
  const selectCArr = ref<number[]>([]);
  const selectPArr = ref<number[]>([]);
  const onBatchCollectPay = (type: string) => {
    const flag = hasCapableData(
      tableListRef.value.data,
      selectedKeys.value,
      [2, 4],
      [3]
    );
    if (!flag) return Message.error({ content: '选择数据存在不能收付款的' });
    const selectedArrContract = tableListRef.value.data
      .filter((el: RowData) => selectedKeys.value.includes(el.id!))
      .map((a: RowData) => a.contractCode);
    const uniqueContract = Array.from(new Set(selectedArrContract));

    if (selectCArr.value.length && selectPArr.value.length) {
      Message.error('只能选择同类型的账单');
      return false;
    }
    // 选的账单来自不同合同
    if (uniqueContract.length > 1) {
      Message.error('只能选择同一份合同下的账单');
      return false;
    }
    getBillInfo({
      idList: type === 'c' ? selectCArr.value : selectPArr.value
    });
  };
  const { run: getBillInfo, loading: billLoading } = useRequest(
    cbdApiProjectMisBillAddCollectionPost,
    {
      manual: true,
      onSuccess(res) {
        selectBills.value = res;
        if (!res.length) {
          Message.error('当前账单不能收付款');
          return false;
        }
        page.showBatchCP = true;
      }
    }
  );
  const showEditBtn = (record: RowData): boolean => {
    return !(record.auditStat === 2 || [3, 5].includes(record.businessStat!));
  };
  const showDeleteBtn = (record: RowData): boolean => {
    return (
      ![2, 3].includes(record.auditStat!) &&
      [0, 1].includes(record.businessStat!)
    );
  };
  const onExport = (ids?: number[]) => {
    const length = selectedKeys.value.length;
    const msg = length
      ? `您选择了${length}条数据,确定导出吗?`
      : `您未选择数据,要导出全部吗?`;
    modalConfirm(msg, () => {
      const url = cbdApiProjectMisBillExportPost.requestConfig.path;
      exportDownload(
        url,
        { ...search.value, idList: ids ? ids : selectedKeys.value },
        '账单',
        'application/vnd.ms-excel',
        'post'
      );
    });
  };
  const onEdit = (record: RowData) => {
    // 草稿
    if (record.businessStat === 0) {
      page.id = String(record.id!);
      page.showAdd = true;
    } else {
      // 账单调整页
      page.showUpdate = true;
      page.id = String(record.id!);
    }
  };
  const onSee = (record: RowData) => {
    page.showDetail = true;
    page.id = String(record.id!);
  };
  const onSeeDraft = (record: RowData) => {
    page.id = String(record.id!);
    page.showAdd = true;
  };
  const onDelete = (id: string) => {
    Modal.open({
      title: '警告',
      content: '数据删除后无法恢复,是否删除?',
      onOk: async () => {
        await cbdApiProjectMisBillDeleteGet({
          id
        });
        getDataList({
          ...search.value,
          ...pageOptions.value
        });
        getStatistics({
          ...search.value
        } as unknown as CbdApiProjectMisBillSummaryPostRequest);
      }
    });
  };
  const search = ref<Recordable>({
    projectId: Number(getActiveProjectId() || ''),
    pageSize: 10,
    pageNum: 1
  });

  const checkValue = ref<boolean | (string | number | boolean)[]>(false);
  const onCheck = (value: boolean | (string | number | boolean)[]) => {
    checkValue.value = value;
    search.value.isDoScrap = Number(value) + '';
  };

  //重置列表
  const onReset = () => {
    dataType.value = false;
    search.value = {
      projectId: Number(getActiveProjectId() || ''),
      pageSize: 10,
      pageNum: 1
    };
    pageOptions.value.pageNum = 1;
    pageOptions.value.current = 1;
    pageOptions.value.pageSize = 10;
    checkValue.value = false;
    selectedKeys.value = [];
    selectCArr.value = [];
    selectPArr.value = [];
    getDataList({
      ...search.value,
      ...pageOptions.value
    });
    getStatistics({
      ...search.value
    } as unknown as CbdApiProjectMisBillSummaryPostRequest);
  };
  const onSubmit = () => {
    dataType.value = false;
    pageOptions.value.pageNum = 1;
    pageOptions.value.current = 1;
    pageOptions.value.pageSize = 10;
    getDataList({
      ...search.value,
      ...pageOptions.value
    });
    getStatistics({
      ...search.value
    } as unknown as CbdApiProjectMisBillSummaryPostRequest);
  };
  const formABill = () => {
    dataType.value = true;
    handleFormBill({
      ...search.value
    } as unknown as CbdApiProjectMisBillHandiworkPostRequest);
  };
  const { run: handleFormBill } = useRequest(
    cbdApiProjectMisBillHandiworkPost,
    {
      manual: true,
      onSuccess(res) {
        const { idList = [] } = res;
        handList.value = idList;
        getDataList({
          idList
        } as unknown as CbdApiProjectMisBillListPostRequest);
        getStatistics({
          idList
        } as unknown as CbdApiProjectMisBillSummaryPostRequest);
      }
    }
  );
  const pageChange = (v: number) => {
    pageOptions.value.current = v;
    pageOptions.value.pageNum = v;
    if (dataType.value) {
      getDataList({
        ...pageOptions.value,
        idList: handList.value
      });
    } else {
      getDataList({
        ...search.value,
        ...pageOptions.value
      });
    }
  };
  const pageSizeChange = (v: number) => {
    pageOptions.value.pageSize = v;
    if (dataType.value) {
      getDataList({
        ...pageOptions.value,
        idList: handList.value
      });
    } else {
      getDataList({
        ...search.value,
        ...pageOptions.value
      });
    }
  };
  const selectedKeys = ref<Array<number>>([]);
  const options = computed(() => {
    return {
      menuOtherOptions: {
        scroll: {
          x: '120%'
        },
        rowKey: 'id',
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
          width: 140,
          tooltip: true,
          ellipsis: true
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
              setActiveProject(val);
              getMerchantDropList(val);
              getStoreSelectList({ projectId: val });
            }
          }
        },
        {
          label: '账期',
          prop: 'paymentDays',
          type: 'date',
          hide: true,
          search: true,
          options: {
            format: 'YYYY-MM-DD'
          }
        },
        {
          label: '账单类型',
          prop: 'billType',
          type: 'select',
          width: 100,
          dic: billTypeList,
          search: true
        },
        {
          label: '账单号',
          width: 150,
          prop: 'billNum'
        },
        {
          label: '商户',
          width: 120,
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
          width: 180,
          search: true
        },
        {
          label: '店铺',
          width: 130,
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
          dic: storeSelectList.value,
          options: {
            allowSearch: true,
            maxLength: 20
          }
        },
        {
          label: '费用项目',
          prop: 'expenseItemsId',
          search: true,
          hide: true,
          dic: expenseList.value,
          type: 'select',
          options: {
            allowSearch: true,
            maxLength: 20,
            fieldNames: {
              label: 'expenseType',
              value: 'expenseId'
            }
          }
        },
        {
          label: '费用项目',
          width: 150,
          prop: 'expenseItemsName'
        },
        {
          label: '账单来源',
          prop: 'billSourceType',
          search: true,
          width: 110,
          type: 'select',
          dic: billSourceTypeList,
          options: {
            allowSearch: true,
            maxLength: 20
          }
        },
        {
          label: '生成日期',
          prop: 'billCreateAt',
          type: 'dateRange',
          width: 120,
          search: true,
          options: {
            onChange: (val: string[]) => {
              const [start, end] = val;
              search.value.billCreateStart = start;
              search.value.billCreateEnd = end;
            }
          }
        },
        {
          label: '费用期间',
          prop: 'expensePeriod',
          width: 200
        },
        {
          label: '账单金额',
          width: 120,
          prop: 'amount',
          formatter: (e: RowData) => formatPrice(e.amount!)
        },
        {
          label: '业务状态',
          prop: 'businessStat',
          type: 'select',
          width: 120,
          dic: business_status,
          options: {
            multiple: true
          },
          search: true
        },
        {
          label: '审批状态',
          prop: 'auditStat',
          type: 'select',
          width: 120,
          dic: examine_status,
          options: {
            multiple: true
          },
          search: true
        },
        {
          label: '',
          prop: 'showAbandon',
          type: 'checkbox',
          span: 12,
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
    };
  });
  onMounted(() => {
    getProjectListData();
    getStatistics({
      ...search.value
    } as CbdApiProjectMisBillSummaryPostRequest);
    getDataList({
      ...search.value,
      ...pageOptions.value
    });
    getExpenseList({
      parentExpenseCodes:
        '202212270001,202212270002,202212270003,202212270004,202212270005,202212270006,202212270007,202212270008,202212270009,202212270010',
      projectId: search.value.projectId
    });
    const id = search.value.projectId;
    if (id) {
      getMerchantDropList(id);
      getStoreSelectList({ projectId: id });
    }
  });
  watch(
    () => selectedKeys.value,
    (v) => {
      selectCArr.value = tableListRef.value.data
        .filter((el: RowData) => v.includes(el.id!) && el.billType === 1)
        .map((a: RowData) => a.id);
      selectPArr.value = v.filter(
        (el: number) => !selectCArr.value.includes(el)
      );
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
