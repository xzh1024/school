<template>
  <div>
    <i-table
      v-model:refresh-now="refreshNow"
      :options="options"
      :data="list"
      :api="groundPcApiProductAttributeSpecificationsListGet"
      @data-after="dataAfter"
    >
      <template #header>
        <a-button
          v-permission="['product-attribute:add']"
          type="outline"
          @click="addEditChildrenType({})"
          >新增规格项</a-button
        >
      </template>
      <template #menu="{ record }">
        <div class="text-right">
          <a-button
            v-if="!record.pid"
            v-permission="['product-attribute:add']"
            type="text"
            @click="addEditChildrenType(record, 'child')"
            >新增规格值</a-button
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
    name: 'Specs'
  };
</script>

<script setup lang="ts">
  import { ref, Ref } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import {
    groundPcApiProductAttributeSpecificationsListGet,
    groundPcApiProductAttributeSpecificationsDeletePost,
    GroundPcApiProductAttributeSpecificationsListGetResponse
  } from '@/api/ground-pc-api';
  import { Message, Modal } from '@arco-design/web-vue';

  import Edit from './specs-edit.vue';
  import { SpecsListItem } from './specs.d';

  const refreshNow: Ref<boolean> = ref(false);
  const addVisible: Ref<boolean> = ref(false);
  const list: Ref<GroundPcApiProductAttributeSpecificationsListGetResponse> =
    ref([]);
  const currentItem: Ref<SpecsListItem> = ref({});
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
        label: '规格名称',
        prop: 'name'
      },
      {
        label: '备注',
        prop: 'remark'
      }
    ]
  });

  // 新增编辑
  function addEditChildrenType(
    record: SpecsListItem,
    type?: 'child' | undefined
  ) {
    currentItem.value = type ? { pid: record.id } : record;
    addVisible.value = true;
  }

  function dataAfter(
    data: GroundPcApiProductAttributeSpecificationsListGetResponse
  ) {
    list.value = data;
  }

  async function deleteConfirmCurrent(record: SpecsListItem) {
    Modal.warning({
      title: '提示',
      content: '请确认是否作删除当前规格项 / 规格值？',
      simple: false,
      titleAlign: 'start',
      width: 400,
      hideCancel: false,
      onBeforeOk(done) {
        deleteCurrent(record, done);
      }
    });
  }
  async function deleteCurrent(
    record: SpecsListItem,
    done: (closed: boolean) => void
  ) {
    const { pid, id } = record;
    try {
      await groundPcApiProductAttributeSpecificationsDeletePost({
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
