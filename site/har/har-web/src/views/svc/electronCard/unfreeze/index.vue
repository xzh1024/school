<template>
  <div>
    <i-table
      v-model="searchForm"
      v-model:refresh-now="page.refresh"
      :options="page.options"
      :api="svcWebMemberCardFreezeListGet"
      @reset="onReset"
    >
      <template #header>
        <a-button type="primary" @click="addCard">解冻/冻结</a-button>
      </template>
      <template #typeCell="{ record }">
        <span :style="record.type === 2 ? '' : 'color:#69AF0F'">
          {{ record.type === 2 ? '冻结' : '解冻' }}</span
        >
      </template>
      <template #menu="{ record }">
        <a-space>
          <a-button type="text" @click="viewDetail(record)">查看</a-button>
        </a-space>
      </template>
    </i-table>

    <detail
      v-if="page.isShowDetail"
      v-model="page.isShowDetail"
      :banner-id="Number(page.detailId)"
    ></detail>

    <add
      v-if="page.isAddShow"
      v-model="page.isAddShow"
      @update="page.refresh = true"
    >
    </add>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, reactive } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Detail from './__components__/detail.vue';
  import Add from './__components__/add.vue';
  import {
    svcWebCommonCardSelectListGet,
    SvcWebCommonCardSelectListGetResponse,
    svcWebMemberCardFreezeListGet,
    SvcWebMemberCardFreezeListGetRequest,
    SvcWebMemberCardFreezeListGetResponse
  } from '@/api/svc-web';
  import useFuncProxy from '@/hooks/useFuncProxy';
  type TableData = Required<SvcWebMemberCardFreezeListGetResponse>['rows'][0];
  interface PageConfig {
    isShowDetail: boolean;
    isAddShow: boolean;
    refresh: boolean;
    detailId: number | string;
    options: any;
  }

  const searchForm = ref<SvcWebMemberCardFreezeListGetRequest>(
    {} as SvcWebMemberCardFreezeListGetRequest
  );
  const cardList = ref<SvcWebCommonCardSelectListGetResponse>([]);

  const page = reactive<PageConfig>({
    isShowDetail: false,
    isAddShow: false,
    refresh: false,
    detailId: '',
    options: {
      indexTitle: '序号',
      index: true,
      submitText: '搜索',
      tableCard: true,
      columns: [
        {
          prop: 'projectName',
          label: '项目',
          ellipsis: true,
          tooltip: true,
          width: 120
        },
        {
          label: '类型',
          search: true,
          width: 80,
          prop: 'type',
          type: 'select',
          dic: [
            {
              label: '解冻',
              value: 1
            },
            {
              label: '冻结',
              value: 2
            }
          ]
        },

        {
          prop: 'orderNo',
          label: '单号',
          search: true,
          ellipsis: true,
          width: 180,
          tooltip: true,
          options: {
            maxLength: 50
          }
        },
        {
          label: '卡名',
          prop: 'cardId',
          type: 'select',
          dic: cardList,
          width: 180,
          search: true,
          hide: true,
          options: {
            allowSearch: true,
            maxLength: 50
          }
        },
        {
          prop: 'cardName',
          label: '卡名',
          ellipsis: true,
          tooltip: true,
          width: 100
        },
        {
          prop: 'memberCardCode',
          label: '卡号',
          ellipsis: true,
          tooltip: true,
          search: true,
          options: {
            maxLength: 50
          }
        },
        {
          prop: 'memberCode',
          label: '持卡人编号',
          ellipsis: true,
          tooltip: true
        },
        {
          prop: 'memberName',
          label: '持卡人姓名',
          ellipsis: true,
          tooltip: true
        },
        {
          prop: 'memberPhone',
          label: '持卡人电话',
          ellipsis: true,
          tooltip: true
        },
        {
          prop: 'memberCode',
          label: '持卡人编号',
          ellipsis: true,
          tooltip: true
        },

        {
          prop: 'createBy',
          label: '操作人',
          ellipsis: true,
          tooltip: true,
          search: true
        },

        {
          label: '操作时间',
          prop: 'createTime',
          search: true,
          width: 180,
          type: 'dateRange',
          options: {
            onChange(v: any) {
              const [startDate = '', endDate = ''] = v;
              searchForm.value = { ...searchForm.value, startDate, endDate };
            }
          }
        }
      ]
    }
  });
  const onReset = () => {
    // searchForm.value.time = [];
    searchForm.value.startDate = undefined;
    searchForm.value.endDate = undefined;
  };
  const [geCardSelect] = useFuncProxy(async () => {
    cardList.value = await svcWebCommonCardSelectListGet({});
  });
  const viewDetail = (data: TableData) => {
    page.detailId = data.id;
    page.isShowDetail = true;
  };
  const addCard = () => {
    page.isAddShow = true;
  };

  onMounted(() => {
    geCardSelect();
  });
</script>
<style scoped></style>
