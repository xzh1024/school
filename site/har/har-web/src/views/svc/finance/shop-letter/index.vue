<template>
  <div>
    <i-table
      v-model="search"
      :options="options"
      :api="svcWebStoreStatementPageGet"
    >
      <template #menu="{ record }">
        <a-button type="text" @click="onViewDetail(record)">查看</a-button>
      </template>
    </i-table>
    <detail v-model="page.showDetail" :query="query" :detail="detailData" />
  </div>
</template>

<script setup lang="ts">
  import ITable from '@/components/i-table/index.vue';
  import Detail from './__components__/detail.vue';
  import type { DetailType } from './DetailType';
  import { formatPrice } from '@/utils';
  import { onMounted, computed, ref, reactive } from 'vue';
  import { svcProjectDropList, getSvcProjectDrop } from '@/utils/svcCommon';
  import {
    type SvcWebStoreStatementInfoGetRequest,
    type SvcWebStoreStatementPageGetResponse,
    svcWebStoreStatementPageGet,
    svcWebCommonStoreListGet,
    SvcWebCommonStoreListGetResponse
  } from '@/api/svc-web';

  type RowData = Required<SvcWebStoreStatementPageGetResponse>['rows'][0];
  const search = ref<{
    startTime: string;
    endTime: string;
    billNo: string;
    projectId?: number;
  }>({
    startTime: '',
    billNo: '',
    endTime: ''
  });
  const shopList = ref<SvcWebCommonStoreListGetResponse>([]);
  const query = ref<SvcWebStoreStatementInfoGetRequest>({});
  const detailData = ref<DetailType>({});
  const options = computed(() => {
    return {
      indexTitle: '序号',
      index: true,
      menuSpan: 24,
      columns: [
        {
          label: '项目',
          prop: 'projectId',
          search: true,
          hide: true,
          type: 'select',
          dic: svcProjectDropList,
          options: {
            allowSearch: true,
            onChange(v: any) {
              search.value.projectId = v as unknown as number;
              shopList.value = [];
            }
          }
        },
        {
          label: '项目',
          prop: 'projectName',
          width: 150,
          ellipsis: true,
          tooltip: true
        },
        {
          label: '时间',
          prop: 'billDate',
          width: 250,
          search: true,
          type: 'date',
          options: {
            // onChange(v: any) {
            //   const [startTime = '', endTime = ''] = v;
            //   search.value = { ...search.value, startTime, endTime };
            // },
            format: 'YYYY-MM-DD'
          },
          ellipsis: true,
          tooltip: true
        },
        {
          label: '店铺',
          prop: 'storeId',
          type: 'select',
          hide: true,
          search: true,
          dic: shopList.value,
          options: {
            allowSearch: true,
            // multiple: true,
            filterOption: false,
            searchDelay: 1000,
            placeholder: '请输入关键字进行匹配',
            onSearch: async (v: string) => {
              shopList.value = await svcWebCommonStoreListGet({
                projectId: String(search.value.projectId || ''),
                storeName: v
              });
            },
            onBlur() {
              shopList.value = [];
            }
          }
        },
        {
          label: '日结单号',
          prop: 'billNo',
          options: {
            hideButton: true,
            maxLength: 50,
            onInput(e: string) {
              search.value.billNo = e.replace(new RegExp(/\D/, 'g'), '');
            }
          },
          search: true,
          ellipsis: true,
          tooltip: true
        },
        {
          label: '店铺编号',
          prop: 'storeCode',
          ellipsis: true,
          tooltip: true
        },
        {
          label: '店铺名称',
          prop: 'storeName',
          ellipsis: true,
          tooltip: true
        },
        {
          label: '电子卡刷卡金额（¥）',
          prop: 'amount',
          formatter: (el: RowData) => formatPrice(el.amount!)
        }
      ]
    };
  });
  const page = reactive<{
    id?: number;
    showDetail: boolean;
  }>({
    id: undefined,
    showDetail: false
  });
  const onViewDetail = (record: RowData) => {
    const { projectId, storeId, billDate } = record;
    query.value = {
      projectId: String(projectId),
      storeId: String(storeId),
      billDate
    };
    detailData.value = { ...record };
    page.showDetail = true;
  };
  onMounted(() => {
    getSvcProjectDrop();
  });
</script>

<style lang="less" scoped></style>
