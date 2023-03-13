<template>
  <div class="page-container">
    <i-table
      ref="tableListRef"
      v-model="search"
      v-model:refresh-now="isRefresh"
      v-model:selectedKeys="selectedKeys"
      v-model:page="page"
      :options="options"
      :api="cbdApiProjectBillInvoicePageGet"
    >
      <template #header>
        <a-space>
          <a-tooltip content="发票状态：未开票、已撤销、开票失败">
            <a-button
              v-permission="['bill-invoice:open']"
              class="i-btn"
              type="primary"
              :loading="billLoading"
              @click="onBill"
            >
              开票
            </a-button>
          </a-tooltip>
          <a-tooltip content="发票状态：开票中">
            <a-button
              v-permission="['bill-invoice:revocation']"
              class="i-btn"
              type="primary"
              :loading="cancelBillLoading"
              @click="onCancelBill"
            >
              撤销开票
            </a-button>
          </a-tooltip>
        </a-space>
      </template>
    </i-table>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import {
    cbdApiProjectCommonProjectSelectListGet,
    type CbdApiProjectCommonProjectSelectListGetResponse,
    cbdApiProjectCommonMerchantListGet,
    type CbdApiProjectCommonMerchantListGetResponse,
    cbdApiProjectCommonContractStoreSelectGet,
    type CbdApiProjectCommonContractStoreSelectGetResponse,
    cbdApiProjectBillInvoicePageGet,
    type CbdApiProjectBillInvoicePageGetRequest,
    type CbdApiProjectBillInvoicePageGetResponse,
    cbdApiProjectBillInvoiceOpenPost,
    cbdApiProjectBillInvoiceRevocationPost
  } from '@/api';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import ITable from '@/components/i-table/index.vue';
  import { valueFindLabel } from '@/utils';
  import { invoiceTypeList, invoiceStatList2 } from '@/utils/dic';
  import { useRequest } from '@har/use';

  type PageConfig = {
    current: number;
    pageSize: number;
    total: number;
  };
  const page = reactive<PageConfig>({
    current: 1,
    pageSize: 10,
    total: 0
  });

  const isRefresh = ref(false);

  type RowModel = Required<CbdApiProjectBillInvoicePageGetResponse>['rows'][0];

  const tableListRef = ref<InstanceType<typeof ITable> | null>(null);

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
  //店铺下拉列表
  const storeSelectList =
    ref<CbdApiProjectCommonContractStoreSelectGetResponse>([]);
  const [getStoreSelectList] = useFuncProxy(async (projectId: string) => {
    storeSelectList.value = await cbdApiProjectCommonContractStoreSelectGet({
      projectId
    });
  });

  const search = ref<CbdApiProjectBillInvoicePageGetRequest>({});

  const selectedKeys = ref<Array<number>>([]);
  const options = reactive({
    menuOtherOptions: {
      scroll: {
        x: '140%'
      },
      rowKey: 'id',
      rowSelection: {
        type: 'checkbox',
        showCheckedAll: true,
        fixed: true
      },
      onSelect: (e: number[]) => {
        console.log(e, '--选择的数据id--');
        selectedKeys.value = e;
      }
    },
    menu: false,
    menuSpan: 24,
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
        tooltip: true
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
          maxLength: 20
        }
      },
      {
        label: '单据类型',
        prop: 'billType',
        formatter: (row: RowModel) =>
          row.type ? (row.type === 1 ? '收/付款单' : '退款单') : '--'
      },
      {
        label: '业务单据号',
        prop: 'misPaymentCode',
        width: 110
      },
      {
        label: '商户',
        prop: 'merchantName'
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
        label: '店铺',
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
        label: '费用项目',
        prop: 'expenseItemsName'
      },
      {
        label: '来源',
        prop: 'billSourceType',
        formatter: (row: RowModel) =>
          row.billSourceType === 1 ? '合同' : '手工录入'
      },
      {
        label: '账期',
        prop: 'paymentDays'
      },
      {
        label: '费用期间',
        prop: 'startAt',
        formatter: (row: RowModel) => `${row.startAt}~${row.endAt}`
      },
      {
        label: '总金额',
        prop: 'amount'
      },
      {
        label: '发票状态',
        prop: 'status',
        type: 'select',
        dic: invoiceStatList2,
        search: true,
        options: {
          multiple: true,
          maxTagCount: 1
        },
        formatter: (row: RowModel) =>
          valueFindLabel(invoiceStatList2, row.status)
      },
      {
        label: '失败原因',
        prop: 'openFailureReason',
        formatter: (row: RowModel) => row.openFailureReason || '-'
      },
      {
        label: '发票分类',
        prop: 'type',
        type: 'select',
        dic: invoiceTypeList,
        search: true,
        formatter: (row: RowModel) => valueFindLabel(invoiceTypeList, row.type)
      }
    ]
  });

  const onBill = () => {
    if (selectedKeys.value.length < 1) {
      return Message.error({ content: '请选择数据' });
    }
    const flag = selectedKeys.value.every((id) => {
      const findData = tableListRef.value?.data.find(
        (item: RowModel) => Number(item.id) === Number(id)
      );
      return findData && [1, 5, 6].includes(findData.status);
    });
    if (!flag) {
      return Message.error({ content: '选择数据存在不能开票' });
    }
    doBill({ idList: selectedKeys.value });
  };
  const { loading: billLoading, run: doBill } = useRequest(
    cbdApiProjectBillInvoiceOpenPost,
    {
      manual: true,
      onSuccess() {
        selectedKeys.value = [];
        Message.success({ content: '开票成功' });
        initData();
      }
    }
  );

  const onCancelBill = () => {
    if (selectedKeys.value.length < 1) {
      return Message.error({ content: '请选择数据' });
    }
    const flag = selectedKeys.value.every((id) => {
      const findData = tableListRef.value?.data.find(
        (item: RowModel) => Number(item.id) === Number(id)
      );
      return findData && findData.status === 2;
    });
    if (!flag) {
      return Message.error({ content: '选择数据存在不能撤销开票' });
    }
    doCancelBill({ idList: selectedKeys.value });
  };
  const { loading: cancelBillLoading, run: doCancelBill } = useRequest(
    cbdApiProjectBillInvoiceRevocationPost,
    {
      manual: true,
      onSuccess() {
        selectedKeys.value = [];
        Message.success({ content: '撤销开票成功' });
        initData();
      }
    }
  );

  const initData = () => {
    selectedKeys.value = [];
    Object.assign(page, { total: 0, current: 1 });
    isRefresh.value = true;
  };

  onMounted(() => {
    getProjectList();
    getMerchantList('');
    getStoreSelectList('');
  });
</script>

<style scoped lang="less">
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
</style>
