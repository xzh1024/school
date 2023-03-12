<template>
  <Spin
    class="api-tree"
    :style="attrs.style"
    :loading="loading"
    tip="加载中..."
  >
    <Tree
      v-bind="attrs"
      v-model:checked-keys="checkedKeys"
      :data="getOptions"
      @popup-visible-change="popupVisibleChange"
    />
  </Spin>
</template>
<script lang="ts">
  export default {
    name: 'ApiTree'
  };
</script>

<script lang="ts" setup>
  import { Tree, Spin } from '@arco-design/web-vue';
  import {
    computed,
    ref,
    useAttrs,
    watch,
    watchEffect,
    PropType,
    unref
  } from 'vue';
  import { ApiProps } from '../props';
  import { useRequest } from '@har/use';
  import { isArray } from '@/utils/is';
  import { get } from 'lodash';

  const props = defineProps({
    ...ApiProps,
    modelValue: {
      type: Array as PropType<Array<string | number>>,
      default: () => []
    }
  });
  const emit = defineEmits(['update:modelValue']);
  const checkedKeys = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emit('update:modelValue', v);
    }
  });
  const attrs = useAttrs();
  const defaultOptions = computed(() => {
    return unref(attrs.data) || [];
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
<style scoped>
  .api-tree {
    width: 100%;
    min-height: 100px;
    max-height: 250px;
    overflow: auto;
  }
</style>
