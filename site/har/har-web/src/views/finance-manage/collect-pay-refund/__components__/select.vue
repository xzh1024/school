<template>
  <drawer v-model="visible" title="选择账单">
    <div class="add-box">
      <i-table
        ref="tableRef"
        v-model="search"
        v-model:selected-keys="selectKeys"
        v-model:refresh-now="refresh"
        v-model:page="page"
        :api-auto-get="false"
        :options="options"
        :data="tableData"
        @submit="onSearch"
      >
      </i-table>
    </div>

    <template #footer>
      <a-button @click="visible = false">取消</a-button>
      <a-button type="primary" @click="onCertain">确认</a-button>
    </template>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, onMounted } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import ITable from '@/components/i-table/index.vue';
  import { getActiveProjectId, setActiveProject } from '@/utils';
  import { billTypeList } from '@/utils/dic';
  import {
    cbdApiProjectMisPaymentRefundGetListBeforeAddGet,
    type CbdApiProjectMisPaymentRefundGetListBeforeAddGetResponse
  } from '@/api';
  import {
    projectList,
    merchantDropList,
    storeSelectList,
    getProjectListData,
    getMerchantDropList,
    getStoreSelectList
  } from '@/views/finance-manage/useGetCommonData';
  import { Message } from '@arco-design/web-vue';
  import { useRequest } from '@har/use';
  import Bus from '../event';

  type RowData =
    Required<CbdApiProjectMisPaymentRefundGetListBeforeAddGetResponse>['rows'][0];
  const refresh = ref(false);
  type PageConfig = {
    current: number;
    pageSize: number;
    total?: number;
  };
  const page = reactive<PageConfig>({
    current: 1,
    pageSize: 10,
    total: 0
  });

  type SearchType = {
    projectId: number;
    paymentType: number;
    merchantId?: number;
    storeId?: number;
  };
  const search = ref<SearchType>({
    projectId: getActiveProjectId(),
    paymentType: 1, // 收付款单类型1收款单2付款单
    merchantId: undefined,
    storeId: undefined
  });
  const tableRef = ref<InstanceType<typeof ITable>>();
  const tableData = ref<RowData[]>([]);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    isPay: {
      type: Boolean
    }
  });
  const emits = defineEmits(['update:modelValue', 'select', 'update:isPay']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const selectKeys = ref<number[]>([]);
  const options = computed(() => {
    return {
      index: true,
      indexTitle: '序号',
      layout: 'vertical',
      menu: false,
      submitBtnIcon: false,
      resetBtn: true,
      menuSpan: 24,
      menuOtherOptions: {
        scroll: {
          x: '120%'
        },
        rowKey: 'paymentId',
        rowSelection: {
          type: 'checkbox',
          showCheckedAll: true
        },
        onSelectionChange: (e: number[]) => {
          selectKeys.value = e;
        }
      },
      columns: [
        {
          label: '项目名称：',
          prop: 'projectId',
          type: 'select',
          dic: projectList.value,
          search: true,
          hide: true,
          options: {
            onChange(e: string) {
              search.value.storeId = undefined;
              search.value.merchantId = undefined;
              setActiveProject(e);
              getMerchantDropList(e);
              getStoreSelectList(e);
            }
          },
          rules: [{ required: true, message: '请完善归属项目后查询' }]
        },
        {
          label: '商户',
          prop: 'merchantId',
          search: true,
          hide: true,
          type: 'select',
          options: {
            allowSearch: true,
            onChange(e: string) {
              search.value.storeId = undefined;
              getStoreSelectList({
                projectId: search.value.projectId,
                merchantId: e
              });
            }
          },
          dic: merchantDropList.value,
          rules: [{ required: true, message: '请完善商户信息后查询' }]
        },
        {
          label: '店铺',
          prop: 'storeId',
          search: true,
          hide: true,
          type: 'select',
          options: {
            allowSearch: true
          },
          dic: storeSelectList.value,
          rules: [{ required: true, message: '请完善店铺信息后查询' }]
        },
        {
          label: '单据类型',
          prop: 'paymentType',
          dic: billTypeList,
          type: 'select',
          search: true,
          hide: true,
          rules: [{ required: true, message: '请完善单据类型后查询' }]
        },
        {
          label: '收付款单号',
          width: 120,
          ellipsis: true,
          tooltip: true,
          prop: 'paymentNum'
        },
        {
          label: '费用项目',
          width: 120,
          prop: 'expenseItemName'
        },
        {
          label: '账期',
          width: 80,
          prop: 'paymentDays'
        },
        {
          label: '费用期间',
          width: 230,
          prop: 'expensePeriod'
        },
        {
          label: '已收金额',
          width: 100,
          prop: 'amount',
          formatter: (el: RowData): string => `￥${el.amount}`
        },
        {
          label: '可退金额',
          width: 100,
          prop: 'refundAbleAmount',
          formatter: (el: RowData): string => `￥${el.refundAbleAmount}`
        }
      ]
    };
  });
  const onSearch = () => {
    const { projectId, merchantId, storeId, paymentType } = search.value;
    if (projectId && merchantId && storeId && paymentType) {
      getList({
        ...search.value,
        projectId: String(projectId),
        merchantId: String(merchantId),
        storeId: String(storeId),
        paymentType: String(paymentType),
        pageNum: String(page.current),
        pageSize: String(page.pageSize)
      });
    } else {
      tableData.value = [];
    }
  };
  const { run: getList } = useRequest(
    cbdApiProjectMisPaymentRefundGetListBeforeAddGet,
    {
      manual: true,
      onSuccess(res) {
        selectKeys.value = [];
        tableData.value = res.rows as RowData[];
        page.total = res.total;
        emits('update:isPay', search.value.paymentType === 2);
      }
    }
  );
  const onCertain = async () => {
    if (!selectKeys.value?.length) {
      Message.error('请先勾选账单');
      return false;
    }
    const target: RowData[] = tableRef.value?.data.filter((el: RowData) =>
      selectKeys.value.includes(el.paymentId)
    );
    emits('select', target);
  };

  onMounted(async () => {
    Bus.$on('delete', (id) => {
      selectKeys.value = selectKeys.value.filter((el: number) => el !== id);
    });
    search.value.projectId = getActiveProjectId();
    getProjectListData();
    if (search.value.projectId) {
      getMerchantDropList(search.value.projectId);
      getStoreSelectList({
        projectId: search.value.projectId
      });
    }
  });
</script>
<style scoped lang="less">
  .add-box {
    width: 100%;
  }
</style>
