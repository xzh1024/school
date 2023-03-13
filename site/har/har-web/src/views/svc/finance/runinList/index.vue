<template>
  <div>
    <i-table
      v-model="search"
      v-model:refresh-now="refresh"
      v-model:page="page"
      :options="options"
      :table-loading="loading"
      :data="data"
      @page-change="pageChange"
      @page-size-change="pageSizeChange"
    >
      <template #menuForm>
        <a-button type="primary" class="btn" @click="searchHandle"
          >查询</a-button
        >
        <a-button type="primary" class="btn" @click="resetSearch"
          >重置</a-button
        >
        <a-button type="primary" class="btn export" @click="onExport"
          >导出</a-button
        >
      </template>
      <template #typeCell="{ record }">
        {{ valueFindLabel(tradeTypeList, record.type) }}
      </template>
    </i-table>
  </div>
</template>

<script setup lang="ts">
  import ITable from '@/components/i-table/index.vue';
  import { ref, computed, reactive, onMounted } from 'vue';
  import { tradeTypeList } from '@/utils/dic';
  import { download, valueFindLabel, formatPrice } from '@/utils';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import useToken from '@/composables/useToken';
  import {
    svcWebTradeHistoryPageGet,
    type SvcWebTradeHistoryPageGetRequest,
    svcWebCommonCardSelectListGet,
    type SvcWebCommonCardSelectListGetResponse,
    svcWebCommonStoreListGet,
    SvcWebCommonStoreListGetResponse
  } from '@/api/svc-web';
  import axios from 'axios';
  interface Params extends SvcWebTradeHistoryPageGetRequest {
    startTime: string;
    endTime: string;
  }
  interface RowData {
    projectId?: number;
    projectName?: string;
    type?: number;
    tradeTime?: string;
    serialNo?: string;
    cardId?: number;
    cardName?: string;
    memberCardCode?: string;
    memberId?: number;
    memberCode?: string;
    memberName?: string;
    memberPhone?: string;
    storeId?: number;
    storeCode?: string;
    storeName?: string;
    createBy?: string;
    discount?: number;
    principal?: number;
    balance?: number;
  }
  interface pageType {
    current: number;
    pageSize: number;
    total: number;
  }
  const search = ref<Params>({
    startTime: '',
    endTime: ''
  });
  const cardList = ref<SvcWebCommonCardSelectListGetResponse>([]);
  const shopList = ref<SvcWebCommonStoreListGetResponse>([]);
  const refresh = ref(false);
  const options = computed<Recordable>(() => {
    return {
      indexTitle: '序号',
      index: true,
      menu: false,
      menuSpan: 24,
      menuOtherOptions: {
        scroll: {
          x: '140%'
        }
      },
      columns: [
        {
          label: '项目',
          prop: 'projectName',
          ellipsis: true,
          width: 120,
          tooltip: true
        },
        {
          label: '交易类型',
          prop: 'type',
          type: 'select',
          search: true,
          width: 80,
          dic: tradeTypeList
        },
        {
          label: '时间',
          prop: 'time',
          search: true,
          hide: true,
          type: 'dateRange',
          options: {
            showTime: true,
            onChange(v: any) {
              const [startTime = '', endTime = ''] = v || [];
              search.value = { ...search.value, startTime, endTime };
            }
          }
        },
        {
          label: '时间',
          prop: 'tradeTime',
          width: 200,
          ellipsis: true,
          tooltip: true
        },
        {
          label: '单号',
          prop: 'serialNo',
          search: true,
          width: 120,
          hide: true
        },
        {
          label: '流水号/单号',
          prop: 'serialNo',
          width: 200,
          ellipsis: true,
          tooltip: true
        },
        {
          label: '卡名',
          width: 120,
          prop: 'cardName'
        },
        {
          label: '卡名',
          prop: 'cardId',
          type: 'select',
          width: 120,
          search: true,
          hide: true,
          options: {
            allowSearch: true,
            // multiple: true,
            searchDelay: 1000,
            filterOption: false,
            placeholder: '请输入关键字进行匹配',
            onSearch: async (v: any) => {
              getCardData(v);
            },
            onBlur() {
              cardList.value = [];
            }
          },
          dic: cardList.value
        },
        {
          label: '卡号',
          prop: 'memberCardCode',
          search: true,
          width: 140,
          ellipsis: true,
          tooltip: true
        },
        {
          label: '会员名称/会员号',
          prop: 'memberName',
          width: 120,
          search: true,
          hide: true
        },
        {
          label: '会员电话',
          prop: 'memberPhone',
          width: 120,
          search: true,
          hide: true
        },
        {
          label: '店铺',
          prop: 'storeId',
          type: 'select',
          hide: true,
          dic: shopList.value,
          options: {
            allowSearch: true,
            // multiple: true,
            filterOption: false,
            searchDelay: 1000,
            placeholder: '请输入店铺名称/编号搜索',
            onSearch: async (v: any) => {
              shopList.value = await svcWebCommonStoreListGet({
                projectId: '',
                storeName: v
              });
            },
            onBlur() {
              shopList.value = [];
            }
          },
          search: true
        },
        {
          label: '持卡人编号',
          prop: 'memberCode',
          width: 180,
          ellipsis: true,
          tooltip: true
        },
        {
          label: '持卡人姓名',
          prop: 'memberName',
          ellipsis: true,
          width: 120,
          tooltip: true
        },
        {
          label: '持卡人电话',
          prop: 'memberPhone',
          width: 120,
          ellipsis: true,
          tooltip: true
        },
        {
          label: '店铺编号',
          prop: 'storeCode',
          width: 120,
          ellipsis: true,
          tooltip: true
        },
        {
          label: '店铺名称',
          prop: 'storeName',
          width: 120,
          ellipsis: true,
          tooltip: true
        },
        {
          label: '收银员/操作人',
          width: 120,
          prop: 'createBy'
        },
        {
          label: '优惠金额（¥）',
          width: 100,
          formatter: (el: RowData) => formatPrice(el.discount!),
          prop: 'discount'
        },
        {
          label: '发生金额（¥）',
          width: 100,
          formatter: (el: RowData) => formatPrice(el.principal!),
          prop: 'principal'
        },
        {
          label: '卡内余额（¥）',
          width: 100,
          formatter: (el: RowData) => formatPrice(el.balance!),
          prop: 'balance'
        }
      ]
    };
  });
  const { getToken } = useToken();
  const onExport = async () => {
    try {
      const d: any = await axios({
        method: 'get',
        url: `/svc-web/trade_history/export`,
        params: {
          ...search.value
        },
        headers: {
          Authorization: getToken()
        },
        responseType: 'blob'
      });
      const blob = new Blob([d.data], { type: 'application/vnd.ms-excel' });
      const url = window.URL.createObjectURL(blob);
      download(url, '流水报表');
    } catch (e) {
      console.error(e);
    }
  };
  const [getCardData] = useFuncProxy(async (v) => {
    cardList.value = await svcWebCommonCardSelectListGet({
      searchKey: v
    });
  });
  const data = ref<RowData[]>([]);
  const page = reactive<pageType>({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const pageChange = (v: number) => {
    page.current = v;
    getTableData();
  };
  const pageSizeChange = (v: number) => {
    page.pageSize = v;
    getTableData();
  };
  const [getTableData, loading] = useFuncProxy(async () => {
    const { pageSize, current } = page;
    const res = await svcWebTradeHistoryPageGet({
      ...search.value,
      pageSize: String(pageSize),
      pageNum: String(current)
    });
    data.value = res?.rows || [];
    page.total = res?.total || 0;
  });
  function searchHandle() {
    page.current = 1;
    getTableData();
  }
  function resetSearch() {
    search.value = {
      startTime: '',
      endTime: ''
    };
    getTableData();
  }
  onMounted(() => {
    getTableData();
  });
</script>

<style lang="less" scoped>
  .btn {
    width: 88px;
    border-radius: 4px;
  }
  .export {
    background-color: #cbe3ff;
    color: #4c8af7;
  }
</style>
