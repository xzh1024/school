<template>
  <div>
    <i-table
      v-model="searchForm"
      v-model:refresh-now="page.refresh"
      :options="page.options"
      :api="svcWebMemberCardCancelListGet"
      @reset="onReset"
    >
      <template #header>
        <a-button type="primary" @click="addCard">退卡</a-button>
      </template>
      <template #typeCell="{ record }">
        {{ record.type === 1 ? '冻结' : '解冻' }}
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
    svcWebMemberCardCancelListGet,
    SvcWebMemberCardCancelListGetResponse
  } from '@/api/svc-web';
  import type { SvcWebMemberCardCancelListGetRequest } from '@/api/svc-web';
  import { formatPrice } from '@/utils';
  import useFuncProxy from '@/hooks/useFuncProxy';
  type TableData = Required<SvcWebMemberCardCancelListGetResponse>['rows'][0];
  interface PageConfig {
    isShowDetail: boolean;
    isAddShow: boolean;
    refresh: boolean;
    detailId: number | string;
    options: any;
  }

  const searchForm = ref<SvcWebMemberCardCancelListGetRequest>({});
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
      menuOtherOptions: {
        scroll: {
          x: '110%'
        }
      },
      columns: [
        {
          prop: 'projectName',
          label: '项目',
          ellipsis: true,
          tooltip: true,
          width: 120
        },

        {
          prop: 'orderNo',
          label: '单号',
          search: true,
          ellipsis: true,
          tooltip: true,
          width: 180
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
          }
        },
        {
          prop: 'cardName',
          label: '卡名',
          ellipsis: true,
          tooltip: true,
          width: 120
        },
        {
          prop: 'memberCardCode',
          label: '卡号',
          search: true,
          options: {
            maxLength: 50
          },
          ellipsis: true,
          tooltip: true,
          width: 160
        },
        {
          prop: 'memberCode',
          label: '持卡人编号',
          ellipsis: true,
          tooltip: true,
          width: 140
        },
        {
          prop: 'memberName',
          label: '持卡人姓名',
          ellipsis: true,
          tooltip: true,
          width: 120
        },
        {
          prop: 'memberPhone',
          label: '持卡人电话',
          ellipsis: true,
          tooltip: true,
          width: 130
        },
        {
          prop: 'balance',
          label: '卡内余额（¥）',
          formatter: (record: TableData) => {
            return formatPrice(record.balance || 0);
          },
          ellipsis: true,
          tooltip: true,
          width: 130
        },
        {
          prop: 'refundableAmount',
          label: '可退金额（¥）',
          formatter: (record: TableData) => {
            return formatPrice(record.refundableAmount || 0);
          },
          width: 130
        },
        {
          prop: 'actuallyAmount',
          label: '实退金额',
          formatter: (record: TableData) => {
            return formatPrice(record.actuallyAmount || 0);
          },
          ellipsis: true,
          tooltip: true,
          width: 120
        },
        {
          prop: 'createBy',
          label: '退卡人',
          search: true,
          options: {
            maxLength: 50
          },
          ellipsis: true,
          tooltip: true,
          width: 100
        },
        {
          prop: 'createTime',
          label: '退卡时间',
          ellipsis: true,
          tooltip: true,
          width: 170
        },

        {
          label: '时间',
          prop: 'time',
          search: true,
          hide: true,
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
