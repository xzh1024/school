<template>
  <div class="wrapper">
    <i-table
      v-model="page.search"
      v-model:selectedKeys="selectKeys"
      v-model:refresh-now="page.isRefresh"
      :options="options"
      :page="page.pageOptions"
      :api="groundPcApiStoreProductListGet"
    >
      <template #header>
        <a-row flex>
          <a-col :span="16">
            <!--            v-permission="['store:product:save']"-->
            <a-button type="primary" @click="addNewGoods">添加</a-button>
          </a-col>
          <a-col
            v-permission="['store:product:upperAndLowerShelves']"
            :span="6"
            :offset="2"
            class="flex justify-end align-center"
            style="padding-top: 10px"
          >
            <div style="color: #666; padding-right: 20px"
              >已选商品：{{ selectKeys.length }}</div
            >
            <a-space>
              <a-button type="outline" @click="handleOnShelf">上架</a-button>
              <a-button type="outline" @click="handleOffShelf">下架</a-button>
            </a-space>
          </a-col>
        </a-row>
      </template>
      <template #classifyIdCell="{ record }">
        {{ record.classifyName }}
      </template>
      <template #statusCell="{ record }">
        {{ shopGoodsStatusHash[record.status] }}
      </template>
      <template #menu="{ record }">
        <div style="margin-left: -15px">
          <!--        v-permission="['store:product:update']"-->
          <a-button type="text" @click="handleEdit(record)">编辑</a-button>
          <!--        v-permission="['store:product:info']"-->
          <a-button type="text" @click="handleDetail(record)">查看</a-button>
        </div>
      </template>
    </i-table>
    <goods-edit
      v-if="page.addModelVisible"
      :id="page.goodsId"
      v-model="page.addModelVisible"
      :store-id="String(page.storeId)"
      @refresh="onEditFinish"
    />
    <goods-detail
      v-if="page.showInfo"
      :id="Number(page.goodsId)"
      v-model="page.showInfo"
      :store-id="String(page.storeId)"
      @do-refresh="doRefresh"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, Ref, reactive, onMounted, computed } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import {
    groundPcApiCommonProjectSelectListGet,
    groundPcApiStoreProductListGet,
    groundPcApiStoreProductUpperAndLowerShelvesPut,
    groundPcApiProductAttributeClassifyListGet,
    groundPcApiProductAttributeBrandListGet,
    type GroundPcApiStoreProductListGetResponse,
    groundPcApiCommonStoreSelectGet
  } from '@/api/ground-pc-api';
  import { shopGoodsStatusHash } from '@/utils/dic';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { Message, Modal } from '@arco-design/web-vue';
  import GoodsDetail from './__components__/goods-detail.vue';
  import GoodsEdit from './__components__/goods-edit.vue';
  type RowData = Required<GroundPcApiStoreProductListGetResponse>['rows'][0];

  interface PageDataType {
    search: any;
    options?: object;
    pageOptions: {
      current: number;
    };
    isRefresh: boolean;
    showInfo: boolean;
    isEdit: boolean;
    addModelVisible: boolean;
    chooseGoodsModel: boolean;
    addModelTitle?: string;
    goodsId?: number;
    storeId?: number;
    shelfType: number;
  }
  const options: Ref = computed(() => {
    return {
      indexTitle: '序号',
      index: true,
      submitText: '搜索',
      tableCard: true,
      menuSpan: 12,
      menuOtherOptions: {
        'row-key': 'id',
        'rowSelection': {
          type: 'checkbox',
          showCheckedAll: true
        },
        'onSelect': (e: number[]) => {
          selectKeys.value = e;
        }
      },
      columns: [
        {
          label: '项目名称',
          prop: 'projectId',
          type: 'select',
          search: true,
          dicRequest: groundPcApiCommonProjectSelectListGet,
          formatter: (e: RowData) => e.projectName || '--'
        },
        {
          label: '店铺名称',
          prop: 'storeId',
          type: 'select',
          search: true,
          dicRequest: groundPcApiCommonStoreSelectGet,
          formatter: (e: RowData) => e.storeName || '--'
        },
        {
          label: '商品名称',
          prop: 'name'
        },
        {
          label: '商品信息',
          prop: 'retrievalStr',
          placeholder: '请输入商品名称/编码',
          search: true,
          hide: true
        },
        {
          label: '商品分类',
          prop: 'classifyId',
          search: true,
          type: 'cascader',
          dicRequest: groundPcApiProductAttributeClassifyListGet,
          props: {
            label: 'name',
            value: 'id'
          },
          options: {
            checkStrictly: true
          },
          formatter: (e: RowData) => e.classifyName || '--'
        },
        {
          label: '品牌',
          prop: 'brandId',
          placeholder: '请选择品牌',
          search: true,
          hide: true,
          type: 'select',
          options: {
            fieldNames: {
              label: 'name',
              value: 'id'
            }
          },
          dicRequest: groundPcApiProductAttributeBrandListGet
        },
        {
          label: '商品状态',
          prop: 'status',
          placeholder: '请选择状态',
          search: true,
          type: 'select',
          dic: [
            {
              label: '全部',
              value: '0'
            },
            {
              label: '销售中',
              value: '1'
            },
            {
              label: '已售罄',
              value: '2'
            },
            {
              label: '已下架',
              value: '3'
            }
          ]
        },
        {
          label: '销售渠道',
          prop: 'salesFunnel',
          formatter: (e: RowData) =>
            e.salesFunnel === 1 ? '线上、线下' : '线下'
        },
        {
          label: '总销量',
          prop: 'salesVolume'
        },
        {
          label: '可售库存',
          prop: 'stockNum'
        },
        {
          label: '更新时间',
          prop: 'updateTime'
        }
      ]
    };
  });
  const selectKeys = ref<number[]>([]);
  const page = reactive<PageDataType>({
    search: {
      status: '',
      storeId: ''
    },
    pageOptions: {
      current: 1
    },
    isRefresh: false,
    showInfo: false,
    addModelVisible: false,
    chooseGoodsModel: false,
    isEdit: false,
    goodsId: undefined,
    storeId: undefined,
    shelfType: 0,
    addModelTitle: ''
  });

  const addNewGoods = () => {
    page.addModelVisible = true;
    page.goodsId = undefined;
  };
  const handleEdit = (t: RowData): void => {
    page.addModelVisible = !page.addModelVisible;
    page.isEdit = true;
    page.addModelTitle = '编辑商品';
    page.goodsId = t.id;
    page.storeId = t.storeId;
  };
  const handleDetail = (t: RowData): void => {
    page.showInfo = !page.showInfo;
    page.goodsId = t.id;
    page.storeId = t.storeId;
  };
  const [handleOnShelfStatus] = useFuncProxy(async () => {
    await groundPcApiStoreProductUpperAndLowerShelvesPut({
      ids: selectKeys.value,
      method: page.shelfType
    });
    selectKeys.value.length = 0;
    page.isRefresh = true;
  });
  const handleOnShelf = (): void => {
    if (selectKeys.value.length) {
      Modal.open({
        title: '提示',
        content:
          '若可售库存为0,商品上架后状态为“已售罄”，待添加库存后才可正常销售，确定上架？',
        okText: '确认上架',
        onOk: () => {
          page.shelfType = 1;
          handleOnShelfStatus();
        }
      });
    } else {
      Message.error('请您先勾选要上架的商品');
    }
  };
  const handleOffShelf = (): void => {
    if (selectKeys.value.length) {
      Modal.open({
        title: '提示',
        content: '商品下架后，用户将不能在线上进行该商品的购买，确定下架？',
        okText: '确认下架',
        onOk: () => {
          page.shelfType = 0;
          handleOnShelfStatus();
        }
      });
    } else {
      Message.error('请您先勾选要下架的商品');
    }
  };
  const doRefresh = () => {
    page.addModelVisible = true;
  };
  const onEditFinish = () => {
    page.showInfo = false;
    page.isRefresh = true;
  };
</script>
