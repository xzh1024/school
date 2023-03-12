<template>
  <div class="wrapper">
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      :options="page.options"
      :page="page.pageOptions"
      :api="cbdApiProjectActivityListGet"
      @reset="handleReset"
    >
      <template #header>
        <a-button
          type="outline"
          style="margin-bottom: 10px"
          @click="onAddActivity"
          >新增活动</a-button
        >
        <a-tabs default-active-key="" @change="changeTab">
          <a-tab-pane
            v-for="item in activityStatus"
            :key="item.value"
            :title="item.label"
          ></a-tab-pane>
        </a-tabs>
      </template>
      <template #payTypeCell="{ record }">
        {{ activityPayTypeHash[record.payType] }}
      </template>
      <template #statusCell="{ record }">
        {{ activityStatusHash[record.status] }}
      </template>
      <template #menu="{ record }">
        <a-button type="text" @click="handleViewDetail(record)">查看</a-button>
      </template>
    </i-table>
    <detail
      v-if="page.detailVisible"
      :id="String(page.currentId)"
      v-model="page.detailVisible"
      @refresh="page.refresh = true"
    />
    <add
      v-if="page.addVisible"
      v-model="page.addVisible"
      :project-id="page.projectId"
      @refresh="page.refresh = true"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { cbdApiProjectActivityListGet } from '@/api';
  import Detail from './__components__/detail.vue';
  import Add from './__components__/add.vue';
  import {
    activityPayTypeList,
    activityStatus,
    activityStatusHash,
    activityPayTypeHash
  } from '@/utils/dic';
  import type { CbdApiProjectActivityListGetResponse } from '@/api';
  import { getCookie } from '@/utils/cookies';
  import lsStore from "@/utils/ls-store";
  type RowData = Required<CbdApiProjectActivityListGetResponse>['rows'][0];

  const currentTab = ref<string | number>('');
  const page = reactive<any>({
    search: {
      projectId: lsStore.getItem('projectId')
    },
    pageOptions: {
      current: 1
    },
    currentId: '',
    projectId: lsStore.getItem('projectId'),
    addVisible: false,
    detailVisible: false,
    refresh: false,
    options: {
      indexTitle: '序号',
      index: true,
      submitText: '搜索',
      tableCard: true,
      columns: [
        {
          label: '活动名称',
          prop: 'name',
          placeholder: '请输入活动名称筛选',
          search: true,
          span: 6
        },
        {
          label: '支付方式',
          prop: 'payType',
          type: 'select',
          search: true,
          span: 6,
          dic: activityPayTypeList
        },
        {
          label: '价格',
          prop: 'signupFee'
        },
        {
          label: '活动开始时间',
          prop: 'activityStartDate'
        },
        {
          label: '活动结束时间',
          prop: 'activityEndDate'
        },
        {
          label: '活动时间',
          prop: 'time',
          type: 'dateRange',
          placeholder: ['请选择开始时间', '请选择结束时间'],
          search: true,
          hide: true,
          span: 6,
          on: {
            change(v: string[]) {
              page.search = {
                ...page.search,
                activityStartDate: v[0] || '',
                activityEndDate: v[1] || ''
              };
            }
          }
        },
        {
          label: '状态',
          prop: 'status'
        },
        {
          label: '人数限制（人）',
          prop: 'maxSignupNum',
          formatter: (e: any) => (e.maxSignupNum === '' ? '--' : e.maxSignupNum)
        },
        {
          label: '已参与',
          prop: 'signupNum',
          formatter: (e: any) => (e.signupNum === '' ? '--' : e.signupNum)
        },
        {
          label: '已使用',
          prop: 'usedNum',
          formatter: (e: any) => (e.usedNum === '' ? '--' : e.usedNum)
        }
      ]
    }
  });
  const changeTab = (v: string | number) => {
    currentTab.value = v;
    page.search.status = v;
    page.pageOptions.current = 1;
    page.refresh = true;
  };
  function onAddActivity() {
    page.addVisible = true;
  }
  function handleViewDetail(record: RowData) {
    page.currentId = record.id;
    page.detailVisible = true;
  }
  function handleReset() {
    delete page.search.activityStartDate;
    delete page.search.activityEndDate;
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
