<template>
  <div>
    <a-divider orientation="left">基本信息</a-divider>
    <a-descriptions
      :column="3"
      :data="goodsInfo.data"
      layout="inline-horizontal"
      :label-style="{ marginBottom: '15px' }"
      :value-style="listItemStyle"
    >
      <descriptions-item
        v-for="(item, idx) in goodsInfoItems"
        :key="idx"
        :span="item.span"
        :label="item.label + '：'"
      >
        {{ useFormatDescription(goodsInfo.data, item) }}
      </descriptions-item>
    </a-descriptions>
    <a-descriptions layout="vertical">
      <descriptions-item label="商品封面图片：">
        <a-image
          v-for="(item, idx) in goodsInfo.data.coverPic"
          :key="idx"
          :src="item.previewAddress"
          width="120"
          height="120"
        ></a-image>
        <!--        <i-custom-upload-->
        <!--          v-model="goodsInfo.data.coverPic"-->
        <!--          :options="{-->
        <!--            showUploadButton: false,-->
        <!--            showRemoveButton: false-->
        <!--          }"-->
        <!--        ></i-custom-upload>-->
      </descriptions-item>
      <descriptions-item label="商品详情图片：">
        <a-image
          v-for="(item, idx) in goodsInfo.data.detailPic"
          :key="idx"
          :src="item.previewAddress"
          width="120"
          height="120"
        ></a-image>
        <!--        <i-custom-upload-->
        <!--          v-model="goodsInfo.data.detailPic"-->
        <!--          :options="{-->
        <!--            showUploadButton: false,-->
        <!--            showRemoveButton: false-->
        <!--          }"-->
        <!--        ></i-custom-upload>-->
      </descriptions-item>
    </a-descriptions>
    <a-divider orientation="left">规格信息（SKU）</a-divider>
    <a-descriptions layout="vertical">
      <descriptions-item label="规格信息：">
        <i-table
          v-if="detail.skuStockInfoList && detail.skuStockInfoList.length"
          :options="tableOption"
          :data="detail.skuStockInfoList"
        >
          <template #skuPicCell="{ record }">
            <a-image
              v-for="(it, idx) in record.skuPic"
              :key="idx"
              :src="it.previewAddress"
              width="60"
              height="60"
            ></a-image>
            <!--            <i-custom-upload-->
            <!--              v-model="record.skuPic"-->
            <!--              :options="{-->
            <!--                showUploadButton: false,-->
            <!--                showRemoveButton: false-->
            <!--              }"-->
            <!--            ></i-custom-upload>-->
          </template>
          <template #stockNumCell="{ record }">
            <a-input v-if="type !== 'view'" v-model="record.stockNum"></a-input>
            <div v-else>{{ record.stockNum }}</div>
          </template>
        </i-table>
      </descriptions-item>
    </a-descriptions>
  </div>
</template>

<script setup lang="ts">
  import { reactive, watch, onMounted } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import useFormatDescription from '@/hooks/useFormatDescription';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { ListDataType, listItemStyle } from '@/utils/dic';
  import Bus from '../../refresh';
  import { Message, DescriptionsItem } from '@arco-design/web-vue';
  // import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import { groundPcApiStoreProductStockInfoStoreProductIdGet } from '@/api/ground-pc-api';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    refresh: {
      type: Boolean,
      default: false
    },
    ok: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: '' // [in,out,view]
    },
    title: {
      type: String,
      default: '查询店铺'
    },
    stockId: {
      type: Number
    },
    storeId: {
      type: [String, Number],
      default: ''
    }
  });
  const emits = defineEmits(['update:modelValue', 'update:refresh', 'submit']);

  // const a = computed(() => {
  //   return props.storeId;
  // });
  const tableOption = reactive({
    tableCard: false,
    menu: false,
    pageShow: false,
    columns:
      props.type === 'view'
        ? [
            {
              label: '规格',
              prop: 'sku'
            },
            {
              label: '规格图片',
              prop: 'skuPic'
            },
            {
              label: '规格编码',
              prop: 'skuCode'
            },
            {
              label: '规格条码',
              prop: 'barcode'
            },
            {
              label: '销售价格（¥）',
              prop: 'scribingPrice'
            },
            {
              label: '门店零售价（¥）',
              prop: 'salePrice'
            },
            {
              label: '库存',
              prop: 'availableNum'
            },
            {
              label: '库存价值',
              prop: 'amount'
            }
          ]
        : [
            {
              label: '规格',
              prop: 'sku'
            },
            {
              label: '规格图片',
              prop: 'skuPic'
            },
            {
              label: '规格编码',
              prop: 'skuCode'
            },
            {
              label: '规格条码',
              prop: 'barcode'
            },
            {
              label: '销售价格（¥）',
              prop: 'scribingPrice'
            },
            {
              label: '门店零售价（¥）',
              prop: 'salePrice'
            },
            {
              label: '库存',
              prop: 'availableNum'
            },
            {
              label: props.type === 'in' ? '入库数量' : '出库数量',
              prop: 'stockNum'
            }
          ]
  });
  interface DataObject {
    data: any;
  }

  const goodsInfo = reactive<DataObject>({
    data: {
      coverPic: [],
      detailPic: []
    }
  });
  const goodsInfoItems: Array<ListDataType> = [
    {
      label: '商品名称',
      prop: 'name'
    },
    {
      label: '分类',
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
      label: '状态',
      prop: 'status',
      isEnum: true,
      source: {
        1: '销售中',
        2: '已售罄',
        3: '已下架'
      }
    }
  ];
  const detail = reactive<any>({
    showAudit: false,
    title: '店铺认证',
    tip: '',
    skuStockInfoList: []
  });
  const [getData] = useFuncProxy(async () => {
    const res = await groundPcApiStoreProductStockInfoStoreProductIdGet({
      storeProductId: String(props.stockId!)
    });
    goodsInfo.data = res.productInfo;
    detail.skuStockInfoList = res.skuStockInfoList;
  });
  onMounted(() => {
    Bus.$on('refresh', (v) => {
      if (props.stockId === v) {
        getData();
      }
    });
  });
  watch(
    () => props.ok,
    () => {
      if (detail.skuStockInfoList.some((e: any) => e.stockNum)) {
        const temArr: any[] = [];
        detail.skuStockInfoList.forEach((el: any) => {
          if (el.stockNum) {
            temArr.push({
              inOutNum: el.stockNum,
              storeId: props.storeId,
              availableNum: el.availableNum,
              storeProductWeightId: el.storeProductWeightId,
              storeProductId: goodsInfo.data.storeProductId
            });
          }
        });
        emits('submit', temArr);
      } else {
        Message.error('请输入数量');
      }
    }
  );
  watch(
    () => props.stockId,
    () => {
      getData();
    },
    { immediate: true }
  );
</script>

<style scoped lang="less"></style>
