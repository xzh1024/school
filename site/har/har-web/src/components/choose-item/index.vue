<template>
  <a-modal
    v-if="visible"
    :visible="visible"
    :title="title"
    width="70vw"
    :mask-closable="false"
    @cancel="visible = false"
  >
    <template #footer>
      <a-button @click="visible = false">取消</a-button>
      <a-button type="primary" @click="onOk">确认</a-button>
    </template>
    <div style="min-height: 35vh; height: 65vh; overflow-y: scroll">
      <i-table
        ref="refTable"
        v-model:selectedKeys="selectKeys"
        v-model="data.search"
        v-model:refresh-now="data.refresh"
        :options="options"
        :api="api"
        :data="staticData"
        @reset="handleReset"
      >
        <template #typeCell="{ record }">
          {{ typeEnum[record[typeKey] || record.type] }}
        </template>
        <template #picCell="{ record }">
          <a-image
            width="60"
            :src="record[picKey] && record[picKey].previewAddress"
          ></a-image>
        </template>
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
        <template #operateCell="{ record }">
          <a-input v-model="record.operate"></a-input>
        </template>
      </i-table>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
  import { ref, reactive, Ref, computed, watch } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Bus from '@/views/mall/share-data';

  const props = defineProps({
    options: {
      type: Object,
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
    title: {
      type: String,
      default: '选择商品'
    },
    picKey: {
      // 图片数据字段名
      type: String,
      default: 'pic'
    },
    typeKey: {
      // 类型字段
      type: String,
      default: 'type'
    },
    storeId: {
      type: [String, Number]
    },
    api: {
      type: Function
    },
    // 用以显示的类型
    typeEnum: {
      type: Object,
      default: () => {}
    },
    selectKeys: {
      type: Array,
      default: () => []
    },
    staticData: {
      type: Array,
      default: () => []
    },
    search: {
      type: Object,
      default: () => {}
    }
  });
  const refTable: Ref = ref(null);
  const emits = defineEmits([
    'submit',
    'update:modelValue',
    'update:selectKeys',
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
    delete data.search.provinceCode;
    delete data.search.districtCode;
    delete data.search.cityCode;
    emits('reset');
  };
  function onOk() {
    emits('submit', { data: refTable.value?.data });
  }
  watch(
    () => props.search,
    (v) => {
      data.search = {
        ...data.search,
        ...v
      };
    },
    { deep: true, immediate: true }
  );
  watch(
    () => props.staticData,
    (v) => {
      if (v && v.length) {
      }
    },
    { deep: true, immediate: true }
  );
  watch(
    () => refTable.value?.data,
    (v) => {
      if (v && v.length) {
        Bus.$emit('data', v);
      }
    },
    { deep: true, immediate: true }
  );
</script>

<style scoped></style>
