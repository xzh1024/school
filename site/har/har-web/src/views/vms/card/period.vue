<template>
  <div>
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      v-model:selectedKeys="selectedKeys"
      :options="page.options"
      :api="groundPcApiCardBasePageListPost"
    >
      <template #menu="{ record }">
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
          <a-button type="primary" @click="onAdd">添加</a-button>
          <a-button
            :disabled="selectedKeys.length === 0"
            type="primary"
            @click="onToggleStatus('1')"
          >
            上架
          </a-button>
          <a-button
            :disabled="selectedKeys.length === 0"
            type="primary"
            @click="onToggleStatus('2')"
          >
            下架
          </a-button>
          <a-button
            :disabled="selectedKeys.length === 0"
            type="primary"
            @click="onToggleSaleStatus"
          >
            停售
          </a-button>
        </a-space>
      </template>
    </i-table>

    <add-once
      v-model="visible"
      :title="title"
      :row="currentRow"
      :type="1"
      :source="source"
      @reset="reset"
    />

    <view-card
      v-model="viewVisible"
      :title="title"
      :row="currentRow"
      :source="source"
      :type="1"
      @reset="reset"
    />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import {
    groundPcApiCardBasePageListPost,
    groundPcApiCardBaseCardDelete,
    groundPcApiCardBaseShelfPut,
    groundPcApiCardBaseOffSalePut
  } from '@/api/ground-pc-api';
  import useTableColumns from './hooks/useTableColumns';
  import AddOnce from './_components_/add-once.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import ViewCard from './_components_/view-card.vue';
  // import { workerStatusType, workerType } from './dic';
  // 删除
  function onDelete(id: string) {
    Modal.open({
      title: '删除确认',
      content: '请确认是否删除？',
      onOk: async () => {
        await groundPcApiCardBaseCardDelete({
          id
        });
        Message.success('操作成功!');
        page.refresh = true;
      }
    });
  }
  const selectedKeys = ref<number[]>([]);

  const columns = useTableColumns('period');
  const page = reactive({
    search: {
      cardType: 1
    },
    refresh: false,
    options: {
      indexTitle: '序号',
      index: true,
      menuSpan: 12,
      menuOptions: {
        width: 180,
        fixed: 'right'
      },
      menuOtherOptions: {
        'row-selection': {
          type: 'checkbox',
          showCheckedAll: true,
          onlyCurrent: false
        },
        'row-key': 'id'
      },
      columns: columns
    }
  });

  const currentRow = ref({});
  // 新增
  const visible = ref(false);
  const title = ref('');
  const source = ref('add');
  function onAdd() {
    source.value = 'add';
    title.value = '新增限期卡';
    currentRow.value = {};
    visible.value = true;
  }

  type RowType = any;
  function onEdit(row: RowType) {
    source.value = 'edit';
    title.value = '编辑限期卡';
    currentRow.value = { ...row };
    visible.value = true;
  }

  const viewVisible = ref(false);
  function onView(row: RowType) {
    source.value = 'view';
    title.value = '查看限期卡';
    currentRow.value = { ...row };
    viewVisible.value = true;
  }

  function reset() {
    // rowId.value = '';
    // modelVisible.value = false;
    page.refresh = true;
  }

  const [onToggleStatus] = useFuncProxy(async (status: string) => {
    await groundPcApiCardBaseShelfPut({
      id: selectedKeys.value.join(','),
      status
    });

    Message.success('操作成功!');
    selectedKeys.value = [];
    page.refresh = true;
  });

  const [onToggleSaleStatus] = useFuncProxy(async () => {
    await groundPcApiCardBaseOffSalePut({
      id: selectedKeys.value.join(',')
    });

    Message.success('操作成功!');
    selectedKeys.value = [];
    page.refresh = true;
  });

  onMounted(() => {});
</script>

<style scoped></style>
