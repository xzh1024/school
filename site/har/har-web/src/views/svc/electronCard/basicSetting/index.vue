<template>
  <div>
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      :options="page.options"
      :api="svcWebCardPageListGet"
      @reset="onReset"
    >
      <template #header>
        <a-button type="primary" @click="addCard">新增</a-button>
      </template>

      <template #menu="{ record }">
        <a-space>
          <a-button type="text" @click="viewDetail(record)">查看</a-button>
          <a-button type="text" @click="editCard(record)">编辑</a-button>
        </a-space>
      </template>
    </i-table>

    <Detail
      v-if="page.isShowDetail"
      v-model="page.isShowDetail"
      :detail-id="page.detailId"
    ></Detail>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, reactive, watch } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { getSvcProjectDrop } from '@/utils/svcCommon';
  import Detail from './__components__/detail.vue';
  import {
    svcWebCardPageListGet,
    SvcWebCardPageListGetResponse,
    SvcWebCommonCardSelectListGetResponse,
    svcWebCommonProjectSelectPost,
    SvcWebCommonProjectSelectPostResponse
  } from '@/api/svc-web';
  import { useRouter } from 'vue-router';
  import { svcWebCommonCardSelectListGet } from '@/api/svc-web';
  import { useRequest } from '@har/use';
  type TableData = Required<SvcWebCardPageListGetResponse>['rows'][0];
  interface PageConfig {
    search: {
      projectId?: string | number | undefined;
      cardId?: string;
      marketName?: string;
      startDate?: string | undefined;
      endDate?: string | undefined;
      time?: string[];
      pageNum?: number;
      pageSize?: number;
    };
    isShowDetail: boolean;
    detailId: string | number;
    refresh: boolean;
    options: any;
  }
  const router = useRouter();
  const cardList = ref<SvcWebCommonCardSelectListGetResponse>([]);
  const projectList = ref<SvcWebCommonProjectSelectPostResponse>([]);
  const page = reactive<PageConfig>({
    search: {
      projectId: '',
      cardId: '', //卡id
      marketName: '', //商场名字
      startDate: '', //开始时间
      endDate: '' //结束时间
    },
    detailId: '',
    isShowDetail: false,
    refresh: false,
    options: {
      indexTitle: '序号',
      index: true,
      submitText: '搜索',
      tableCard: true,
      menuSpan: 24,
      columns: [
        {
          label: '项目',
          prop: 'projectId',
          dic: projectList,
          type: 'select',
          hide: true,
          search: true,
          options: {
            allowSearch: true
          },
          ellipsis: true,
          tooltip: true
        },
        {
          label: '卡名',
          prop: 'cardId',
          type: 'select',
          dic: cardList,
          search: true,
          hide: true,
          options: {
            allowSearch: true,
            maxLength: 50
          },
          ellipsis: true,
          tooltip: true
        },
        {
          prop: 'projectName',
          label: '项目',
          span: 6,
          ellipsis: true,
          tooltip: true
        },
        {
          prop: 'cardName',
          label: '储值卡名称',
          span: 6,
          ellipsis: true,
          tooltip: true
        },
        {
          prop: 'marketName',
          label: '商场名称',
          search: true,
          options: {
            maxLength: 50
          },
          span: 6,
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
        },
        {
          prop: 'time',
          label: '更新时间',
          type: 'dateRange',
          placeholder: ['请选择开始时间', '请选择结束时间'],
          search: true,
          hide: true,
          span: 6,
          on: {
            change(v: string[]) {
              page.search = {
                ...page.search,
                startDate: v[0] || '',
                endDate: v[1] || ''
              };
            }
          }
        }
      ]
    }
  });
  const onReset = () => {
    page.search.time = [];
    page.search.startDate = undefined;
    page.search.endDate = undefined;
  };
  // function setProjectId(v?: SvcWebCommonProjectSelectPostResponse) {
  //   const data = v || projectList.value;
  //   const projectId = lsStore.getItem('svcServiceProjectId');
  //   const item = data.find((i) => i.value === Number(projectId));
  //   if (projectId && item) {
  //     page.search.projectId = projectId;
  //   } else {
  //     const res = data[0].value;
  //     page.search.projectId = res;
  //   }
  // }

  const { run: getCardList } = useRequest(svcWebCommonCardSelectListGet, {
    onSuccess(data) {
      cardList.value = data;
    }
  });

  useRequest(svcWebCommonProjectSelectPost, {
    onSuccess: (data) => {
      projectList.value = data;
      // setProjectId(data);
      getCardList({ projectId: page.search.projectId + '' });
    }
  });

  const viewDetail = (data: TableData) => {
    page.detailId = data.id;
    page.isShowDetail = true;
  };

  const addCard = () => {
    router.push({
      path: '/svc/electronCard/basicSetting/edit'
    });
  };
  const editCard = (row: TableData) => {
    router.push({
      path: '/svc/electronCard/basicSetting/edit',
      query: {
        id: row.id
      }
    });
  };

  watch(
    () => page.search.projectId,
    (i) => {
      // lsStore.setItem('svcServiceProjectId', i);
      getCardList({ projectId: i + '' });
    }
  );

  onMounted(() => {
    getSvcProjectDrop();
  });
</script>
<style scoped></style>
