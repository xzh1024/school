<template>
  <div>
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.isRefresh"
      :options="page.options"
      :api="groundPcApiStoreProductInOutOrderPageGet"
      @reset="handleReset"
    >
      <template #header>
        <a-button
          v-permission="['store:product:in:out:order:add']"
          type="outline"
          @click="emits('show', 'in')"
          >新增入库</a-button
        >
      </template>
      <template #wayCell="{ record }">
        {{ shopInStockWayHash[record.way] }}
      </template>
      <template #statusCell="{ record }">
        {{ shopInStockStatusHash[record.status] }}
      </template>
      <template #menu="{ record }">
        <a-button
          v-permission="['store:product:in:out:order:info']"
          type="text"
          @click="handleDetail(record)"
          >查看</a-button
        >
      </template>
    </i-table>
    <stock-history
      v-if="page.showHistory"
      v-model="page.showHistory"
      :order-id="page.orderId"
      type="in"
    />
  </div>
</template>

<script setup lang="ts">
  import { reactive, watch } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import {
    groundPcApiStoreProductInOutOrderPageGet,
    GroundPcApiStoreProductInOutOrderPageGetResponse
  } from '@/api/ground-pc-api';

  import {
    shopInStockStatus,
    shopInStockWay,
    shopInStockWayHash,
    shopInStockStatusHash
  } from '@/utils/dic';
  import StockHistory from './stock-history.vue';
  type RowData =
    Required<GroundPcApiStoreProductInOutOrderPageGetResponse>['rows'][0];

  const props = defineProps({
    shopId: {
      type: Number
    },
    refresh: {
      type: Boolean,
      default: false
    }
  });
  const emits = defineEmits(['show']);
  interface PageDataType {
    orderId: number | undefined;
    search: {
      queryType: number;
      storeId: number;
      startTime?: string;
      endTime?: string;
    };
    options?: object;
    isRefresh: boolean;
    showHistory: boolean;
  }
  const page = reactive<PageDataType>({
    orderId: undefined,
    search: {
      queryType: 1,
      storeId: props.shopId!
    },
    isRefresh: false,
    showHistory: false,
    options: {
      indexTitle: '序号',
      index: true,
      submitText: '搜索',
      tableCard: true,
      menuSpan: 24,
      columns: [
        {
          label: '单据筛选',
          prop: 'key',
          placeholder: ' 请输入入库单号/原单据编号搜索',
          search: true,
          hide: true
        },
        {
          label: '原单据编号',
          prop: 'orderCode'
        },
        {
          label: '入库单号',
          prop: 'code'
        },
        {
          label: '操作人',
          prop: 'createBy'
        },
        {
          label: '入库类型',
          prop: 'way',
          search: true,
          type: 'select',
          dic: shopInStockWay
        },
        {
          label: '入库时间',
          prop: 'time',
          placeholder: ['开始时间', ' 结束时间'],
          search: true,
          hide: true,
          type: 'dateRange',
          on: {
            change(v: string[]) {
              page.search = {
                ...page.search,
                startTime: v[0] || '',
                endTime: v[1] || ''
              };
            }
          }
        },
        {
          label: '入库时间',
          prop: 'createTime'
        },
        {
          label: '入库状态',
          prop: 'status',
          placeholder: '请选择状态',
          search: true,
          type: 'select',
          dic: shopInStockStatus
        },
        {
          label: '操作时间',
          prop: 'createTime'
        },
        {
          label: '入库数量',
          prop: 'num'
        },
        {
          label: '入库价值（¥）',
          prop: 'amount'
        }
      ]
    }
  });
  const handleDetail = (it: RowData): void => {
    page.showHistory = !page.showHistory;
    page.orderId = it.id!;
  };
  function handleReset() {
    delete page.search.startTime;
    delete page.search.endTime;
  }
  watch(
    () => props.shopId,
    (v) => {
      if (v) {
        page.search.storeId = v;
        page.search.queryType = 1;
        page.isRefresh = true;
      }
    },
    { immediate: true }
  );
  watch(
    () => props.refresh,
    () => {
      page.isRefresh = true;
    }
  );
</script>

<style scoped lang="less">
  .tab-card {
    :deep(.arco-tabs-content) {
      padding-top: 0;
    }
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
