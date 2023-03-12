<template>
  <drawer v-model="visible" title="查看权益">
    <template #footer>
      <a-button type="primary" @click="onEdit">编辑</a-button>
    </template>
    <div class="white-detail-box">
      <a-divider orientation="left">基本信息</a-divider>
      <a-descriptions :column="2">
        <a-descriptions-item label="权益名称">{{
          data.name
        }}</a-descriptions-item>
        <a-descriptions-item label="核销方式">{{
          serviceModeHash[data.serviceMode] || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label=" 权益展示名称">{{
          data.showName
        }}</a-descriptions-item>
        <a-descriptions-item label=" 权益简介">{{
          data.remark
        }}</a-descriptions-item>
        <a-descriptions-item label=" 权益图标" :span="3">
          <a-image
            :src="data.icon && data.icon.previewAddress"
            width="80"
          ></a-image>
        </a-descriptions-item>
        <a-descriptions-item v-if="id === '1'" label="适用店铺" :span="3">{{
          data.applyType === 3
            ? '指定店铺不可用'
            : data.applyType === 2
            ? '指定店铺可用'
            : '全部店铺可用'
        }}</a-descriptions-item>
      </a-descriptions>
      <template
        v-if="id === '1' && data.rightsStoreList && data.rightsStoreList.length"
      >
        <i-table :options="page.options" :data="data.rightsStoreList">
          <template #_areaCell="{ record }">
            {{ record.provinceName + record.cityName + record.districtName }}
          </template>
          <template #venueTypeCell="{ record }">
            {{ spaceApplyTypeHash[record.spaceApplyType] }}
            <a-button type="text" @click="onViewStadiumModel(record)"
              >查看</a-button
            >
          </template>
          <template #productTypeCell="{ record }">
            {{ pdtApplyTypeHash[record.pdtApplyType] }}
            <a-button type="text" @click="onViewGoodsModel(record)"
              >查看</a-button
            >
          </template>
        </i-table>
        <edit-chosen-item
          v-if="page.showUpdateStadiumModel"
          v-model="page.showUpdateStadiumModel"
          disabled
          title="适用场地"
          :search="page.shopSearch"
          :options="editStadiumOptions"
          :can-use="data.applyType === 3"
          :default-check-status="chooseModelDefaultCheckStatus"
          :api="cbdApiProjectCommonSpaceSelectPageGet"
          @submit="page.showUpdateStadiumModel = false"
        >
        </edit-chosen-item>
        <edit-chosen-item
          v-if="page.showUpdateGoodsModel"
          ref="refGoodsTable"
          v-model="page.showUpdateGoodsModel"
          disabled
          title="适用商品"
          :is-stadium="false"
          :search="page.shopSearch"
          :can-use="data.applyType === 3"
          :options="editGoodsOptions"
          :default-check-status="chooseModelDefaultCheckStatus"
          :api="cbdApiProjectCommonProductSelectPageGet"
          @submit="page.showUpdateGoodsModel = false"
        >
        </edit-chosen-item>
      </template>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, Ref, computed, toRaw } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectMembersRightsDetailIdGet,
    cbdApiProjectCommonVenueClassifyGet,
    cbdApiProjectProductAttributeClassifyListGet,
    cbdApiProjectProductAttributeBrandListGet,
    cbdApiProjectCommonMembersLevelSelectGet,
    cbdApiProjectCommonSpaceSelectPageGet,
    cbdApiProjectCommonProductSelectPageGet
  } from '@/api';
  import EditChosenItem from './edit-chosen-item.vue';
  import {
    serviceModeHash,
    spaceApplyTypeHash,
    pdtApplyTypeHash,
    MembersLevel,
    BrandListItem,
    GoodsClassifyItem,
    StadiumTypeItem
  } from '@/utils/dic';
  import Bus from '@/views/mall/share-data';
  import useRowspan from '@/hooks/useRowspan';
  type PageConfig = {
    shopSearch: {
      type: string;
      storeId?: number;
      id?: string;
      spaceIds?: number[];
      productIds?: number[];
    };
    options: any;
    showUpdateStadiumModel: boolean;
    showUpdateGoodsModel: boolean;
    canNotUseStoreList: [];
  };

  const [getColSpanData, spanMethod] = useRowspan();
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  });
  const emits = defineEmits(['update:modelValue', 'edit']);
  const chooseModelDefaultCheckStatus = ref<number>(0);
  const refGoodsTable: Ref = ref(null);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v: boolean) {
      emits('update:modelValue', v);
    }
  });
  const page = reactive<PageConfig>({
    showUpdateStadiumModel: false,
    showUpdateGoodsModel: false,
    shopSearch: {
      type: '1'
    },
    options: {
      tableCard: false,
      pageShow: false,
      indexTitle: '序号',
      index: true,
      menu: false,
      columns: [
        {
          label: '店铺名称',
          prop: 'storeName'
        },
        {
          label: '经营业态',
          prop: 'manageName'
        },
        {
          label: '所属区域',
          prop: '_area'
        },
        {
          label: '联系人',
          prop: 'contacts'
        },
        {
          label: '联系电话',
          prop: 'contactsPhone'
        },
        {
          label: '适用场地',
          prop: 'venueType'
        },
        {
          label: '适用商品',
          prop: 'productType'
        }
      ]
    },
    canNotUseStoreList: []
  });
  const data: Ref = ref({});
  const stadiumDropList: Ref = ref<Array<StadiumTypeItem>>([]);
  const goodsCate: Ref = ref<Array<GoodsClassifyItem>>([]);
  const brandList: Ref = ref<Array<BrandListItem>>([]);
  const membersLevel = ref<Array<MembersLevel>>([]);
  const editGoodsOptions: Ref = computed(() => {
    return {
      tableCard: false,
      menu: false,
      menuOtherOptions: {
        spanMethod: spanMethod
      },
      columns: [
        {
          label: '商品名称',
          prop: 'key',
          search: true,
          hide: true
        },
        {
          label: '商品名称',
          prop: 'productName'
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
          search: true,
          hide: true,
          type: 'select',
          dic: brandList.value,
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
          prop: 'specValueNames'
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
    };
  });
  const editStadiumOptions: Ref = computed(() => {
    return {
      tableCard: false,
      menu: false,
      columns: [
        {
          label: '场地名称',
          prop: 'nameOrCode',
          search: true,
          hide: true
        },
        {
          label: '场地名称',
          prop: 'name'
        },
        {
          label: '场地分类',
          prop: 'classifyId',
          search: true,
          type: 'select',
          hide: true,
          options: {
            fieldNames: {
              label: 'name',
              value: 'id'
            }
          },
          dic: stadiumDropList.value
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
    };
  });
  function onEdit() {
    emits('edit');
  }
  const [getDetailData] = useFuncProxy(async () => {
    data.value = await cbdApiProjectMembersRightsDetailIdGet({
      id: props.id
    });
    if (data.value.applyType === 3) {
      data.value.rightsStoreList.forEach((el: any) => {
        el.pdtApplyType = el.pdtApplyType === 1 ? -1 : el.pdtApplyType;
        el.spaceApplyType = el.spaceApplyType === 1 ? -1 : el.spaceApplyType;
      });
      page.canNotUseStoreList = data.value.rightsStoreList || [];
    }
  });
  function onViewStadiumModel(record: any) {
    page.showUpdateStadiumModel = true;
    chooseModelDefaultCheckStatus.value =
      record.spaceApplyType === -1 ? 1 : record.spaceApplyType;
    page.shopSearch.storeId = record.id;
    page.shopSearch.id = props.id;
    page.shopSearch.spaceIds = toRaw(record.spaceIds) || [];

    delete page.shopSearch.productIds;
  }
  function onViewGoodsModel(record: any) {
    page.showUpdateGoodsModel = true;
    chooseModelDefaultCheckStatus.value =
      record.pdtApplyType === -1 ? 1 : record.pdtApplyType;
    page.shopSearch.storeId = record.id;
    page.shopSearch.id = props.id;
    page.shopSearch.productIds = toRaw(record.productIds) || [];
    delete page.shopSearch.spaceIds;
  }
  const [getStadiumDropList] = useFuncProxy(async () => {
    stadiumDropList.value = await cbdApiProjectCommonVenueClassifyGet({});
  });
  const [getGoodsCategory] = useFuncProxy(async () => {
    goodsCate.value = await cbdApiProjectProductAttributeClassifyListGet();
  });
  const [getBrandList] = useFuncProxy(async () => {
    brandList.value = await cbdApiProjectProductAttributeBrandListGet();
  });
  const [getMembersLevel] = useFuncProxy(async () => {
    membersLevel.value = await cbdApiProjectCommonMembersLevelSelectGet({});
  });
  getGoodsCategory();
  getBrandList();
  getStadiumDropList();
  getMembersLevel();
  onMounted(() => {
    Bus.$on('refresh', (v) => {
      if (v === props.id) {
        getDetailData();
      }
    });
    Bus.$on('data', (v: any) => {
      getColSpanData('id', v, 4);
    });
    if (props.id) {
      getDetailData();
    }
  });
</script>
<style scoped></style>
