<template>
  <div class="classification">
    <i-table
      v-model:refresh-now="refreshNow"
      :options="options"
      :data="list"
      :api="groundPcApiProductAttributeClassifyListGet"
      @data-after="dataAfter"
    >
      <template #header>
        <a-button
          v-permission="['product-attribute:add']"
          type="outline"
          @click="addEditChildrenType({})"
          >新增分类</a-button
        >
      </template>
      <template #menu="{ record }">
        <div class="text-right">
          <a-button
            v-if="record.allow"
            v-permission="['product-attribute:add']"
            type="text"
            @click="addEditChildrenType(record, 'child')"
            >新增子分类</a-button
          >
          <a-button
            v-permission="['product-attribute:update']"
            type="text"
            @click="addEditChildrenType(record)"
            >编辑</a-button
          >
          <a-button
            v-permission="['product-attribute:delete']"
            type="text"
            @click="deleteConfirmCurrent(record)"
            >删除</a-button
          >
        </div>
      </template>
    </i-table>
    <edit
      v-if="addVisible"
      :id="currentItem.id"
      v-model="addVisible"
      :parent-id="currentItem.pid"
      :refresh="refresh"
    />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Classification'
  };
</script>

<script setup lang="ts">
  import { ref, Ref } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import {
    groundPcApiProductAttributeClassifyListGet,
    groundPcApiProductAttributeClassifyDeletePost,
    GroundPcApiProductAttributeClassifyListGetResponse
  } from '@/api/ground-pc-api';
  import { Message, Modal } from '@arco-design/web-vue';
  import { listItem } from './classification.d';
  import Edit from './classify-edit.vue';

  const refreshNow: Ref<boolean> = ref(false);
  const list: Ref<GroundPcApiProductAttributeClassifyListGetResponse> = ref([]);
  const addVisible: Ref<boolean> = ref(false);
  const currentItem: Ref<listItem> = ref({});
  const options: Ref = ref({
    menuOtherOptions: {
      rowKey: 'id'
    },
    menuOptions: {
      width: 260
    },
    pageShow: false,
    index: true,
    columns: [
      {
        label: '分类名称',
        prop: 'name'
      },
      {
        label: '备注',
        prop: 'remark'
      }
    ]
  });

  // 新增编辑
  function addEditChildrenType(record: listItem, type?: 'child' | undefined) {
    currentItem.value = type ? { pid: record.id } : record;
    addVisible.value = true;
  }
  function dataAfter(data: GroundPcApiProductAttributeClassifyListGetResponse) {
    list.value = data;
  }
  async function deleteConfirmCurrent(record: listItem) {
    Modal.warning({
      title: '提示',
      content: '请确认是否作删除当前分类？',
      simple: false,
      width: 400,
      titleAlign: 'start',
      hideCancel: false,
      onBeforeOk(done) {
        deleteCurrent(record, done);
      }
    });
  }
  async function deleteCurrent(
    record: listItem,
    done: (closed: boolean) => void
  ) {
    const { pid, id } = record;
    try {
      await groundPcApiProductAttributeClassifyDeletePost({
        pid,
        id: id as number
      });
      done(true);
      Message.success('删除成功');
      refreshNow.value = true;
    } catch (e) {
      done(false);
      console.error(e);
    }
  }
  function refresh() {
    refreshNow.value = true;
  }
</script>
