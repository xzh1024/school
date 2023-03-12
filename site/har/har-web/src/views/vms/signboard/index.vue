<template>
  <div>
    <i-table
      v-model="page.search"
      v-model:refresh-now="refresh"
      :options="page.options"
      :api="groundPcApiStoreListGet"
    >
      <template #operatingStatusCell="{ record }">
        {{ operatingStatusHash[record.operatingStatus] }}
      </template>
      <template #menu="{ record }">
        <div style="margin-left: -15px">
          <!--        v-permission="['store:sign:edit']"-->
          <a-button type="text" @click="handleEdit(record)">编辑</a-button>
          <!--        v-permission="['store:sign:info']"-->
          <a-button type="text" @click="handleViewDetail(record)"
            >查看</a-button
          >
        </div>
      </template>
    </i-table>
    <edit
      v-if="page.editVisible"
      v-model="page.editVisible"
      :store-id="String(page.currentId)"
      @refresh="onEditFinish"
    />
    <detail
      v-if="page.detailVisible"
      v-model="page.detailVisible"
      :store-id="String(page.currentId)"
      @edit="page.editVisible = true"
    />
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Detail from './__components__/detail.vue';
  import Edit from './__components__/edit.vue';
  import {
    groundPcApiStoreListGet,
    GroundPcApiStoreListGetResponse
  } from '@/api/ground-pc-api';
  type StoreExtraItem = Required<GroundPcApiStoreListGetResponse>['rows'][0];
  type PageConfig = {
    currentId: number | undefined;
    search: {};
    detailVisible: boolean;
    editVisible: boolean;
    options: any;
  };

  const refresh = ref(false);
  const operatingStatusHash: Record<number, string> = {
    1: '营业中',
    2: '打烊'
  };
  const page = reactive<PageConfig>({
    currentId: undefined,
    search: {},
    detailVisible: false,
    editVisible: false,
    options: {
      indexTitle: '序号',
      index: true,
      submitText: '搜索',
      tableCard: true,
      menuSpan: 12,
      columns: [
        {
          label: '基本资料',
          prop: 'searchKey',
          placeholder: ' 请输入店铺名称 / 联系人 / 联系电话搜索',
          search: true,
          hide: true,
          options: {
            maxLength: 20
          },
          span: 6
        },
        {
          label: '店铺名称',
          prop: 'name'
        },
        {
          label: '联系电话',
          prop: 'linkTel',
          formatter: (e: StoreExtraItem) => e.linkTel || '--'
        },
        {
          label: '营业时间',
          prop: 'openTimeDesc',
          align: 'center',
          ellipsis: true,
          tooltip: true,
          formatter: (e: StoreExtraItem) => e.openTimeDesc || '--'
        },
        {
          label: '特色服务',
          prop: 'feature',
          ellipsis: true,
          tooltip: true,
          align: 'center',
          formatter: (e: StoreExtraItem) => e.feature || '--'
        },
        {
          label: '地址',
          prop: 'addressDetail',
          ellipsis: true,
          tooltip: true,
          align: 'center',
          formatter: (e: StoreExtraItem) => e.addressDetail || '--'
        },
        {
          label: '营业状态',
          prop: 'operatingStatus',
          type: 'select',
          search: true,
          span: 6,
          dic: [
            { label: '试营业', value: 0 },
            { label: '营业中', value: 1 },
            { label: '打烊', value: 2 }
          ]
        }
      ]
    }
  });
  function handleViewDetail(record: StoreExtraItem) {
    page.currentId = record.id;
    page.detailVisible = true;
  }
  function handleEdit(record: StoreExtraItem) {
    page.currentId = record.id;
    page.editVisible = true;
  }
  const onEditFinish = () => {
    refresh.value = true;
    page.detailVisible = false;
  };
</script>
