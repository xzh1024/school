<template>
  <div>
    <i-table
      v-model:refresh-now="refreshNow"
      :options="options"
      :api="groundPcApiProductAttributeBrandListGet"
      :data="list"
      @data-after="dataChange"
    >
      <template #header>
        <a-button
          v-permission="['product-attribute:add']"
          type="outline"
          @click="addEditChildrenType({})"
          >新增品牌</a-button
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
      <template #fileCell="{ record }">
        <i-custom-upload
          :model-value="record.file"
          url-key="previewAddress"
          :options="{
            showRemoveButton: false,
            showUploadButton: false,
            imageStyle: {
              width: '60px',
              height: '60px'
            }
          }"
        ></i-custom-upload>
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
    name: 'Brand'
  };
</script>

<script setup lang="ts">
  import { ref, Ref } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import {
    groundPcApiProductAttributeBrandDeletePost,
    groundPcApiProductAttributeBrandListGet,
    type GroundPcApiProductAttributeBrandListGetResponse
  } from '@/api/ground-pc-api';
  import { Message, Modal } from '@arco-design/web-vue';

  import { type brandListItem } from './brand';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import Edit from './brand-edit.vue';

  interface dataResponse {
    id?: number;
    sort?: number;
    name?: string;
    file?: Array<{
      id?: string;
      name?: string;
      type?: string;
      size?: number;
      previewAddress?: string;
    }>;
    remark?: string;
  }

  const list = ref<Array<dataResponse>>([]);
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
    pageShow: false,
    index: true,
    columns: [
      {
        label: '品牌名称',
        prop: 'name'
      },
      {
        label: '品牌logo',
        prop: 'file'
      },
      {
        label: '备注',
        prop: 'remark'
      }
    ]
  });
  function dataChange(data: GroundPcApiProductAttributeBrandListGetResponse) {
    list.value = data.map((i) => {
      const { file = {} } = i;
      return { ...i, file: Object.keys(file).length ? [file] : [] };
    });
  }

  // 新增编辑
  function addEditChildrenType(record: brandListItem) {
    currentItem.value = record;
    addVisible.value = true;
  }

  async function deleteConfirmCurrent(record: brandListItem) {
    Modal.warning({
      title: '提示',
      content: '请确认是否作删除当前品牌？',
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
    record: brandListItem,
    done: (closed: boolean) => void
  ) {
    try {
      await groundPcApiProductAttributeBrandDeletePost({
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

<style lang="less" scoped>
  :deep(.arco-upload-wrapper.arco-upload-wrapper-type-picture-card) {
    width: 60px;
    height: 60px;
  }

  :deep(.arco-upload-list-picture),
  :deep(.arco-upload-picture-card) {
    width: 60px;
    height: 60px;
  }

  :deep(.arco-upload-list-picture-mask) {
    line-height: 60px;
  }
</style>
