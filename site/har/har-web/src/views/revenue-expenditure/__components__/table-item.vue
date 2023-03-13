<template>
  <div class="table-item">
    <a-divider orientation="left">
      {{ props.title }}
    </a-divider>
    <i-table :options="options" :table-loading="loading" :data="props.list">
      <template #menu="{ record }">
        <a-button type="text" @click="columnClick('EDIT', record)">
          编辑
        </a-button>
        <a-button type="text" @click="columnClick('DELETE', record)">
          删除
        </a-button>
        <a-button type="text" @click="columnClick('INFO', record)">
          查阅
        </a-button>
      </template>
    </i-table>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'TableItem'
  };
</script>

<script setup lang="ts">
  const props = defineProps({
    loading: {
      type: Boolean
    },
    title: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      required: true
    }
  });
  type OperationType = 'ADD' | 'INFO' | 'EDIT' | 'DELETE';
  const emits = defineEmits<{
    (e: 'columnClick', operationType: OperationType, data: any): void;
  }>();

  const columnClick = (operationType: OperationType, data: any) => {
    emits('columnClick', operationType, data);
  };
</script>

<style lang="less" scoped>
  .table-item {
    :deep(.i-card) {
      padding: 16px 0;
    }
    :deep(.arco-divider-text) {
      font-size: 16px;
      font-weight: 700;
      color: rgb(var(--blue-6));
    }
  }
</style>
