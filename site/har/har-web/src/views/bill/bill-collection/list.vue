<template>
  <div>
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      :options="page.options"
      :api="cbdApiProjectTenementReceivableBillListGet"
      @reset="tableFormReset"
    >
      <template #billCycleStartDateCell="{ record }">
        {{ `${record.billCycleStartDate}~${record.billCycleEndDate}` }}
      </template>
      <template #merchantIdCell="{ record }">
        {{ record.merchantName }}
      </template>
      <template #menu="{ record }">
        <a-button type="text" @click="handlePrint(record)">打印</a-button>
      </template>
    </i-table>

    <print-model
      v-model="modelVisible"
      title="催收单"
      :row-id="rowId"
      @close="close"
    />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import {
    cbdApiProjectCommonMerchantSelectGet,
    cbdApiProjectTenementReceivableBillListGet
  } from '@/api';
  import PrintModel from './__components__/print-model.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';

  const modelVisible = ref(false);
  const rowId = ref('');

  type optionItem = {
    label?: string;
    value?: string | number;
  };
  const merchantList = ref<optionItem[]>([]);
  const [getMerchantList] = useFuncProxy(async () => {
    const res = await cbdApiProjectCommonMerchantSelectGet({});
    merchantList.value = res;
    page.options.columns[4].dic = res;
  });

  interface PageConfig {
    search?: any;
    options?: any;
    showEditModal?: boolean;
    showConfigModal?: boolean;
    refresh?: boolean;
    showDetail?: boolean;
    modelTitle?: string;
    menuOtherOptions?: any;
  }
  const page = reactive<PageConfig>({
    search: {
      contractCode: '',
      merchantId: '',
      date: [],
      billStartRepaymentDateStart: '',
      billStartRepaymentDateEnd: ''
    },
    showEditModal: false,
    showConfigModal: false,
    refresh: false,
    showDetail: false,
    options: {
      indexTitle: '序号',
      index: true,
      submitText: '搜索',
      tableCard: true,
      columns: [
        {
          label: '时间',
          prop: 'date',
          search: true,
          hide: true,
          type: 'dateRange',
          on: {
            change: (val: string[]) => {
              page.search = {
                ...page.search,
                billStartRepaymentDateStart: val ? val[0] : '',
                billStartRepaymentDateEnd: val ? val[1] : ''
              };
              console.log(page.search);
            }
          }
        },
        {
          label: '单据号',
          prop: 'code',
          width: 250
        },
        {
          label: '合同号',
          search: true,
          prop: 'contractCode'
        },
        {
          label: '商户',
          prop: 'merchantId',
          type: 'select',
          search: true,
          dic: merchantList.value,
          on: {
            change: (val: string) => {
              page.search = {
                ...page.search,
                merchantId: val
              };
            }
          }
        },
        {
          label: '账期',
          prop: 'billCycleStartDate'
        },
        {
          label: '账单金额',
          prop: 'actualAmount'
        },
        {
          label: '未收金额',
          prop: 'amountUnreceived'
        }
      ]
    }
  });

  function tableFormReset() {
    delete page.search.billStartRepaymentDateStart;
    delete page.search.billStartRepaymentDateEnd;
  }

  function handlePrint(record: { id: string }) {
    rowId.value = String(record.id);
    modelVisible.value = true;
  }

  function close() {
    rowId.value = '';
    modelVisible.value = false;
  }

  onMounted(() => {
    getMerchantList();
  });
</script>

<style scoped></style>
