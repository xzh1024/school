<template>
  <div class="wrapper">
    <i-table
      v-model:refresh-now="page.refresh"
      v-model="page.search"
      :options="page.options"
      :page="page.pageOptions"
      :api="groundPcApiOrderListGet"
      @reset="handleReset"
    >
      <template #menu="{ record }">
        <!--        v-permission="['order:info']"-->
        <a-button
          style="margin-left: -15px"
          type="text"
          @click="handleViewDetail(record)"
          >查看</a-button
        >
      </template>
      <template #orderSourceCell="{ record }">
        {{ record.orderSource === 1 ? '线上' : '线下' }}
      </template>
      <template #orderStatusCell="{ record }">
        {{ orderStatusHash[record.orderStatus] || '--' }}
      </template>
    </i-table>
    <detail
      v-if="page.detailVisible"
      v-model="page.detailVisible"
      :order-no="page.orderNo"
      source="goods"
    ></detail>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import {
    groundPcApiCommonStoreSelectGet,
    groundPcApiOrderListGet,
    type GroundPcApiOrderListGetResponse
  } from '@/api/ground-pc-api';
  import Detail from './__components__/detail.vue';
  import { orderStatus, orderStatusHash } from '@/utils/dic';
  type RowData = Required<GroundPcApiOrderListGetResponse>['rows'][0];
  const page = reactive<any>({
    search: {
      orderStatus: ''
    },
    detailVisible: false,
    pageOptions: {
      current: 1
    },
    refresh: false,
    shopList: [],
    options: {
      indexTitle: '序号',
      index: true,
      submitText: '搜索',
      menuSpan: 18,
      tableCard: true,
      columns: [
        {
          label: '订单筛选',
          prop: 'orderNo',
          placeholder: '请输入订单编号筛选',
          search: true,
          hide: true,
          span: 6
        },
        {
          label: '店铺搜索',
          prop: 'storeId',
          type: 'select',
          placeholder: '请选择店铺搜索',
          search: true,
          hide: true,
          span: 6,
          dicRequest: groundPcApiCommonStoreSelectGet
        },
        {
          label: '订单编号',
          prop: 'orderNo'
        },
        {
          label: '订单类型',
          prop: 'orderType',
          type: 'select',
          dic: [
            { label: '商品订单', value: 1 },
            { label: '场馆订单', value: 2 }
          ],
          formatter: (e: RowData) =>
            e.orderType === 1 ? '商品订单' : '场馆订单'
        },
        {
          label: '店铺号',
          prop: 'storeCode'
        },
        {
          label: '项目名称',
          prop: 'projectName'
        },
        {
          label: '店铺',
          prop: 'storeName'
        },
        {
          label: '订单来源',
          prop: 'orderSource',
          type: 'select',
          search: true,
          span: 6,
          dic: [
            { label: '线上', value: 1 },
            { label: '线下', value: 2 }
          ]
        },
        {
          label: '订单金额（¥）',
          prop: 'orderTotalPrice'
        },
        {
          label: '状态',
          prop: 'orderStatus',
          type: 'select',
          search: true,
          span: 6,
          dic: orderStatus
        },
        {
          label: '下单时间',
          prop: 'createTime',
          type: 'dateRange',
          placeholder: ['请选择开始时间', '请选择结束时间'],
          search: true,
          span: 6,
          on: {
            change(v: string[]) {
              page.search = {
                ...page.search,
                startTime: v[0] || '',
                endTime: v[1] || ''
              };
            }
          }
        }
      ]
    }
  });
  function handleViewDetail(record: RowData) {
    page.orderNo = record.orderNo;
    page.detailVisible = true;
  }
  function handleReset() {
    delete page.search.startTime;
    delete page.search.endTime;
  }
</script>

<style scoped lang="less">
  .tab-card {
    :deep(.arco-card-body) {
      padding-bottom: 5px;
    }
  }

  :deep(.arco-tabs-nav) {
    padding-bottom: 5px;
    background-color: #fff;
  }

  :deep(.arco-tabs-content) {
    padding-top: 0;
  }

  .empty {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80vh;
    background-color: #fff;
  }
</style>
