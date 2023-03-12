<template>
  <div>
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      v-permission="['web:instance:list:copy']"
      :options="page.options"
      :api="flowableEngineInstancePageCopyGet"
      @reset="tableFormReset"
    >
      <template #menu="{ record }">
        <a-button
          v-permission="['web:instance:copy:info']"
          type="text"
          @click="openProcessDetail(record, false)"
        >
          查看
        </a-button>
      </template>
      <template #processNameCell="{ record }">
        {{ record.procDefName }}
      </template>
      <!-- <template #header>
        <a-button v-permission="['energyConsume:invoice:add']" type="primary">
          导出
        </a-button>
      </template> -->
    </i-table>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  // import useFuncProxy from '@/hooks/useFuncProxy';
  import { flowableEngineInstancePageCopyGet } from '@/api/flowable-engine';
  import { openProcessDetail } from './hooks/useProcessTableColumn';

  interface PageConfig {
    search: { processName: string };
    rowId: string;
    options?: any;
    showEditModal?: boolean;
    showConfigModal?: boolean;
    refresh?: boolean;
    showDetail?: boolean;
    modelTitle?: string;
    menuOtherOptions?: any;
  }

  const page = reactive<PageConfig>({
    search: {
      processName: ''
    },
    rowId: '',
    refresh: false,
    options: {
      indexTitle: '序号',
      index: true,
      submitText: '查询',
      tableCard: true,
      menuSpan: 18,
      menuOptions: {
        width: 80,
        fixed: 'right'
      },
      columns: [
        { label: '流程名称', prop: 'processName', width: 120 },
        { label: '标题', prop: 'title', width: 120 },
        { label: '任务ID', prop: 'taskId', width: 120 },
        { label: '发起人', prop: 'originatorName', width: 90 },
        { label: '抄送时间', prop: 'createTime', width: 120 }
      ]
    }
  });

  function tableFormReset() {}

  // 新增
  function reset() {
    // rowId.value = '';
    // modelVisible.value = false;
    page.refresh = true;
  }

  function close() {
    // rowId.value = '';
    // modelVisible.value = false;
  }
</script>

<style scoped></style>
