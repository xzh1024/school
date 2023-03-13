<template>
  <div class="wrapper">
    <a-tabs default-active-key="1" @change="changeTab">
      <a-tab-pane key="1" title="库存管理">
        <all-stock
          :refresh="page.isRefresh"
          :shop-id="page.storeId"
          @show="handleShowChooseGoods"
        ></all-stock>
      </a-tab-pane>
      <a-tab-pane key="2" title="入库管理">
        <in-stock
          v-if="currentTab === '2'"
          :shop-id="page.storeId"
          :refresh="page.isRefresh"
          @show="handleShowChooseGoods"
        ></in-stock>
      </a-tab-pane>
      <a-tab-pane key="3" title="出库管理">
        <out-stock
          v-if="currentTab === '3'"
          :shop-id="page.storeId"
          :refresh="page.isRefresh"
          @show="handleShowChooseGoods"
        ></out-stock>
      </a-tab-pane>
    </a-tabs>
    <choose-goods
      v-model="page.chooseGoodsModel"
      source="stock"
      :shop-id="page.storeId"
      :is-in="page.isInStock"
      :title="page.modelTitle"
      @refresh="page.isRefresh = !page.isRefresh"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, reactive, provide } from 'vue';
  import ChooseGoods from './__components__/choose-goods.vue';
  import AllStock from './__components__/all-stock.vue';
  import InStock from './__components__/in-stock.vue';
  import OutStock from './__components__/out-stock.vue';
  import { StoreSelectItem } from '@/utils/dic';
  import { getCookie } from '@/utils/cookies';
  type PageConfig = {
    search: {
      storeId?: number;
    };
    isRefresh: boolean;
    chooseGoodsModel: boolean;
    isInStock: boolean;
    modelTitle: string;
    storeId?: number;
    shopList: StoreSelectItem[];
    options: any;
  };

  const currentTab = ref('');
  const page = reactive<PageConfig>({
    search: {
      storeId: undefined
    },
    storeId: undefined,
    isRefresh: false,
    chooseGoodsModel: false,
    isInStock: false,
    modelTitle: '',
    shopList: [],
    options: {
      indexTitle: '序号',
      index: true,
      submitText: '搜索',
      tableCard: true,
      columns: [
        {
          label: '商品筛选',
          prop: 'baseInfo',
          placeholder: '请输入商品名称/编码/条码搜索',
          search: true,
          hide: true
        },
        {
          label: '商品名称',
          prop: 'baseInfo'
        },
        {
          label: '商品分类',
          prop: 'baseInfo',
          search: true,
          type: 'select',
          dic: []
        },
        {
          label: '品牌',
          prop: 'baseInfo',
          placeholder: '请选择品牌',
          search: true,
          hide: true,
          type: 'select',
          dic: []
        },
        {
          label: '总销量',
          prop: 'merchantName'
        },
        {
          label: '可售库存',
          prop: 'contractCode'
        },
        {
          label: '商品状态',
          prop: 'status'
        },
        {
          label: '更新时间',
          prop: 'updateTime'
        }
      ]
    }
  });
  const changeTab = (v: string | number) => {
    currentTab.value = String(v);
  };
  const handleShowChooseGoods = (v: string) => {
    page.modelTitle = v === 'in' ? '新增入库' : '新增出库';
    page.isInStock = v === 'in';
    page.chooseGoodsModel = !page.chooseGoodsModel;
  };
  onMounted(() => {
    // const id = getCookie('shopId');
    // provide('storeId', id);
    // page.search.storeId = Number(id);
    // page.storeId = Number(id);
  });
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
