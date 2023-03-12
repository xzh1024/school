<template>
  <a-spin style="width: 100%" :loading="loading">
    <a-select
      v-model="currentValue"
      v-bind="$attrs"
      :options="cptOptions"
      :placeholder="placeholder"
      :multiple="multiple"
      :allow-clear="allowClear"
      :max-tag-count="maxTagCount"
      @change="handleChange"
    />
  </a-spin>
</template>

<script lang="ts">
  export default {
    name: 'ISelect'
  };
</script>
<script lang="ts" setup>
  import { get } from 'lodash';
  import { SelectOptionData } from '@arco-design/web-vue';
  import { ref, defineProps, PropType, watch, toRef, computed } from 'vue';

  import { useSelect } from './use-select';
  import { SelectValue, SelectOptions } from '@/components/i-select/interface';

  const emit = defineEmits(['update:value', 'change', 'event-change', 'update:options']);
  const props = defineProps({
    value: {
      type: [String, Number, Array] as PropType<
        SelectValue | Array<SelectValue>
      >,
      default: ''
    },
    options: {
      type: Array as PropType<SelectOptions>,
      default: () => []
    },
    labelKey: {
      type: String as PropType<string>,
      default: 'label'
    },
    valueKey: {
      type: String as PropType<string>,
      default: 'value'
    },
    placeholder: {
      type: String as PropType<string>,
      default: '请选择'
    },
    requestApi: {
      type: [Function, null] as PropType<
        (params: Recordable) => Promise<any> | null
      >,
      default: null
    },
    requestParams: {
      type: [Object] as PropType<Recordable>,
      default: null
    },
    requestImmediate: {
      type: Boolean,
      default: true
    },
    // 请求
    requestIgnoreEmptyFields: {
      type: [Boolean, Array] as PropType<boolean | string[]>,
      default: true
    },
    // 当请求options之后，在选项中没有找到已经选择的值，则清空已经选择的值
    allowClearEmptyValue: {
      type: Boolean,
      default: true
    },

    // 以下都是 a-select 自带属性
    multiple: Boolean,
    allowClear: Boolean,
    maxTagCount: {
      type: Number,
      default: 2
    }
  });

  const currentValue = ref<SelectValue | Array<SelectValue>>(
    props.multiple ? [] : ''
  );
  const currentOptions = ref<SelectOptions>([]);
  const { loading } = useSelect({
    requestApi: toRef(props, 'requestApi'),
    requestImmediate: toRef(props, 'requestImmediate'),
    requestParams: toRef(props, 'requestParams'),
    requestIgnoreEmptyFields: toRef(props, 'requestIgnoreEmptyFields'),
    allowClearEmptyValue: toRef(props, 'allowClearEmptyValue'),
    valueKey: toRef(props, 'valueKey'),
    resetValue,
    currentValue,
    currentOptions
  });
  const cptOptions = computed(
    () =>
      currentOptions.value.map((itm) => ({
        ...itm,
        value: get(itm, props.valueKey),
        label: get(itm, props.labelKey),
        disabled: itm.disabled
      })) as SelectOptionData[]
  );

  watch(
    () => props.value,
    (val) => {
      currentValue.value = val;
    },
    { immediate: true }
  );
  watch(
    () => currentValue.value,
    (val) => {
      emit('update:value', val);
      emit('change', val);
    },
    { immediate: true }
  );

  watch(
    () => props.options,
    (val) => {
      currentOptions.value = val;
    },
    { immediate: true }
  );
  watch(
    () => currentOptions.value,
    (val) => {
      emit('update:options', val);
    },
    { immediate: true }
  );

  function resetValue(resetOptions = false) {
    if (resetOptions) {
      loading.value = false;
      currentOptions.value = [];
    }
    currentValue.value = props.multiple ? [] : '';
  }

  function handleChange(val: SelectValue) {
    emit('update:value', val);
    emit('change', val);
    emit('event-change', val);
  }
</script>
