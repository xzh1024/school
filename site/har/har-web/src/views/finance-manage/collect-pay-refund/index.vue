<template>
  <div class="page-container">
    <i-table
      ref="tableListRef"
      v-model="search"
      v-model:refresh-now="isRefresh"
      v-model:selectedKeys="selectedKeys"
      v-model:page="page"
      :options="options"
      :api="getList"
      @reset="onReset"
    >
      <template #showAbandonForm>
        <a-checkbox v-model="checkValue" :value="1" @change="onCheck">
          显示已作废数据
        </a-checkbox>
      </template>
      <template #header>
        <div class="flex align-center justify-between">
          <a-space>
            <a-button
              v-permission="['mis:payment_refund:commit']"
              class="i-btn"
              type="primary"
              @click="onAdd"
            >
              添加退款
            </a-button>
            <a-button
              v-permission="['mis:payment_refund:export']"
              class="i-btn"
              type="primary"
              @click="onBatchExport"
            >
              批量导出
            </a-button>

            <a-tooltip content="待确认（未提交、已驳回）的数据">
              <a-button
                v-permission="['mis:payment_refund:confirm']"
                class="i-btn"
                type="primary"
                @click="onBatchConfirm"
              >
                确认
              </a-button>
            </a-tooltip>
            <a-tooltip content="待确认（审批中）的数据">
              <a-button
                v-permission="['mis:payment_refund:audit']"
                class="i-btn"
                type="primary"
                @click="onConfirmExamine"
              >
                审批
              </a-button>
            </a-tooltip>
            <a-button
              v-permission="['mis:payment_refund:print']"
              :disabled="!selectedKeys.length"
              class="i-btn"
              type="primary"
              @click="onConfirmPrint"
            >
              打印
            </a-button>
          </a-space>
          <div class="flex align-center">
            <a-descriptions
              layout="inline-horizontal"
              :column="3"
              :label-style="{ 'padding-left': '8px', 'color': '#999999' }"
              :value-style="{ color: '#333333' }"
            >
              <a-descriptions-item label="所有单据：">
                ￥{{ refundAmountCount?.totalRefundAmount }}（{{
                  refundAmountCount?.totalRefundCount
                }}笔）
              </a-descriptions-item>
              <a-descriptions-item label="审核中：">
                ￥{{ refundAmountCount?.inAuditRefundAmount }}（{{
                  refundAmountCount?.inAuditRefundCount
                }}笔）
              </a-descriptions-item>
              <a-descriptions-item label="已通过：">
                ￥{{ refundAmountCount?.passedRefundAmount }}（{{
                  refundAmountCount?.passedRefundCount
                }}笔）
              </a-descriptions-item>
            </a-descriptions>
          </div>
        </div>
      </template>
      <template #businessStatCell="{ record }">
        {{ valueFindLabel(pay_collect_status, record.businessStat) }}
      </template>
      <template #auditStatCell="{ record }">
        {{ valueFindLabel(examine_status, record.auditStat) }}
      </template>
      <template #optionalCell="{ record }">
        <a-space>
          <div
            v-if="getEditVisible(record)"
            v-permission="['mis:payment_refund:modify']"
            class="s-btn"
            @click="onEdit(record)"
          >
            编辑
          </div>
          <div
            v-permission="['mis:payment_refund:detail']"
            class="s-btn"
            @click="onSee(record)"
          >
            查看
          </div>
          <a-popconfirm
            v-if="getDeleteVisible(record)"
            v-permission="['mis:payment_refund:delete']"
            type="warning"
            content="删除后数据无法恢复，是否删除？"
            @ok="onDelete(record.id)"
          >
            <div class="s-btn">删除</div>
          </a-popconfirm>
        </a-space>
      </template>
    </i-table>
    <select-list
      v-if="page.showSelect"
      v-model="page.showSelect"
      v-model:isPay="isPay"
      @select="onSelect"
    />
    <add-page
      v-if="page.showAddPage"
      v-model="page.showAddPage"
      :is-pay="isPay"
      :data="selectBills"
      :bill-list="billList"
      @show-bill-detail="showBillDetail"
      @show-collect-pay-detail="showCollectPayDetail"
      @refresh="
        () => {
          page.showSelect = false;
          page.showAddPage = false;
          initData();
        }
      "
    />
    <edit-page
      v-if="page.showEditPage"
      :id="selectRow?.id"
      v-model="page.showEditPage"
      @show-bill-detail="showBillDetail"
      @show-collect-pay-detail="showCollectPayDetail"
      @refresh="
        () => {
          page.showEditPage = false;
          initData();
        }
      "
    />
    <detail
      v-if="page.showDetail"
      :id="selectRow?.id"
      v-model="page.showDetail"
      :row-data="selectRow"
      @show-edit="showEdit"
      @show-bill-detail="showBillDetail"
      @show-collect-pay-detail="showCollectPayDetail"
      @refresh="
        () => {
          page.showDetail = false;
          initData();
        }
      "
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
    <batch-confirm
      v-model:visible="batchConfirmVisible"
      @submit="onSubmitExamine"
    />
    <batch-audit
      ref="batchAuditRef"
      :select-data="selectedKeys"
      @success="onExamSuccess"
    />
    <bill-detail
      v-if="page.showBillDetail"
      :id="page.billDetailId"
      v-model="page.showBillDetail"
      disabled
    />
    <collect-pay-detail
      v-if="page.showCollectPayDetail"
      :id="page.collectPayDetailId"
      v-model="page.showCollectPayDetail"
      disabled
    />
    <print
      v-if="showPrint"
      v-model="showPrint"
      :ids="selectedKeys"
      source="refund"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, reactive, ref } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import ITable from '@/components/i-table/index.vue';
  import SelectList from './__components__/select.vue';
  import AddPage from './__components__/addPage.vue';
  import Print from '../__components__/print.vue';
  import EditPage from './__components__/editPage.vue';
  import Detail from './__components__/detail.vue';
  import {
    cbdApiProjectMisPayMethodListPost,
    CbdApiProjectMisPayMethodListPostResponse,
    cbdApiProjectMisPaymentRefundPageListGet,
    CbdApiProjectMisPaymentRefundPageListGetRequest,
    CbdApiProjectMisPaymentRefundPageListGetResponse,
    cbdApiProjectMisPaymentRefundAmountCountGet,
    CbdApiProjectMisPaymentRefundAmountCountGetResponse,
    cbdApiProjectMisPaymentRefundConfirmPost,
    CbdApiProjectMisPaymentRefundConfirmPostRequest,
    cbdApiProjectMisPaymentRefundExportPost,
    cbdApiProjectMisPaymentRefundDeletePost,
    CbdApiProjectMisPaymentRefundGetListBeforeAddGetResponse
  } from '@/api';
  import {
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
    getActiveProjectId,
    valueFindLabel,
    exportDownloadPost
  } from '@/utils';
  import { useRequest } from '@har/use';
  import BatchAudit from './__components__/batchAudit.vue';
  import BatchConfirm from './__components__/batchConfirm.vue';
  import BillDetail from '@/views/finance-manage/bill/__components__/detail.vue';
  import CollectPayDetail from '@/views/finance-manage/collect-pay/__components__/detail.vue';

  type BillModel =
    Required<CbdApiProjectMisPaymentRefundGetListBeforeAddGetResponse>['rows'][0]['billOutput'];
  type PaymentModel =
    Required<CbdApiProjectMisPaymentRefundGetListBeforeAddGetResponse>['rows'][0];
  type RowModel =
    Required<CbdApiProjectMisPaymentRefundPageListGetResponse>['rows'][0];
  type PageConfig = {
    showSelect: boolean;
    showAddPage: boolean;
    showEditPage: boolean;
    showUpdate: boolean;
    showDetail: boolean;
    showBillDetail: boolean;
    showCollectPayDetail: boolean;
    id: string;
    billDetailId: string;
    collectPayDetailId: string;
    current: number;
    pageSize: number;
    total: number;
  };

  const getList = (params: CbdApiProjectMisPaymentRefundPageListGetRequest) => {
    // 获取统计信息
    getRefundAmountCount(params);
    return cbdApiProjectMisPaymentRefundPageListGet(params);
  };
  const page = reactive<PageConfig>({
    showSelect: false,
    showAddPage: false,
    showEditPage: false,
    showUpdate: false,
    showDetail: false,
    showBillDetail: false,
    showCollectPayDetail: false,
    id: '',
    billDetailId: '',
    collectPayDetailId: '',
    current: 1,
    pageSize: 10,
    total: 0
  });
  const showBillDetail = (id: string) => {
    page.billDetailId = id;
    page.showBillDetail = true;
  };
  const showCollectPayDetail = (id: string) => {
    page.collectPayDetailId = id;
    page.showCollectPayDetail = true;
  };
  const tableListRef = ref<InstanceType<typeof ITable>>();
  const batchAuditRef = ref<InstanceType<typeof BatchAudit>>();

  const isRefresh = ref(false);
  const isPay = ref(false);
  const billList = ref<BillModel[]>([]);
  const selectRow = ref<RowModel>();
  const refundAmountCount =
    ref<CbdApiProjectMisPaymentRefundAmountCountGetResponse>({
      totalRefundAmount: 0,
      totalRefundCount: 0,
      inAuditRefundAmount: 0,
      inAuditRefundCount: 0,
      passedRefundAmount: 0,
      passedRefundCount: 0
    });
  const selectBills = ref<PaymentModel[]>([]); // 收/付款单列表
  const { run: getRefundAmountCount } = useRequest(
    cbdApiProjectMisPaymentRefundAmountCountGet,
    {
      manual: true,
      onSuccess(res) {
        refundAmountCount.value = res;
      }
    }
  );
  const onConfirmExamine = () => {
    if (selectedKeys.value.length < 1)
      return Message.error({ content: '请先择审批项' });
    const flag = selectedKeys.value.every((item) => {
      const obj = tableListRef.value?.data.find(
        (sub: RowModel) => sub.id === item
      );
      return obj && obj.businessStat === 1 && obj.auditStat === 2;
    });
    if (!flag) return Message.error({ content: '选择数据存在不能提交审批项' });
    batchAuditRef.value?.show();
  };
  const onExamSuccess = () => {
    isRefresh.value = true;
    initData();
  };
  const showPrint = ref(false);
  const onConfirmPrint = async () => {
    const flag = selectedKeys.value.every((item) => {
      const obj = tableListRef.value?.data.find(
        (sub: any) => Number(sub.id) === Number(item)
      );
      return obj && [1, 2].includes(obj.businessStat);
    });
    if (!flag) return Message.error({ content: '选择数据存在不支持打印的' });
    showPrint.value = true;
  };
  const onAdd = () => {
    page.showSelect = true;
  };

  const exportVisible = ref(false);
  const exportContent = ref('');
  const onBatchExport = () => {
    exportContent.value = selectedKeys.value.length
      ? '是否导出选中数据？'
      : '是否导出结果页全部数据？';
    exportVisible.value = true;
  };
  const confirmExport = () => {
    const url = cbdApiProjectMisPaymentRefundExportPost.requestConfig.path;
    if (selectedKeys.value.length > 0) {
      exportDownloadPost(url, { idList: selectedKeys.value }, '收付款单退款');
    } else {
      exportDownloadPost(
        url,
        {
          req: {
            ...search.value,
            pageNum: page.current,
            pageSize: page.pageSize
          }
        },
        '收付款单退款'
      );
    }
  };
  // 批量确认
  const batchConfirmVisible = ref(false);
  const onBatchConfirm = () => {
    if (selectedKeys.value.length < 1)
      return Message.error({ content: '请先选择确认项' });
    const flag = selectedKeys.value.every((id) => {
      const obj = tableListRef.value?.data.find(
        (sub: RowModel) => sub.id === id
      );
      return obj && obj.businessStat === 1 && [1, 4].includes(obj.auditStat);
    });
    if (!flag) return Message.error({ content: '选择数据存在不能确认审批项' });
    batchConfirmVisible.value = true;
  };
  const onSubmitExamine = (data = {}) => {
    submitExamine({
      ...data,
      idList: selectedKeys.value
    } as CbdApiProjectMisPaymentRefundConfirmPostRequest);
  };
  const { run: submitExamine } = useRequest(
    cbdApiProjectMisPaymentRefundConfirmPost,
    {
      manual: true,
      onSuccess: () => {
        Message.success({ content: '批量确认成功' });
        initData();
        batchConfirmVisible.value = false;
      }
    }
  );
  const initData = () => {
    selectedKeys.value = [];
    Object.assign(page, { total: 0, current: 1 });
    isRefresh.value = true;
  };
  const onEdit = (record: RowModel) => {
    selectRow.value = record;
    page.showEditPage = true;
  };
  const onSee = (record: RowModel) => {
    page.showDetail = true;
    selectRow.value = record;
  };

  const { run: batchDelete } = useRequest(
    cbdApiProjectMisPaymentRefundDeletePost,
    {
      manual: true,
      onSuccess: () => {
        Message.success({ content: '删除成功' });
        initData();
      }
    }
  );
  const onDelete = async (recordId: number) => {
    batchDelete({ idList: [recordId] });
  };

  const checkValue = ref<boolean | (string | number | boolean)[]>(false);
  const onCheck = (value: boolean | (string | number | boolean)[]) => {
    checkValue.value = value;
    search.value.cancelStat = value ? 1 : 0;
  };

  type SearchType = {
    cancelStat: number;
    projectId: number;
    refundStart?: string;
    refundEnd?: string;
  };
  const search = ref<SearchType>({
    cancelStat: checkValue.value ? 1 : 0,
    projectId: getActiveProjectId()
  });

  const showEdit = () => {
    page.showEditPage = true;
    page.showDetail = false;
  };

  const selectedKeys = ref<Array<number>>([]);
  const payMethodList = ref<{ value: number; label: string }[]>([]);
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
        onSelectionChange: (e: number[]) => {
          selectedKeys.value = e;
        }
      },
      menu: false,
      menuSpan: 18,
      pageShow: true,
      index: true,
      indexTitle: '序号',
      indexWidth: 40,
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
            onChange: (val: number) => {
              getPayMethodList({ projectId: val, scenes: 1 });
              getMerchantDropList(val);
              getStoreSelectList(val);
            }
          }
        },
        {
          label: '退款单号',
          width: 130,
          prop: 'refundCode',
          ellipsis: true,
          tooltip: true,
        },
        {
          label: '支付方式',
          prop: 'payMethodId',
          search: true,
          hide: true,
          type: 'select',
          dic: payMethodList
        },
        {
          label: '退款方式',
          width: 100,
          prop: 'payMethodName'
        },
        {
          label: '商户',
          width: 100,
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
            maxLength: 20
          }
        },
        {
          label: '合同号',
          prop: 'contractCode',
          width: 150
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
          label: '退款日期',
          prop: 'changeDate',
          type: 'dateRange',
          search: true,
          hide: true,
          options: {
            onChange: (val: string[]) => {
              const [refundStart, refundEnd] = val;
              search.value = {
                ...search.value,
                refundStart,
                refundEnd
              };
            }
          }
        },
        {
          label: '退款期间',
          width: 120,
          prop: 'billStartAt',
          formatter: (el: RowModel): string =>
            `${el.billStartAt}~${el.billEndAt}`,
          ellipsis: true,
          tooltip: true,
        },
        {
          label: '退款金额',
          width: 100,
          prop: 'refundAmount',
          formatter: (el: RowModel): string => `￥${el.refundAmount}`
        },
        {
          label: '退款日期',
          width: 120,
          prop: 'refundAt'
        },
        {
          label: '业务状态',
          width: 90,
          prop: 'businessStat',
          type: 'select',
          dic: pay_collect_status,
          search: true,
          options: {
            multiple: true,
            maxTagCount: 1
          }
        },
        {
          label: '审批状态',
          prop: 'auditStat',
          width: 90,
          type: 'select',
          dic: examine_status,
          search: true,
          options: {
            multiple: true,
            maxTagCount: 1
          }
        },
        {
          label: '是否已开票',
          width: 120,
          prop: 'invoiceStat',
          type: 'select',
          dic: invoiceStatList,
          search: true,
          formatter: (el: RowModel) =>
            valueFindLabel(invoiceStatList, el.invoiceStat)
        },
        {
          label: '',
          prop: 'showAbandon',
          type: 'checkbox',
          search: true,
          hide: true
        },
        {
          label: '操作',
          prop: 'optional',
          width: 86,
          fixed: 'right'
        }
      ]
    };
  });
  const onSelect = (data: PaymentModel[]) => {
    page.showAddPage = true;
    selectBills.value = data;
  };
  type PayMethod = Required<CbdApiProjectMisPayMethodListPostResponse>[0];
  type MethodDetail = Required<PayMethod>['methodDetails'][0];
  const { run: getPayMethodList } = useRequest(
    cbdApiProjectMisPayMethodListPost,
    {
      manual: true,
      onSuccess(res) {
        payMethodList.value = [];
        res.forEach((el: PayMethod) => {
          el.methodDetails?.forEach((each: MethodDetail) => {
            if (each.switchs === 1) {
              payMethodList.value.push({
                value: Number(each.id),
                label: String(each.paymentMethod)
              });
            }
          });
        });
      }
    }
  );
  const getEditVisible = (record: RowModel) => {
    const { businessStat, auditStat } = record;
    return (
      (businessStat === 0 && auditStat === 1) ||
      (businessStat === 1 && [1, 4, 5].includes(auditStat))
    );
  };
  const getDeleteVisible = (record: RowModel) => {
    const { businessStat, auditStat } = record;
    return (
      (businessStat === 0 && auditStat === 1) ||
      (businessStat === 1 && [1, 4, 5].includes(auditStat))
    );
  };
  const onReset = () => {
    search.value = {
      cancelStat: checkValue.value ? 1 : 0,
      projectId: getActiveProjectId()
    };
  };
  onMounted(() => {
    getProjectListData();
    getExpenseList({ parentExpenseCode: '0' });
    const id = search.value.projectId;
    if (id) {
      getMerchantDropList(id);
      getStoreSelectList(id);
      getPayMethodList({ projectId: id, scenes: 1 });
    }
  });
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
