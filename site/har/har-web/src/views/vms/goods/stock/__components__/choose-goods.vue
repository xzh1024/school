<template>
  <a-modal
    v-if="visible"
    :visible="visible"
    :title="title"
    width="80vw"
    @cancel="onClose"
    @ok="handleOnOk"
  >
    <template v-if="source === 'stock'" #footer>
      <a-button type="outline" @click="onClose">取消</a-button>
      <a-button
        v-if="isIn"
        type="primary"
        :loading="isLoading"
        @click="saveAndInStock"
        >保存并入库</a-button
      >
      <a-button
        v-else
        type="primary"
        :loading="isLoading"
        @click="saveAndOutStock"
        >保存并出库</a-button
      >
    </template>
    <div style="max-height: 70vh; overflow-y: scroll">
      <i-table
        ref="refTable"
        v-model:selectedKeys="selectKeys"
        v-model="data.search"
        v-model:refresh-now="data.refresh"
        :options="options"
        :api="api"
        @reset="handleReset"
      >
        <template #namesCell="{ record }">
          {{ record.sku }}
        </template>
        <template #stockNumCell="{ record }">
          {{ record.availableNum }}
        </template>
        <template v-if="source === 'stock'" #inOutNumCell="{ record }">
          <a-input
            v-model="record.inOutNum"
            @keyup="record.inOutNum = record.inOutNum.replace(/\D|^0/g, '')"
          ></a-input>
        </template>
      </i-table>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
  import { ref, reactive, Ref, computed, watch } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { Message } from '@arco-design/web-vue';
  import {
    groundPcApiStoreProductInOutOrderInPost,
    groundPcApiStoreProductInOutOrderOutPost,
    groundPcApiStoreProductStockAllInfoGet,
    groundPcApiProductAttributeClassifyListGet,
    groundPcApiProductAttributeBrandListGet
  } from '@/api/ground-pc-api';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import useRowspan from '@/hooks/useRowspan';
  import { BrandListItem, GoodsClassifyItem } from '@/utils/dic';
  type DataConfig = {
    refresh: boolean;
    search: {
      storeId: number | undefined;
      classifyId?: string;
      brandId?: string;
      retrievalStr?: string;
      key?: string;
    };
  };

  const [getColSpanData, spanMethod] = useRowspan();
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '选择商品'
    },
    shopId: {
      type: Number
    },
    source: {
      type: String,
      default: 'goods'
    },
    isIn: {
      type: Boolean,
      default: false
    }
  });
  const goodsCate = ref<Array<GoodsClassifyItem>>([]);
  const brandList = ref<Array<{ label: string; value: number }>>([]);
  const refTable: Ref = ref(null);
  const api = ref<any>(null);
  const emits = defineEmits(['submit', 'update:modelValue', 'refresh']);
  const selectKeys = ref<Array<number>>([]);
  const data = reactive<DataConfig>({
    refresh: false,
    search: {
      storeId: props.shopId
    }
  });

  const options: Ref = computed(() => {
    const prop = props.source === 'goods' ? 'prdId' : 'storeProductId';
    getColSpanData(prop, refTable?.value?.data, 4);
    return {
      submitText: '搜索',
      tableCard: false,
      menu: false,
      menuOtherOptions: {
        'span-all': true,
        'row-key': props.source === 'stock' ? 'storeProductId' : 'prdId',
        'rowSelection': {
          type: 'checkbox',
          showCheckedAll: true
        },
        'onSelect': (e: number[]) => {
          selectKeys.value = e;
        },
        'spanMethod': spanMethod
      },
      columns: [
        {
          label: '商品筛选',
          prop: 'key',
          placeholder: '请输入商品名称/编码',
          ellipsis: true,
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
          label: '项目名称',
          prop: 'projectName'
        },
        {
          label: '店铺名称',
          prop: 'storeName'
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
          label: '品牌',
          prop: 'brandName'
        },
        {
          label: '单位',
          prop: 'unitName'
        },
        {
          label: '规格',
          prop: 'names'
        },
        {
          label: '销售参考价（¥）',
          prop: 'scribingPrice'
        },
        {
          label: '库存',
          prop: 'availableNum'
        },
        {
          label: props.isIn ? '入库' : '出库',
          prop: 'inOutNum'
        }
      ]
    };
  });
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  function handleOnOk() {
    emits('submit');
  }
  function onClose() {
    delete data.search.brandId;
    delete data.search.classifyId;
    delete data.search.retrievalStr;
    delete data.search.key;
    visible.value = false;
  }
  const handleReset = () => {
    delete data.search.classifyId;
    delete data.search.brandId;
  };
  const handleData = (): any => {
    const temp: any = [];
    refTable.value.data.forEach((el: any) => {
      selectKeys.value.forEach((each: number) => {
        if (each === el.storeProductId) {
          if (el.inOutNum > 0) {
            temp.push({
              storeId: props.shopId,
              storeProductId: el.storeProductId,
              storeProductWeightId: el.storeProductWeightId,
              inOutNum: el.inOutNum,
              availableNum: el.availableNum
            });
          }
        }
      });
    });
    return temp;
  };
  const isLoading = ref(false);
  const saveAndInStock = async () => {
    const temp = handleData();
    if (temp?.length) {
      try {
        isLoading.value = true;
        await groundPcApiStoreProductInOutOrderInPost(temp);
        visible.value = false;
        data.search.brandId = '';
        data.search.classifyId = '';
        emits('refresh');
      } catch (e) {
      } finally {
        isLoading.value = false;
      }
    } else {
      Message.error('请勾选商品并填写入库数量');
    }
  };

  const saveAndOutStock = async () => {
    const temp = handleData();
    if (temp?.length) {
      try {
        isLoading.value = true;
        await groundPcApiStoreProductInOutOrderOutPost(temp);
        visible.value = false;
        data.search.brandId = '';
        data.search.classifyId = '';
        emits('refresh');
      } catch (e) {
      } finally {
        isLoading.value = false;
      }
    } else {
      Message.error('请勾选商品并填写出库数量');
    }
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
      data.search.storeId = v;
      data.refresh = true;
    },
    { immediate: true }
  );
  watch(
    () => props.source,
    (v) => {
      if (v === 'stock') {
        api.value = groundPcApiStoreProductStockAllInfoGet;
      }
    },
    { immediate: true }
  );
  watch(visible, () => {
    if (data.search.storeId) {
      data.refresh = true;
    }
    selectKeys.value.length = 0;
  });
</script>

<style scoped></style>
