<template>
  <div>
    <i-table
      v-model="searchForm"
      v-model:refresh-now="page.refresh"
      :options="page.options"
      :api="svcWebMemberCardConsumerListGet"
      @reset="onReset"
    >
      <!-- 线上展示插槽 -->
      <template #typeCell="{ record }">
        {{
          record.type === 1
            ? '购卡'
            : record.type === 2
            ? '充值'
            : record.type === 3
            ? '消费'
            : record.type === 4
            ? '退款'
            : '退卡'
        }}
      </template>

      <template #orderNoCell="{ record }">
        {{ record.orderNo }}
      </template>
      <!-- 状态展示插槽 -->
      <template #statusCell="{ record }">
        {{
          record.status === 1
            ? '充值中'
            : record.status === 2
            ? '充值成功'
            : record.status === 2
            ? '充值失败'
            : '交易关闭'
        }}
      </template>
    </i-table>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, reactive } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import {
    SvcWebMemberCardConsumerListGetRequest,
    svcWebMemberCardConsumerListGet,
    SvcWebMemberCardConsumerListGetResponse,
    svcWebCommonCardSelectListGet,
    SvcWebCommonCardSelectListGetResponse
  } from '@/api/svc-web';
  import { formatPrice } from '@/utils';
  import useFuncProxy from '@/hooks/useFuncProxy';
  type TableData = Required<SvcWebMemberCardConsumerListGetResponse>['rows'][0];
  interface PageConfig {
    isShowDetail: boolean;
    isAddShow: boolean;
    refresh: boolean;
    options: any;
  }
  const searchForm = ref<SvcWebMemberCardConsumerListGetRequest>({});
  const cardList = ref<SvcWebCommonCardSelectListGetResponse>([]);
  const page = reactive<PageConfig>({
    isShowDetail: false,
    isAddShow: false,
    refresh: false,
    options: {
      indexTitle: '序号',
      index: true,
      submitText: '搜索',
      tableCard: true,
      menu: false,
      columns: [
        {
          prop: 'projectName',
          label: '项目',
          ellipsis: true,
          tooltip: true
        },
        {
          prop: 'type',
          label: '类型',
          ellipsis: true,
          tooltip: true,
          width: 80
        },
        {
          label: '类型',
          prop: 'type',
          type: 'select',
          search: true,
          hide: true,
          dic: [
            {
              label: '购卡',
              value: 1
            },
            {
              label: '充值',
              value: 2
            },
            {
              label: '消费',
              value: 3
            },
            {
              label: '退款',
              value: 4
            },
            {
              label: '退卡',
              value: 5
            }
          ]
        },
        {
          prop: 'serialNo',
          label: '单号',
          ellipsis: true,
          tooltip: true,
          width: 120
        },
        {
          prop: 'orderNo',
          label: '单号',
          search: true,
          hide: true,
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
            allowSearch: true
          }
        },
        {
          prop: 'memberCardCode',
          label: '卡号',
          search: true,
          options: {
            maxLength: 50
          },
          ellipsis: true,
          tooltip: true
        },
        {
          prop: 'storeCode',
          label: '店铺编号',
          ellipsis: true,
          tooltip: true
        },
        {
          prop: 'storeName',
          label: '店铺名称',
          ellipsis: true,
          tooltip: true
        },
        {
          prop: 'status',
          label: '店铺信息',
          search: true,

          hide: true,
          options: {
            placeholder: '请输入店铺名称/编号搜索',
            maxLength: 50
          }
        },
        {
          prop: 'createBy',
          label: '收银员/操作人',
          ellipsis: true,
          tooltip: true
        },
        {
          prop: 'changeBalance',
          label: '发生金额（¥）',
          formatter: (record: TableData) => {
            return formatPrice(record.changeBalance || 0);
          }
        },
        {
          prop: 'balance',
          label: '卡内余额（¥）',
          formatter: (record: TableData) => {
            return formatPrice(record.balance || 0);
          }
        },
        {
          label: '发生时间',
          prop: 'createTime',
          ellipsis: true,
          tooltip: true,
          width: 180
        },
        {
          label: '时间',
          prop: 'date',
          search: true,
          hide: true,
          type: 'dateRange',
          on: {
            change: (v: string[]) => {
              searchForm.value = {
                ...searchForm.value,
                startDate: v[0] || '',
                endDate: v[1] || ''
              };
              console.log(searchForm.value);
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

  onMounted(() => {
    geCardSelect();
  });
</script>
<style scoped></style>
