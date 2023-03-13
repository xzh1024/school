<template>
  <div v-if="loading">
    <a-skeleton>
      <a-space direction="vertical" :style="{ width: '100%' }" size="large">
        <a-skeleton-line :rows="15" />
      </a-space>
    </a-skeleton>
  </div>
  <div v-else>
    <a-descriptions
      layout="inline-horizontal"
      :data="manageData.data"
      :value-style="listItemStyle"
    >
      <descriptions-item
        v-for="(item, idx) in manageBasicItems"
        :key="idx"
        :span="item.span || 1"
        :label="item.label + '：'"
      >
        {{ manageData.data[item.prop] || '--' }}
      </descriptions-item>
    </a-descriptions>
    <a-divider orientation="left">缴费汇总</a-divider>
    <i-table :options="summaryListConfig" :data="manageData.summaryList" />
    <a-divider orientation="left">缴费详情</a-divider>
    <a-descriptions
      :columns="3"
      :label-style="{ fontWeight: 'bold', color: '#333' }"
      :value-style="{ fontWeight: 'bold', color: '#333' }"
    >
      <a-descriptions-item label="保证金总额（¥）:">{{
        manageData.bond.bond ?? '--'
      }}</a-descriptions-item>
      <a-descriptions-item label="当前余额（¥）:">{{
        manageData.bond.currentBond ?? '--'
      }}</a-descriptions-item>
      <a-descriptions-item></a-descriptions-item>
    </a-descriptions>
    <i-table :options="detailsListConfig" :data="manageData.detailsList">
      <template #statusCell="{ record }">
        {{ billStatusHash[record.status] }}
      </template>
      <template #menu="{ record }">
        <a-button type="text" @click="showBill(record)">查看账单</a-button>
      </template>
    </i-table>
    <fund-type
      :config="typesConfig"
      :data-list="manageData.billList"
      :enum-hash="billStatusHash"
      @modal="showBill"
    />
    <drawer v-model="page.showReceiveModal" title="查看账单" :footer="false">
      <bill-detail :bill-id="page.billId"></bill-detail>
    </drawer>
  </div>
</template>

<script setup lang="ts">
  import { reactive, inject } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { DescriptionsItem } from '@arco-design/web-vue';
  import {
    cbdApiProjectLeaseRecordOperationGet,
    type CbdApiProjectLeaseRecordOperationGetRequest,
    type CbdApiProjectLeaseRecordOperationGetResponse
  } from '@/api';
  import { billStatusHash, ListDataType, listItemStyle } from '@/utils/dic';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import Drawer from '@/components/drawer/drawer.vue';
  import BillDetail from '@/views/revenue-expenditure/__components__/bill/detail.vue';
  import NP from 'number-precision';
  import FundType from '../common/fund-type.vue';
  import { type TableOptions } from '@/components/i-table/index';

  type SummaryItem =
    Required<CbdApiProjectLeaseRecordOperationGetResponse>['summaryList'][0];
  type DetailItem =
    Required<CbdApiProjectLeaseRecordOperationGetResponse>['detailsList'][0];
  const manageBasicItems: Array<ListDataType> = [
    {
      label: '商户 / 企业名称',
      prop: 'merchantName'
    },
    {
      label: '承租人 / 负责人姓名',
      span: 2,
      prop: 'principal'
    },
    {
      label: '地址',
      prop: 'address',
      span: 3
    },
    {
      label: '出租类型',
      prop: 'leasePurposeName'
    },
    {
      label: '经营业态',
      prop: 'manageName'
    },
    {
      label: '费用类型',
      prop: 'costType'
    }
  ];
  const summaryListConfig = reactive<TableOptions>({
    tableCard: false,
    menu: false,
    pageShow: false,
    menuOtherOptions: {
      summaryText: '合计',
      summary({ data = [] }) {
        const countData = {
          fundType: '合计',
          contractAmount: 0,
          paidInAmount: 0,
          totalArrears: 0,
          arrearsDuration: '--'
        };
        data.forEach((record: any) => {
          countData.contractAmount = NP.plus(
            countData.contractAmount,
            record.contractAmount
          );
          countData.paidInAmount = NP.plus(
            countData.paidInAmount,
            record.paidInAmount
          );
          countData.totalArrears = NP.plus(
            countData.totalArrears,
            record.totalArrears
          );
        });
        return [countData];
      }
    },
    columns: [
      {
        label: '资金类型',
        prop: 'fundType'
      },
      {
        label: '合同金额（¥）',
        prop: 'contractAmount'
      },
      {
        label: '实缴金额（¥）',
        prop: 'paidInAmount',
        formatter: (record: SummaryItem) => record.paidInAmount ?? '--'
      },
      // {
      //   label: '滞纳金（¥）',
      //   prop: ''
      // },
      {
        label: '总欠费（¥）',
        prop: 'totalArrears',
        formatter: (record: SummaryItem) => record.totalArrears || '--'
      },
      {
        label: '欠费时长（天）',
        prop: 'arrearsDuration',
        formatter: (record: SummaryItem) => record.arrearsDuration || '--'
      }
    ]
  });
  const detailsListConfig = reactive<TableOptions>({
    tableCard: false,
    pageShow: false,
    columns: [
      {
        label: '保证金（¥）',
        prop: 'bond',
        formatter: (record: DetailItem) => record.bond ?? '--'
      },
      {
        label: '状态',
        prop: 'status'
      },
      {
        label: '应缴日期',
        prop: 'payableDate'
      },
      {
        label: '实缴日期',
        prop: 'paidInDate',
        formatter: (record: DetailItem) => record.paidInDate || '--'
      }
    ]
  });
  const manageData = reactive<any>({
    data: {
      address: ''
    },
    summaryList: [],
    detailsList: [],
    billList: [],
    bond: {
      bond: '',
      currentBond: ''
    }
  });
  const typesConfig: TableOptions = {
    tableCard: false,
    pageShow: false,
    menuOtherOptions: {
      summaryText: '合计',
      summary({ data = [] }) {
        const countData = {
          billCycle: '合计',
          actualAmount: 0,
          status: '--',
          billLastRepaymentDate: '--',
          paymentTime: '--'
        };
        data.forEach((record: any) => {
          countData.actualAmount = NP.plus(
            countData.actualAmount,
            record.actualAmount
          );
        });
        return [countData];
      }
    },
    columns: [
      {
        label: '期数',
        prop: 'billCycle'
      },
      {
        label: '应收金额（¥）',
        prop: 'actualAmount'
      },
      {
        label: '状态',
        prop: 'status'
      },
      {
        label: '应缴日期',
        prop: 'billLastRepaymentDate',
        formatter: (item: any) => item.billLastRepaymentDate || '--'
      },
      {
        label: '实缴日期',
        prop: 'paymentTime',
        formatter: (item: any) => item.paymentTime || '--'
      }
    ]
  };
  const page = reactive<{
    billId: string;
    showReceiveModal: boolean;
  }>({
    billId: '', // 当前点击收款按钮时的该条数据id
    showReceiveModal: false
  });

  const showBill = (v: any) => {
    page.billId = v.id;
    page.showReceiveModal = !page.showReceiveModal;
  };
  const houseId = inject<any>('houseId');
  const contractId = inject<any>('contractId');
  function handleFullAddress(add: any) {
    return `${add.provinceName || ''}${add.cityName || ''}${
      add.districtName || ''
    }${add.address}`;
  }
  const [getInfo, loading] = useFuncProxy(async () => {
    const res = await cbdApiProjectLeaseRecordOperationGet({
      id: houseId.value,
      contractId: contractId.value
    } as CbdApiProjectLeaseRecordOperationGetRequest);
    const { info, summaryList, detailsList, billList, bond } = res;
    manageData.data = info;
    manageData.data.address = handleFullAddress(info);
    manageData.summaryList = summaryList;
    manageData.detailsList = detailsList;
    manageData.billList = billList;
    manageData.bond = bond;
  });
  getInfo();
</script>

<style scoped></style>
