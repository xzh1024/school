<template>
  <div>
    <i-table
      v-model:refresh-now="refreshNow"
      :options="options"
      :api="groundPcApiProductAttributeUnitsListGet"
      :data="list"
      @data-after="dataChange"
    >
      <template #header>
        <a-button
          v-permission="['product-attribute:add']"
          type="outline"
          @click="addEditChildrenType({})"
          >新增单位</a-button
        >
      </template>
      <template #menu="{ record }">
        <div class="text-right">
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
    name: 'Unit'
  };
</script>

<script setup lang="ts">
  import { ref, Ref } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import {
    groundPcApiProductAttributeUnitsListGet,
    groundPcApiProductAttributeUnitsDeletePost,
    GroundPcApiProductAttributeUnitsListGetResponse
  } from '@/api/ground-pc-api';
  import { Message, Modal } from '@arco-design/web-vue';

  import type { brandListItem } from './brand';
  import Edit from './unit-edit.vue';

  const list: Ref<GroundPcApiProductAttributeUnitsListGetResponse> = ref([]);
  const refreshNow: Ref<boolean> = ref(false);
  const addVisible: Ref<boolean> = ref(false);
  const currentItem: Ref<brandListItem> = ref({});
  const options: Ref = ref({
    menuOtherOptions: {
      rowKey: 'id'
    },
    menuOptions: {
      width: 200
    },
    index: true,
    pageShow: false,
    columns: [
      {
        label: '单位名称',
        prop: 'name'
      }
    ]
  });

  function dataChange(data: GroundPcApiProductAttributeUnitsListGetResponse) {
    list.value = data;
  }

  // 新增编辑
  function addEditChildrenType(record: brandListItem) {
    currentItem.value = record;
    addVisible.value = true;
  }

  async function deleteConfirmCurrent(record: brandListItem) {
    Modal.warning({
      title: '提示',
      content: '请确认是否作删除当前单位？',
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
    record: brandListItem,
    done: (closed: boolean) => void
  ) {
    try {
      await groundPcApiProductAttributeUnitsDeletePost({
        id: record.id as number
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
