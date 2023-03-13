<template>
  <div>
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      :options="page.options"
      :api="svcWebCardHomeListGet"
    >
      <template #statusCell="{ record }">
        <span :style="record.status === 1 ? '' : 'color:#69AF0F'">
          {{ record.status === 1 ? '待设置' : '已设置' }}</span
        >
      </template>
      <template #menu="{ record }">
        <a-space>
          <a-button
            v-if="record.status === 2"
            type="text"
            @click="viewDetail(record)"
            >查看</a-button
          >
          <a-button
            v-if="record.status === 2"
            type="text"
            @click="handleEdit(record)"
            >编辑</a-button
          >
          <a-button
            v-if="record.status === 1"
            type="text"
            @click="addCard(record)"
            >设置</a-button
          >
        </a-space>
      </template>
    </i-table>

    <detail
      v-if="page.isShowDetail"
      v-model="page.isShowDetail"
      :detail-id="Number(page.detailId)"
    ></detail>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { useRouter } from 'vue-router';
  import { CbdApiProjectBannerListGetResponse } from '@/api';
  import Detail from './__components__/detail.vue';
  import { svcWebCardHomeListGet } from '@/api/svc-web';
  type TableData = Required<CbdApiProjectBannerListGetResponse>['rows'][0];
  interface PageConfig {
    detailId: number | undefined;
    isShowDetail: boolean;
    isAddShow: boolean;
    refresh: boolean;
    search: any;
    options: any;
  }
  const router = useRouter();

  const page = reactive<PageConfig>({
    detailId: undefined,
    isShowDetail: false,
    isAddShow: false,
    search: {},
    refresh: false,
    options: {
      indexTitle: '序号',
      index: true,
      submitText: '搜索',
      tableCard: true,
      pageShow: false,
      notPage: true,
      columns: [
        {
          prop: 'projectName',
          label: '项目',
          ellipsis: true,
          tooltip: true
        },
        {
          prop: 'status',
          label: '状态',
          ellipsis: true,
          tooltip: true
        },
        {
          prop: 'num',
          label: '广告数量',
          ellipsis: true,
          tooltip: true
        },
        {
          prop: 'createBy',
          label: '创建人',
          ellipsis: true,
          tooltip: true
        },
        {
          prop: 'createTime',
          label: '创建时间',
          ellipsis: true,
          tooltip: true
        },

        {
          prop: 'updateBy',
          label: '更新人',
          ellipsis: true,
          tooltip: true
        },
        {
          prop: 'updateTime',
          label: '更新时间',
          ellipsis: true,
          tooltip: true
        }
      ]
    }
  });
  const viewDetail = (data: TableData) => {
    page.isShowDetail = true;
    page.detailId = data.id;
  };
  const handleEdit = (data: TableData) => {
    router.push({
      path: '/svc/electronCard/homeSetting/edit',
      query: {
        id: data.id,
        projectId: data.projectId
      }
    });
  };
  const addCard = (data: TableData) => {
    router.push({
      path: '/svc/electronCard/homeSetting/edit',
      query: {
        projectId: data.projectId
      }
    });
  };

  onMounted(() => {});
</script>
<style scoped></style>
