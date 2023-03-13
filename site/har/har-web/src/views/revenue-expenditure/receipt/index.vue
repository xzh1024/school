<template>
  <div>
    <i-table
      v-model="search"
      v-model:refresh-now="refresh"
      :options="page.options"
      :api="cbdApiProjectReceiptPageGet"
      @reset="handleReset"
    >
      <template #statusCell="{ record }">
        {{ receiptStatusHash[record.status] }}
      </template>
      <template #typeCell="{ record }">
        {{ costTypeHash[record.type] }}
      </template>
      <template #paymentMethodCell="{ record }">
        {{ paymentMethodHash[record.paymentMethod] }}
      </template>
      <template #menu="{ record }">
        <a-button
          v-permission="['receipt:info']"
          type="text"
          @click="showDrawer(record)"
          >查看</a-button
        >
      </template>
    </i-table>
    <drawer
      v-model="page.drawerVisible"
      title="查询收款单"
      :footer="permissions"
    >
      <div class="white-detail-box">
        <detail
          v-model="permissions"
          v-model:refresh="refresh"
          :bill-id="receiptId"
        />
      </div>
      <template #footer>
        <a-button
          v-permission="['receipt:audit']"
          type="secondary"
          @click="showAuditModal('refuse')"
          >审核拒绝</a-button
        >
        <a-button
          v-permission="['receipt:audit']"
          type="primary"
          @click="showAuditModal('pass')"
          >审核通过</a-button
        >
      </template>
    </drawer>
    <audit-modal
      ref="auditModal"
      v-model="page.auditModalVisible"
      :title="page.title"
      @submit="submitReceiptInfo"
    ></audit-modal>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Index'
  };
</script>

<script setup lang="ts">
  import { ref, reactive, provide, readonly } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import { Message } from '@arco-design/web-vue';

  import {
    cbdApiProjectReceiptPageGet,
    cbdApiProjectReceiptAuditPost
  } from '@/api';
  import type { CbdApiProjectReceiptPageGetResponse } from '@/api';
  import {
    receiptStatusHash,
    paymentMethodHash,
    costTypeHash,
    paymentMethodList,
    receiptStatusList
  } from '@/utils/dic';
  import AuditModal from '@/components/audit-modal.vue';
  import Detail from '../__components__/receipt/detail.vue';
  type RowData = Required<CbdApiProjectReceiptPageGetResponse>['rows'][0];

  const search = ref<{
    collectionDateStart?: string;
    collectionDateEnd?: string;
  }>({
    collectionDateStart: '',
    collectionDateEnd: ''
  });
  const permissions = ref<boolean>(false);
  const refresh = ref<boolean>(false);
  const receiptId = ref<number>();

  const page = reactive<any>({
    drawerVisible: false,
    auditModalVisible: false,
    isPass: false,
    title: '',
    options: {
      index: true,
      submitText: '搜索',
      tableCard: true,
      menuOptions: {},
      menuSpan: 24,
      columns: [
        {
          label: '支付方式',
          prop: 'paymentMethod',
          type: 'select',
          search: true,
          hide: true,
          dic: paymentMethodList
        },
        {
          label: '收款单号',
          prop: 'code'
        },
        {
          label: '源账单号',
          prop: 'accountReceivableCode'
        },
        {
          label: '费用类型',
          prop: 'typeName'
        },
        // {
        //   label: '应收总金额（¥）',
        //   prop: 'actualAmount'
        // },
        {
          label: '实收金额（¥）',
          prop: 'amountReceived'
        },
        {
          label: '收款方式',
          prop: 'paymentMethod'
        },
        {
          label: '状态',
          type: 'select',
          prop: 'status',
          search: true,
          dic: receiptStatusList
        },
        {
          label: '收款时间',
          prop: 'time',
          type: 'dateRange',
          placeholder: ['请选择开始时间', '请选择结束时间'],
          search: true,
          hide: true,
          on: {
            change(v: string[]) {
              search.value = {
                ...search.value,
                collectionDateStart: v[0] || '',
                collectionDateEnd: v[1] || ''
              };
            }
          }
        },
        {
          label: '收款时间',
          prop: 'collectionDate',
          align: 'center',
          formatter: (record: RowData) => record.collectionDate || '--'
        },
        {
          label: '审核完成时间',
          prop: 'auditTime',
          align: 'center',
          formatter: (record: RowData) => record.auditTime || '--'
        }
      ]
    }
  });
  function showDrawer(v: RowData) {
    page.drawerVisible = !page.drawerVisible;
    receiptId.value = v.id!;
  }
  function handleReset() {
    delete search.value.collectionDateStart;
    delete search.value.collectionDateEnd;
  }
  function showAuditModal(v: string) {
    page.auditModalVisible = !page.auditModalVisible;
    page.isPass = v === 'pass';
    page.title =
      v === 'refuse' ? `确认拒绝当前收款单？` : '确认通过当前收款单？';
  }
  async function submitReceiptInfo(v: any) {
    await cbdApiProjectReceiptAuditPost({
      id: Number(receiptId.value),
      approval: page.isPass,
      opinion: v.remark
    });
    page.auditModalVisible = !page.auditModalVisible;
    refresh.value = true;
    Message.success('操作成功!');
  }
  provide('receiptId', readonly(receiptId));
</script>

<style scoped></style>
