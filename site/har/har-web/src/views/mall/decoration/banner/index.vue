<template>
  <div>
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      :options="page.options"
      :api="cbdApiProjectBannerListGet"
    >
      <template #header>
        <a-button
          v-permission="['banner:add']"
          type="primary"
          @click="addBanner"
          >新增</a-button
        >
      </template>
      <template #statusCell="{ record }">
        {{ record.status === 1 ? '已上架' : '已下架' }}
      </template>
      <template #menu="{ record }">
        <div class="flex" style="margin-left: -15px;">
          <a-button
            v-permission="['banner:info']"
            type="text"
            @click="viewDetail(record)"
            >查看详情</a-button
          >
          <a-button
            v-permission="['banner:edit']"
            type="text"
            @click="handleEdit(record)"
            >编辑</a-button
          >
          <a-popconfirm
            :content="`确认${
              record.status === 1 ? '下架' : '上架'
            }当前banner吗?`"
            @ok="onAndOffShelf(record)"
          >
            <a-button type="text">{{
              record.status === 1 ? '下架' : '上架'
            }}</a-button>
          </a-popconfirm>
        </div>
      </template>
    </i-table>
    <detail
      v-if="page.isShowDetail"
      v-model="page.isShowDetail"
      :banner-id="Number(page.bannerId)"
    ></detail>
    <edit
      v-if="page.showEdit"
      v-model="page.showEdit"
      :banner-id="Number(page.bannerId)"
      :project-id="page.projectId"
      @refresh="page.refresh = true"
    ></edit>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Detail from './__components__/detail.vue';
  import Edit from './__components__/edit.vue';
  import {
    cbdApiProjectBannerListGet,
    cbdApiProjectBannerOnShelfIdPost
  } from '@/api';
  import type { CbdApiProjectBannerListGetResponse } from '@/api';
  import { getCookie } from '@/utils/cookies';
  import lsStore from "@/utils/ls-store";
  type TableData = Required<CbdApiProjectBannerListGetResponse>['rows'][0];
  interface PageConfig {
    search: { projectId: string };
    projectId: string;
    bannerId: number | undefined;
    isShowDetail: boolean;
    refresh: boolean;
    showEdit: boolean;
    options: any;
  }
  const page = reactive<PageConfig>({
    search: {
      projectId: lsStore.getItem('projectId')!
    },
    projectId: lsStore.getItem('projectId')!,
    isShowDetail: false,
    refresh: false,
    showEdit: false,
    bannerId: undefined,
    options: {
      submitText: '搜索',
      tableCard: true,
      menuSpan: 18,
      columns: [
        {
          prop: 'name',
          label: '轮播图名称',
          search: true
        },
        {
          prop: 'sequence',
          label: '展示顺序'
        },
        {
          prop: 'status',
          label: '展示状态'
        },
        {
          prop: 'createTime',
          label: '创建时间'
        }
      ]
    }
  });
  const viewDetail = (data: TableData) => {
    page.isShowDetail = true;
    page.bannerId = data.id;
  };
  const handleEdit = (data: TableData) => {
    page.showEdit = true;
    page.bannerId = data.id;
  };
  const addBanner = () => {
    page.showEdit = true;
    page.bannerId = undefined;
  };
  const onAndOffShelf = async (data: TableData) => {
    await cbdApiProjectBannerOnShelfIdPost({
      id: String(data.id)
    });
    page.refresh = true;
  };
</script>
<style scoped></style>
