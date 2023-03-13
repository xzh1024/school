<template>
  <drawer
    v-model="visible"
    title="编辑权益"
    :options="{
      okLoading: isLoading
    }"
    @before-ok="onBeforeOkClick"
  >
    <div class="white-detail-box">
      <a-divider orientation="left">基本信息</a-divider>
      <a-descriptions :column="2">
        <a-descriptions-item label="权益名称">{{
          form.name
        }}</a-descriptions-item>
        <a-descriptions-item label="核销方式">{{
          serviceModeHash[form.serviceMode] || '--'
        }}</a-descriptions-item>
      </a-descriptions>
      <a-form
        ref="authForm"
        :rules="page.rules"
        :form="form"
        :model="form"
        layout="vertical"
      >
        <a-row>
          <a-col :span="10">
            <a-form-item field="showName" label="权益展示名称：">
              <a-input
                v-model="form.showName"
                max-length="18"
                placeholder="请输入权益展示名称"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="10" :offset="2">
            <a-form-item field="remark" label="权益简介：">
              <a-input
                v-model="form.remark"
                max-length="100"
                placeholder="请输入权益简介"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item field="icon" label="权益图标：">
              <i-custom-upload
                v-model="form.icon"
                url-key="previewAddress"
                :options="{
                  limit: 1,
                  accept: 'image/*'
                }"
              ></i-custom-upload>
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item v-if="id === '1'" field="applyType" label="适用店铺：">
          <a-radio-group
            v-model="form.applyType"
            style="width: 150px"
            direction="vertical"
            @change="onChangeApplyType"
          >
            <a-radio :value="1">全部店铺可用</a-radio>
            <a-radio :value="2">指定店铺可用</a-radio>
            <a-radio :value="3">指定店铺不可用</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
      <i-table
        v-if="id === '1' && [2, 3].includes(form.applyType)"
        :options="page.options"
        :data="selectShopsList"
      >
        <template #header>
          <a-button type="text" @click="page.showChooseShop = true"
            >选择店铺</a-button
          >
        </template>
        <template #areaCell="{ record }">
          {{
            record.provinceName
              ? record.provinceName +
                '/' +
                record.cityName +
                '/' +
                record.districtName
              : '--'
          }}
        </template>
        <template #spaceApplyTypeCell="{ record }">
          {{ spaceApplyTypeHash[record.spaceApplyType] }}
          <a-button type="text" @click="onUpdateStadiumModel(record)"
            >修改</a-button
          >
        </template>
        <template #pdtApplyTypeCell="{ record }">
          {{ pdtApplyTypeHash[record.pdtApplyType] }}
          <a-button type="text" @click="onUpdateGoodsModel(record)"
            >修改</a-button
          >
        </template>
      </i-table>
      <choose-item
        v-model="page.showChooseShop"
        v-model:select-keys="selectShopsKeys"
        :search="page.search"
        title="选择店铺"
        :options="chooseShopOptions"
        :api="cbdApiProjectCommonStoreSelectPageGet"
        @reset="page.search = { type: 1 }"
        @submit="handleSelectShop"
      ></choose-item>
      <edit-chosen-item
        v-if="page.showUpdateStadiumModel"
        v-model="page.showUpdateStadiumModel"
        v-model:select-keys="editStadiumKeys"
        v-model:default-check-status="chooseModelDefaultCheckStatus"
        :can-use="form.applyType === 3"
        title="适用场地"
        :search="page.shopSearch"
        :options="editStadiumOptions"
        :api="cbdApiProjectCommonSpaceSelectPageGet"
        @submit="handleUpdateShopStadium"
      >
      </edit-chosen-item>
      <edit-chosen-item
        v-if="page.showUpdateGoodsModel"
        ref="refGoodsTable"
        v-model:select-keys="editGoodsKeys"
        v-model:default-check-status="chooseModelDefaultCheckStatus"
        v-model="page.showUpdateGoodsModel"
        title="适用商品"
        :is-stadium="false"
        :can-use="form.applyType === 3"
        :search="page.shopSearch"
        :options="editGoodsOptions"
        :api="cbdApiProjectCommonProductSelectPageGet"
        @submit="handleUpdateShopGoods"
      >
      </edit-chosen-item>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, Ref, computed } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectMembersRightsDetailIdGet,
    cbdApiProjectCommonStoreSelectPageGet,
    cbdApiProjectCommonFormatSelectListGet,
    cbdApiProjectCommonProductSelectPageGet,
    cbdApiProjectCommonSpaceSelectPageGet,
    cbdApiProjectCommonVenueClassifyGet,
    cbdApiProjectProductAttributeClassifyListGet,
    cbdApiProjectProductAttributeBrandListGet,
    cbdApiProjectMembersRightsSavePost
  } from '@/api';
  import {
    serviceModeHash,
    spaceApplyTypeHash,
    pdtApplyTypeHash
  } from '@/utils/dic';
  import type {
    BrandListItem,
    GoodsClassifyItem,
    IndustryItem,
    StadiumTypeItem
  } from '@/utils/dic';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import ChooseItem from '@/components/choose-item/index.vue';
  import EditChosenItem from './edit-chosen-item.vue';
  import addressOptions from '@/utils/area.json';
  import { Message } from '@arco-design/web-vue';
  import Bus from '@/views/mall/share-data';
  import useRowspan from '@/hooks/useRowspan';
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
  const refGoodsTable: Ref = ref(null);
  const emits = defineEmits(['update:modelValue', 'refresh']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v: boolean) {
      emits('update:modelValue', v);
    }
  });
  const page = reactive<any>({
    rules: {
      showName: [{ required: true, message: '请输入权益展示名称' }],
      remark: [{ required: true, message: '请输入权益简介' }],
      icon: [{ required: true, message: '请上传权益图标' }],
      applyType: [{ required: true, message: '请勾选适用店铺' }]
    },
    showChooseShop: false,
    showUpdateGoodsModel: false,
    showUpdateStadiumModel: false,
    search: {
      type: 1
    },
    shopSearch: {
      type: 2
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
          prop: 'area'
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
          prop: 'spaceApplyType'
        },
        {
          label: '适用商品',
          prop: 'pdtApplyType'
        }
      ]
    },
    canUseStoreList: [], // 用来缓存选择的数据
    canNotUseStoreList: [] // 用来缓存选择的数据
  });
  const selectShopsKeys = ref<Array<number>>([]);
  const editGoodsKeys = ref<Array<number>>([]);
  const editStadiumKeys = ref<Array<number>>([]);
  const goodsCate = ref<Array<GoodsClassifyItem>>([]);
  const brandList = ref<Array<BrandListItem>>([]);
  const industryList = ref<Array<IndustryItem>>([]);
  const chooseModelDefaultCheckStatus = ref<number>(0);
  const selectShopsList: Ref = ref([]);
  const stadiumDropList = ref<Array<StadiumTypeItem>>([]);
  const chooseShopOptions: Ref = computed(() => {
    return {
      tableCard: false,
      menu: false,
      menuOtherOptions: {
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
          showCheckedAll: true
        },
        onSelect: (e: number[]) => {
          selectShopsKeys.value = e;
        }
      },
      columns: [
        {
          label: '店铺名称',
          prop: 'key',
          search: true,
          hide: true
        },
        {
          label: '店铺名称',
          prop: 'storeName'
        },
        {
          label: '经营业态',
          prop: 'manageName'
        },
        {
          label: '经营业态',
          prop: 'sceneId',
          search: true,
          hide: true,
          type: 'cascader',
          options: {
            'check-strictly': true,
            'fieldNames': {
              value: 'id',
              label: 'formatData'
            }
          },
          dic: industryList.value
        },
        {
          label: '所属区域',
          prop: '_area',
          type: 'cascader',
          search: true,
          options: {
            pathMode: true
          },
          on: {
            change: (e: any) => {
              page.search.provinceCode = e[0];
              page.search.cityCode = e[1];
              page.search.districtCode = e[2];
            }
          },
          dic: addressOptions
        },
        {
          label: '联系人',
          prop: 'contacts'
        },
        {
          label: '联系电话',
          prop: 'contactsPhone'
        }
      ]
    };
  });
  const editGoodsOptions: Ref = computed(() => {
    return {
      tableCard: false,
      menu: false,
      menuOtherOptions: {
        'span-all': true,
        'rowKey': 'id',
        'rowSelection': {
          type: 'checkbox',
          showCheckedAll: true
        },
        'onSelect': (e: number[]) => {
          editGoodsKeys.value = e;
        },
        'spanMethod': spanMethod
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
      menuOtherOptions: {
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
          showCheckedAll: true
        },
        onSelect: (e: number[]) => {
          editStadiumKeys.value = e;
        }
      },
      columns: [
        {
          label: '场地名称',
          prop: 'key',
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
  const form: Ref = ref({});
  const authForm: Ref = ref(null);
  const isLoading = ref(false);
  async function onBeforeOkClick(done: (bool?: boolean) => void) {
    done(false);
    const res = await authForm.value.validate();
    const hasShop: boolean = form.value.rightsStoreList?.length;
    if (!res) {
      if (form.value.applyType === 1 || hasShop) {
        // form.value.rightsStoreList
        console.log(form.value.rightsStoreList);
        if (form.value.applyType === 3) {
          form.value.rightsStoreList.forEach((el: any) => {
            el.pdtApplyType = el.pdtApplyType === -1 ? 1 : el.pdtApplyType;
            el.spaceApplyType =
              el.spaceApplyType === -1 ? 1 : el.spaceApplyType;
          });
        }
        const key = Array.isArray(form.value.icon)
          ? form.value.icon[0].key
          : form.value.icon.id;

        try {
          isLoading.value = true;
          await cbdApiProjectMembersRightsSavePost({
            ...form.value,
            icon: key
          });
          visible.value = false;
          emits('refresh');
          Bus.$emit('refresh', props.id);
        } catch (e) {
        } finally {
          isLoading.value = false;
        }
      } else {
        Message.error('请选择店铺');
      }
    }
  }
  function onUpdateGoodsModel(record: any) {
    chooseModelDefaultCheckStatus.value =
      record.pdtApplyType === -1 ? 1 : record.pdtApplyType;
    page.showUpdateGoodsModel = true;
    page.shopSearch.storeId = record.id;
    // 编辑店铺商品勾选回显
    editGoodsKeys.value = record.productIds || [];
  }
  function onUpdateStadiumModel(record: any) {
    chooseModelDefaultCheckStatus.value =
      record.spaceApplyType === -1 ? 1 : record.spaceApplyType;
    page.showUpdateStadiumModel = true;
    page.shopSearch.storeId = record.id;
    // 编辑店铺场馆勾选回显
    editStadiumKeys.value = record.spaceIds || [];
  }
  function onChangeApplyType(v: string | number | boolean) {
    if (v === 2) {
      // 切换为可用商铺时,将目前(不可用)数据保存起来 page.canNotUseStoreList 中
      page.canNotUseStoreList = [];
      selectShopsKeys.value = [];
      selectShopsList.value.forEach((el: any) => {
        page.canNotUseStoreList.push(el);
      });
      // 清空表格
      selectShopsList.value = [];
      // 如果保存过可用的数据,将数据展示出来
      selectShopsList.value = page.canUseStoreList || [];
      // 更新form数据,保证提交数据是最切换后的
      form.value.rightsStoreList = page.canUseStoreList || [];
      // 刷新当前应勾选的id
      selectShopsKeys.value = page.canUseStoreList.map((el: any) => el.id);
    } else if (v === 3) {
      page.canUseStoreList = [];
      selectShopsList.value.forEach((el: any) => {
        page.canUseStoreList.push(el);
      });
      selectShopsList.value = [];
      selectShopsList.value = page.canNotUseStoreList;
      // 更新form数据,保证提交数据是最切换后的
      form.value.rightsStoreList = page.canNotUseStoreList || [];
      selectShopsKeys.value = page.canNotUseStoreList.map((el: any) => el.id);
    }
  }
  function handleSelectShop(v: any) {
    // 对旧数据根据 selectShopsKeys过滤,排除掉本次取消勾选的数据
    selectShopsList.value = selectShopsList.value.filter((el: any) =>
      selectShopsKeys.value.includes(el.id)
    );
    // 找出本次选择前已选择的店铺
    const alreadyHasKeysList: number[] = [];
    selectShopsList.value.forEach((el: any) => {
      alreadyHasKeysList.push(el.id);
    });
    // 得到本次选择的店铺
    const list = (v.data || []).filter(
      (el: any) =>
        selectShopsKeys.value.includes(el.id) &&
        !alreadyHasKeysList.includes(el.id)
    );
    // 对新选择的数据进行处理
    list.forEach((el: any) => {
      // 指定店铺可用 列表中显示全部可用
      if (form.value.applyType === 2) {
        el.spaceApplyType = 1;
        el.pdtApplyType = 1;
        // 指定店铺不可用 列表中显示全部不可用
      } else if (form.value.applyType === 3) {
        el.spaceApplyType = -1;
        el.pdtApplyType = -1;
      }
    });
    // 将新选择的和前面已选择好的拼接 ===> 不能直接覆盖,否则前面编辑的会被覆盖
    selectShopsList.value = selectShopsList.value.concat(list);
    // 同步更新form中的数据
    form.value.rightsStoreList = selectShopsList.value || [];
    page.showChooseShop = false;
  }

  function handleUpdateShopStadium(v: any) {
    selectShopsList.value.forEach((el: any) => {
      if (el.id === page.shopSearch.storeId) {
        el.spaceApplyType = v.type;
        el.spaceIds = editStadiumKeys.value;
      }
    });
    form.value.rightsStoreList = selectShopsList.value;
    // 清空选中状态,防止下次进入时依旧选中上次的数据
    editStadiumKeys.value = [];
    page.showUpdateStadiumModel = false;
  }
  function handleUpdateShopGoods(v: any) {
    selectShopsList.value.forEach((el: any) => {
      if (el.id === page.shopSearch.storeId) {
        el.pdtApplyType = v.type;
        el.productIds = editGoodsKeys.value;
      }
    });
    form.value.rightsStoreList = selectShopsList.value;
    // 清空选中状态,防止下次进入时依旧选中上次的数据
    editGoodsKeys.value = [];
    page.showUpdateGoodsModel = false;
  }
  const [getDetailData] = useFuncProxy(async () => {
    form.value = await cbdApiProjectMembersRightsDetailIdGet({
      id: props.id
    });
    selectShopsKeys.value = [];
    selectShopsList.value = [];
    selectShopsList.value = form.value.rightsStoreList;
    if (form.value.applyType === 2) {
      page.canUseStoreList = form.value.rightsStoreList || [];
    }
    if (form.value.applyType === 3) {
      form.value.rightsStoreList.forEach((el: any) => {
        el.pdtApplyType = el.pdtApplyType === 1 ? -1 : el.pdtApplyType;
        el.spaceApplyType = el.spaceApplyType === 1 ? -1 : el.spaceApplyType;
      });
      page.canNotUseStoreList = form.value.rightsStoreList || [];
    }
    form.value.rightsStoreList.forEach((el: any) => {
      selectShopsKeys.value.push(el.id);
    });
  });
  const [getIndustryList] = useFuncProxy(async () => {
    industryList.value = await cbdApiProjectCommonFormatSelectListGet({});
  });
  const [getStadiumDropList] = useFuncProxy(async () => {
    stadiumDropList.value = await cbdApiProjectCommonVenueClassifyGet({});
  });
  const [getGoodsCategory] = useFuncProxy(async () => {
    goodsCate.value = await cbdApiProjectProductAttributeClassifyListGet();
  });
  const [getBrandList] = useFuncProxy(async () => {
    brandList.value = await cbdApiProjectProductAttributeBrandListGet();
  });
  getGoodsCategory();
  getBrandList();
  onMounted(() => {
    if (props.id) {
      getIndustryList();
      getStadiumDropList();
      getDetailData();
    }
    Bus.$on('data', (v) => {
      getColSpanData('id', v, 4);
    });
  });
</script>
<style scoped></style>
