<template>
  <div>
    <i-table
      v-model="page.search"
      v-model:refresh-now="refresh"
      :options="page.options"
      :api="cbdApiProjectAccountReceivablePageGet"
    >
      <template #statusCell="{ record }">
        {{ billStatusHash[record.status] }}
      </template>
      <template #collectRentWayCell="{ record }">
        {{ collectRentsWayHash[record.collectRentWay] || '--' }}
      </template>
      <template #menu="{ record }">
        <a-button
          v-permission="['account:receivable:info']"
          type="text"
          @click="showDrawer(record)"
          >查看</a-button
        >
      </template>
    </i-table>
    <drawer
      v-if="page.drawerVisible"
      v-model="page.drawerVisible"
      title="查询应收账款"
      :footer="page.showBtn"
    >
      <div class="white-detail-box">
        <detail
          :bill-id="String(billId)"
          :refresh="refreshDetail"
          @show="page.showBtn = true"
          @hide="handleShowBtn"
        />
      </div>
      <template #footer>
        <a-button
          v-permission="['receipt:add']"
          type="primary"
          @click="showReceiveBillModal"
          >去收款</a-button
        >
      </template>
    </drawer>
    <receive-modal
      v-if="page.receiveModalVisible"
      :id="String(billId)"
      v-model="page.receiveModalVisible"
      :code="String(code)"
      @submit="submitReceiptInfo"
    />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Index'
  };
</script>

<script setup lang="ts">
  import { ref, reactive, provide, readonly } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import ITable from '@/components/i-table/index.vue';
  import ReceiveModal from '@/components/receive-modal/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import { cbdApiProjectAccountReceivablePageGet } from '@/api';
  import type { CbdApiProjectAccountReceivablePageGetResponse } from '@/api';
  import {
    billStatusHash,
    billStatusList,
    collectRentsWayHash
  } from '@/utils/dic';
  import Detail from '../__components__/bill/detail.vue';
  import useGetCompanyData from '@/hooks/useGetCompanyData';
  type RowData =
    Required<CbdApiProjectAccountReceivablePageGetResponse>['rows'][0];
  type PageConfig = {
    drawerVisible: boolean;
    showBtn: boolean;
    receiveModalVisible: boolean;
    search?: any;
    options: any;
  };
  const [contractPartA] = useGetCompanyData();
  const billId = ref<number | string>('');
  const code = ref<string>('');
  const refresh = ref(false);
  const refreshDetail = ref(false);
  const page = reactive<PageConfig>({
    search: {},
    drawerVisible: false,
    showBtn: true, // 是否展示去收款按钮
    receiveModalVisible: false,
    options: {
      index: true,
      submitText: '搜索',
      tableCard: true,
      menuSpan: 24,
      menuOptions: {},
      columns: [
        {
          label: '基本资料',
          prop: 'baseInfo',
          placeholder: '请输入合同编号/承租企业/承租人搜索',
          search: true,
          hide: true
        },
        {
          label: '合同甲方',
          type: 'treeSelect',
          prop: 'companyId',
          search: true,
          hide: true,
          dic: contractPartA.value,
          props: {
            key: 'value',
            title: 'label',
            children: 'children'
          }
        },
        {
          label: '状态',
          type: 'select',
          prop: 'status',
          search: true,
          hide: true,
          dic: billStatusList
        },
        {
          label: '账单号',
          prop: 'code',
          search: true
        },
        {
          label: '商户 / 企业名称',
          prop: 'merchantName'
        },
        {
          label: '合同编号 / 能耗单据号',
          prop: 'contractCode'
        },
        {
          label: '收款类型',
          prop: 'typeName'
        },
        {
          label: '收租方式',
          prop: 'collectRentWay'
        },
        {
          label: '期数',
          prop: 'billCycleStr'
        },
        {
          label: '待收款（¥）',
          prop: 'lastAmount'
        },
        {
          label: '状态',
          prop: 'status'
        },
        {
          label: '最后还款日',
          prop: 'lastRepaymentDate',
          formatter: (record: RowData) => record.lastRepaymentDate || '--'
        }
      ]
    }
  });

  function handleShowBtn() {
    page.showBtn = false;
  }
  function showDrawer(v: RowData) {
    billId.value = v.id!;
    code.value = v.code!;
    page.drawerVisible = !page.drawerVisible;
  }
  function showReceiveBillModal() {
    page.receiveModalVisible = true;
  }
  function submitReceiptInfo() {
    // 后台异步代码 数据不是实时更新
    setTimeout(() => {
      refresh.value = !refresh.value;
      refreshDetail.value = !refreshDetail.value;
      page.showBtn = true;
      Message.success('操作成功!');
    }, 1500);
  }
  provide('billId', readonly(billId));
</script>

<style scoped></style>
