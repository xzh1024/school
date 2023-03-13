<template>
  <a-form
    ref="formRef"
    :model="formModel"
    :rules="formRules"
    :disabled="currentDisabled"
    :class="{ 'a-form--detail': currentDisabled }"
    layout="vertical"
    auto-label-width
  >
    <a-card>
      <a-row :gutter="16">
        <a-col :span="span">
          <a-form-item
            :rules="[{ required: true, message: '必选项' }]"
            :validate-trigger="['change', 'blur']"
            label="项目名称"
            field="projectId"
          >
            <i-select
              v-model:value="formModel.projectId"
              v-model:options="options.projectId"
              v-bind="requestProjectIdConfig"
              @change="handleChangeStoreId"
            />
          </a-form-item>
        </a-col>
        <a-col :span="span">
          <a-form-item
            :rules="[{ required: true, message: '必选项' }]"
            :validate-trigger="['change', 'blur']"
            label="商户"
            field="merchantId"
          >
            <i-select
              v-model:value="formModel.merchantId"
              v-model:options="options.merchantId"
              v-bind="requestMerchantIdConfig"
              :request-ignore-empty-fields="false"
            />
          </a-form-item>
        </a-col>
        <a-col :span="span">
          <a-form-item
            :rules="[{ required: true, message: '必选项' }]"
            :validate-trigger="['change', 'blur']"
            label="店铺"
            field="storeId"
          >
            <i-select
              v-model:value="formModel.storeId"
              v-model:options="options.storeId"
              v-bind="requestStoreIdConfig"
              :request-ignore-empty-fields="false"
              @change="handleChangeStoreId"
            />
          </a-form-item>
        </a-col>
        <a-col :span="span">
          <a-form-item
            :rules="[{ required: true, message: '必选项' }]"
            :validate-trigger="['change', 'blur']"
            label="销售日期"
            field="saleDate"
          >
            <a-date-picker v-model="formModel.saleDate" style="width: 100%" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-space style="justify-content: flex-end; width: 100%">
            <a-button type="primary" @click="iTableRef.search(formModel)"
            >搜索</a-button
            >
            <a-button type="primary" @click="handleReset">重置</a-button>
          </a-space>
        </a-col>
      </a-row>
    </a-card>
    <a-card>
      <div class="har-title">原始账单</div>
      <div>
        <i-table
          ref="iTableRef"
          v-model="formModel"
          v-model:selectedKeys="selectedKeys"
          :options="tableConfig"
          :api="fetchTableData"
        />
      </div>
    </a-card>
  </a-form>
</template>

<script setup lang="ts">
  import {
    ref,
    computed,
    PropType,
    reactive,
    defineProps,
    defineExpose,
    watch
  } from 'vue';
  import { useForm } from '@/hooks/use-form';
  import { GoodsListReq, PaymentRow } from '../../interface';
  import {
    cbdApiProjectCommonMerchantBrandListGet,
    cbdApiProjectCommonMerchantListGet,
    cbdApiProjectCommonProjectSelectListGet,
    cbdApiProjectCommonStoreSelectGet,
    cbdApiProjectSaleGoodsListGet,
    CbdApiProjectSaleGoodsListGetRequest,
    CbdApiProjectSaleGoodsListGetResponse
  } from '@/api';
  import ITable from '@/components/i-table/index.vue';
  import ISelect from '@/components/i-select/index.vue';
  import { Message } from '@arco-design/web-vue';
  import { getOptionLabel } from '@/utils';

  type TableDataList = Required<CbdApiProjectSaleGoodsListGetResponse>['rows'];

  const span = ref(6);
  const gutter = ref(15);
  const currentDisabled = computed(() => props.type === 'DETAIL');
  const props = defineProps({
    // ADD = '新增', EDIT = '修改'
    type: {
      type: String as PropType<'ADD' | 'EDIT' | 'DETAIL'>,
      default: 'ADD'
    }
  });

  const {
    formRef,
    formModel,
    formRules,

    // 以下对外暴露的方法
    validateField,
    resetFields,
    getFormModel,
    setFormModel,
    clearValidate,
    getReactiveFormModel
  } = useForm<GoodsListReq>(new GoodsListReq());

  const iTableRef = ref();
  const tableData = ref<TableDataList>([]);
  const selectedKeys = ref<number[]>([]);

  watch(
    () => selectedKeys.value,
    () => {
      formModel.value.goodsList = tableData.value.filter((itm) => {
        return selectedKeys.value.includes(itm.goodsId as number);
      }) as number[];
    },
    { deep: true }
  );

  const options = ref({
    projectId: [],
    merchantId: [],
    storeId: [],
    brandId: []
  });
  // 请求项目下拉数据参数
  const requestProjectIdConfig = computed(() => ({
    requestApi: cbdApiProjectCommonProjectSelectListGet,
    requestParams: {}
  }));
  // 请求商户下拉数据参数
  const requestMerchantIdConfig = computed(() => ({
    requestApi: cbdApiProjectCommonMerchantListGet,
    requestParams: {
      projectId: formModel.value.projectId
    }
  }));
  // 请求店铺下拉数据参数
  const requestStoreIdConfig = computed(() => ({
    requestApi: cbdApiProjectCommonStoreSelectGet,
    requestParams: {
      projectId: formModel.value.projectId,
      merchantId: formModel.value.merchantId
    }
  }));

  const tableConfig = reactive({
    index: true,
    span: 12,
    menu: false,
    menuSpan: 24,
    tableCard: false,
    formCard: false,
    pageShow: false,
    submitText: '搜索',
    autoLabelWidth: true,
    menuOptions: {
      width: 220
    },
    menuOtherOptions: {
      'row-key': 'goodsId',
      'row-selection': {
        type: 'checkbox',
        showCheckedAll: true,
        onlyCurrent: true
      }
    },
    columns: [
      {
        label: '货品名称',
        prop: 'goodsName'
      },
      {
        label: '所属货品组别',
        prop: 'groupName'
      },
      {
        label: '合同号',
        prop: 'contractCode'
      }
    ]
  });

  function handleChangeStoreId() {
    if (!formModel.value.storeId || !formModel.value.projectId) {
      formModel.value.brandId = [];
      formModel.value.brandName = '';
      return;
    }
    cbdApiProjectCommonMerchantBrandListGet({
      projectId: formModel.value.projectId as unknown as string,
      storeId: formModel.value.storeId as unknown as string
    }).then((res) => {
      formModel.value.brandId = res.map((itm) => itm.value) as number[];
      formModel.value.brandName = res.map((itm) => itm.label).join('，');
    });
  }

  async function fetchTableData(params: CbdApiProjectSaleGoodsListGetRequest) {
    const empty = { total: 0, rows: [] };
    selectedKeys.value = [];
    if (!params.projectId) {
      return empty;
    }
    try {
      const res = await cbdApiProjectSaleGoodsListGet(params);
      tableData.value = res.rows as TableDataList;
      return res;
    } catch {
      return empty;
    }
  }

  async function validate() {
    const error = await formRef.value?.validate?.();
    if (error) {
      Message.error('请完善表单数据');
      return Promise.reject(error);
    }
    const data = getFormModel();
    if (data.goodsList.length === 0) {
      Message.error('请选择货品');
      return Promise.reject(error);
    }
    data.projectName = getOptionLabel(options.value.projectId, data.projectId);
    data.merchantName = getOptionLabel(
      options.value.merchantId,
      data.merchantId
    );
    data.storeName = getOptionLabel(options.value.storeId, data.storeId);
    data.brandName = getOptionLabel(options.value.brandId, data.brandId);
    data.goodsList.forEach((item: Recordable) => {
      item.goodsNum = 1;
      item.actualAmt = item.salePrice * item.goodsNum;
    });
    data.paymentList = [new PaymentRow()];
    return data;
  }

  async function setFields(data: Recordable) {
    formRef.value?.setFields?.(data);
    iTableRef.value?.clearTableData();
  }

  function handleReset() {
    formModel.value = new GoodsListReq();
    iTableRef.value?.clearTableData();
  }

  defineExpose({
    validate,
    validateField,
    setFields,
    resetFields(fields: string) {
      handleReset();
      resetFields(fields);
    },
    getFormModel,
    setFormModel,
    clearValidate,
    getReactiveFormModel
  });
</script>

<style lang="less" scoped>
  ::v-deep(.i-table) {
    > .i-form {
      margin-bottom: 20px;
    }
  }
</style>
