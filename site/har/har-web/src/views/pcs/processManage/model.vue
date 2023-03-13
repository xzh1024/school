<template>
  <div>
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      v-permission="['web:model:page']"
      :options="options"
      :api="flowableEngineModelPageGet"
      @reset="tableFormReset"
    >
      <template #versionCell="{ record }">
        <a-tag bordered color="blue">V{{ record.version }}</a-tag>
      </template>
      <template #categoryCell="{ record }">
        {{ processGroupObj[record.category] || record.category }}
      </template>
      <template #createTimeCell="{ record }">
        {{ formatTime(record.createTime) }}
      </template>
      <template #menu="{ record }">
        <a-button
          v-permission="['web:model:update']"
          type="text"
          @click="handleEdit(record)"
        >
          编辑
        </a-button>
        <a-button
          v-permission="['web:model:bpmn', 'web:model:saveBpmn']"
          type="text"
          @click="handleDesign(record)"
        >
          设计
        </a-button>
        <a-button
          v-permission="['web:model:deploy']"
          type="text"
          @click="handleDeploy(record.id)"
        >
          部署
        </a-button>
        <a-dropdown trigger="hover" @select="handleSelect">
          <a-button type="text">更多</a-button>
          <template #content>
            <a-doption
              v-permission="['web:model:bpmn']"
              :value="{ ...record, commond: 'xml' }"
            >
              流程图
            </a-doption>
            <a-doption
              v-permission="['web:model:page:historyVersion']"
              :value="{ ...record, commond: 'history' }"
            >
              历史
            </a-doption>
            <a-doption
              v-permission="['web:model:delete']"
              :value="{ ...record, commond: 'delete' }"
            >
              删除
            </a-doption>
          </template>
        </a-dropdown>
      </template>
      <template #header>
        <a-button
          v-permission="['web:model:add']"
          type="primary"
          @click="handleAdd"
        >
          <slot name="icon">
            <icon-plus />
          </slot>
          新建
        </a-button>
      </template>
    </i-table>

    <add-model
      v-model="visible"
      :default-value="currentItem"
      :row-id="currentItem.id"
      :process-group-list="processGroupList"
      @reset="reset"
    />

    <!-- 模型历史 -->
    <model-history
      v-model="historyVisible"
      :row-id="page.rowId"
      @reset="reset"
    />
    <!-- 模型设计 -->
    <bpmn-model v-model="bpmnVisible" :row="currentItem" @reset="reset" />
    <!-- 流程图 -->
    <bpmn-view v-model="bpmnSvgVisible" :row-id="page.rowId" />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, computed, ref, reactive } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import {
    flowableEngineModelPageGet,
    flowableEngineModelDeployIdGet,
    flowableEngineModelDeleteIdDelete
  } from '@/api/flowable-engine';
  import { formatTime } from '@/utils';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import AddModel from './__components__/add-model.vue';
  import ModelHistory from './__components__/model-history.vue';
  import BpmnModel from './__components__/bpmn.vue';
  import BpmnView from './__components__/bpmn-view.vue';
  import { useAdd } from './hooks/useAdd';
  import { useProcessGroup } from './hooks/useProcessGroup';
  const { processGroupList, processGroupObj, getProcessGroupList } =
    useProcessGroup();
  const { visible, currentItem, handleAdd, handleEdit } = useAdd();

  const page = reactive({
    search: {
      name: '',
      category: ''
    },
    rowId: '',
    refresh: false
  });

  const options = computed(() => {
    return {
      indexTitle: '序号',
      index: true,
      submitText: '查询',
      tableCard: true,
      menuSpan: 12,
      menuOptions: {
        width: 300
      },
      columns: [
        {
          label: '流程名称',
          search: true,
          prop: 'name',
          options: {
            'max-length': 20
          }
        },
        {
          label: '流程分类',
          search: true,
          prop: 'category',
          type: 'select',
          dic: processGroupList.value
        },
        {
          label: '版本',
          prop: 'version',
          width: 100
        },
        {
          label: '备注',
          prop: 'description',
          width: 180
        },
        {
          label: '创建时间',
          prop: 'createTime',
          width: 120
        }
      ]
    };
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
  // 部署
  const [handleDeploy] = useFuncProxy(async (id: string) => {
    Modal.open({
      title: '确认部署',
      content: '请确认是否部署？',
      onOk: async () => {
        await flowableEngineModelDeployIdGet({ id });
        Message.success('操作成功!');
        page.refresh = true;
      }
    });
  });

  // drop down
  function handleSelect(value: any) {
    switch (value.commond) {
      case 'delete':
        handleDelete(value.id);
        break;
      case 'history':
        historyVisible.value = true;
        page.rowId = String(value.key);
        break;
      case 'xml':
        handleSvg(value);
        break;
    }
  }

  // 删除
  function handleDelete(id: number) {
    Modal.open({
      title: '删除确认',
      content: '请确认是否删除？',
      onOk: async () => {
        await flowableEngineModelDeleteIdDelete({
          id: String(id)
        });
        Message.success('操作成功!');
        page.refresh = true;
      }
    });
  }

  // 模型历史
  const historyVisible = ref(false);

  // 模型设计
  const bpmnVisible = ref(false);
  function handleDesign(value: { id: number }) {
    page.rowId = String(value.id);
    currentItem.value = value;
    bpmnVisible.value = true;
  }

  // 流程图
  const bpmnSvgVisible = ref(false);
  function handleSvg(value: { id: number }) {
    bpmnSvgVisible.value = true;
    page.rowId = String(value.id);
  }

  onMounted(() => {
    getProcessGroupList();
  });
</script>

<style scoped></style>
