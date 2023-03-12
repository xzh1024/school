<template>
  <Form v-bind="getBindFormAttrs" ref="formElRef" :model="formModel">
    <Spin :loading="getProps.loading">
      <Row v-bind="getBindRow">
        <slot name="formHeader" />
        <template v-for="schema in getSchema" :key="schema.field">
          <FormItem
            :schema="schema"
            :form-props="getProps"
            :form-model="formModel"
            :set-form-model="setFormModel"
          >
            <template v-for="item in Object.keys($slots)" #[item]="data">
              <slot :name="item" v-bind="data || {}"></slot>
            </template>
          </FormItem>
        </template>
        <FormAction v-bind="getBindActionProps">
          <template
            v-for="item in ['resetBefore', 'submitBefore', 'resetAfter']"
            #[item]="data"
          >
            <slot :name="item" v-bind="data || {}"></slot>
          </template>
        </FormAction>
        <slot name="formFooter" /> </Row
    ></Spin>
  </Form>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'BasicForm',
    inheritAttrs: false
  });
</script>

<script lang="ts" setup>
  import { Form, Row, Spin } from '@arco-design/web-vue';
  import FormItem from './FormItem';
  import FormAction from './FormAction.vue';
  import { cloneDeep, set } from 'lodash';
  import { computed, onMounted, reactive, ref, useAttrs, useSlots } from 'vue';
  import { createFormContext } from '../composables/useFormContext';
  import { useFormValues } from '../composables/useFormValues';
  import { useFormEvents } from '../composables/useFormEvents';
  import { useMergeData } from '@/composables/useMergeData';
  import { basicFormProps } from '../props';
  import type { BasicFormProps, FormActionType } from '../typings/form';
  const props = defineProps(basicFormProps);
  const emit = defineEmits([
    'field-value-change',
    'register',
    'submit',
    'reset'
  ]);
  const attrs = useAttrs();
  const defaultValueRef = ref<Recordable>({});
  const formModel = reactive<Recordable>({});
  const formElRef = ref();
  const [getProps, setProps] = useMergeData<BasicFormProps>(props);
  // 预留扩展
  // const getProps = computed<BasicFormProps>(() => ({
  //   ...props,
  //   ...propsRef.value
  // }));
  // function setProps(formProps: Partial<BasicFormProps>) {
  //   mergeWith(propsRef.value, formProps, (old, src) => {
  //     if (isArray(old)) {
  //       return src;
  //     }
  //   });
  // }
  const getSchema = computed(() => {
    return cloneDeep(getProps.value.schemas || []);
  });

  // 内容初始化
  const { handleFormValues, initDefault } = useFormValues({
    getProps,
    getSchema,
    formModel,
    defaultValueRef
  });
  // 表单事件
  const {
    handleSubmit,
    resetFields,
    setFieldsValue,
    getFieldsValue,
    validate,
    clearValidate
  } = useFormEvents({
    emit,
    formElRef,
    formModel,
    defaultValueRef,
    getSchema,
    handleFormValues
  });
  // 添加action事件
  createFormContext({
    loading: computed(() => {
      return getProps.value.loading || false;
    }),
    resetAction: resetFields,
    submitAction: handleSubmit
  });
  // arco声明错误
  const getBindRow = computed<any>(() => ({
    gutter: 24,
    ...getProps.value.rowProps
  }));
  const getBindActionProps = computed(() => {
    // 预留扩展
    console.log({ ...getProps.value });
    return {
      ...getProps.value
    };
  });
  function setFormModel(key: string, value: any) {
    set(formModel, key, value);
    emit('field-value-change', key, value);
  }
  // fix autoLabelWidth and layout in ArcoFrom at the some time ts error
  const getBindFormAttrs = computed<any>(() => {
    const p = {
      autoLabelWidth: true,
      layout: 'vertical',
      ...attrs,
      ...getProps.value
    };
    if (p.autoLabelWidth) {
      p.layout = 'horizontal';
    }
    return p;
  });

  const formAction: FormActionType = {
    getFieldsValue,
    setFieldsValue,
    resetFields,
    initDefault,
    // updateSchema,
    // resetSchema,
    setProps,
    // removeSchemaByFiled,
    // appendSchemaByField,
    clearValidate,
    validate,
    submit: handleSubmit
    // scrollToField: scrollToField
  };
  defineExpose(formAction);
  onMounted(() => {
    initDefault();
    emit('register', formAction);
  });
</script>
