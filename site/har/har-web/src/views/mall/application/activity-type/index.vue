<template>
  <div class="wrapper">
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      :options="page.options"
      :api="cbdApiProjectActivityTypeListGet"
    >
      <template #header>
        <a-button type="primary" @click="handleEdit({})">新增类型</a-button>
      </template>
      <template #menu="{ record }">
        <a-button type="text" @click="handleEdit(record)">编辑</a-button>
        <a-button type="text" @click="handleDelete(record)">删除</a-button>
      </template>
    </i-table>
    <edit
      :id="String(page.currentId)"
      v-model="page.editVisible"
      :project-id="page.projectId"
      :current-item="page.currentItem"
      @refresh="page.refresh = true"
    />
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import {
    cbdApiProjectActivityTypeDeleteIdPost,
    cbdApiProjectActivityTypeListGet
  } from '@/api';
  import { Modal } from '@arco-design/web-vue';
  import Edit from './__components__/edit.vue';
  import { getCookie } from '@/utils/cookies';
  import type { CbdApiProjectActivityTypeListGetResponse } from '@/api';
  import lsStore from "@/utils/ls-store";
  type RowData = CbdApiProjectActivityTypeListGetResponse[0];
  interface PageConfig {
    currentItem: RowData;
    currentId: string | number;
    projectId: string;
    editVisible: boolean;
    refresh: boolean;
    options: any;
    search: Recordable;
  }

  // const currentTab: Ref = ref('');
  const page = reactive<PageConfig>({
    search: {
      projectId: lsStore.getItem('projectId')
    },
    currentItem: {},
    currentId: '',
    projectId: lsStore.getItem('projectId')!,
    editVisible: false,
    refresh: false,
    options: {
      indexTitle: '序号',
      index: true,
      submitText: '搜索',
      tableCard: true,
      notPage: true,
      pageShow: false,
      columns: [
        {
          label: '活动类型名称',
          prop: 'name'
        },
        {
          label: '展示顺序',
          prop: 'sort'
        }
      ]
    }
  });
  function handleEdit(record: RowData) {
    page.currentItem = record;
    page.currentId = record.id || '';
    page.editVisible = true;
  }
  function handleDelete(record: RowData) {
    page.currentId = record.id || '';
    Modal.open({
      title: '删除确认',
      content: '请确认是否作删除当前类型？',
      onOk: async () => {
        await cbdApiProjectActivityTypeDeleteIdPost({
          id: String(record.id)
        });
        page.refresh = true;
      }
    });
  }
</script>
