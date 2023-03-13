<template>
  <a-form
    ref="formRef"
    :model="formModel"
    :rules="formRules"
    layout="vertical"
    class="form-vertical"
  >
    <a-card>
      <a-form-item
        field="name"
        label="合并铺面名称"
        :rules="[{ required: true, message: '必填项' }]"
        :validate-trigger="['change', 'blur']"
      >
        <a-input
          v-model="formModel.name"
          :max-length="60"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item
        field="acreage"
        label="合并建筑面积"
        :rules="[{ validator: validateUseAcreage }]"
        :validate-trigger="['change', 'blur']"
      >
        <a-input-number
          v-model="formModel.acreage"
          :min="0"
          :max="9999999.99"
          hide-button
          style="width: 100%"
          @change="handleChangeAcreage('useAcreage')"
        />
      </a-form-item>
      <a-form-item
        field="useAcreage"
        label="合并使用面积"
        :rules="[{ validator: validateUseAcreage }]"
        :validate-trigger="['change', 'blur']"
      >
        <a-input-number
          v-model="formModel.useAcreage"
          :min="0"
          :max="9999999.99"
          hide-button
          style="width: 100%"
          @change="handleChangeAcreage('acreage')"
        />
      </a-form-item>
    </a-card>

    <a-card>
      <a-form-item
        field="date"
        label="生效日期"
        :rules="[{ required: true, message: '必填项' }]"
        :validate-trigger="['change', 'blur']"
      >
        <a-date-picker v-model="formModel.date" style="width: 100%" />
      </a-form-item>
    </a-card>
  </a-form>
</template>

<script setup lang="ts">
  import { defineExpose, PropType, toRef, watch } from 'vue';
  import { useForm } from '@/hooks/use-form';
  import { IMergeFormData } from '@/components/i-floor-table/types';
  const props = defineProps({
    data: {
      type: Object as PropType<IMergeFormData>,
      default: () => ({
        name: '',
        acreage: 0,
        useAcreage: 0,
        date: '',
        estateIds: []
      })
    }
  });
  const {
    formRef,
    formModel,
    formRules,

    validate,
    validateField,
    resetFields,
    getFormModel,
    setFormModel,
    clearValidate
  } = useForm<IMergeFormData>(
    {
      name: '',
      acreage: 0,
      useAcreage: 0,
      date: '',
      estateIds: []
    },
    {
      watchFormModel: toRef(props, 'data'),
      watchFormModelImmediate: true
    }
  );

  function validateUseAcreage(
    value: number | undefined | null,
    callback: Function
  ) {
    if (value == null) {
      callback('必填项');
    } else if (
      formModel.value.acreage &&
      formModel.value.useAcreage &&
      formModel.value.useAcreage > formModel.value.acreage
    ) {
      callback('合并使用面积不能大于合并建筑面积');
    } else {
      callback();
    }
  }

  function handleChangeAcreage(field: string) {
    if (formModel.value.acreage && formModel.value.useAcreage) {
      validateField(field);
    }
  }

  defineExpose({
    validate,
    validateField,
    resetFields,
    getFormModel,
    setFormModel,
    clearValidate
  });
</script>
