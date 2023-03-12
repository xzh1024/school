<template>
  <div class="record-form">
    <div class="worker-info card">
      <div class="row">
        <h3>工单信息</h3>
        <a-radio-group
          v-model="formData.urgency"
          :options="urgencyType"
          :disabled="disabled"
        />
      </div>
      <view-form
        ref="viewFormRef"
        v-model="form"
        :disabled="props.disabled"
        :rule="formList"
        :option="formOptions"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, reactive, watch } from 'vue';
  import { useRequest } from '@har/use';
  import { urgencyType } from '../dic';
  import ViewForm from '@/components/form-create/components/ViewForm.vue';
  import {
    cbdApiProjectEstateWorkOrderRecordTemplateInfoIdGet,
    CbdApiProjectEstateWorkOrderRecordTemplateInfoIdGetResponse,
    cbdApiProjectCommonTemplateSelectListGet,
    CbdApiProjectCommonTemplateSelectListGetResponse
  } from '@/api';

  const props = defineProps({
    modelValue: {
      type: Object,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false
    }
  });

  const emits = defineEmits(['update:modelValue']);

  const formOptions = reactive({ form: {}, resetBtn: false, submitBtn: false });

  const { run: getWorkOrderTemplateInfo } = useRequest(
    cbdApiProjectEstateWorkOrderRecordTemplateInfoIdGet,
    {
      manual: true,
      onSuccess: (
        res: CbdApiProjectEstateWorkOrderRecordTemplateInfoIdGetResponse
      ) => {
        if (res.fromContent) {
          try {
            const fromContent = JSON.parse(res.fromContent);
            formTemplate.value = fromContent.rule || [];
            if (fromContent.form) {
              Object.assign(formOptions, fromContent.form);
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          formTemplate.value = [];
        }
      }
    }
  );
  const templateList = ref<CbdApiProjectCommonTemplateSelectListGetResponse>(
    []
  );
  useRequest(cbdApiProjectCommonTemplateSelectListGet, {
    onSuccess: (res) => {
      templateList.value = res;
    }
  });

  const formTemplate = ref([]);
  const form = ref({});
  const formData = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  watch(
    () => props.modelValue.fromDataContent,
    (v) => {
      if (v) {
        try {
          const fromContent = JSON.parse(v);
          formTemplate.value = fromContent.rule || [];
          if (fromContent.form) {
            Object.assign(formOptions, fromContent.form);
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    { deep: true }
  );

  const formList = computed(() => {
    return [
      {
        title: '工单名称',
        field: 'templateId',
        col: {
          span: 24
        },
        type: 'select',
        props: {
          placeholder: '请选择'
        },
        validate: { required: true, message: '工单名称不能为空' },
        on: {
          change(v: string) {
            formData.value.templateId = v;
            getWorkOrderTemplateInfo({ id: v });
          }
        },
        value: formData.value.templateId || '',
        options: templateList.value
      },
      ...formTemplate.value
    ];
  });

  const viewFormRef = ref();
  function validateForm(callback?: Function) {
    viewFormRef.value?.viewFormRef?.fapi?.validate((valid: boolean) => {
      if (valid === true && callback) {
        callback();
      }
    });
  }

  defineExpose({
    rule: formTemplate,
    form: formOptions,
    validateForm
  });
</script>

<style lang="less" scoped>
  .record-form {
    width: 100%;
  }

  h3 {
    margin: 0 0 16px;
  }

  .card {
    padding: 16px;
    box-sizing: border-box;
    background-color: #fff;
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  :deep(.form-text) {
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    line-height: 22px;
  }
</style>
