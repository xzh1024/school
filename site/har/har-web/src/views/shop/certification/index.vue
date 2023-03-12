<template>
  <div>
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      :options="page.options"
      :api="cbdApiProjectStoreListGet"
    >
      <template #header>
        <a-button
          v-permission="['store:add']"
          type="primary"
          @click="handleAddShop"
          >新增店铺</a-button
        >
      </template>
      <template #storeStatusCell="{ record }">
        {{ storeStatusHash[record.storeStatus] }}
      </template>
      <template #menu="{ record }">
        <a-button
          v-if="record.storeStatus === 0"
          v-permission="['store:update']"
          type="text"
          @click="handleEdit(record)"
          >编辑</a-button
        >
        <a-button
          v-permission="['store:info']"
          type="text"
          @click="handleClick(record)"
          >查看</a-button
        >
      </template>
    </i-table>
    <add-shop-model
      v-if="page.showAddModal"
      v-model="page.showAddModal"
      :shop-id="page.shopId"
      :title="page.modelTitle"
      :source="page.source"
      @reset="handleReset"
    />
    <detail
      v-model="page.showDetail"
      :refresh="page.refresh"
      :shop-id="page.shopId"
      @edit="onClickEdit"
      @refresh="page.refresh = true"
    ></detail>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { cbdApiProjectStoreListGet } from '@/api';
  import type { CbdApiProjectStoreListGetResponse } from '@/api';
  import AddShopModel from './__components__/add-shop-model.vue';
  import Detail from './__components__/detail.vue';
  // import useDictData from "@/hooks/useDictData";
  type RowData = Required<CbdApiProjectStoreListGetResponse>['rows'][0];

  interface PageConfig {
    search?: object;
    options?: object;
    showAddModal?: boolean;
    showDetail?: boolean;
    refresh: boolean;
    modelTitle?: string;
    shopId?: number;
    source?: string;
  }
  const storeStatusHash: {
    [key: number]: string;
  } = {
    0: '草稿',
    1: '认证中',
    2: '已认证',
    3: '拒绝认证'
  };
  const page = reactive<PageConfig>({
    search: {},
    shopId: undefined,
    source: '',
    showAddModal: false,
    refresh: false,
    showDetail: false,
    modelTitle: '新增店铺',
    options: {
      index: true,
      submitText: '搜索',
      tableCard: true,
      menuSpan: 12,
      menuOptions: {},
      columns: [
        {
          label: '基本资料',
          prop: 'searchKey',
          placeholder: '请输入店铺名称 / 联系人 / 联系电话搜索',
          search: true,
          hide: true
        },
        {
          label: '店铺名称',
          prop: 'name'
        },
        {
          label: '所属商户',
          prop: 'merchantName'
        },
        {
          label: '联系人',
          prop: 'linkman'
        },
        {
          label: '联系电话',
          prop: 'linkTel'
        },
        {
          label: '店铺面积（㎡）',
          prop: 'acreage'
        },
        {
          label: '备注',
          prop: 'remark',
          formatter: (el: RowData) => el.remark || '--'
        },
        {
          label: '状态',
          prop: 'storeStatus',
          type: 'select',
          search: true,
          dic: [
            {
              label: '草稿',
              value: 0
            },
            {
              label: '认证中',
              value: 1
            },
            {
              label: '已认证',
              value: 2
            },
            {
              label: '拒绝认证',
              value: 3
            }
          ]
        }
      ]
    }
  });
  function handleAddShop(): void {
    page.shopId = undefined;
    page.source = 'add';
    page.showAddModal = !page.showAddModal;
  }
  function handleEdit(row: RowData): void {
    page.shopId = row.id;
    page.source = 'edit';
    page.showAddModal = !page.showAddModal;
  }
  function handleClick(item: RowData): void {
    page.shopId = item.id;
    page.showDetail = !page.showDetail;
  }
  function handleReset(): void {
    page.refresh = true;
  }
  function onClickEdit(e: number): void {
    page.showAddModal = !page.showAddModal;
    page.shopId = e;
    page.source = 'edit';
  }
</script>

<style scoped></style>
