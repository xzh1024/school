<template>
  <i-drawer v-model="visible" title="版本管理" width="750px" @cancel="onCancel">
    <template #footer>
      <a-button type="primary" @click="onCancel">关闭</a-button>
    </template>
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      v-permission="['web:deployment:page:publish']"
      :options="page.options"
      :page="page.page"
      :data="tableData"
      style="width: 100%"
      @page-change="pageChange"
      @page-size-change="pageSizeChange"
    >
      <template #statusCell="{ record }">
        <a-tag bordered color="green">
          {{ modelStatusDic[record.status] }}
        </a-tag>
      </template>
      <template #versionCell="{ record }">
        <a-tag bordered color="blue">V{{ record.version }}</a-tag>
      </template>
      <template #menu="{ record }">
        <a-button
          v-permission="['web:deployment:changeState']"
          type="text"
          @click="
            changeState({
              processId: record.processId,
              status: record.status === 'active' ? 'suspended' : 'active'
            })
          "
        >
          {{ record.status === 'active' ? '挂起' : '激活' }}
        </a-button>
        <!-- <a-button type="text" @click="openBpmnView(record.id)">流程图</a-button> -->
      </template>
    </i-table>

    <!-- 流程图 -->
    <bpmn-view v-model="bpmnSvgVisible" :row-id="rowId" />
  </i-drawer>
</template>

<script setup lang="ts">
  import IDrawer from '@/components/drawer/drawer.vue';
  import { computed, reactive, ref, watch } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { Message } from '@arco-design/web-vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    flowableEngineDeploymentPagePublishGet,
    flowableEngineDeploymentChangeStatePost
  } from '@/api/flowable-engine';
  import type { FlowableEngineDeploymentPagePublishGetResponse } from '@/api/flowable-engine';
  import { modelStatusDic } from '../dic/index';
  import bpmnView from './bpmn-view.vue';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    tableKey: {
      type: String,
      default: ''
    }
  });

  const emits = defineEmits(['update:modelValue', 'reset']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });

  const tableData = ref<FlowableEngineDeploymentPagePublishGetResponse['rows']>(
    []
  );

  function pageChange(value: number) {
    page.page.current = value;
    getTableList();
  }

  function pageSizeChange(value: number) {
    page.page.current = 1;
    page.page.pageSize = value;
    getTableList();
  }

  const [getTableList, loading] = useFuncProxy(async () => {
    if (!props.tableKey || !props.modelValue) return;
    const d = await flowableEngineDeploymentPagePublishGet({
      key: props.tableKey,
      pageNum: page.page.current,
      pageSize: page.page.pageSize
    });
    tableData.value = d.rows;
    page.page.total = d.total;
  });

  const [changeState] = useFuncProxy(async (data) => {
    const d = await flowableEngineDeploymentChangeStatePost({ ...data });
    Message.success('操作成功!');
    page.refresh = true;
    pageSizeChange(10);
  });
  // 删除
  // function handleDelete(id: number) {
  //   Modal.open({
  //     title: '删除确认',
  //     content: '请确认是否删除已选择保修信息？',
  //     onOk: async () => {
  //       // await cbdApiProjectEnergyConsumeInvoiceRemoveIdDelete({
  //       //   id: String(id)
  //       // });
  //       Message.success('操作成功!');
  //       page.refresh = true;
  //     }
  //   });
  // }

  interface PageConfig {
    search?: any;
    options?: any;
    showEditModal?: boolean;
    showConfigModal?: boolean;
    refresh?: boolean;
    showDetail?: boolean;
    modelTitle?: string;
    menuOtherOptions?: any;
    page: any;
  }

  const page = reactive<PageConfig>({
    refresh: false,
    page: {
      current: 1,
      pageSize: 10,
      total: 0
    },
    options: {
      indexTitle: '序号',
      index: true,
      submitText: '查询',
      tableCard: true,
      menuSpan: 6,
      menuOptions: {
        width: 90
      },

      columns: [
        {
          label: '流程标识',
          prop: 'key'
        },
        {
          label: '流程名称',
          prop: 'name'
        },
        {
          label: '流程版本',
          prop: 'version'
        },
        {
          label: '状态',
          prop: 'status'
        }
      ]
    }
  });

  function onCancel() {
    emits('reset');
    emits('update:modelValue', false);
  }

  watch(
    () => props.modelValue,
    () => {
      getTableList();
    }
  );

  const bpmnSvgVisible = ref(false);
  const rowId = ref('');
  function openBpmnView(id: string) {
    rowId.value = id;
    bpmnSvgVisible.value = true;
  }
</script>

<style scoped></style>
