<template>
  <div>
    <drawer
      v-model="visible"
      :options="{ footer: false, width: '60vw', title: '商品详情' }"
    >
      <div class="white-detail-box">
        <a-descriptions title="基本信息" :column="{ xs: 1, md: 4 }">
          <descriptions-item label="商品名称">
            {{ info.name }}</descriptions-item
          >
          <descriptions-item label="商品分类"
            >{{ info.classifyName }}
          </descriptions-item>
          <descriptions-item label="商品品牌"
            >{{ info.brandName }}
          </descriptions-item>
          <descriptions-item label="商品单位"
            >{{ info.unitName }}
          </descriptions-item>
          <!--        <descriptions-item label="商品编码"> {{ info.code }}</descriptions-item>-->
          <!--        <descriptions-item label="商品状态">-->
          <!--          {{ statusFilter(info.status) }}</descriptions-item-->
          <!--        >-->
          <!--                <descriptions-item label="货品组别"> {{ goodCate[info.group] }}</descriptions-item>-->
          <descriptions-item :span="1" label="商品封面图">
            <a-image
              v-if="info.coverCode && info.coverCode.previewAddress"
              :src="info.coverCode.previewAddress"
              width="120"
              height="120"
            ></a-image>
          </descriptions-item>
          <descriptions-item :span="2" label="商品详情图片">
            <template v-if="info.detailsCodes">
              <a-image
                v-for="item in info.detailsCodes"
                :key="item.id"
                :src="item.previewAddress"
                width="120"
                height="120"
              ></a-image>
            </template>
          </descriptions-item>
        </a-descriptions>
        <a-descriptions title="规格信息(SKU)" :column="1">
          <i-table :options="skuOptions" :data="weights">
            <template #picCodeCell="{ record }">
              <a-image
                v-if="record.picCode && record.picCode.previewAddress"
                :src="record.picCode.previewAddress"
                width="60"
                height="60"
              ></a-image>
            </template>
          </i-table>
        </a-descriptions>
        <a-descriptions title="商品详情" :column="1">
          <descriptions-item label="商品须知"
            >{{ info.instructions }}
          </descriptions-item>
          <descriptions-item label="图文详情">
            <div v-html="info.graphicDetails"> </div
          ></descriptions-item>
        </a-descriptions>
      </div>
    </drawer>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'GoodsDetail'
  };
</script>

<script lang="ts" setup>
  import Drawer from '@/components/drawer/drawer.vue';
  import { computed, ref, Ref, watch } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { cbdApiProjectStoreProductInfoIdGet } from '@/api';
  // import { goodsStatusList } from '@/utils/dic';
  import { DescriptionsItem } from '@arco-design/web-vue';

  const props = defineProps({
    modelValue: {
      type: Boolean
    },
    id: {
      type: Number
    }
  });
  // const goodCate: Recordable = {
  //   1: '正价商品',
  //   2: '特价商品'
  // };
  const emits = defineEmits(['update:modelValue']);
  const visible: Ref<boolean> = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const skuOptions: Ref = ref({
    index: true,
    menu: false,
    align: 'center',
    tableCard: false,
    pageShow: false,
    columns: [
      {
        label: '规格名称',
        prop: 'names'
      },
      {
        label: '规格图片',
        prop: 'picCode',
        ellipsis: true,
        tooltip: true
      },
      {
        label: '规格编码',
        prop: 'code',
        ellipsis: true,
        tooltip: true
      },
      {
        label: '规格条码',
        prop: 'barcode',
        ellipsis: true,
        tooltip: true
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
  watch(
    () => props.modelValue,
    (e) => {
      if (e && props.id) getInfo();
    }
  );
  const [getInfo] = useFuncProxy(async () => {
    info.value = await cbdApiProjectStoreProductInfoIdGet({
      id: `${props.id}`
    });
  });

  const weights: Ref = computed(() => {
    return info.value?.weights || [];
  });
</script>
