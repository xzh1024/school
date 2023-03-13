<template>
  <drawer v-model="visible" title="查看商品" :footer="activeTab === '1'">
    <template #footer>
      <a-button type="primary" @click="handleInStock">去入库</a-button>
      <a-button type="primary" @click="handleOutStock">去出库</a-button>
    </template>
    <a-tabs default-active-key="1" @change="handleChange">
      <a-tab-pane key="1" title="库存概况">
        <stock-goods-info
          v-if="stockId"
          type="view"
          :refresh="isDetailRefresh"
          :store-id="shopId"
          :stock-id="stockId"
        />
      </a-tab-pane>
      <a-tab-pane key="2" title="入库明细">
        <i-table
          v-if="activeTab === '2'"
          v-model="page.search"
          v-model:refresh-now="page.refresh"
          :options="page.inStockOptions"
          :api="groundPcApiStoreProductStockSingleProductListGet"
          @reset="handleReset"
        >
          <template #wayCell="{ record }">
            {{ shopInStockWayHash[record.way] }}
          </template>
          <template #statusCell="{ record }">
            {{ shopInStockStatusHash[record.status] }}
          </template>
        </i-table>
      </a-tab-pane>
      <a-tab-pane key="3" title="出库明细">
        <i-table
          v-if="activeTab === '3'"
          v-model="page.search"
          :options="page.outStockOptions"
          :api="groundPcApiStoreProductStockSingleProductListGet"
        >
          <template #wayCell="{ record }">
            {{ shopOutStockWayHash[record.way] }}
          </template>
          <template #statusCell="{ record }">
            {{ shopOutStockStatusHash[record.status] }}
          </template>
        </i-table>
      </a-tab-pane>
    </a-tabs>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, Ref, reactive, computed, watch, onUnmounted } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import ITable from '@/components/i-table/index.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    shopInStockWay,
    shopInStockWayHash,
    shopOutStockWay,
    shopOutStockWayHash,
    shopInStockStatusHash,
    shopOutStockStatusHash
  } from '@/utils/dic';
  import {
    groundPcApiStoreProductStockSingleProductListGet,
    groundPcApiStoreProductAllSkuStoreProductIdGet,
    type GroundPcApiStoreProductAllSkuStoreProductIdGetResponse
  } from '@/api/ground-pc-api';
  import StockGoodsInfo from './stock-goods-info.vue';
  type SpecItem = GroundPcApiStoreProductAllSkuStoreProductIdGetResponse[0];

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    refresh: {
      type: Boolean,
      default: false
    },
    stockId: {
      type: Number
    },
    shopId: {
      type: [String, Number],
      default: ''
    }
  });
  const emits = defineEmits([
    'update:modelValue',
    'update:refresh',
    'inStock',
    'outStock'
  ]);
  const activeTab = ref('1');
  const specList = ref<Array<{ label: string; value: number }>>([]);
  const page = reactive<{
    search: {
      startTime?: string;
      endTime?: string;
      storeProductId: number | undefined;
      queryType?: number;
    };
    refresh: boolean;
    inStockOptions: any;
    outStockOptions: any;
  }>({
    search: {
      storeProductId: props.stockId,
      startTime: '',
      endTime: '',
      queryType: undefined
    },
    refresh: false,
    inStockOptions: {
      submitText: '搜索',
      tableCard: false,
      menu: false,
      columns: [
        {
          label: '入库时间',
          prop: 'inTime',
          placeholder: ['开始时间', '结束时间'],
          search: true,
          hide: true,
          span: 8,
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
          label: '原单据编号',
          prop: 'orderCode',
          formatter: (e: any) => e.orderCode || '-'
        },
        {
          label: '入库单号',
          prop: 'code'
        },
        {
          label: '操作人',
          prop: 'createBy',
          search: true,
          span: 8
        },
        {
          label: '操作时间',
          prop: 'createTime'
        },
        {
          label: '入库规格',
          prop: 'storeProductWeightId',
          search: true,
          hide: true,
          type: 'select',
          dic: specList.value,
          span: 8
        },
        {
          label: '入库规格',
          prop: 'sku'
        },
        {
          label: '入库类型',
          prop: 'way',
          search: true,
          type: 'select',
          dic: shopInStockWay,
          span: 8
        },
        {
          label: '状态',
          prop: 'status'
        },
        {
          label: '入库数量',
          prop: 'num'
        }
      ]
    },
    outStockOptions: {
      submitText: '搜索',
      tableCard: false,
      menu: false,
      columns: [
        {
          label: '出库时间',
          prop: 'inTime',
          placeholder: ['开始时间', '结束时间'],
          search: true,
          hide: true,
          span: 8,
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
          label: '原单据编号',
          prop: 'orderCode',
          formatter: (e: any) => e.orderCode || '-'
        },
        {
          label: '出库单号',
          prop: 'code'
        },
        {
          label: '操作人',
          prop: 'createBy',
          search: true,
          span: 8
        },
        {
          label: '操作时间',
          prop: 'createTime'
        },
        {
          label: '出库规格',
          prop: 'storeProductWeightId',
          search: true,
          hide: true,
          type: 'select',
          dic: specList.value,
          span: 8
        },
        {
          label: '出库规格',
          prop: 'sku'
        },
        {
          label: '出库类型',
          prop: 'way',
          search: true,
          type: 'select',
          dic: shopOutStockWay,
          span: 8
        },
        {
          label: '状态',
          prop: 'status'
        },
        {
          label: '出库数量',
          prop: 'num'
        }
      ]
    }
  });
  const handleReset = () => {
    delete page.search.startTime;
    delete page.search.endTime;
  };
  const visible: Ref<boolean> = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const handleChange = (v: string | number | boolean) => {
    activeTab.value = String(v!);
    if (v === '2') {
      page.search.queryType = 1;
    } else if (v === '3') {
      page.search.queryType = 2;
    }
  };
  const handleInStock = () => {
    emits('inStock');
  };
  const handleOutStock = () => {
    emits('outStock');
  };

  const [getSpecData] = useFuncProxy(async () => {
    const res = await groundPcApiStoreProductAllSkuStoreProductIdGet({
      storeProductId: String(props.stockId!)
    });
    res.forEach((el: SpecItem) => {
      specList.value.push({
        label: el.sku!,
        value: el.storeProductWeightId!
      });
    });
  });
  const isDetailRefresh: Ref = computed({
    get() {
      return props.refresh;
    },
    set(v) {
      emits('update:refresh', v);
    }
  });
  onUnmounted(() => {
    page.search = {
      storeProductId: undefined,
      startTime: '',
      endTime: '',
      queryType: undefined
    };
  });
  watch(
    () => props.stockId,
    (v) => {
      if (v) {
        page.search.storeProductId = v;
        getSpecData();
      }
    },
    { immediate: true }
  );
</script>

<style scoped></style>
