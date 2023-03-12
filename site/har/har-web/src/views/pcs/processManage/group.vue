<template>
  <div>
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      v-permission="['web:category:list']"
      :options="page.options"
      :api="flowableEngineCategoryPageGet"
    >
      <template #menu="{ record }">
        <a-button
          v-permission="['web:category:info', 'web:category:update']"
          type="text"
          @click="handleEdit(record)"
        >
          编辑
        </a-button>
        <a-button
          v-permission="['web:category:delete']"
          type="text"
          @click="handleDelete(record.code)"
        >
          删除
        </a-button>
      </template>
      <template #header>
        <a-button
          v-permission="['web:category:add']"
          type="primary"
          @click="handleAdd"
        >
          <slot name="icon">
            <icon-plus />
          </slot>
          新建分类
        </a-button>
      </template>
    </i-table>

    <add-group
      v-model="visible"
      :source="source"
      :default-value="currentItem"
      @reset="reset"
    />
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import {
    flowableEngineCategoryPageGet,
    flowableEngineCategoryDeletePost
  } from '@/api/flowable-engine';
  // import useFuncProxy from '@/hooks/useFuncProxy';
  import AddGroup from './__components__/add-group.vue';
  import { useAdd } from './hooks/useAdd';
  const { visible, source, currentItem, handleAdd, handleEdit } = useAdd();
  // 删除
  function handleDelete(id: string) {
    Modal.open({
      title: '删除确认',
      content: '请确认是否删除？',
      onOk: async () => {
        await flowableEngineCategoryDeletePost({
          codes: [id]
        });
        Message.success('操作成功!');
        page.refresh = true;
      }
    });
  }

  const page = reactive({
    search: {},
    refresh: false,
    options: {
      indexTitle: '序号',
      index: true,
      menuOptions: {
        width: 180
      },
      columns: [
        {
          label: '分类名称',
          prop: 'name'
        },
        {
          label: '分类编码',
          prop: 'code'
        },
        {
          label: '备注',
          prop: 'remark'
        }
      ]
    }
  });

  // 新增
  function reset() {
    // rowId.value = '';
    // modelVisible.value = false;
    page.refresh = true;
  }
</script>

<style scoped></style>
