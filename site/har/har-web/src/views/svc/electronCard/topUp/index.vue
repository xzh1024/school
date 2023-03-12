<template>
  <div>
    <i-table
      v-model="searchForm"
      v-model:refresh-now="page.refresh"
      :options="page.options"
      :api="svcWebMemberCardRechargeListGet"
      @reset="onReset"
    >
      <template #header>
        <a-button type="primary" @click="addCard">充值</a-button>
      </template>
      <template #typeCell="{ record }">
        {{ record.type === 1 ? '冻结' : '解冻' }}
      </template>
      <!-- 线上展示插槽 -->
      <template #sourceCell="{ record }">
        {{ record.source === 1 ? '线上' : '线下' }}
      </template>
      <!-- 状态展示插槽 -->
      <template #statusCell="{ record }">
        <span
          :style="
            record.status === 1
              ? 'color:#69AF0F'
              : record.status === 2
              ? ''
              : record.status === 3
              ? 'color:#FA4E40'
              : ''
          "
        >
          {{
            record.status === 1
              ? '充值中'
              : record.status === 2
              ? '充值成功'
              : record.status === 3
              ? '充值失败'
              : '交易关闭'
          }}</span
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
    svcWebMemberCardRechargeListGet,
    SvcWebMemberCardRechargeListGetResponse
  } from '@/api/svc-web';
  import type { SvcWebMemberCardCancelListGetRequest } from '@/api/svc-web';
  import { formatPrice } from '@/utils';
  import useFuncProxy from '@/hooks/useFuncProxy';
  type TableData = Required<SvcWebMemberCardRechargeListGetResponse>['rows'][0];
  interface PageConfig {
    detailId: string | number | undefined;
    isShowDetail: boolean;
    isAddShow: boolean;
    refresh: boolean;
    options: any;
  }

  const searchForm = ref<SvcWebMemberCardCancelListGetRequest>(
    {} as SvcWebMemberCardCancelListGetRequest
  );
  const cardList = ref<SvcWebCommonCardSelectListGetResponse>([]);
  const page = reactive<PageConfig>({
    detailId: '',
    isShowDetail: false,
    isAddShow: false,
    refresh: false,
    options: {
      indexTitle: '序号',
      index: true,
      submitText: '搜索',
      tableCard: true,
      menuSpan: 24,
      menuOtherOptions: {
        scroll: {
          x: '120%'
        }
      },
      columns: [
        {
          prop: 'source',
          label: '来源',
          ellipsis: true,
          tooltip: true,
          width: 80
        },
        {
          prop: 'status',
          label: '状态',
          ellipsis: true,
          tooltip: true,
          width: 100
        },
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
          width: 120
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
          width: 120
        },
        {
          prop: 'cardName',
          label: '卡名',
          width: 120,
          ellipsis: true,
          tooltip: true
        },
        {
          prop: 'memberCardCode',
          label: '卡号',
          width: 160,
          ellipsis: true,
          tooltip: true
        },
        {
          prop: 'memberCardCode',
          label: '卡号',
          search: true,
          hide: true,
          options: {
            maxLength: 50
          },
          width: 120
        },
        {
          prop: 'memberCode',
          label: '持卡人编号',
          ellipsis: true,
          tooltip: true,
          width: 120
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
          prop: 'actuallyAmount',
          label: '实付金额（¥）',
          formatter: (record: TableData) => {
            return formatPrice(record.actuallyAmount || 0);
          },
          width: 130
        },
        {
          prop: 'discountAmount',
          label: '优惠金额（¥）',
          formatter: (record: TableData) => {
            return formatPrice(record.discountAmount || 0);
          },
          width: 130
        },
        {
          prop: 'receivedAmount',
          label: '充值到账金额',
          formatter: (record: TableData) => {
            return formatPrice(record.receivedAmount || 0);
          },
          width: 120
        },
        {
          prop: 'createBy',
          label: '充值人',
          search: true,
          options: {
            maxLength: 50
          },
          width: 100
        },
        {
          prop: 'createTime',
          label: '充值时间',
          ellipsis: true,
          tooltip: true,
          width: 170
        },

        {
          label: '时间',
          prop: 'createTime',
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
  const viewDetail = (data: TableData) => {
    page.detailId = data.id;
    page.isShowDetail = true;
  };

  const onReset = () => {
    // searchForm.value.time = [];
    searchForm.value.startDate = undefined;
    searchForm.value.endDate = undefined;
  };
  const [geCardSelect] = useFuncProxy(async () => {
    cardList.value = await svcWebCommonCardSelectListGet({});
  });
  const addCard = () => {
    page.isAddShow = true;
  };

  onMounted(() => {
    geCardSelect();
  });
</script>
<style scoped></style>
