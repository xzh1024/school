<template>
  <div>
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      :options="page.options"
      :api="groundPcApiStoreListGet"
    >
      <template #menu="{ record }">
        <!--        <a-button type="text" @click="handleConfig(record)">配置账号</a-button>-->
        <!--        v-permission="['store:extra:update']"-->
        <a-button type="text" @click="handleEdit(record)">编辑</a-button>
        <!--        v-permission="['store:extra:info']"-->
        <a-button type="text" @click="handleDetail(record)">查看</a-button>
      </template>
    </i-table>
    <edit-shop
      v-if="page.showEditModal"
      v-model="page.showEditModal"
      :shop-id="String(page.shopId)"
      :title="page.modelTitle"
      @refresh="onRefresh"
    />
    <detail
      v-if="page.showDetail"
      v-model="page.showDetail"
      :shop-id="String(page.shopId)"
      @edit="handleEdit"
    />
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, Ref } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import {
    groundPcApiStoreListGet,
    GroundPcApiStoreListGetResponse
  } from '@/api/ground-pc-api';
  import EditShop from './__components__/edit-shop.vue';
  import Detail from './__components__/detail.vue';
  import { valueFindLabel } from '@/utils';
  type RowData = Required<GroundPcApiStoreListGetResponse>['rows'][0];

  interface PageConfig {
    search?: object;
    options?: object;
    showEditModal?: boolean;
    refresh?: boolean;
    showDetail?: boolean;
    modelTitle?: string;
    shopId?: number;
    menuOtherOptions?: any;
  }
  const statusList = [
    { label: '试营业', value: 3 },
    { label: '营业中', value: 1 },
    { label: '打烊', value: 2 }
  ];
  const page = reactive<PageConfig>({
    shopId: undefined,
    search: {},
    showEditModal: false,
    refresh: false,
    showDetail: false,
    modelTitle: '编辑店铺',
    options: {
      indexTitle: '序号',
      index: true,
      submitText: '搜索',
      menuSpan: 12,
      tableCard: true,
      columns: [
        {
          label: '基本资料',
          prop: 'searchKey',
          placeholder: '请输入店铺名称 / 电话搜索',
          search: true,
          hide: true
        },
        {
          label: '店铺名称',
          prop: 'name'
        },
        {
          label: '联系电话',
          prop: 'linkTel'
        },
        {
          label: '营业时间',
          prop: 'openTimeDesc',
          ellipsis: true,
          tooltip: true,
          formatter: (e: RowData) => e.openTimeDesc || '--'
        },
        {
          label: '特色服务',
          prop: 'feature',
          formatter: (e: RowData) => e.feature || '--'
        },
        {
          label: '地址',
          prop: 'addressDetail',
          formatter: (e: RowData) => e.addressDetail || '--'
        },
        {
          label: '营业状态',
          prop: 'operatingStatus',
          type: 'select',
          search: true,
          dic: statusList,
          formatter: (e: RowData) =>
            valueFindLabel(statusList, e.operatingStatus)
        }
      ]
    }
  });
  const handleEdit = (item: RowData): void => {
    page.showEditModal = !page.showEditModal;
    page.shopId = item.id;
  };
  const onRefresh = (): void => {
    page.refresh = true;
    page.showDetail = false;
  };
  const handleDetail = (item: RowData): void => {
    page.shopId = item.id;
    page.showDetail = !page.showDetail;
  };
</script>

<style scoped></style>
