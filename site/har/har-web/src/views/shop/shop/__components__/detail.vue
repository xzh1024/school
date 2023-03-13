<template>
  <drawer v-model="visible" :title="title" :footer="false">
    <div class="white-detail-box">
      <a-divider orientation="left">店铺信息</a-divider>
      <a-descriptions
        :column="3"
        :data="shopInfo.data"
        layout="inline-horizontal"
        :label-style="{ marginBottom: '10px' }"
        :value-style="listItemStyle"
      >
        <descriptions-item
          v-for="(item, idx) in shopInfoItems"
          :key="idx"
          :span="item.span"
          :label="item.label + '：'"
        >
          {{ useFormatDescription(shopInfo.data, item) }}
        </descriptions-item>
      </a-descriptions>
      <div style="margin-bottom: 15px; color: #86909c">经营方向</div>
      <i-table v-if="isShow" :options="options" :data="shopInfo.scopes">
        <template #categoryIdCell="record">
          {{ record.categoryName }}
        </template>
      </i-table>
      <div style="margin-bottom: 15px; padding-top: 15px; color: #86909c"
        >店铺图片</div
      >
      <div
        v-for="(it, idx) in shopInfo.data.storePhotoAttachments"
        :key="idx"
        class="flex align-center"
        :style="{ marginBottom: '15px', ...listItemStyle }"
      >
        <p style="margin-right: 20px">{{ it.type }}：</p>
        <div>
          <i-custom-upload
            v-model="it.storePhotoAttachment"
            url-key="previewAddress"
            :options="{
              showUploadButton: false,
              showRemoveButton: false,
              width: '80px'
            }"
          ></i-custom-upload>
        </div>
      </div>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { Ref, reactive, computed, watch, onMounted } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import useFormatDescription from '@/hooks/useFormatDescription';
  import { ListDataType, listItemStyle } from '@/utils/dic';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { cbdApiProjectStoreExtraInfoIdGet } from '@/api';
  import ITable from '@/components/i-table/index.vue';
  import { DescriptionsItem } from '@arco-design/web-vue';
  import Bus from '../../refresh';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    refresh: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '查询店铺'
    },
    shopId: {
      type: Number
    }
  });
  const emits = defineEmits(['update:modelValue', 'update:refresh', 'edit']);

  interface ScopeType {
    enable: boolean;
    orderNum: number;
    title: string;
    type: number;
  }
  const isShow: Ref = computed(() => {
    return shopInfo.scopes.some((el: ScopeType) => el.enable);
  });
  const visible: Ref<boolean> = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });

  const options = reactive({
    index: true,
    tableCard: false,
    menu: false,
    pageShow: false,
    columns: [
      {
        label: '经营方式',
        prop: 'title'
      },
      {
        label: '说明',
        prop: 'desc'
      }
    ]
  });
  const shopInfo = reactive<any>({
    data: {
      storeLogoAttachments: [],
      pictures: []
    },
    scopes: []
  });

  const shopInfoItems: Array<ListDataType> = [
    {
      label: '店铺名称',
      prop: 'name'
    },
    {
      label: '所属商户',
      prop: 'merchantName'
    },
    {
      label: '客服电话',
      prop: 'customerServiceTel'
    },
    {
      label: '状态',
      prop: 'operatingStatus',
      isEnum: true,
      source: { 1: '营业中', 2: '打烊' }
    },
    {
      label: '特色服务',
      prop: 'feature',
      span: 3
    },
    {
      label: '定位',
      prop: 'location',
      span: 3
    },
    {
      label: '所属区域',
      prop: 'area'
    },
    {
      label: '详细地址',
      prop: 'address',
      span: 2
    },
    {
      label: '关联门店',
      prop: 'relationStores',
      span: 3,
      multiple: true,
      multiKey: 'name'
    },
    {
      label: '营业时间',
      prop: 'timeDesc',
      span: 3
    }
  ];
  const [getInfoById] = useFuncProxy(async () => {
    const res = await cbdApiProjectStoreExtraInfoIdGet({
      id: String(props.shopId!)
    });
    const area = res.provinceName + res.cityName + res.districtName;
    shopInfo.data = res;
    shopInfo.data.area = area;
    res.scopes.forEach((el: any) => {
      if (el.type === 1) {
        el.desc = '用于商品销售，主要售卖商品sku';
      } else if (el.type === 2) {
        el.desc = '用于场地预约，主要售卖场地时段';
      } else if (el.type === 3) {
        el.desc = '当前店铺或者商圈组织的优惠券或优惠活动将在当前模块内';
      } else if (el.type === 4) {
        el.desc = '当前店铺或者商圈组织的活动将在当前模块内';
      }
    });
    shopInfo.scopes = res.scopes.filter((el: any) => el.enable);
    shopInfo.data.timeDesc = res.openTime.desc;
    shopInfo.data.location = area + res.address;
    shopInfo.data.storePhotoAttachments = res.storePhotoAttachments;
  });
  onMounted(() => {
    Bus.$on('refresh', () => {
      getInfoById();
    });
  });
  watch(
    () => props.shopId,
    (v) => {
      if (v) {
        getInfoById();
      }
    },
    { immediate: true }
  );
</script>

<style scoped lang="less"></style>
