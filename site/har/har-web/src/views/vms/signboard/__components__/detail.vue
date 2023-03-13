<template>
  <drawer v-model="visible" title="店铺招牌查看">
    <template #footer>
      <a-button @click="visible = false">返回</a-button>
      <a-button type="primary" @click="showEdit">编辑</a-button>
    </template>
    <div class="detail">
      <div class="block-title">店铺信息</div>
      <a-descriptions layout="horizontal">
        <a-descriptions-item label="店铺名称：" :span="3">
          {{ page.storeInfo.storeName }}
        </a-descriptions-item>
        <a-descriptions-item label="店铺业态：">
          {{ page.storeInfo.format }}
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
      <p class="title">推荐优惠</p>
      <i-table :options="page.welfare.options" :data="page.welfare.data">
        <template #couponTypeCell="{ record }">{{
          couponTypeHash[record.couponType]
        }}</template>
        <template #thresholdAmountCell="{ record }">{{
          record.thresholdAmount ? record.thresholdAmount : '无门槛'
        }}</template>
      </i-table>
      <p class="title">推荐商品</p>
      <i-table :options="page.goods.options" :data="page.goods.data"></i-table>
      <p class="title">推荐场地</p>
      <i-table
        :options="page.stadium.options"
        :data="page.stadium.data"
      ></i-table>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { reactive, computed, onMounted } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import { groundPcApiStoreFeatureInfoStoreIdGet } from '@/api/ground-pc-api';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { couponTypeHash } from '@/utils/dic';

  const emits = defineEmits(['update:modelValue', 'edit']);
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
  const page = reactive<any>({
    storeInfo: {},
    welfare: {
      options: {
        indexTitle: '序号',
        index: true,
        tableCard: false,
        pageShow: false,
        menu: false,
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
      },
      data: []
    },
    goods: {
      options: {
        indexTitle: '序号',
        index: true,
        pageShow: false,
        tableCard: false,
        menu: false,
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
      },
      data: []
    },
    stadium: {
      options: {
        indexTitle: '序号',
        index: true,
        pageShow: false,
        tableCard: false,
        menu: false,
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
      },
      data: []
    }
  });
  const showEdit = () => {
    emits('edit');
  };
  const [getData] = useFuncProxy(async () => {
    const res = await groundPcApiStoreFeatureInfoStoreIdGet({
      storeId: props.storeId
    });
    page.storeInfo = res.storeInfo || {};
    page.welfare.data = res.couponInfoList || [];
    page.goods.data = res.productInfoList || [];
    page.stadium.data = res.venueInfoList || [];
  });
  onMounted(() => {
    if (props.storeId) {
      getData();
    }
  });
</script>
<style scoped lang="less">
  .detail {
    min-height: 100%;
    width: 100%;
    padding: 10px;
    background-color: #fff;
  }
  .run {
    .label {
      padding-left: 15px;
      color: #666;
    }
  }

  .title {
    color: #333;
    font-weight: bold;
  }
</style>
