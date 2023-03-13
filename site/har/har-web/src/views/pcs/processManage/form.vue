<template>
  <div>
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      v-permission="[]"
      :options="page.options"
      :api="flowableEngineFormPageGet"
    >
      <template #menu="{ record }">
        <a-button type="text" @click="handleEdit(record.id)">编辑</a-button>
        <a-button type="text" @click="handleDelete(record.id)">删除</a-button>
      </template>
      <template #header>
        <a-button v-permission="[]" type="primary" @click="handleAddLink">
          <slot name="icon">
            <icon-plus />
          </slot>
          新建
        </a-button>
      </template>
    </i-table>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import {
    flowableEngineFormPageGet,
    flowableEngineFormDeletePost
  } from '@/api/flowable-engine';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  function handleAddLink() {
    router.push('./formAdd');
  }
  // 编辑
  function handleEdit(id: number) {
    router.push(`./formAdd?id=${id}`);
  }
  // 删除
  function handleDelete(id: number) {
    Modal.open({
      title: '删除确认',
      width: 300,
      content: '请确认是否删除？',
      onOk: async () => {
        await flowableEngineFormDeletePost({
          ids: [id]
        });
        Message.success('操作成功!');
        page.refresh = true;
      }
    });
  }

  interface PageConfig {
    search?: any;
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
      name: ''
    },
    refresh: false,
    options: {
      indexTitle: '序号',
      index: true,
      submitText: '查询',
      tableCard: true,
      menuSpan: 18,
      menuOptions: {
        width: 230
      },
      columns: [
        {
          label: '表单名称',
          search: true,
          prop: 'name'
        },
        {
          label: '备注',
          prop: 'remark'
        }
      ]
    }
  });
</script>

<style scoped></style>
