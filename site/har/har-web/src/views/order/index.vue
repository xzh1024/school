<template>
  <div class="wrapper">
    <i-table
      v-model="page.search"
      :options="options"
      :api="cbdApiProjectOrderListGet"
      @reset="handleReset"
    >
      <template #orderTypeCell="{ record }">
        {{
          record.orderType === 1
            ? '商品订单'
            : record.orderType === 2
            ? '场馆订单'
            : '--'
        }}
      </template>
      <template #orderSourceCell="{ record }">
        {{
          record.orderSource === 1
            ? '线上'
            : record.orderSource === 2
            ? '线下'
            : '--'
        }}
      </template>
      <template #orderStatusCell="{ record }">
        {{ orderStatusHash[record.orderStatus] }}
      </template>
      <template #menu="{ record }">
        <a-button
          v-permission="['order:info']"
          type="text"
          @click="handleViewDetail(record)"
          >查看</a-button
        >
      </template>
    </i-table>
    <detail
      v-if="page.detailVisible"
      v-model="page.detailVisible"
      :order-no="page.orderNo"
      source="goods"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, reactive, computed } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectCommonStoreSelectGet,
    cbdApiProjectOrderListGet
  } from '@/api';
  import type {
    CbdApiProjectCommonStoreSelectGetResponse,
    CbdApiProjectOrderListGetResponse
  } from '@/api';
  import Detail from './__components__/detail.vue';
  import { orderStatus, orderStatusHash } from '@/utils/dic';
  type RowData = Required<CbdApiProjectOrderListGetResponse>['rows'][0];
  const shopList = ref<CbdApiProjectCommonStoreSelectGetResponse>([]);
  const page = reactive<{
    orderNo: string;
    search: {
      orderStatus: string;
      startTime?: string;
      endTime?: string;
    };
    detailVisible: boolean;
  }>({
    orderNo: '',
    search: {
      orderStatus: '',
      startTime: '',
      endTime: ''
    },
    detailVisible: false
  });
  const options = computed(() => {
    return {
      indexTitle: '序号',
      index: true,
      submitText: '搜索',
      menuSpan: 24,
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
          label: '订单编号',
          prop: 'orderNo'
        },
        {
          label: '订单类型',
          prop: 'orderType'
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
          label: '店铺搜素',
          prop: 'storeId',
          type: 'select',
          search: true,
          hide: true,
          dic: shopList.value
        },
        {
          label: '店铺名称',
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
    };
  });
  function handleViewDetail(record: RowData) {
    page.orderNo = record.orderNo!;
    page.detailVisible = true;
  }
  function handleReset() {
    delete page.search.startTime;
    delete page.search.endTime;
  }
  const [getShopList] = useFuncProxy(async () => {
    shopList.value = await cbdApiProjectCommonStoreSelectGet({});
  });
  onMounted(() => {
    getShopList();
  });
</script>
