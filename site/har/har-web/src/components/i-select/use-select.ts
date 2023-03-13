import { onMounted, ref, Ref, watch } from 'vue';
import { SelectOptions, SelectValue } from './interface';
import { get } from 'lodash';

export function useSelect(params: {
  requestApi: Ref<(params: any) => Promise<any> | null>;
  requestImmediate: Ref<boolean>;
  requestParams: Ref<Recordable>;
  requestIgnoreEmptyFields: Ref<boolean | string[]>;
  currentOptions: Ref<SelectOptions>;
  allowClearEmptyValue: Ref<boolean>;
  resetValue: Function;
  valueKey: Ref<string>;
  currentValue: Ref<SelectValue | Array<SelectValue>>;
}) {
  const loading = ref(false);

  async function fetchOptions() {
    loading.value = false;
    const val = params.requestParams.value;
    const requestIgnoreEmptyFields = params.requestIgnoreEmptyFields.value;

    if (typeof params.requestApi.value !== 'function') {
      return;
    }
    if (!requestIgnoreEmptyFields || Array.isArray(requestIgnoreEmptyFields)) {
      const keys = Object.keys(val);
      for (const k of keys) {
        if (
          !val[k] &&
          ((Array.isArray(requestIgnoreEmptyFields) &&
            !requestIgnoreEmptyFields.includes(k)) ||
            !requestIgnoreEmptyFields)
        ) {
          return params.resetValue(true);
        }
      }
    }
    try {
      loading.value = true;
      params.currentOptions.value = await params.requestApi.value(
        params.requestParams.value
      );
      clearEmptyValue();
    } finally {
      loading.value = false;
    }
  }

  function clearEmptyValue() {
    if (!params.allowClearEmptyValue.value) {
      return;
    }
    const optionsValueList: (number | string)[] = [];
    params.currentOptions.value.forEach((item) => {
      optionsValueList.push(get(item, params.valueKey.value));
    });

    // 数组类型处理
    if (Array.isArray(params.currentValue.value)) {
      if (params.currentValue.value.length > 0) {
        for (let i = 0; i < params.currentValue.value.length; i++) {
          const value = params.currentValue.value[i] as string;
          const index = optionsValueList.indexOf(value);
          // 没有，移除
          if (index === -1) {
            params.currentValue.value.splice(index, 1);
          }
        }
      }
      return;
    }
    // 单值处理
    if (!optionsValueList.includes(params.currentValue.value as string)) {
      params.resetValue(false);
    }
  }

  onMounted(() => {
    // 监听参数变化发起请求
    watch(
      () => params.requestParams.value,
      async () => {
        await fetchOptions();
      },
      {
        immediate: params.requestImmediate.value,
        deep: true
      }
    );
  });

  return {
    loading,
    clearEmptyValue
  };
}
