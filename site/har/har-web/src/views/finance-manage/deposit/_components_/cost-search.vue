<template>
  <a-form
    :model="form"
    :rules="formRules"
    layout="vertical"
    @submit-success="handleSubmit"
  >
    <a-row :gutter="24">
      <a-col :span="6">
        <a-form-item field="projectId" label="项目名称">
          <a-select
            v-model="form.projectId"
            placeholder="请选择"
            :disabled="isDisabled"
            allow-clear
            @change="onProjectChange"
          >
            <a-option
              v-for="(item, index) in projectList"
              :key="`pro_${index}`"
              :value="item.value"
              >{{ item.label }}</a-option
            >
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item field="merchantId" label="商户">
          <a-select
            v-model="form.merchantId"
            placeholder="请选择"
            :disabled="isDisabled"
            allow-clear
          >
            <a-option
              v-for="(item, index) in merchantList"
              :key="`pro_${index}`"
              :value="item.value"
              >{{ item.label }}</a-option
            >
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item field="storeId" label="店铺">
          <a-select
            v-model="form.storeId"
            placeholder="请选择"
            :disabled="isDisabled"
            allow-clear
          >
            <a-option
              v-for="(item, index) in storeSelectList"
              :key="`pro_${index}`"
              :value="item.value"
              >{{ item.label }}</a-option
            >
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item field="expenseCode" label="存款类型">
          <a-select
            v-model="form.expenseCode"
            placeholder="请选择"
            :disabled="isDisabled"
            allow-clear
          >
            <a-option value="202212270009">预付款</a-option>
            <a-option value="202212270003">意向金</a-option>
            <a-option value="202212270004">保证金</a-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="6" :offset="18">
        <a-form-item style="text-align: right">
          <a-button style="margin: 0 0 10px auto" html-type="submit" type="primary"
            >搜索</a-button
          >
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup lang="ts">
  import { onMounted, ref, PropType, computed } from 'vue';
  import {
    cbdApiProjectCommonContractStoreSelectGet,
    CbdApiProjectCommonContractStoreSelectGetResponse,
    cbdApiProjectCommonMerchantListGet,
    CbdApiProjectCommonMerchantListGetResponse,
    cbdApiProjectCommonProjectSelectListGet,
    CbdApiProjectCommonProjectSelectListGetResponse,
    CbdApiProjectDepositAccountListGetRequest
  } from '@/api';
  import { useRequest } from '@har/use';

  const emits = defineEmits(['update:searchData', 'onSearch']);

  const props = defineProps({
    searchData: {
      type: Object as PropType<CbdApiProjectDepositAccountListGetRequest>,
      default: () => {}
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  });

  onMounted(() => {
    getProjectList({});
    getMerchantList({});
    getStoreSelectList({});
  });

  //项目下拉列表
  const projectList = ref<CbdApiProjectCommonProjectSelectListGetResponse>([]);
  const { run: getProjectList } = useRequest(
    cbdApiProjectCommonProjectSelectListGet,
    {
      manual: true,
      onSuccess(e) {
        console.log(e);
        projectList.value = e;
      }
    }
  );

  //商户下拉列表
  const merchantList = ref<CbdApiProjectCommonMerchantListGetResponse>([]);
  const { run: getMerchantList } = useRequest(
    cbdApiProjectCommonMerchantListGet,
    {
      manual: true,
      onSuccess(e) {
        console.log(e);
        merchantList.value = e;
      }
    }
  );

  //合同-店铺下拉
  const storeSelectList =
    ref<CbdApiProjectCommonContractStoreSelectGetResponse>([]);
  const { run: getStoreSelectList } = useRequest(
    cbdApiProjectCommonContractStoreSelectGet,
    {
      manual: true,
      onSuccess(e) {
        console.log(e);
        storeSelectList.value = e;
      }
    }
  );

  const onProjectChange = (
    value:
      | string
      | number
      | Record<string, any>
      | (string | number | Record<string, any>)[]
  ) => {
    console.log(value, '----*----');
    form.value.storeId = '';
    form.value.merchantId = '';
    getMerchantList({ projectId: value + '' });
    getStoreSelectList({ projectId: value + '' });
  };

  const form = computed({
    get() {
      return props.searchData;
    },
    set(v) {
      console.log(v, '---*---');
    }
  });
  const formRules = {
    projectId: [
      {
        required: true,
        message: '请选择'
      }
    ],
    merchantId: [
      {
        required: true,
        message: '请选择'
      }
    ],
    storeId: [
      {
        required: true,
        message: '请选择'
      }
    ],
    expenseCode: [
      {
        required: true,
        message: '请选择'
      }
    ]
  };

  const handleSubmit = (values: Record<string, any>) => {
    emits('onSearch');
  };
</script>

<style scoped lang="less">
  :deep(.arco-form-item) {
    margin-bottom: 4px;
  }
</style>
