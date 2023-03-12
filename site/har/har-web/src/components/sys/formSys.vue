<template>
  <a-select v-model="value" @change="onChange">
    <a-option v-for="item in options" :key="item.value" :value="item.value">
      {{ item.label }}
    </a-option>
  </a-select>
</template>

<script lang="ts">
  export default { name: 'FormSys' };
</script>
<script setup lang="ts" name="FormSys">
  import {
    computed,
    onMounted,
    onUnmounted,
    reactive,
    ref,
    useAttrs
  } from 'vue';
  import {
    cbdApiProjectTemplateBuildingFloorSelectGet,
    cbdApiProjectTemplateBuildingSelectGet,
    cbdApiProjectTemplateContractSelectGet,
    cbdApiProjectTemplateEstateSelectGet,
    cbdApiProjectTemplateEstateTypeSelectGet,
    cbdApiProjectTemplateFormatSelectGet,
    cbdApiProjectTemplateMerchantBrandSelectGet,
    cbdApiProjectTemplateMerchantSelectGet,
    cbdApiProjectTemplateProjectSelectGet,
    cbdApiProjectTemplateStoreAllSelectGet
  } from '@/api';
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

  // console.log(attrs?.formCreateInject);
  const value = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });

  const getOptionKeyMapping = {
    projectId: cbdApiProjectTemplateProjectSelectGet,
    buildingId: cbdApiProjectTemplateBuildingSelectGet,
    berthId: cbdApiProjectTemplateMerchantBrandSelectGet,
    businessId: cbdApiProjectTemplateFormatSelectGet,
    contractNoId: cbdApiProjectTemplateContractSelectGet,
    floorId: cbdApiProjectTemplateBuildingFloorSelectGet,
    merchantId: cbdApiProjectTemplateMerchantSelectGet,
    shopTypeId: cbdApiProjectTemplateEstateTypeSelectGet,
    shopId: cbdApiProjectTemplateEstateSelectGet,
    storeId: cbdApiProjectTemplateStoreAllSelectGet
  } as { [key: string]: Function };
  const options = ref<{ label: string; value: string }[]>([]);
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
