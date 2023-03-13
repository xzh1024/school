<template>
  <a-form
    ref="formRef"
    :model="formModel"
    :rules="formRules"
    :disabled="currentDisabled"
    layout="vertical"
    auto-label-width
  >
    <a-row :gutter="gutter">
      <a-col :span="span">
        <a-form-item
          :rules="[{ required: true, message: '必填项' }]"
          :validate-trigger="['change', 'blur']"
          label="审批类型"
          field="approvalType"
        >
          <i-select
            v-model="formModel.approvalType"
            :options="options.approvalType"
          />
        </a-form-item>
      </a-col>
      <a-col
        v-if="formModel.approvalType === 1 || formModel.approvalType === 4"
        :span="span"
      >
        <a-form-item
          :rules="[{ required: true, message: '必选项' }]"
          :validate-trigger="['change', 'blur']"
          :label="formModel.approvalType === 1 ? '转签用户' : '加签用户'"
          field="approvalType"
        >
          <i-select
            v-model:value="formModel.userCode"
            :options="options.userCode"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item
          :rules="[{ required: true, message: '必填项' }]"
          :validate-trigger="['change', 'blur']"
          label="审批内容"
          field="comment"
        >
          <a-textarea v-model="formModel.comment" :max-length="200" />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup lang="ts">
  import {
    ref,
    toRef,
    PropType,
    computed,
    defineProps,
    defineExpose,
    onMounted
  } from 'vue';
  import { useForm } from '@/hooks/use-form';
  import { SaleConfirmReq } from '../../interface';
  import { cbdApiProjectPageApprovalUserGet } from '@/api';
  import ISelect from '@/components/i-select/index.vue';
  import { SelectOptions } from '@/components/i-select/interface';

  type FormModelType = SaleConfirmReq;

  const span = ref(12);
  const gutter = ref(15);
  const currentDisabled = computed(() => props.type === 'DETAIL');
  const props = defineProps({
    data: {
      type: Object as PropType<FormModelType>,
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
  } = useForm<FormModelType>(new SaleConfirmReq(), {
    watchFormModel: toRef(props, 'data')
  });

  const options = ref({
    userCode: [] as SelectOptions,
    approvalType: [
      { label: '转签', value: 1 },
      { label: '审批通过', value: 2 },
      { label: '审批驳回', value: 3 },
      { label: '加签', value: 4 }
    ]
  });

  onMounted(() => {
    cbdApiProjectPageApprovalUserGet({}).then((res) => {
      options.value.userCode = res.map((itm) => ({
        label: [itm.username, itm.phone, itm.deptName, itm.roleName].join('\t'),
        value: itm.userCode
      })) as SelectOptions;
    });
  });

  defineExpose({
    validate,
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
