<template>
  <drawer
    v-model="visible"
    :title="type === 'in' ? '查看入库单' : '查看出库单'"
    :footer="false"
  >
    <a-divider orientation="left">{{
      type === 'in' ? '入库单信息' : '出库单信息'
    }}</a-divider>
    <a-descriptions
      :column="3"
      :data="page.historyList.data"
      layout="inline-horizontal"
      :label-style="{ marginBottom: '15px' }"
      :value-style="listItemStyle"
    >
      <descriptions-item
        v-for="(item, idx) in listItems"
        :key="idx"
        :span="item.span"
        :label="item.label + '：'"
      >
        {{ useFormatDescription(page.historyList.data, item) }}
      </descriptions-item>
    </a-descriptions>
    <a-divider orientation="left">{{
      props.type === 'in' ? '入库明细' : '出库明细'
    }}</a-divider>
    <i-table :options="options" :data="page.inOutInfoList"></i-table>
  </drawer>
</template>

<script setup lang="ts">
  import { reactive, computed, watch } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import ITable from '@/components/i-table/index.vue';
  import useFormatDescription from '@/hooks/useFormatDescription';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    ListDataType,
    listItemStyle,
    shopOutStockWayHash,
    shopOutStockStatusHash,
    shopInStockWayHash,
    shopInStockStatusHash
  } from '@/utils/dic';
  import { groundPcApiStoreProductInOutOrderInfoIdGet } from '@/api/ground-pc-api';
  import { DescriptionsItem } from '@arco-design/web-vue';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: '',
      required: true
    },
    orderId: {
      type: Number
    }
  });
  const emits = defineEmits(['update:modelValue']);
  interface pageConfig {
    historyList: any;
    inStockOptions: any;
    outStockOptions: any;
    inOutInfoList: any;
  }
  const page = reactive<pageConfig>({
    historyList: {
      data: {}
    },
    inOutInfoList: [],
    inStockOptions: {
      index: true,
      indexTitle: '序号',
      submitText: '搜索',
      tableCard: false,
      menu: false,
      columns: [
        {
          label: '商品名称',
          prop: 'productName'
        },
        {
          label: '商品分类',
          prop: 'classifyName'
        },
        {
          label: '品牌',
          prop: 'brandName'
        },
        {
          label: '单位',
          prop: 'unitName'
        },
        {
          label: '规格',
          prop: 'sku'
        },
        {
          label: '入库数量',
          prop: 'num'
        }
      ]
    },
    outStockOptions: {
      index: true,
      indexTitle: '序号',
      submitText: '搜索',
      tableCard: false,
      menu: false,
      columns: [
        {
          label: '商品名称',
          prop: 'productName'
        },
        {
          label: '商品分类',
          prop: 'classifyName'
        },
        {
          label: '品牌',
          prop: 'brandName'
        },
        {
          label: '单位',
          prop: 'unitName'
        },
        {
          label: '规格',
          prop: 'sku'
        },
        {
          label: '出库数量',
          prop: 'num'
        }
      ]
    }
  });
  const inStockItems: Array<ListDataType> = [
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
      label: '操作时间',
      prop: 'createTime'
    },
    {
      label: '入库类型',
      prop: 'way',
      isEnum: true,
      source: shopInStockWayHash
    },
    {
      label: '入库数量',
      prop: 'num'
    },
    {
      label: '入库价值（¥）',
      prop: 'amount'
    },
    {
      label: '状态',
      prop: 'status',
      isEnum: true,
      source: shopInStockStatusHash
    }
  ];
  const outStockItems: Array<ListDataType> = [
    {
      label: '原单据编号',
      prop: 'orderCode'
    },
    {
      label: '出库单号',
      prop: 'code'
    },
    {
      label: '操作人',
      prop: 'createBy'
    },
    {
      label: '操作时间',
      prop: 'createTime'
    },
    {
      label: '出库类型',
      prop: 'way',
      isEnum: true,
      source: shopOutStockWayHash
    },
    {
      label: '出库数量',
      prop: 'num'
    },
    {
      label: '出库价值（¥）',
      prop: 'amount'
    },
    {
      label: '状态',
      prop: 'status',
      isEnum: true,
      source: shopOutStockStatusHash
    }
  ];
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const options = computed<any>(() => {
    return props.type === 'in' ? page.inStockOptions : page.outStockOptions;
  });
  const listItems = computed<Array<ListDataType>>(() => {
    return props.type === 'in' ? inStockItems : outStockItems;
  });
  const [getData] = useFuncProxy(async () => {
    const res = await groundPcApiStoreProductInOutOrderInfoIdGet({
      id: String(props.orderId)
    });
    page.historyList.data = res.baseInfo;
    page.inOutInfoList = res.inOutInfoList;
  });
  watch(
    () => props.orderId,
    (v) => {
      if (v) {
        getData();
      }
    },
    { immediate: true }
  );
</script>

<style scoped></style>
