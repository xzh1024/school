<template>
  <div>
    <drawer
      v-if="visible"
      v-model="visible"
      width="70vw"
      :title="props.id ? '编辑' : '新增'"
      :options="{
        maskClosable: false,
        escToClose: false
      }"
    >
      <div class="content-box">
        <i-form ref="refForm" v-model="form" :options="options">
          <template #classifyIdForm>
            <div class="input-box">
              <a-cascader
                ref="refClassify"
                v-model="form.classifyId"
                placeholder="请选择商品分类"
                :options="classifyList"
                check-strictly
                :field-names="{
                  value: 'id',
                  label: 'name'
                }"
              ></a-cascader>
              <a-button
                class="btn-pos"
                type="text"
                @click="addClassifyVisible = true"
                >新建分类</a-button
              >
            </div>
          </template>
          <template #brandIdForm>
            <div class="input-box">
              <a-select
                v-model="form.brandId"
                placeholder="请选择品牌"
                :options="brandList"
                :field-names="{
                  value: 'id',
                  label: 'name'
                }"
                @change="brandChange"
              ></a-select>
              <a-button
                class="btn-pos"
                type="text"
                @click="addBrandVisible = true"
                >新建品牌</a-button
              >
            </div>
          </template>
          <template #productGroupForm>
            <div class="input-box">
              <a-select
                v-model="form.productGroup"
                placeholder="请选择商品组别"
                :options="productGroupList"
                @change="productGroupChange"
              ></a-select>
            </div>
          </template>
          <template #unitIdForm>
            <div class="input-box">
              <a-select
                v-model="form.unitId"
                placeholder="请选择单位"
                :options="unitsList"
                :field-names="{
                  value: 'id',
                  label: 'name'
                }"
                @change="unitsChange"
              ></a-select>
              <a-button
                class="btn-pos"
                type="text"
                @click="addUnitVisible = true"
                >新建单位</a-button
              >
            </div>
          </template>
          <template #coverCodeForm>
            <i-custom-upload
              v-model="form.coverCode"
              url-key="previewAddress"
              :options="{
                limit: 1,
                listType: 'picture-card',
                accept: 'image/*'
              }"
            ></i-custom-upload>
          </template>
          <template #detailsCodesForm>
            <i-custom-upload
              v-model="form.detailsCodes"
              url-key="previewAddress"
              :options="{
                listType: 'picture-card',
                accept: 'image/*'
              }"
            ></i-custom-upload>
          </template>
          <template v-if="!id" #specNamesForm>
            <edit-specs
              v-model="form.specNames"
              @resetValidate="resetValidate"
            />
          </template>
          <template #weightsForm>
            <edit-specs-list
              v-if="!id"
              v-model="form.weights"
              :spec-names="form.specNames"
            />
            <div class="list" style="width: 100%">
              <i-table
                v-if="id"
                :options="showSpecOptions"
                :data="form.weights"
              >
                <template #picCodeCell="{ record }">
                  <i-custom-upload
                    v-model="record.picCode"
                    url-key="previewAddress"
                    :options="{
                      listType: 'picture-card',
                      accept: 'image/*',
                      limit: 1
                    }"
                  ></i-custom-upload>
                </template>
                <template #codeCell="{ record }">
                  <a-input
                    v-model="record.code"
                    placeholder="请填写规格编码"
                  ></a-input>
                </template>
                <template #artCodeCell="{ record }">
                  <a-input
                    v-model="record.artCode"
                    placeholder="请填写货号"
                  ></a-input>
                </template>
                <template #taxRateCell="{ record }">
                  <a-input-number
                    v-model="record.taxRate"
                    placeholder="请填写税率"
                    ><template #append>%</template></a-input-number
                  >
                </template>
                <template #barcodeCell="{ record }">
                  <a-input
                    v-model="record.barcode"
                    placeholder="请填写规格条码"
                    @input="record.barcode = record.barcode.replace(/\D/g, '')"
                  ></a-input>
                </template>
                <!--            <template #scribingPriceCell="{ record }">-->
                <!--              <a-input-number-->
                <!--                v-model="record.scribingPrice"-->
                <!--                placeholder="请填写参考销售价"-->
                <!--              ></a-input-number>-->
                <!--            </template>-->
                <template #salePriceCell="{ record }">
                  <a-input
                    v-model="record.salePrice"
                    placeholder="请填写参考销售价"
                  ></a-input>
                </template>
                <template #stockNumCell="{ record }">
                  <a-input-number
                    v-model="record.stockNum"
                    :disabled="!!id"
                    placeholder="请填写库存"
                  ></a-input-number>
                </template>
              </i-table>
            </div>
          </template>

          <template #graphicDetailsForm>
            <i-editor v-model="form.graphicDetails" />
          </template>
        </i-form>
      </div>
      <template #footer>
        <a-button @click="visible = false">取消</a-button>
        <a-button
          :loading="isLoading"
          type="primary"
          @click="inStockAndOnOffShelf('off')"
          >保存并入库下架</a-button
        >
        <a-button
          :loading="isLoading"
          type="primary"
          @click="inStockAndOnOffShelf('on')"
          >保存并入库上架</a-button
        >
      </template>
    </drawer>
    <classify-edit
      v-model="addClassifyVisible"
      @confirm="handleUpdateClassification('classify')"
    />
    <brand-edit
      v-model="addBrandVisible"
      @confirm="handleUpdateClassification('brand')"
    />
    <unit-edit
      v-model="addUnitVisible"
      @confirm="handleUpdateClassification('unit')"
    />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'GoodsEdit'
  };
</script>

<script setup lang="ts">
  import Drawer from '@/components/drawer/drawer.vue';
  import { computed, onMounted, ref, Ref, watch } from 'vue';
  import IForm from '@/components/i-form/index.vue';
  import ITable from '@/components/i-table/index.vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import ClassifyEdit from '../goods-attribute/__components__/classify-edit.vue';
  import BrandEdit from '../goods-attribute/__components__/brand-edit.vue';
  import UnitEdit from '../goods-attribute/__components__/unit-edit.vue';
  // import { getBrandDic, getClassifyDic, getUnitsDic } from '@/utils/getDic';
  // import { getUnitsDic } from '@/utils/getDic';
  import IEditor from '@/components/i-editor/index.vue';
  import {
    groundPcApiStoreProductUpdatePut,
    // groundPcApiStoreProductInfoIdGet,
    groundPcApiStoreProductSavePost,
    groundPcApiCommonProductAttributeBrandGet,
    groundPcApiCommonProductAttributeClassifyGet,
    groundPcApiCommonProductAttributeUnitsGet,
    groundPcApiCommonStoreSelectGet,
    groundPcApiCommonProjectSelectListGet,
    groundPcApiStoreProductInfoIdStoreIdGet
  } from '@/api/ground-pc-api';
  import { Message } from '@arco-design/web-vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import EditSpecsList from './edit-specs-list.vue';
  import EditSpecs from './edit-specs.vue';
  import { useRequest } from '@har/use';
  import { groundPcApiCommonGoodsGroupSelectGet } from '@/api/ground-pc-api';

  const props = defineProps({
    modelValue: {
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
  const emits = defineEmits(['update:modelValue', 'refresh']);
  const form: Ref = ref({ specNames: [{}], salesFunnel: true });
  const refForm: Ref = ref(null);
  const refClassify: Ref = ref(null);
  const addClassifyVisible: Ref<boolean> = ref(false);
  const addBrandVisible: Ref<boolean> = ref(false);
  const addUnitVisible: Ref<boolean> = ref(false);
  const options: Ref = computed(() => {
    return {
      menuForm: false,
      formCard: false,
      maskClosable: false,
      layout: 'vertical',
      size: 'medium',
      columns:
        // props.id
        // ? [
        //   {
        //     label: '基本信息',
        //     type: 'groupTitle',
        //     span: 8
        //   },
        //   {
        //     label: '项目名称',
        //     prop: 'projectId',
        //     type: 'select',
        //     rules: [{ required: true, message: '请填写项目名称' }],
        //     dicRequest: groundPcApiCommonProjectSelectListGet,
        //     span: 8
        //   },
        //   {
        //     label: '店铺名称',
        //     prop: 'storeIdList',
        //     type: 'select',
        //     options: {
        //       multiple: true
        //     },
        //     rules: [{ required: true, message: '请选择店铺' }],
        //     dicRequest: groundPcApiCommonStoreSelectGet,
        //     span: 8
        //   },
        //   {
        //     label: '线上销售',
        //     prop: 'salesFunnel',
        //     type: 'switch',
        //     span: 8
        //   },
        //   {
        //     label: '商品名称',
        //     prop: 'name',
        //     rules: [{ required: true, message: '请填写商品名称' }],
        //     span: 8
        //   },
        //   {
        //     label: '商品分类',
        //     prop: 'classifyId',
        //     rules: [{ required: true, message: '请选择商品分类' }],
        //     span: 8
        //   },
        //   {
        //     label: '品牌',
        //     prop: 'brandId',
        //     span: 8
        //   },
        //   {
        //     label: '单位',
        //     prop: 'unitId',
        //     rules: [{ required: true, message: '请填写单位' }],
        //     span: 8
        //   },
        //   {
        //     label: '商品编码',
        //     prop: 'code',
        //     span: 8
        //   },
        //   {
        //     label: '商品组别',
        //     prop: 'productGroup',
        //     rules: [{ required: true, message: '请选择商品组别' }],
        //     span: 8
        //   },
        //   {
        //     label: '商品封面图',
        //     prop: 'coverCode',
        //     span: 9
        //   },
        //   {
        //     label: '商品详情图片',
        //     prop: 'detailsCodes',
        //     span: 15
        //   },
        //   {
        //     label: '规格信息',
        //     prop: 'weights',
        //     span: 24
        //   },
        //   {
        //     label: '商品须知',
        //     prop: 'instructions',
        //     type: 'textarea',
        //     showWordLimit: true,
        //     span: 24
        //   },
        //   {
        //     label: '图文详情',
        //     prop: 'graphicDetails',
        //     span: 24
        //   }
        // ]
        // :
        [
          {
            label: '基本信息',
            type: 'groupTitle',
            span: 8
          },
          {
            label: '项目名称',
            prop: 'projectId',
            type: 'select',
            rules: [{ required: true, message: '请填写项目名称' }],
            dicRequest: groundPcApiCommonProjectSelectListGet,
            span: 8
          },
          {
            label: '店铺名称',
            prop: 'storeIdList',
            type: 'select',
            options: {
              multiple: !props.id,
              disabled: props.id
            },
            rules: [{ required: true, message: '请选择商品分类' }],
            dicRequest: groundPcApiCommonStoreSelectGet,
            span: 8
          },
          {
            label: '线上销售',
            prop: 'salesFunnel',
            type: 'switch',
            span: 8
          },
          {
            label: '商品名称',
            prop: 'name',
            rules: [{ required: true, message: '请填写商品名称' }],
            span: 8
          },
          {
            label: '商品分类',
            prop: 'classifyId',
            rules: [{ required: true, message: '请选择商品分类' }],
            span: 8
          },
          {
            label: '品牌',
            prop: 'brandId',
            span: 8
          },
          {
            label: '单位',
            prop: 'unitId',
            rules: [{ required: true, message: '请填写单位' }],
            span: 8
          },
          {
            label: '商品编码',
            prop: 'code',
            span: 8
          },
          {
            label: '商品组别',
            prop: 'productGroup',
            rules: [{ required: true, message: '请选择商品组别' }],
            span: 8
          },
          {
            label: '商品封面图',
            prop: 'coverCode',
            span: 9
          },
          {
            label: '商品详情图片',
            prop: 'detailsCodes',
            span: 15
          },
          {
            label: '规格设置',
            prop: 'specNames',
            span: 24,
            display: !props.id
          },
          {
            label: '规格信息',
            prop: 'weights',
            span: 24
          },
          {
            label: '商品须知',
            prop: 'instructions',
            type: 'textarea',
            showWordLimit: true,
            span: 24
          },
          {
            label: '图文详情',
            prop: 'graphicDetails',
            span: 24
          }
        ]
    };
  });
  const visible: Ref<boolean> = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const showSpecOptions: Ref = ref({
    index: false,
    menu: false,
    pageShow: false,
    indexWidth: 35,
    menuOtherOptions: {
      scroll: {
        x: '120%'
      }
    },
    columns: [
      {
        label: '规格名称',
        prop: 'names',
        width: 150
      },
      {
        label: '规格图片',
        prop: 'picCode',
        width: 130
      },
      {
        label: '规格编码',
        prop: 'code',
        width: 220
      },
      {
        label: '规格条码',
        prop: 'barcode',
        width: 170
      },
      {
        label: '货号',
        prop: 'artCode',
        width: 150
      },
      {
        label: '税率',
        prop: 'taxRate',
        width: 180
      },
      {
        label: '参考销售价(￥)',
        prop: 'scribingPrice',
        width: 120
      },
      {
        label: '门店零售价(￥)',
        prop: 'salePrice',
        width: 120
      },
      {
        label: '库存',
        prop: 'stockNum',
        width: 100
      }
    ]
  });
  const classifyList: Ref = ref([]);
  const brandList: Ref = ref([]);
  const unitsList: Ref = ref([]);
  onMounted(() => {
    initDic();
    if (props.id) getInfo();
  });

  // 重置校验
  async function resetValidate() {
    await refForm.value.submit();
  }
  const [getInfo] = useFuncProxy(async () => {
    const { weights = [], ...others } =
      await groundPcApiStoreProductInfoIdStoreIdGet({
        id: `${props.id}`,
        storeId: props.storeId!
      });
    let id;
    if (others.classifyId!.indexOf(',') > -1) {
      const tempArr: string[] = others.classifyId!.split(',');
      tempArr.forEach((el: any, idx: number) => {
        if (idx === tempArr.length - 1) {
          id = el;
        }
      });
    } else {
      id = others.classifyId;
    }
    // weights.map((item: any) => {
    //   item.picCode = [item.picCode];
    // });
    form.value = {
      ...others,
      weights,
      classifyId: id
    };
  });
  async function initDic() {
    try {
      unitsList.value = await groundPcApiCommonProductAttributeUnitsGet();
      brandList.value = await groundPcApiCommonProductAttributeBrandGet({});
      classifyList.value = await groundPcApiCommonProductAttributeClassifyGet(
        {}
      );
    } catch (e) {
      console.error(e);
    }
  }
  const isLoading = ref(false);
  // eslint-disable-next-line consistent-return
  async function inStockAndOnOffShelf(type: string) {
    const method = type === 'off' ? 0 : 1;
    try {
      const res = await refForm.value.submit();
      // if (res) return done(false);
      const classifyName = refClassify.value?.selectViewValue?.[0]?.label;
      const { weights = [], detailsCodes = [] } = form.value;
      let { coverCode = [] } = form.value;
      console.log(detailsCodes);
      if (!Array.isArray(coverCode)) {
        coverCode = [coverCode];
      }
      if (!weights.length) {
        Message.error('请选择规格值');
        throw new Error('规格值不能为空');
      }
      const tempKeys: string[] = [];
      detailsCodes.forEach((el: any) => {
        if (el.key || el.id) {
          tempKeys.push(el.key || el.id);
        }
      });
      const p = {
        ...form.value,
        method,
        storeId: props.storeId,
        classifyName,
        detailsCodes: tempKeys,
        coverCode: coverCode.map((i: any) => i.key || i.id)?.join(),
        weights: weights.map((i: any) => {
          const { picCode }: { picCode: any } = i;
          let pic = '';
          if (Array.isArray(picCode)) {
            pic = picCode?.map((j: any) => j.key || j.id)?.join();
          } else {
            pic = picCode?.key || picCode?.id;
          }
          return { ...i, picCode: pic };
        }),
        salesFunnel: form.value.salesFunnel ? 1 : 0
      };
      isLoading.value = true;
      if (props.id) {
        await groundPcApiStoreProductUpdatePut(p);
        Message.success('修改成功');
      } else {
        await groundPcApiStoreProductSavePost(p);
        Message.success('添加成功');
      }
      emits('refresh');
      visible.value = false;
    } catch (e) {
      // done(false);
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }

  // 品牌中字
  function brandChange(v: any) {
    const item = brandList.value?.find((i: any) => i.id === v);
    form.value.brandName = item?.name || '';
  }
  // 单位中字
  function unitsChange(v: any) {
    const item = unitsList.value?.find((i: any) => i.id === v);
    form.value.unitName = item?.name || '';
  }
  type GroupItem = {
    label: string;
    value: number;
  };
  const productGroupList = ref<GroupItem[]>([{ label: '正价商品', value: 1 }]);
  function productGroupChange(v: any) {
    const item = productGroupList.value.find((i: GroupItem) => i.value === v);
    form.value.productGroupName = item?.label || '';
  }
  const handleUpdateClassification = (type: 'classify' | 'brand' | 'unit') => {
    initDic();
    console.log(type);
  };
  const { run: getGroupList } = useRequest(
    groundPcApiCommonGoodsGroupSelectGet,
    {
      manual: true,
      onSuccess(res) {
        productGroupList.value = res || [];
      }
    }
  );
  watch(
    () => form.value.projectId,
    (v: number) => {
      if (v) {
        getGroupList({
          projectId: String(v)
        });
      }
    }
  );
</script>

<style scoped lang="less">
  .content-box {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    background-color: #fff;
  }
  .input-box {
    position: relative;
    width: 100%;

    .btn-pos {
      position: absolute;
      top: -35px;
      right: 0;
      z-index: 1;
      padding: 0;

      &:hover {
        background: transparent;
      }
    }
  }
</style>
