<template>
  <a-form
    ref="formRef"
    :model="formModel"
    :rules="formRules"
    :disabled="currentDisabled"
    :class="{ 'a-form--detail': type === 'DETAIL' }"
    layout="vertical"
    auto-label-width
  >
    <a-card>
      <a-row :gutter="gutter">
        <a-col :span="span">
          <a-form-item
            label="项目名称"
            field="projectId"
            :rules="[{ required: true, message: '必选项' }]"
            :validate-trigger="['change', 'blur']"
          >
            <i-select
              v-model:value="formModel.projectId"
              v-model:options="options.projectId"
              v-bind="requestProjectIdConfig"
              :disabled="type !== 'ADD'"
            />
          </a-form-item>
        </a-col>
        <a-col :span="span">
          <a-form-item
            :rules="[
            { validator: validatorAccountName },
            { required: true, message: '必填项' },
            { minLength: 6, maxLength: 11, message: '字符长度在6~11位' }
          ]"
            :validate-trigger="['change', 'blur']"
            label="登录账号"
            field="accountName"
          >
            <template v-if="type === 'ADD'">
              <a-tooltip content="账号不可重复，建议使用手机号">
                <a-input
                  maxlength="11"
                  clearable
                  :disabled="type !== 'ADD'"
                  :model-value="formModel.accountName"
                  @input="handleInputAccountName"
                />
              </a-tooltip>
            </template>
            <template v-else>
              <a-input
                maxlength="11"
                disabled
                :model-value="formModel.accountName"
              />
            </template>
          </a-form-item>
        </a-col>
        <a-col :span="span">
          <!--        0:法人;1:店长;2:收银员;3:导购;-->
          <a-form-item
            :rules="[{ required: true, message: '必选项' }]"
            :validate-trigger="['change', 'blur']"
            label="身份"
            field="identity"
          >
            <i-select
              v-model="formModel.identity"
              :options="options.identity"
              @change="handleChangeIdentity"
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
            />
          </a-form-item>
        </a-col>
        <a-col :span="span">
          <!--        ，法人时可多选，其他单选 ,Long-->
          <a-form-item
            :rules="[{ required: true, message: '必选项' }]"
            :validate-trigger="['change', 'blur']"
            label="店铺"
            field="storeIds"
          >
            <template v-if="type === 'DETAIL'">
              {{
                formModel.stores.map((s: Recordable) => s.storeName).join('，')
              }}
            </template>
            <template v-else>
              <!-- 法人-多选 -->
              <i-select
                v-if="formModel.identity === 0"
                v-model:value="formModel.storeIds"
                v-model:options="options.storeIds"
                v-bind="requestStoreIdsConfig"
                :max-tag-count="currentDisabled ? 0 : 1"
                multiple
              />
              <!-- 其他-单选 -->
              <i-select
                v-else
                v-model:value="formModel.storeIds"
                v-model:options="options.storeIds"
                v-bind="requestStoreIdsConfig"
              />
            </template>
          </a-form-item>
        </a-col>
        <a-col :span="span">
          <a-form-item label="品牌" required>
            <template v-if="type === 'DETAIL'">
              {{ options.brandIds.map((item) => item.label).join(',') }}
            </template>
            <template v-else>
              <i-select
                v-model:value="formModel.brandIds"
                v-model:options="options.brandIds"
                v-bind="requestBrandIdsConfig"
                disabled
                multiple
              />
            </template>
          </a-form-item>
        </a-col>
        <a-col :span="span">
          <a-form-item label="收银机" field="cashierIds">
            <i-select
              v-model:value="formModel.cashierIds"
              v-model:options="options.cashierIds"
              v-bind="requestCashierIdsConfig"
              multiple
            />
          </a-form-item>
        </a-col>
        <a-col :span="span">
          <a-form-item
            :rules="[
            { required: true, message: '必填项' },
            { minLength: 2, maxLength: 11, message: '字符长度在2~11位' }
          ]"
            :validate-trigger="['change', 'blur']"
            label="联系人"
            field="linkman"
          >
            <a-input v-model="formModel.linkman" maxlength="11" clearable />
          </a-form-item>
        </a-col>
        <a-col :span="span">
          <a-form-item
            :rules="[
            { validator: validatorMobilePhone },
            { required: true, message: '必填项' }
          ]"
            :validate-trigger="['change', 'blur']"
            label="联系电话"
            field="linkTel"
          >
            <a-input v-model="formModel.linkTel" maxlength="11" clearable />
          </a-form-item>
        </a-col>
        <a-col :span="span">
          <a-form-item
            :rules="[{ required: true, message: '必选项' }]"
            :validate-trigger="['change', 'blur']"
            label="账号有效期"
            field="expireDate"
          >
            <a-date-picker v-model="formModel.expireDate" style="width: 100%" />
          </a-form-item>
        </a-col>
        <a-col :span="span">
          <!--        （0-正常，1-停用）-->
          <a-form-item
            :rules="[{ required: true, message: '必填项' }]"
            :validate-trigger="['change', 'blur']"
            label="帐号状态"
            field="status"
          >
            <a-radio-group v-model="formModel.status" :options="options.status" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item
        :validate-trigger="['change', 'blur']"
        label="备注"
        field="remark"
      >
        <a-textarea v-model="formModel.remark" maxlength="200" clearable />
      </a-form-item>
    </a-card>
  </a-form>
</template>

<script setup lang="ts">
  import {
    ref,
    toRef,
    PropType,
    computed,
    defineProps,
    defineExpose
  } from 'vue';
  import { useForm } from '@/hooks/use-form';
  import { EmployeeAddOrUpdateReq } from '../../interface';
  import {
    cbdApiProjectCommonMerchantBrandListGet,
    cbdApiProjectCommonMerchantListGet,
    cbdApiProjectCommonMisCashierSelectGet,
    cbdApiProjectCommonProjectSelectListGet,
    cbdApiProjectCommonStoreSelectAllGet
  } from '@/api';
  import useOptions from '../../use-options';
  import ISelect from '@/components/i-select/index.vue';
  import { validatorMobilePhone } from '@/utils/validator';
  import { SelectOptions } from '@/components/i-select/interface';

  const span = ref(6);
  const gutter = ref(15);
  const currentDisabled = computed(() => props.type === 'DETAIL');
  const props = defineProps({
    data: {
      type: Object as PropType<EmployeeAddOrUpdateReq>,
      default: () => ({})
    },
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
    validate,
    validateField,
    setFields,
    resetFields,
    getFormModel,
    setFormModel,
    clearValidate,
    getReactiveFormModel
  } = useForm<EmployeeAddOrUpdateReq>(new EmployeeAddOrUpdateReq(), {
    watchFormModel: toRef(props, 'data')
  });

  const { options } = useOptions({
    cashierIds: [] as SelectOptions,
    projectId: [] as SelectOptions,
    merchantId: [] as SelectOptions,
    storeIds: [] as SelectOptions,
    brandIds: [] as SelectOptions
  });
  // 请求项目下拉数据参数
  const requestProjectIdConfig = computed(() => ({
    requestApi: cbdApiProjectCommonProjectSelectListGet,
    requestParams: {}
  }));
  // 请求商户下拉数据参数
  const requestMerchantIdConfig = computed(() => ({
    async requestApi(params: Recordable) {
      if (!params.projectId) {
        formModel.value.merchantId = '' as unknown as number;
        return [];
      }
      return await cbdApiProjectCommonMerchantListGet(params);
    },
    requestParams: {
      projectId: formModel.value.projectId
    }
  }));
  // 请求店铺下拉数据参数
  const requestStoreIdsConfig = computed(() => ({
    async requestApi(params: Recordable) {
      if (!params.projectId || !params.merchantId) {
        formModel.value.storeIds = [];
        return [];
      }
      // 查询店铺下拉数据
      return await cbdApiProjectCommonStoreSelectAllGet(params);
    },
    requestParams: {
      projectId: formModel.value.projectId,
      merchantId: formModel.value.merchantId
    }
  }));
  // 请求品牌下拉数据参数
  const requestBrandIdsConfig = computed(() => ({
    async requestApi(params: Recordable) {
      if (!params.storeIds || params.storeIds.length === 0) {
        formModel.value.brandIds = [];
        return [];
      }

      const brandMap = new Map();
      const asyncTasks = [];
      const storeIds = (
        Array.isArray(params.storeIds) ? params.storeIds : [params.storeIds]
      ).filter(Boolean);
      for (const id of storeIds) {
        asyncTasks.push(
          cbdApiProjectCommonMerchantBrandListGet({
            storeId: id as string
          }).then((res) => {
            res.forEach((itm) => {
              brandMap.set(itm.value, itm);
            });
          })
        );
      }

      await Promise.all(asyncTasks);
      const data = [] as SelectOptions;
      for (const [, itm] of brandMap) {
        data.push(itm);
      }
      formModel.value.brandIds = data.map((item) => item.value as number);

      return data;
    },
    requestParams: {
      storeIds: formModel.value.storeIds
    }
  }));
  // 请求收银机下拉数据参数
  const requestCashierIdsConfig = computed(() => ({
    async requestApi(params: Recordable) {
      if (!params.storeIds || params.storeIds.length === 0) {
        formModel.value.cashierIds = [];
        return [];
      }
      const storeIds = (
        Array.isArray(params.storeIds) ? params.storeIds : [params.storeIds]
      ).filter(Boolean);
      return await cbdApiProjectCommonMisCashierSelectGet({
        storeIds: storeIds.join(',')
      });
    },
    requestParams: {
      storeIds: formModel.value.storeIds
    }
  }));

  function handleInputAccountName(val: string) {
    formModel.value.accountName = val.replace(/\W/gim, '');
  }

  function handleChangeIdentity() {
    const isArray = Array.isArray(formModel.value.storeIds);
    // 法人，多选处理
    if (formModel.value.identity === 0) {
      if (!isArray) {
        const n = [];
        if (formModel.value.storeIds) {
          n.push(formModel.value.storeIds);
        }
        // @ts-ignore
        formModel.value.storeIds = n;
      }
    } // 其他身份，单选处理
    else {
      if (isArray) {
        // @ts-ignore
        formModel.value.storeIds =
          formModel.value.storeIds.length > 0
            ? formModel.value.storeIds[0]
            : '';
      }
    }
  }

  function validatorAccountName(value: string, callback: Function) {
    if (/\W/gim.test(value)) {
      callback('只能输入字母（大小写）、数字、特殊字符');
      return;
    }
    callback();
  }

  defineExpose({
    async validate() {
      const data = await validate();
      data.storeIds = (
        Array.isArray(data.storeIds) ? data.storeIds : [data.storeIds]
      ).filter(Boolean);
      return data;
    },
    validateField,
    setFields,
    resetFields,
    getFormModel,
    setFormModel,
    clearValidate,
    getReactiveFormModel
  });
</script>

<style lang="less" scoped></style>
