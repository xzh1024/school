<template>
  <a-modal
    v-if="visible"
    :visible="visible"
    :title="title"
    width="70vw"
    @cancel="visible = false"
  >
    <a-form :model="form" layout="inline">
      <a-form-item :label="`适用${isStadium ? '场地' : '商品'}：`">
        <a-radio-group v-model="infoApplyType" :disabled="disabled">
          <a-radio :value="1"
            >全部{{ isStadium ? '场地' : '商品'
            }}{{ canUse ? '不' : '' }}可用</a-radio
          >
          <a-radio :value="2"
            >指定{{ isStadium ? '场地' : '商品' }}可用</a-radio
          >
          <a-radio :value="3"
            >指定{{ isStadium ? '场地' : '商品' }}不可用</a-radio
          >
        </a-radio-group>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button @click="visible = false">取消</a-button>
      <a-button type="primary" @click="onOk">确认</a-button>
    </template>
    <div
      v-if="infoApplyType !== 1"
      style="min-height: 35vh; max-height: 70vh; overflow-y: scroll"
    >
      <i-table
        ref="refTable"
        v-model:selectedKeys="selectKeys"
        v-model="data.search"
        v-model:refresh-now="data.refresh"
        :options="options"
        :api="api"
        @reset="handleReset"
      >
        <template #_areaCell="{ record }">
          {{
            record.provinceName
              ? record.provinceName +
                '/' +
                record.cityName +
                '/' +
                record.districtName
              : '--'
          }}
        </template>
      </i-table>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
  import { ref, reactive, Ref, computed, watch, PropType, toRaw } from 'vue';
  import type { TableOptions } from '@/components/i-table/index';
  import ITable from '@/components/i-table/index.vue';
  // import Bus from '@/views/mall/share-data';

  const props = defineProps({
    options: {
      type: Object as PropType<TableOptions>,
      default: () => {
        return {
          tableCard: false,
          menu: false,
          columns: []
        };
      }
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    autoCheck: {
      // 是否自动校验未选择并拦截
      type: Boolean,
      default: true
    },
    canUse: {
      type: Boolean,
      default: false
    },
    isStadium: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '选择商品'
    },
    storeId: {
      type: [String, Number]
    },
    api: {
      type: Function
    },
    selectKeys: {
      type: Array,
      default: () => []
    },
    search: {
      type: Object,
      default: () => {}
    },
    defaultCheckStatus: {
      type: Number,
      default: 0
    }
  });
  const refTable: Ref = ref(null);
  const emits = defineEmits([
    'submit',
    'update:modelValue',
    'update:selectKeys',
    'update:defaultCheckStatus',
    'refresh',
    'reset'
  ]);
  const selectKeys: Ref = computed({
    get() {
      return props.selectKeys;
    },
    set(v) {
      emits('update:selectKeys', v);
    }
  });
  const form: Ref = ref({});
  const infoApplyType: Ref = computed({
    get() {
      console.log(props.defaultCheckStatus);
      return props.defaultCheckStatus;
    },
    set(v) {
      emits('update:defaultCheckStatus', v);
    }
  });
  const data = reactive<any>({
    refresh: false,
    search: {
      storeId: props.storeId
    }
  });

  const options: Ref = computed(() => {
    return props.options;
  });
  const visible: Ref<boolean> = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const handleReset = () => {
    emits('reset');
  };
  function onOk() {
    emits('submit', {
      data: refTable.value?.data,
      type: infoApplyType.value
    });
  }

  watch(
    () => props.search,
    (v) => {
      data.search = {
        ...data.search,
        ...toRaw(v)
      };
    },
    { deep: true, immediate: true }
  );
  // watch(
  //   () => refTable.value?.data,
  //   (v) => {
  //     if (v && v.length) {
  //       Bus.$emit('data', v);
  //     }
  //   },
  //   { deep: true, immediate: true }
  // );
</script>

<style scoped></style>
