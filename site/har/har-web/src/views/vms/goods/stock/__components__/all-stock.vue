<template>
  <i-table
    v-model="page.search"
    v-model:refresh-now="page.isRefresh"
    :options="options"
    :api="groundPcApiStoreProductStockPageGet"
  >
    <template #header>
      <!--      v-permission="['store:product:in:out:order:add']"-->
      <a-button
        type="outline"
        style="margin-right: 15px"
        @click="emits('show', 'in')"
        >新增入库</a-button
      >
      <a-button
        v-permission="['store:product:in:out:order:add']"
        type="outline"
        @click="emits('show', 'out')"
        >新增出库</a-button
      >
    </template>
    <template #menu="{ record }">
      <a-button
        v-permission="['store:product:in:out:order:add']"
        type="text"
        @click="onShowDrawer(record, 'in')"
        >去入库</a-button
      >
      <a-button
        v-permission="['store:product:in:out:order:add']"
        type="text"
        @click="onShowDrawer(record, 'out')"
        >去出库</a-button
      >
      <a-button
        v-permission="['store:product:stock:info']"
        type="text"
        @click="onShowDetail(record)"
        >查看</a-button
      >
    </template>
  </i-table>
  <drawer
    v-if="page.showDrawer"
    v-model="page.showDrawer"
    :title="page.drawerTitle"
  >
    <template #footer>
      <a-button @click="page.showDrawer = false">取消</a-button>
      <a-button type="primary" @click="page.onOk = !page.onOk">确定</a-button>
    </template>
    <stock-goods-info
      v-if="page.stockId"
      :store-id="shopId"
      :stock-id="page.stockId"
      :type="page.type"
      :ok="page.onOk"
      @submit="handleSubmit"
    />
  </drawer>
  <detail
    v-if="page.detailVisible"
    v-model="page.detailVisible"
    :store-id="shopId"
    :stock-id="page.stockId"
    @in-stock="handleInStock"
    @out-stock="handleOutStock"
  ></detail>
</template>

<script setup lang="ts">
  import { ref, Ref, reactive, watch, computed } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import Bus from '../../refresh';
  import {
    groundPcApiProductAttributeBrandListGet,
    groundPcApiProductAttributeClassifyListGet,
    groundPcApiStoreProductInOutOrderInPost,
    groundPcApiStoreProductInOutOrderOutPost,
    groundPcApiStoreProductStockPageGet
  } from '@/api/ground-pc-api';
  import type { GroundPcApiStoreProductStockPageGetResponse } from '@/api/ground-pc-api';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import StockGoodsInfo from './stock-goods-info.vue';
  import Detail from './all-detail.vue';
  import { GoodsClassifyItem, BrandListItem } from '@/utils/dic';
  type RowData =
    Required<GroundPcApiStoreProductStockPageGetResponse>['rows'][0];

  const emits = defineEmits(['show', 'in', 'out', 'view', 'update:refresh']);
  const props = defineProps({
    shopId: {
      type: Number
    },
    refresh: {
      type: Boolean,
      default: false
    }
  });
  const goodsCate = ref<Array<GoodsClassifyItem>>([]);
  const brandList = ref<Array<{ label: string; value: number }>>([]);
  interface PageDataType {
    isRefresh: boolean;
    showDrawer: boolean;
    detailVisible: boolean;
    onOk: boolean;
    type: string;
    stockId: number | undefined;
    drawerTitle: string;
    search: any;
  }
  const page = reactive<PageDataType>({
    search: {
      storeId: props.shopId
    },
    isRefresh: false,
    showDrawer: false,
    detailVisible: false,
    onOk: false,
    type: '',
    stockId: undefined,
    drawerTitle: ''
  });
  const options: Ref = computed(() => {
    return {
      indexTitle: '序号',
      index: true,
      submitText: '搜索',
      tableCard: true,
      menuSpan: 18,
      columns: [
        {
          label: '商品筛选',
          prop: 'key',
          placeholder: '请输入商品名称/编码',
          search: true,
          hide: true
        },
        {
          label: '商品名称',
          prop: 'productName'
        },
        {
          label: '项目名称',
          prop: 'projectId',
          type: 'select',
          search: true,
          formatter: (e: Recordable) => e.projectName || '--'
        },
        {
          label: '店铺名称',
          prop: 'storeId',
          type: 'select',
          search: true,
          formatter: (e: Recordable) => e.storeName || '--'
        },
        {
          label: '商品分类',
          prop: 'classifyId',
          search: true,
          hide: true,
          type: 'cascader',
          dic: goodsCate.value,
          props: {
            value: 'id',
            label: 'name'
          },
          options: {
            checkStrictly: true
          }
        },
        {
          label: '商品分类',
          prop: 'classifyName'
        },
        {
          label: '品牌',
          prop: 'brandId',
          placeholder: '请选择品牌',
          search: true,
          hide: true,
          type: 'select',
          dic: brandList.value
        },
        {
          label: '库存数量',
          prop: 'availableNum'
        },
        {
          label: '库存价值（¥）',
          prop: 'amount'
        }
      ]
    };
  });
  const handleSubmit = async (data: any) => {
    if (page.type === 'in') {
      await groundPcApiStoreProductInOutOrderInPost(data);
    } else {
      await groundPcApiStoreProductInOutOrderOutPost(data);
    }
    page.showDrawer = !page.showDrawer;
    page.isRefresh = true;
    Bus.$emit('refresh', page.stockId);
  };
  type ObjType = 'in' | 'out';
  const typeHash: { [key: string]: string } = {
    in: '去入库',
    out: '去出库'
  };
  const onShowDrawer = (data: RowData, type: ObjType): void => {
    page.type = type;
    page.drawerTitle = typeHash[type];
    page.showDrawer = !page.showDrawer;
    page.stockId = data.storeProductId!;
  };
  const onShowDetail = (data: RowData): void => {
    page.detailVisible = !page.detailVisible;
    page.stockId = data.storeProductId!;
  };
  const handleInStock = (): void => {
    page.type = 'in';
    page.drawerTitle = typeHash.in;
    page.showDrawer = !page.showDrawer;
  };
  const handleOutStock = (): void => {
    page.type = 'out';
    page.drawerTitle = typeHash.out;
    page.showDrawer = !page.showDrawer;
  };
  const [getGoodsCategory] = useFuncProxy(async () => {
    goodsCate.value = await groundPcApiProductAttributeClassifyListGet();
  });
  const [getBrandList] = useFuncProxy(async () => {
    const res = await groundPcApiProductAttributeBrandListGet();
    res.forEach((el: BrandListItem) => {
      brandList.value.push({
        label: el.name!,
        value: el.id!
      });
    });
  });
  getGoodsCategory();
  getBrandList();
  watch(
    () => props.shopId,
    (v) => {
      if (v) {
        page.search.storeId = v;
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
