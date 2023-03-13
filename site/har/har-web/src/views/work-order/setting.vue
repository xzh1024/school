<template>
  <div>
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      v-model:selectedKeys="selectedKeys"
      :options="page.options"
      :api="cbdApiProjectEstateWorkOrderTemplateListGet"
    >
      <template #menu="{ record }">
        <a-button type="text" size="mini" @click="onFormDesign(record)">
          表单设计
        </a-button>
        <a-button type="text" size="mini" @click="onProcessDesign(record)">
          流程设计
        </a-button>
        <a-button type="text" size="mini" @click="onEdit(record)">
          编辑
        </a-button>
        <a-button type="text" size="mini" @click="onView(record)">
          查看
        </a-button>
        <a-button type="text" size="mini" @click="onDelete(record.id)">
          删除
        </a-button>
      </template>
      <template #header>
        <a-space>
          <a-button type="primary" @click="onAdd"> 添加 </a-button>
          <!-- <a-button type="primary" @click="onAdd"> 批量删除 </a-button> -->
          <a-button
            type="primary"
            :disabled="selectedKeys.length === 0"
            @click="onChangeStatus(1)"
          >
            启用
          </a-button>
          <a-button
            type="primary"
            :disabled="selectedKeys.length === 0"
            @click="onChangeStatus(2)"
          >
            停用
          </a-button>
        </a-space>
      </template>
    </i-table>

    <!-- <add-group
      v-model="visible"
      :source="source"
      :default-value="currentItem"
      @reset="reset"
    /> -->
    <add-setting
      v-model="visible"
      :title="title"
      :row="currentRow"
      :source="source"
      @reset="reset"
    />
    <form-design v-model="formVisible" :row="currentRow" @reset="reset" />
    <process-design v-model="processVisible" :row="currentRow" @reset="reset" />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import {
    cbdApiProjectEstateWorkOrderTemplateListGet,
    cbdApiProjectEstateWorkOrderTemplateRemoveIdDelete,
    cbdApiProjectEstateWorkOrderTemplateUpdateStatusPut
  } from '@/api';
  import type { TableRowItemType } from './types';
  import AddSetting from './_components_/add-setting.vue';
  import FormDesign from './_components_/form-design.vue';
  import processDesign from './_components_/process-design.vue';
  import { workerStatusType, workerType } from './dic';
  import { useFilter } from '../assetsManage/hooks/common';
  const { projectList, getProjectList } = useFilter(() => {});
  // 删除
  function onDelete(id: string) {
    Modal.open({
      title: '删除确认',
      content: '请确认是否删除？',
      onOk: async () => {
        await cbdApiProjectEstateWorkOrderTemplateRemoveIdDelete({
          id
        });
        Message.success('操作成功!');
        page.refresh = true;
      }
    });
  }
  const selectedKeys = ref<number[]>([]);

  const page = reactive({
    search: {},
    refresh: false,
    options: {
      indexTitle: '序号',
      index: true,
      menuOptions: {
        width: 320
      },
      menuOtherOptions: {
        'row-selection': {
          type: 'checkbox',
          showCheckedAll: true,
          onlyCurrent: false
        },
        'row-key': 'id'
      },
      columns: [
        {
          label: '项目名称',
          search: true,
          prop: 'projectId',
          type: 'select',
          dic: projectList,
          width: 120,
          formatter({ projectName }: TableRowItemType) {
            return projectName;
          }
        },
        {
          label: '工单类型',
          search: true,
          prop: 'type',
          type: 'select',
          width: 100,
          dic: workerType,
          formatter({ typeName }: TableRowItemType) {
            return typeName;
          }
        },
        {
          label: '工单名称',
          prop: 'name'
        },
        {
          label: '是否允许商户提交',
          prop: 'merchantCreateState',
          width: 160,
          formatter({ merchantCreateState }: TableRowItemType) {
            return merchantCreateState === 1 ? '是' : '否';
          }
        },
        {
          label: '工作状态',
          search: true,
          prop: 'status',
          type: 'select',
          width: 100,
          dic: workerStatusType,
          formatter({ status }: TableRowItemType) {
            return workerStatusType.find(({ value }) => value === status)
              ?.label;
          }
        }
      ]
    }
  });

  const currentRow = ref<TableRowItemType>({
    projectId: -1,
    id: -1,
    projectName: '',
    type: -1,
    typeName: '',
    name: '',
    remark: '',
    merchantCreateState: -1,
    status: -1,
    sponsorUserId: -1,
    applyScope: -1,
    closeRule: -1
  });
  // 新增
  const visible = ref(false);
  const title = ref('');
  const source = ref('add');
  function onAdd() {
    source.value = 'add';
    title.value = '新增表单';
    currentRow.value = {
      projectId: -1,
      id: -1,
      projectName: '',
      type: -1,
      typeName: '',
      name: '',
      remark: '',
      merchantCreateState: -1,
      status: -1,
      sponsorUserId: -1,
      applyScope: -1,
      closeRule: -1
    };
    visible.value = true;
  }

  function onEdit(row: TableRowItemType) {
    source.value = 'edit';
    title.value = '编辑表单';
    currentRow.value = { ...row };
    visible.value = true;
  }

  function onView(row: TableRowItemType) {
    source.value = 'view';
    title.value = '查看表单';
    currentRow.value = { ...row };
    visible.value = true;
  }

  function reset() {
    // rowId.value = '';
    // modelVisible.value = false;
    page.refresh = true;
  }

  // 表单设计
  const formVisible = ref(false);
  function onFormDesign(row: TableRowItemType) {
    currentRow.value = row;
    formVisible.value = true;
  }

  // 流程设计
  const processVisible = ref(false);
  function onProcessDesign(row: TableRowItemType) {
    currentRow.value = row;
    processVisible.value = true;
  }

  // 启停
  async function onChangeStatus(status = 1) {
    await cbdApiProjectEstateWorkOrderTemplateUpdateStatusPut({
      ids: selectedKeys.value,
      operationType: status
    });
    Message.success('操作成功!');
    page.refresh = true;
    selectedKeys.value = [];
  }

  onMounted(() => {
    getProjectList();
  });
</script>

<style scoped></style>
