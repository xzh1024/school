<template>
  <drawer v-model="visible" title="店铺招牌查看">
    <template #footer>
      <a-button @click="visible = false">取消</a-button>
      <a-button :loading="loading" type="primary" @click="submitInfo"
        >确认</a-button
      >
    </template>
    <div class="detail">
      <div class="block-title">店铺信息</div>
      <a-descriptions layout="horizontal">
        <a-descriptions-item label="店铺名称：" :span="3">
          {{ data.storeInfo.storeName }}
        </a-descriptions-item>
        <a-descriptions-item label="店铺业态：">
          {{ data.storeInfo.format }}
        </a-descriptions-item>
      </a-descriptions>
      <div class="block-title">经营信息</div>
      <div class="flex align-center run">
        <icon-star-fill :style="{ fontSize: '32px' }" />
        <p class="label">月度单量</p>
      </div>
      <div class="flex align-center run">
        <icon-star-fill :style="{ fontSize: '32px' }" />
        <p class="label">营业时间</p>
      </div>
      <div class="flex align-center title">
        <a-checkbox v-model="page.recommendWelfare">推荐优惠</a-checkbox>
        <a-button
          v-if="page.recommendWelfare"
          type="text"
          class="ml10"
          @click="chooseRecommendWelfare"
          >选择推荐优惠</a-button
        >
      </div>
      <i-table
        v-if="page.recommendWelfare"
        :options="page.welfare.options"
        :data="data.welfare"
      >
        <template #couponTypeCell="{ record }">
          {{ mallWelfareTypeHash[record.couponType] }}
        </template>
        <template #thresholdAmountCell="{ record }">{{
          record.thresholdAmount ? record.thresholdAmount : '无门槛'
        }}</template>
        <template #menu="rowData">
          <a-space>
            <a-button
              v-if="rowData.rowIndex > 0"
              v-permission="['store:sign:edit']"
              type="text"
              @click="changeSort(rowData.record.id, 1)"
              >上移</a-button
            >
            <a-button
              v-if="rowData.rowIndex < data.welfare.length - 1"
              v-permission="['store:sign:edit']"
              type="text"
              @click="changeSort(rowData.record.id, 2)"
              >下移</a-button
            >
            <a-popconfirm
              content="确认删除吗?"
              @ok="handleDelete(rowData.record.id, rowData.rowIndex, 'welfare')"
            >
              <a-button
                v-permission="['store:sign:delete']"
                type="text"
                status="warning"
                >删除</a-button
              >
            </a-popconfirm>
          </a-space>
        </template>
      </i-table>
      <div class="flex align-center title">
        <a-checkbox v-model="page.recommendGoods">推荐商品</a-checkbox>
        <a-button
          v-if="page.recommendGoods"
          type="text"
          class="ml10"
          @click="chooseRecommendGoods"
          >选择推荐商品</a-button
        >
      </div>
      <i-table
        v-if="page.recommendGoods"
        :options="page.goods.options"
        :data="data.goods"
      >
        <template #menu="rowData">
          <a-space>
            <a-button
              v-if="rowData.rowIndex > 0"
              v-permission="['store:sign:edit']"
              type="text"
              @click="changeSort(rowData.record.id, 1)"
              >上移</a-button
            >
            <a-button
              v-if="rowData.rowIndex < data.goods.length - 1"
              v-permission="['store:sign:edit']"
              type="text"
              @click="changeSort(rowData.record.id, 2)"
              >下移</a-button
            >
            <a-popconfirm
              content="确认删除吗?"
              @ok="handleDelete(rowData.record.id, rowData.rowIndex, 'goods')"
            >
              <a-button v-permission="['store:sign:delete']" type="text"
                >删除</a-button
              >
            </a-popconfirm>
          </a-space>
        </template>
      </i-table>
      <div class="flex align-center title">
        <a-checkbox v-model="page.recommendStadium">推荐场馆</a-checkbox>
        <a-button
          v-if="page.recommendStadium"
          type="text"
          class="ml10"
          @click="chooseRecommendStadium"
          >选择推荐场馆</a-button
        >
      </div>
      <i-table
        v-if="page.recommendStadium"
        :options="page.stadium.options"
        :data="data.stadium"
      >
        <template #menu="rowData">
          <a-space>
            <a-button
              v-if="rowData.rowIndex > 0"
              v-permission="['store:sign:edit']"
              type="text"
              @click="changeSort(rowData.record.id, 1)"
              >上移</a-button
            >
            <a-button
              v-if="rowData.rowIndex < data.stadium.length - 1"
              v-permission="['store:sign:edit']"
              type="text"
              @click="changeSort(rowData.record.id, 2)"
              >下移</a-button
            >
            <a-popconfirm
              content="确认删除吗?"
              @ok="handleDelete(rowData.record.id, rowData.rowIndex, 'stadium')"
            >
              <a-button v-permission="['store:sign:delete']" type="text"
                >删除</a-button
              >
            </a-popconfirm>
          </a-space>
        </template>
      </i-table>
      <choose-item
        v-if="page.chooseWelfareVisible"
        v-model="page.chooseWelfareVisible"
        :search="{ storeId }"
        title="选择优惠券"
        :select-keys="selectWelfareKeys"
        :options="page.welfareChooseOption"
        :type-enum="mallWelfareTypeHash"
        :api="groundPcApiCommonCouponSelectPageGet"
        @submit="onAddWelfare"
      />
      <choose-item
        v-if="page.chooseGoodsVisible"
        v-model="page.chooseGoodsVisible"
        :store-id="storeId"
        :select-keys="selectGoodsKeys"
        :options="page.goodsChooseOption"
        :api="groundPcApiStoreProductStockAllInfoGet"
        @submit="onAddGoods"
      />
      <choose-item
        v-if="page.chooseStadiumVisible"
        v-model="page.chooseStadiumVisible"
        :store-id="storeId"
        :search="{ storeId, type: '2' }"
        title="选择场馆"
        :type-enum="stadiumRuleTypeHash"
        type-key="ruleType"
        :select-keys="selectStadiumKeys"
        :options="page.stadiumChooseOption"
        :api="groundPcApiCommonSpaceSelectPageGet"
        @submit="onAddStadium"
      />
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, onMounted } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import ChooseItem from '@/components/choose-item/index.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    groundPcApiStoreFeatureInfoStoreIdGet,
    groundPcApiCommonCouponSelectPageGet,
    groundPcApiStoreFeatureAddPost,
    groundPcApiStoreProductStockAllInfoGet,
    groundPcApiProductAttributeClassifyListGet,
    groundPcApiProductAttributeBrandListGet,
    groundPcApiCommonSpaceSelectPageGet,
    groundPcApiVenueClassifyListGet,
    groundPcApiStoreFeatureDeleteIdPost,
    groundPcApiStoreFeatureMovePost
  } from '@/api/ground-pc-api';
  import { mallWelfareTypeHash, stadiumRuleTypeHash } from '@/utils/dic';
  import DataShare from '../share-data';
  import useRowspan from '@/hooks/useRowspan';
  const [getColSpanData, spanMethod] = useRowspan();

  const emits = defineEmits(['update:modelValue', 'edit', 'refresh']);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    storeId: {
      type: String,
      default: ''
    }
  });
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const selectWelfareKeys = ref<Array<number>>([]);
  const selectGoodsKeys = ref<Array<number>>([]);
  const selectStadiumKeys = ref<Array<number>>([]);
  const page = reactive<any>({
    recommendWelfare: false,
    recommendGoods: false,
    recommendStadium: false,
    chooseWelfareVisible: false,
    chooseGoodsVisible: false,
    chooseStadiumVisible: false,
    welfare: {
      options: {
        indexTitle: '序号',
        index: true,
        tableCard: false,
        pageShow: false,
        columns: [
          {
            label: '优惠券名称',
            prop: 'name'
          },
          {
            label: '类型',
            prop: 'couponType'
          },
          {
            label: '使用门槛',
            prop: 'thresholdAmount'
          }
        ]
      }
    },
    goods: {
      options: {
        indexTitle: '序号',
        index: true,
        pageShow: false,
        tableCard: false,
        columns: [
          {
            label: '商品名称',
            prop: 'name'
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
            label: '门店零售价（¥）',
            prop: 'salePrice'
          }
        ]
      }
    },
    stadium: {
      options: {
        indexTitle: '序号',
        index: true,
        pageShow: false,
        tableCard: false,
        columns: [
          {
            label: '场地名称',
            prop: 'name'
          },
          {
            label: '场地分类',
            prop: 'classifyName'
          },
          {
            label: '场地编码',
            prop: 'code'
          },
          {
            label: '计费类型',
            prop: 'rule'
          },
          {
            label: '价格（¥）',
            prop: 'price'
          }
        ]
      }
    },
    welfareChooseOption: {
      tableCard: false,
      menu: false,
      menuOtherOptions: {
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
          showCheckedAll: true
        },
        onSelect: (e: number[]) => {
          selectWelfareKeys.value = e;
        }
      },
      columns: [
        {
          label: '优惠券名称',
          prop: 'name',
          search: true
        },
        {
          label: '类型',
          prop: 'type',
          search: true,
          type: 'select',
          dic: [
            {
              label: '满减券',
              value: 1
            },
            {
              label: '折扣券',
              value: 2
            },
            {
              label: '礼品券',
              value: 3
            },
            {
              label: '积分现金券',
              value: 4
            }
          ]
        },
        {
          label: '使用门槛',
          prop: 'threshold'
        },
        {
          label: '剩余库存',
          prop: 'stock'
        }
      ]
    },
    goodsChooseOption: {
      tableCard: false,
      menu: false,
      menuOtherOptions: {
        'rowKey': 'storeProductWeightId',
        'span-all': true,
        'rowSelection': {
          type: 'checkbox',
          showCheckedAll: true
        },
        'onSelect': (e: number[]) => {
          selectGoodsKeys.value = e;
        },
        'spanMethod': spanMethod
      },
      columns: [
        {
          label: '商品筛选',
          placeholder: '请输入商品名称/编码/条码搜索',
          prop: 'key',
          search: true,
          hide: true
        },
        {
          label: '商品名称',
          prop: 'name'
        },
        {
          label: '商品分类',
          prop: 'classifyId',
          search: true,
          hide: true,
          type: 'cascader',
          props: {
            value: 'id',
            label: 'name'
          },
          options: {
            checkStrictly: true
          },
          dic: []
        },
        {
          label: '品牌',
          prop: 'brandId',
          search: true,
          hide: true,
          type: 'select',
          dic: [],
          props: {
            value: 'id',
            label: 'name'
          }
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
          label: '门店零售价（¥）',
          prop: 'salePrice'
        },
        {
          label: '库存',
          prop: 'availableNum'
        }
      ]
    },
    stadiumChooseOption: {
      tableCard: false,
      menu: false,
      menuOtherOptions: {
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
          showCheckedAll: true
        },
        onSelect: (e: number[]) => {
          selectStadiumKeys.value = e;
        }
      },
      columns: [
        {
          label: '场地筛选',
          placeholder: ' 请输入场地名称/编码搜索',
          prop: 'key',
          search: true,
          hide: true,
          span: 8
        },
        {
          label: '场馆名称',
          prop: 'name'
        },
        {
          label: '场地分类',
          prop: 'classifyId',
          search: true,
          hide: true,
          type: 'select',
          props: {
            value: 'id',
            label: 'name'
          },
          span: 8,
          dic: []
        },
        {
          label: '场地分类',
          prop: 'classify'
        },
        {
          label: '场地编码',
          prop: 'code'
        },
        {
          label: '计费类型',
          prop: 'calType'
        },
        {
          label: '价格（¥）',
          prop: 'price'
        }
      ]
    }
  });
  const data = reactive<any>({
    storeInfo: {},
    welfare: [],
    goods: [],
    stadium: []
  });
  const showEdit = () => {
    emits('edit');
  };
  function chooseRecommendWelfare() {
    page.chooseWelfareVisible = true;
  }
  function chooseRecommendGoods() {
    page.chooseGoodsVisible = true;
  }
  function chooseRecommendStadium() {
    page.chooseStadiumVisible = true;
  }
  async function changeSort(id: number, direction: number) {
    await groundPcApiStoreFeatureMovePost({
      id,
      direction
    });
    getData();
  }
  async function handleDelete(id: string, idx: number, type: string) {
    await groundPcApiStoreFeatureDeleteIdPost({
      id
    });
    if (type === 'welfare') {
      selectWelfareKeys.value.splice(idx, 1);
    } else if (type === 'goods') {
      selectGoodsKeys.value.splice(idx, 1);
    } else {
      selectStadiumKeys.value.splice(idx, 1);
    }
    getData();
  }
  function onAddWelfare() {
    handleAddNewItem(1, selectWelfareKeys.value, getData);
    page.chooseWelfareVisible = false;
  }
  function onAddGoods() {
    handleAddNewItem(2, selectGoodsKeys.value, getData);
    page.chooseGoodsVisible = false;
  }
  function onAddStadium() {
    handleAddNewItem(3, selectStadiumKeys.value, getData);
    page.chooseStadiumVisible = false;
  }
  async function handleAddNewItem(
    type: number,
    keys: number[],
    cb?: () => void
  ) {
    try {
      await groundPcApiStoreFeatureAddPost({
        storeId: Number(props.storeId),
        type,
        objectIdList: keys
      });
    } catch (e) {
    } finally {
      cb && cb();
    }
  }
  const [getData] = useFuncProxy(async () => {
    const res = await groundPcApiStoreFeatureInfoStoreIdGet({
      storeId: props.storeId
    });
    data.storeInfo = res.storeInfo || {};
    data.welfare = res.couponInfoList || [];
    data.goods = res.productInfoList || [];
    data.stadium = res.venueInfoList || [];
    if (res.couponInfoList?.length) {
      page.recommendWelfare = true;
    }
    if (res.productInfoList?.length) {
      page.recommendGoods = true;
    }
    if (res.venueInfoList?.length) {
      page.recommendStadium = true;
    }
    selectWelfareKeys.value = [];
    selectGoodsKeys.value = [];
    selectStadiumKeys.value = [];
    data.welfare.forEach((el: any) => {
      selectWelfareKeys.value.push(el.couponTemplateId);
    });
    data.goods.forEach((el: any) => {
      selectGoodsKeys.value.push(el.storeProductWeightId);
    });
    data.stadium.forEach((el: any) => {
      selectStadiumKeys.value.push(el.venuePriceId);
    });
  });
  const [getGoodsCategory] = useFuncProxy(async () => {
    const res = await groundPcApiProductAttributeClassifyListGet();
    const item = page.goodsChooseOption.columns.find(
      (el: any) => el.prop === 'classifyId'
    );
    item.dic = res;
  });
  const [getBrandList] = useFuncProxy(async () => {
    const res = await groundPcApiProductAttributeBrandListGet();
    const item = page.goodsChooseOption.columns.find(
      (el: any) => el.prop === 'brandId'
    );
    item.dic = res;
  });
  const [getStadiumClassify] = useFuncProxy(async () => {
    const res = await groundPcApiVenueClassifyListGet();
    const item = page.stadiumChooseOption.columns.find(
      (el: any) => el.prop === 'classifyId'
    );
    item.dic = res;
  });
  getGoodsCategory();
  getBrandList();
  getStadiumClassify();
  const loading = ref(false);
  async function submitInfo() {
    try {
      loading.value = true;
      if (!page.recommendWelfare && selectWelfareKeys.value.length) {
        await handleAddNewItem(1, []);
      }
      if (!page.recommendGoods && selectGoodsKeys.value.length) {
        await handleAddNewItem(2, []);
      }
      if (!page.recommendStadium && selectStadiumKeys.value.length) {
        await handleAddNewItem(3, []);
      }
      await getData();
      emits('refresh');
      visible.value = false;
    } catch (e) {
    } finally {
      loading.value = false;
    }
  }
  onMounted(() => {
    if (props.storeId) {
      getData();
    }
    DataShare.$on('data', (v: any) => {
      getColSpanData('storeProductId', v, 3);
    });
  });
</script>
<style scoped lang="less">
  .detail {
    width: 100%;
    min-height: 100%;
    padding: 10px;
    background-color: #fff;
  }
  .ml10 {
    margin-left: 10px;
  }

  .run {
    .label {
      padding-left: 15px;
      color: #666;
    }
  }

  .title {
    height: 40px;
    padding: 30px 0 15px;
  }
</style>
