<template>
  <a-tree-select
    v-model="value"
    :data="options"
    :field-names="{
      key: 'id',
      title: 'name',
      children: 'children'
    }"
    label-in-value
    @change="onChange"
  />
</template>

<script lang="ts">
  export default { name: 'FormTreeSys' };
</script>
<script setup lang="ts" name="FormTreeSys">
  import {
    computed,
    onMounted,
    onUnmounted,
    reactive,
    ref,
    useAttrs
  } from 'vue';
  import { cbdApiProjectTemplateFormatSelectGet } from '@/api';
  import Bus from './eventBus';
  const eventBusKey = 'workerChange';

  const props = defineProps({
    modelValue: {
      type: [String, Number],
      default: ''
    }
  });

  const emits = defineEmits(['update:modelValue']);
  const params = reactive<{ [key: string]: unknown }>({});
  const attrs = useAttrs() as {
    formCreateInject?: {
      field: string;
      options?: [];
      rule?: {
        props?: {};
      };
    };
  };

  const value = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });

  const getOptionKeyMapping = {
    businessId: cbdApiProjectTemplateFormatSelectGet
  } as { [key: string]: Function };
  type ItemType = { formatData: string; id: string; children: ItemType[] };
  const options = ref<ItemType[]>([]);
  const getOption = computed(() => {
    if (attrs?.formCreateInject) {
      return getOptionKeyMapping[attrs?.formCreateInject?.field];
    }
    return () => {};
  });

  const changeCallback = {
    projectId: [
      'buildingId',
      'merchantId',
      'storeId',
      'contractId',
      'merchantId'
    ],
    buildingId: ['floorId', 'shopId'],
    merchantId: []
  } as { [key: string]: string[] };

  Bus.$on(eventBusKey, async (data) => {
    const arr = changeCallback[data.field] || [];
    if (arr.includes(attrs?.formCreateInject?.field || '')) {
      params[data.field] = data.value;
      value.value = '';
      if (getOption.value) {
        options.value = await getOption.value(params);
      }
    }
    // console.log(data);
  });
  function onChange(v: any) {
    // console.log(v);
    value.value = v;
    Bus.$emit(eventBusKey, {
      field: attrs?.formCreateInject?.field,
      value: v
    });
  }

  onMounted(async () => {
    if (getOption.value) {
      options.value = await getOption.value(params);
    }
  });

  onUnmounted(() => {
    Bus.$off(eventBusKey);
  });
</script>
