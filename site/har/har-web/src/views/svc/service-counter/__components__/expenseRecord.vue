<template>
  <div class="margin-top-xl">
    <i-table
      :options="options"
      :data="list"
      :table-loading="loading"
      :page="page"
      @page-change="getList"
      @page-size-change="getList"
    ></i-table>
  </div>
</template>
<script setup lang="ts">
  import { computed, onMounted, reactive, ref } from 'vue';
  import {
    svcWebServiceCounterConsumeHistoryMemberCardIdGet,
    SvcWebServiceCounterConsumeHistoryMemberCardIdGetResponse
  } from '@/api/svc-web';
  import { formatPrice } from '@/utils';
  import { tradeTypeList } from '@/utils/dic';
  import { useRequest } from '@har/use';

  const props = defineProps({
    id: {
      type: [String, Number]
    }
  });
  interface pageType {
    total: number;
    pageSize: number;
    current: number;
  }
  const page = reactive<pageType>({ total: 0, pageSize: 10, current: 1 });
  onMounted(() => {
    getList();
  });

  function getList() {
    const { pageSize, current } = page;
    run({
      memberCardId: props.id + '',
      pageSize: pageSize + '',
      pageNum: current + ''
    });
  }
  const list = ref<
    SvcWebServiceCounterConsumeHistoryMemberCardIdGetResponse['rows']
  >([]);
  const { run, loading } = useRequest(
    svcWebServiceCounterConsumeHistoryMemberCardIdGet,
    {
      manual: true,
      onSuccess(res) {
        const { rows = [], total = 0 } = res;
        list.value = rows;
        page.total = total;
      }
    }
  );
  interface listItemType {
    type?: number;
    time?: string;
    code?: string;
    storeCode?: string;
    storeName?: string;
    operator?: string;
    operationAmount?: number;
    balance?: number;
  }
  const options = computed(() => {
    return {
      index: true,
      indexTitle: '序号',
      menu: false,
      pageShow: !!page.total,
      columns: [
        {
          prop: 'type',
          label: '类型',
          width: 60,
          formatter: (record: listItemType) => {
            return tradeTypeList.find((i) => i.value === record.type)?.label;
          }
        },
        {
          prop: 'time',
          label: '时间',
          width: 170
        },
        {
          prop: 'serialNo',
          label: '流水号/单号',
          ellipsis: true,
          tooltip: true,
          width: 180
        },
        {
          prop: 'storeCode',
          label: '店铺编号',
          ellipsis: true,
          tooltip: true,
          width: 220
        },
        {
          prop: 'storeName',
          label: '店铺名称',
          ellipsis: true,
          tooltip: true,
          width: 150
        },
        {
          prop: 'operator',
          label: '收银员/操作员',
          ellipsis: true,
          tooltip: true,
          width: 140
        },
        {
          prop: 'operationAmount',
          label: '发生金额(￥)',
          width: 120,
          formatter: (record: listItemType) => {
            return formatPrice(record.operationAmount || 0);
          }
        },
        {
          prop: 'balance',
          label: '卡内余额(¥)',
          width: 120,
          formatter: (record: listItemType) => {
            return formatPrice(record.balance || 0);
          }
        }
      ]
    };
  });
</script>
