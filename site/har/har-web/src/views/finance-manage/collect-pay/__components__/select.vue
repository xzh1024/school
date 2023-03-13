<template>
  <drawer v-model="visible" title="选择账单">
    <div class="add-box">
      <i-table
        ref="tableRef"
        v-model="search"
        v-model:selected-keys="selectKeys"
        v-model:refresh-now="refresh"
        :disabled-keys="disabledKeys"
        :api-auto-get="false"
        :options="options"
        :data="tableData"
        @submit="onSearch"
      >
        <template #billSourceTypeCell="{ record }">
          {{ valueFindLabel(billSourceTypeList, record.billSourceType) }}
        </template>
        <template #businessStatCell="{ record }">
          {{ valueFindLabel(billPaymentList, record.businessStat) }}
        </template>
        <template #auditStatCell> 已通过 </template>
      </i-table>
    </div>

    <template #footer>
      <a-button class="cancel-btn" @click="visible = false">取消</a-button>
      <a-button type="primary" @click="onCertain">确认</a-button>
    </template>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, Ref } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import ITable from '@/components/i-table/index.vue';
  import {
    getActiveProjectId,
    setActiveProject,
    valueFindLabel
  } from '@/utils';
  import {
    billTypeList,
    billSourceTypeList,
    billPaymentList
  } from '@/utils/dic';
  import {
    cbdApiProjectMisBillAddCollectionPost,
    type CbdApiProjectMisBillAddCollectionPostResponse
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

  type RowData = CbdApiProjectMisBillAddCollectionPostResponse[0];
  const refresh = ref(false);
  const search = ref<{
    projectId: number;
    billType: number;
    merchantId?: number;
    storeId?: number;
  }>({
    projectId: getActiveProjectId(),
    billType: 1,
    merchantId: undefined,
    storeId: undefined
  });
  const tableRef: Ref = ref(null);
  const tableData = ref<RowData[]>([]);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    }
  });
  const emits = defineEmits(['update:modelValue', 'select']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const selectKeys = ref<number[]>([]);
  const disabledKeys = ref<number[]>([]);
  const options = computed(() => {
    return {
      index: true,
      notPage: true,
      indexTitle: '序号',
      layout: 'vertical',
      menu: false,
      pageShow: false,
      submitBtnIcon: false,
      resetBtn: true,
      menuSpan: 24,
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
          console.log(e, '--选择的数据id--');
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
          label: '账单类型',
          prop: 'billType',
          dic: billTypeList,
          type: 'select',
          search: true,
          hide: true,
          rules: [{ required: true, message: '请完善账单类型后查询' }]
        },
        {
          label: '账单编号',
          width: 120,
          ellipsis: true,
          tooltip: true,
          prop: 'billNum'
        },
        {
          label: '费用项目',
          width: 120,
          prop: 'expenseItemsName'
        },
        {
          label: '来源',
          width: 100,
          prop: 'billSourceType'
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
          label: '账单生成日期',
          width: 125,
          prop: 'billCreateAt'
        },
        {
          label: search.value.billType === 1 ? '已收金额' : '已付金额',
          width: 100,
          prop: 'collectionAndPaymentAmount'
        },
        {
          label: '审批状态',
          width: 100,
          prop: 'auditStat'
        },
        {
          label: '支付状态',
          prop: 'businessStat',
          width: 100
        }
      ]
    };
  });
  const onSearch = () => {
    const { projectId, merchantId, storeId, billType } = search.value;
    if (projectId && merchantId && storeId && billType) {
      getList({
        ...search.value
      });
    } else {
      tableData.value = [];
    }
  };
  const { run: getList } = useRequest(cbdApiProjectMisBillAddCollectionPost, {
    manual: true,
    onSuccess(res) {
      tableData.value = res;
    }
  });
  const onCertain = async () => {
    if (!selectKeys.value?.length) {
      Message.error('请先勾选账单');
      return false;
    }
    const target: RowData[] = tableData.value.filter((el: RowData) =>
      selectKeys.value.includes(el.id!)
    );
    emits('select', target);
  };

  onMounted(async () => {
    Bus.$on('delete', (id) => {
      selectKeys.value = selectKeys.value.filter((el: number) => el !== id);
    });
    Bus.$on('disable', (ids) => {
      disabledKeys.value = ids;
      onSearch();
    });
    search.value.projectId = getActiveProjectId();
    getProjectListData();
    if (search.value.projectId) {
      getMerchantDropList(search.value.projectId);
      getStoreSelectList({ projectId: search.value.projectId });
    }
  });
</script>
<style scoped lang="less">
  .add-box {
    width: 100%;
  }
</style>
