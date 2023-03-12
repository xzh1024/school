<template>
  <div>
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      :options="page.options"
      :api="cbdApiProjectBondListGet"
    >
      <template #statusCell="{ record }">
        {{ billStatusHash[record.status] }}
      </template>
      <template #menu="{ record }">
        <a-button
          v-permission="['bond:detail']"
          type="text"
          @click="onViewDetail(record)"
          >查看</a-button
        >
      </template>
    </i-table>
    <detail
      v-if="page.detailVisible"
      :id="page.bondId"
      v-model="page.detailVisible"
      @refresh="page.refresh = true"
    ></detail>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Detail from './__components__/detail.vue';
  import {
    cbdApiProjectBondListGet,
    type CbdApiProjectBondListGetResponse
  } from '@/api';
  import { billStatusList, billStatusHash } from '@/utils/dic';
  import useGetCompanyData from '@/hooks/useGetCompanyData';
  type RowData = Required<CbdApiProjectBondListGetResponse>['rows'][0];
  const [contractPartA] = useGetCompanyData();
  const page = reactive<{
    search: Record<string, string | number>;
    refresh: boolean;
    detailVisible: boolean;
    bondId: number | undefined;
    options: any;
  }>({
    search: {},
    refresh: false,
    bondId: undefined,
    detailVisible: false,
    options: {
      index: true,
      indexTitle: '序号',
      autoLabelWidth: true,
      align: 'center',
      submitText: '搜索',
      // menuSpan: 24,
      menuOptions: {
        width: 90
      },
      columns: [
        {
          label: '基本资料',
          prop: 'searchKey',
          search: true,
          hide: true,
          placeholder: '请输入合同编号 / 商户 / 企业名称 / 承租人搜索'
        },
        {
          label: '合同甲方',
          prop: 'companyId',
          type: 'treeSelect',
          ellipsis: true,
          search: true,
          hide: true,
          tooltip: true,
          props: {
            key: 'value',
            title: 'label',
            children: 'children'
          },
          dic: contractPartA.value
        },
        {
          label: '合同编号',
          prop: 'contractCode'
        },
        // {
        //   label: '账单号',
        //   prop: 'code',
        //   search: true
        // },
        {
          label: '商户 / 企业名称',
          prop: 'merchantName'
        },
        {
          label: '保证金（¥）',
          prop: 'bond'
        },
        {
          label: '状态',
          prop: 'status',
          type: 'select',
          search: true,
          dic: billStatusList
        },
        {
          label: '缴费截止日',
          prop: 'billingDate',
          formatter: (e: RowData) => e.billingDate || '--'
        },
        {
          label: '欠费时长',
          prop: 'arrearsTime',
          formatter: (record: RowData) => record.arrearsTime || '--'
        }
      ]
    }
  });
  function onViewDetail(data: RowData) {
    page.detailVisible = true;
    page.bondId = data.id;
  }
</script>
<style scoped lang="less"></style>
