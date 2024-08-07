<template>
  <TreeSelect
    v-bind="attrs"
    :data="getOptions"
    :loading="loading"
    @popup-visible-change="popupVisibleChange"
  />
</template>
<script lang="ts">
  export default {
    name: 'ApiTreeSelect'
  };
</script>

<script lang="ts" setup>
  import { TreeSelect } from '@arco-design/web-vue';
  import { computed, ref, useAttrs, watch, watchEffect } from 'vue';
  import { ApiProps } from '../props';
  import { useRequest } from '@har/use';
  import { isArray } from '@/utils/is';
  import { get } from 'lodash';

  const props = defineProps(ApiProps);
  const attrs = useAttrs();
  const defaultOptions = computed(() => {
    return attrs.data || [];
  });
  function defaultRequest() {
    return Promise.resolve(defaultOptions.value);
  }
  const isFirstLoad = ref(true);
  const { data, loading, run } = useRequest(props.request || defaultRequest, {
    manual: true,
    onFinally() {
      isFirstLoad.value = false;
    }
  });
  // 监听参数变化触发请求
  watch(
    () => props.params,
    () => {
      if (!isFirstLoad.value) {
        getList();
      }
    },
    {
      deep: true
    }
  );
  watchEffect(() => {
    if (props.immediate) getList();
  });
  watch(
    () => attrs.modelValue,
    (val) => {
      if (val && isFirstLoad.value) {
        getList();
      }
    },
    {
      immediate: true
    }
  );
  // 兼容多参数处理
  function getList() {
    const { params } = props;
    if (isArray(params)) {
      run(...params);
    } else {
      run(params);
    }
  }
  // 第一次点击select触发加载
  function popupVisibleChange(visible: boolean) {
    if (visible && isFirstLoad.value) {
      getList();
    }
  }
  const getOptions = computed(() => {
    if (!data.value) {
      return defaultOptions.value;
    }
    if (props.path) {
      return get(data.value, props.path);
    }
    return data.value;
  });
</script>
