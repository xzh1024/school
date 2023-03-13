<template>
  <i-drawer v-model="visible" title="模型历史" @cancel="reset">
    <template #footer>
      <a-button type="primary" @click="reset">关闭</a-button>
    </template>
    <i-table
      v-model:refresh-now="page.refresh"
      :data="tableData"
      :options="page.options"
      style="width: 100%"
      :page="page.page"
      @page-change="pageChange"
      @page-size-change="pageSizeChange"
    >
      <template #versionCell="{ record }">
        <a-tag bordered color="blue">V{{ record.version }}</a-tag>
      </template>
      <!-- 操作 -->
      <template #menu="{ record }">
        <a-button
          v-permission="['web:model:deploy']"
          type="text"
          @click="onDeploy(record.id)"
        >
          部署
        </a-button>
        <a-button
          v-permission="['web:model:latest']"
          type="text"
          @click="setNewVersion(record.id)"
        >
          设为最新
        </a-button>
      </template>
    </i-table>

    <i-loading :loading="versionLoading || deployLoading" />
  </i-drawer>
</template>

<script setup lang="ts">
  import IDrawer from '@/components/drawer/drawer.vue';
  import {
    flowableEngineModelPageHistoryVersionGet,
    flowableEngineModelLatestIdGet,
    flowableEngineModelDeployIdGet
  } from '@/api/flowable-engine';
  import type { FlowableEngineModelPageHistoryVersionGetResponse } from '@/api/flowable-engine';
  import { computed, nextTick, reactive, ref, watch } from 'vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { Message } from '@arco-design/web-vue';
  import ILoading from '@/components/i-loading/index.vue';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    rowId: {
      type: String,
      default: ''
    }
  });
  const emits = defineEmits(['update:modelValue', 'reset']);

  function reset() {
    emits('reset');
    emits('update:modelValue', false);
    nextTick(() => {
      tableData.value = [];
    });
  }

  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });

  const page = reactive({
    refresh: false,
    page: {
      current: 1,
      pageSize: 10,
      total: 0
    },
    options: {
      indexTitle: '序号',
      index: true,
      columns: [
        { label: '模型名称', prop: 'name' },
        { label: '流程分类', prop: 'name' },
        { label: '版本', prop: 'version' },
        { label: '描述', prop: 'remark' },
        { label: '创建时间', prop: 'createTime' }
      ]
    }
  });

  function pageChange(value: number) {
    page.page.current = value;
    getTableList();
  }

  function pageSizeChange(value: number) {
    page.page.current = 1;
    page.page.pageSize = value;
    getTableList();
  }

  const tableData = ref<
    FlowableEngineModelPageHistoryVersionGetResponse['rows']
  >([]);
  const [getTableList] = useFuncProxy(async () => {
    if (!props.rowId || !props.modelValue) return;
    const d = await flowableEngineModelPageHistoryVersionGet({
      key: props.rowId,
      pageNum: `${page.page.current}`,
      pageSize: `${page.page.pageSize}`
    });
    // console.log(d);
    tableData.value = d.rows;
    page.page.total = d.total || 0;
  });

  watch(
    () => props.modelValue,
    () => {
      getTableList();
    }
  );

  // 设为最新
  const [setNewVersion, versionLoading] = useFuncProxy(async (id: string) => {
    const d = await flowableEngineModelLatestIdGet({ id });
    Message.success('操作成功!');
    page.refresh = true;
  });

  // 部署
  const [onDeploy, deployLoading] = useFuncProxy(async (id: string) => {
    const d = await flowableEngineModelDeployIdGet({ id });
    Message.success('操作成功!');
    page.refresh = true;
  });
</script>
