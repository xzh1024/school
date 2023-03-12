<template>
  <drawer v-model="visible" :options="{}" width="60vw">
    <div class="detail">
      <div class="i-card">
        <a-descriptions
          table-layout="fixed"
          layout="vertical"
          title="基本信息"
          :column="{ xs: 1, md: 3 }"
        >
          <descriptions-item label="项目名称">
            {{ info.projectName || '--' }}</descriptions-item
          >
          <descriptions-item label="店铺名称">
            {{ info.storeName || '--' }}</descriptions-item
          >
          <descriptions-item label="线上销售">
            {{ info.salesFunnel === 1 ? '是' : '否' }}</descriptions-item
          >
          <descriptions-item label="商品名称">
            {{ info.name || '--' }}</descriptions-item
          >
          <descriptions-item label="商品分类"
            >{{ info.classifyName || '--' }}
          </descriptions-item>
          <descriptions-item label="商品品牌"
            >{{ info.brandName || '--' }}
          </descriptions-item>
          <descriptions-item label="商品单位"
            >{{ info.unitName || '--' }}
          </descriptions-item>
          <descriptions-item label="商品编码">
            {{ info.code || '--' }}</descriptions-item
          >
        </a-descriptions>
        <a-descriptions table-layout="fixed" layout="vertical">
          <descriptions-item :span="4" label="商品封面图">
            <a-image
              v-if="info.coverCode?.previewAddress"
              :src="info.coverCode?.previewAddress"
              width="120"
              height="120"
            ></a-image>
          </descriptions-item>
          <descriptions-item :span="16" label="商品详情图">
            <a-image
              v-for="(item, idx) in info.detailsCodes"
              :key="idx"
              :src="item.previewAddress || ''"
              width="120"
              height="120"
              style="margin-right: 16px"
            ></a-image>
          </descriptions-item>
        </a-descriptions>
      </div>
      <div class="i-card">
        <a-descriptions title="规格信息(SKU)">
          <i-table :options="skuOptions" :data="weights">
            <template #picCodeCell="{ record }">
              <a-image
                v-if="record.picCode.previewAddress"
                :src="record.picCode.previewAddress"
                width="60"
              ></a-image>
            </template>
          </i-table>
        </a-descriptions>
      </div>
      <div class="i-card">
        <a-descriptions v-if="info.instructions" title="商品详情" :column="1">
          <descriptions-item label="商品须知"
            >{{ info.instructions }}
          </descriptions-item>
          <descriptions-item v-if="info.graphicDetails" label="图文详情">
            <div v-html="info.graphicDetails"> </div
          ></descriptions-item>
        </a-descriptions>
        <i-table :options="options" :data="list">
          <template #picCodeCell="{ record }">
            <a-image width="60" :src="record.picCode" />
          </template>
        </i-table>
      </div>
    </div>
    <template #footer>
      <a-button @click="visible = false">返回</a-button>
      <a-button type="primary" @click="emits('doRefresh')">编辑</a-button>
    </template>
  </drawer>
</template>

<script lang="ts">
  export default {
    name: 'GoodsDetail'
  };
</script>

<script lang="ts" setup>
  import Drawer from '@/components/drawer/drawer.vue';
  import { computed, onMounted, ref, Ref, watch } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { groundPcApiStoreProductInfoIdStoreIdGet } from '@/api/ground-pc-api';
  import { DescriptionsItem } from '@arco-design/web-vue';

  const props = defineProps({
    modelValue: {
      type: Boolean
    },
    refresh: {
      type: Boolean
    },
    id: {
      type: Number
    },
    storeId: {
      type: String,
      default: ''
    }
  });
  const emits = defineEmits(['update:modelValue','doRefresh']);
  const visible: Ref<boolean> = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const options: Ref = ref({
    menu: false,
    align: 'center',
    formCard: false,
    pageShow: false,
    columns: [
      {
        label: '规格名',
        prop: 'names'
      },
      {
        label: '规格图片',
        prop: 'picCode'
      },
      {
        label: '规格编码',
        prop: 'code'
      },
      {
        label: '规格条码',
        prop: 'barcode'
      },
      {
        label: '参考销售价(￥)',
        prop: 'scribingPrice'
      }
    ]
  });
  const skuOptions: Ref = ref({
    index: true,
    indexTitle: '序号',
    menu: false,
    align: 'center',
    formCard: false,
    tableCard: false,
    pageShow: false,
    columns: [
      {
        label: '规格名称',
        prop: 'names'
      },
      {
        label: '规格图片',
        prop: 'picCode'
      },
      {
        label: '规格编码',
        prop: 'code'
      },
      {
        label: '规格条码',
        prop: 'barcode'
      },
      {
        label: '货号',
        prop: 'artCode'
      },
      {
        label: '税率',
        prop: 'taxRate'
      },
      {
        label: '参考销售价(￥)',
        prop: 'scribingPrice'
      },
      {
        label: '门店零售价(￥)',
        prop: 'salePrice'
      }
    ]
  });
  const info: Ref = ref({});
  onMounted(() => {
    getInfo();
  });
  const [getInfo] = useFuncProxy(async () => {
    info.value = await groundPcApiStoreProductInfoIdStoreIdGet({
      id: `${props.id}`,
      storeId: props.storeId
    });
  });

  const weights: Ref = computed(() => {
    return info.value?.weights || [];
  });

  // function statusFilter(val: number) {
  //   return goodsStatusList.find((i) => i.value === val)?.label;
  // }

  const list: Ref = computed(() => {
    return info.value?.weights || [];
  });
  watch(
    () => props.refresh,
    () => {
      if (props.id && props.storeId) {
        getInfo();
      }
    }
  );
</script>
<style scoped lang="less">
  .detail {
    width: 100%;
  }
  .i-card {
    padding-right: 0;
    width: 100%;
  }
</style>
