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
      <div class="har-title">基础信息</div>
      <a-row :gutter="gutter">
        <a-col :span="span">
          <a-form-item
            :rules="[{ required: true, message: '必选项' }]"
            :validate-trigger="['change', 'blur']"
            label="项目名称"
            field="projectId"
          >
            <i-select
              v-model="formModel.projectId"
              :options="options.projectId"
              @change="handleChangeProject"
            />
          </a-form-item>
        </a-col>
        <a-col :span="span">
          <a-form-item
            :rules="[{ required: true, message: '必选项' }]"
            :validate-trigger="['change', 'blur']"
            label="消息类型"
            field="category"
          >
            <i-select
              v-model="formModel.category"
              :options="options.category"
            />
          </a-form-item>
        </a-col>
        <a-col :span="span">
          <a-form-item
            :rules="[{ required: true, message: '必选项' }]"
            :validate-trigger="['change', 'blur']"
            label="发布时间"
            field="publishStartTime"
          >
            <a-date-picker
              v-model="formModel.publishStartTime"
              style="width: 100%"
              show-time
            />
          </a-form-item>
        </a-col>
        <a-col :span="span">
          <a-form-item label="到期时间" field="publishEndTime">
            <a-date-picker
              v-model="formModel.publishEndTime"
              style="width: 100%"
              show-time
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            :rules="[{ required: true, message: '必选项' }]"
            :validate-trigger="['change', 'blur']"
            label="重要程度"
            field="messageLevel"
            show-time
          >
            <a-radio-group
              v-model="formModel.messageLevel"
              :options="options.messageLevel"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            :rules="[{ required: true, message: '必选项' }]"
            :validate-trigger="['change', 'blur']"
            label="是否置顶"
            field="onTop"
          >
            <a-radio-group v-model="formModel.onTop" :options="options.onTop" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            :rules="[{ required: true, message: '必选项' }]"
            :validate-trigger="['change', 'blur']"
            label="接收对象"
            field="targetType"
          >
            <a-radio-group
              v-model="formModel.targetType"
              :disabled="formModel.category === 3"
              :options="options.targetType"
            />
          </a-form-item>
        </a-col>
        <a-col
          v-if="formModel.targetType === 0 && formModel.category !== 3"
          :span="12"
        >
          <a-form-item
            :rules="[{ required: true, message: '必选项' }]"
            :validate-trigger="['change', 'blur']"
            label="接收店铺"
            field="storeIds"
          >
            <i-select
              v-model="formModel.storeIds"
              :options="options.storeId"
              :max-tag-count="1"
              multiple
            />
          </a-form-item>
        </a-col>
      </a-row>
      <div>
        <a-form-item
          :rules="[{ required: true, message: '必填项' }]"
          :validate-trigger="['change', 'blur']"
          label="消息标题"
          field="title"
        >
          <a-input v-model="formModel.title" maxlength="100" clearable />
        </a-form-item>
      </div>
      <div>
        <a-form-item label="消息内容" field="content">
          <a-textarea v-model="formModel.content" maxlength="100" clearable />
        </a-form-item>
      </div>
      <div>
        <a-form-item label="附件" field="attachments">
          <i-custom-upload
            v-model="formModel.attachments"
            accept-suffix-name
            url-key="previewAddress"
            :options="{
              disabled: currentDisabled,
              accept: '.doc,.docx,.xls,.xlsx,.pdf,.png,.jpg'
            }"
          />
        </a-form-item>
      </div>
    </a-card>
  </a-form>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs';
  import {
    ref,
    toRef,
    computed,
    PropType,
    defineProps,
    defineExpose,
    watch,
    nextTick
  } from 'vue';
  import { useForm } from '@/hooks/use-form';
  import { useOptions } from '../../use-options';
  import ISelect from '@/components/i-select/index.vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import { useStorageProjectId } from '@/hooks/use-storage-project-id';
  import { MessageManageAddOrUpdateMessageReq } from '../../interface';

  type FormModelType = MessageManageAddOrUpdateMessageReq;

  const span = ref(6);
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
    },
    visible: Boolean
  });

  const { storageProjectId, setStorageProjectId } = useStorageProjectId();

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
  } = useForm<FormModelType>(new MessageManageAddOrUpdateMessageReq(), {
    visible: toRef(props, 'visible'),
    watchFormModel: toRef(props, 'data')
  });
  const { options } = useOptions();

  watch(
    () => props.visible,
    () => {
      if (props.visible && props.type === 'ADD') {
        nextTick(() => {
          formModel.value.projectId = (storageProjectId.value
            ? Number(storageProjectId.value)
            : '') as unknown as null;
        });
      }
    }
  );

  watch(
    () => formModel.value.publishStartTime,
    (val) => {
      if (val) {
        formModel.value.publishStartTime = dayjs(val).format(
          'YYYY-MM-DD HH:mm:ss'
        );
      }
    }
  );

  watch(
    () => formModel.value.publishEndTime,
    (val) => {
      if (val) {
        formModel.value.publishEndTime = dayjs(val).format(
          'YYYY-MM-DD HH:mm:ss'
        );
      }
    }
  );

  watch(
    () => formModel.value.attachmentFiles,
    (val) => {
      if (val) {
        formModel.value.attachments = val;
      }
    }
  );

  function handleChangeProject() {
    setStorageProjectId(formModel.value.projectId as unknown as string);
  }

  defineExpose({
    async validate() {
      const data = await validate();
      data.attachments = data.attachments
        .map((itm: string | Recordable) => {
          if (typeof itm === 'string') {
            return itm;
          }
          return itm?.response?.data?.key ?? itm.id;
        })
        .filter((t: string) => t);
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
