<template>
  <div>
    <i-table
      v-model:refresh-now="page.refresh"
      :options="page.options"
      :api="cbdApiProjectMembersRightsListGet"
    >
      <template #serviceModeCell="{ record }">
        {{ serviceModeHash[record.serviceMode] }}
      </template>
      <template #iconCell="{ record }">
        <a-image :src="record.icon.previewAddress" width="70"></a-image>
      </template>
      <template #statusCell="{ record }">
        {{ rightsStatusHash[record.status] }}
      </template>
      <template #menu="{ record }">
        <div class="flex" style="margin-left: -15px">
          <a-button
            v-permission="['members:rights:save']"
            type="text"
            @click="onEditLevel(record)"
            >编辑</a-button
          >
          <a-button
            v-permission="['members:rights:detail']"
            type="text"
            @click="onViewLevelDetail(record)"
            >查看</a-button
          >
        </div>
      </template>
    </i-table>
    <detail
      v-if="page.showDetail"
      :id="String(page.currentId)"
      v-model="page.showDetail"
      @edit="showEditModal"
    />
    <edit
      v-if="page.showAddModal"
      :id="String(page.currentId)"
      v-model="page.showAddModal"
      @refresh="page.refresh = true"
    />
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { cbdApiProjectMembersRightsListGet } from '@/api';
  import type { CbdApiProjectMembersRightsListGetResponse } from '@/api';
  import { rightsStatusHash, serviceModeHash } from '@/utils/dic';
  import Detail from './__components__/detail.vue';
  import Edit from './__components__/edit.vue';
  type RowData = Required<CbdApiProjectMembersRightsListGetResponse>['rows'][0];

  type PageConfig = {
    currentId: number | undefined;
    showDetail: boolean;
    showAddModal: boolean;
    refresh: boolean;
    options: any;
  };
  const page = reactive<PageConfig>({
    currentId: undefined,
    showDetail: false,
    showAddModal: false,
    refresh: false,
    options: {
      tableCard: true,
      indexTitle: '序号',
      index: true,
      menuOptions: {
        align: 'left'
      },
      columns: [
        {
          label: '权益名称',
          prop: 'name'
        },
        {
          label: '展示名称',
          prop: 'showName'
        },
        {
          label: '权益图标',
          prop: 'icon'
        },
        {
          label: '权益简介',
          prop: 'remark'
        },
        {
          label: '服务方式',
          prop: 'serviceMode'
        },
        {
          label: '权益状态',
          prop: 'status'
        }
      ]
    }
  });
  function onEditLevel(record: RowData) {
    page.showAddModal = true;
    page.currentId = record.id;
  }
  function showEditModal() {
    page.showAddModal = true;
  }
  function onViewLevelDetail(record: RowData) {
    page.showDetail = true;
    page.currentId = record.id;
  }
</script>
<style scoped lang="less">
  .tab-card {
    :deep(.arco-card-body) {
      padding-bottom: 5px;
    }
  }

  :deep(.arco-tabs-nav) {
    padding-bottom: 5px;
    background-color: #fff;
  }

  :deep(.arco-tabs-content) {
    padding-top: 0;
  }
</style>
