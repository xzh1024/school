<template>
  <div>
    <div v-if="loading">
      <a-skeleton>
        <a-space direction="vertical" :style="{ width: '100%' }" size="large">
          <a-skeleton-line :rows="15" />
        </a-space>
      </a-skeleton>
    </div>
    <div v-else>
      <a-divider orientation="left">账单基本信息</a-divider>
      <div v-if="billBasic.data.collectRentWay !== 3">
        <a-descriptions
          :data="billBasic.data"
          layout="inline-horizontal"
          :value-style="listItemStyle"
        >
          <descriptions-item
            v-for="(item, idx) in billBasicItems"
            :key="idx"
            :label="item.label + '：'"
          >
            {{ useFormatDescription(billBasic.data, item) }}
          </descriptions-item>
        </a-descriptions>
        <a-descriptions
          :data="billBasic.data"
          style="margin-top: 15px"
          :label-style="{ fontWeight: 'bold' }"
          :value-style="{ color: 'red', fontWeight: 'bold' }"
        >
          <descriptions-item
            v-for="(item, idx) in billBasicAmountItems"
            :key="idx"
            :label="item.label"
            >{{ billBasic.data[item.prop] ?? '--' }}</descriptions-item
          >
        </a-descriptions>
        <!--      <a-divider orientation="left">差价账单</a-divider>-->
        <i-table
          v-model="billBasic.followSearch"
          :options="billBasic.amountTable"
          :api="cbdApiProjectAccountReceivableReceiptPageGet"
        >
          <template #payTypeCell="{ record }">
            {{ paymentMethodHash[record.payType] || '--' }}
          </template>
          <template #statusCell="{ record }">
            {{ billAuditStatusHash[record.status] || '--' }}
          </template>
          <template #menu="{ record }">
            <a-button type="text" @click="showBillCount(record)"
              >查看收款单</a-button
            >
          </template>
        </i-table>
      </div>
      <a-descriptions v-else>
        <a-descriptions-item label="收款类型">{{
          billBasic.data.typeName
        }}</a-descriptions-item>
        <a-descriptions-item label="收租方式">
          {{ collectRentsWayHash[billBasic.data.collectRentWay] || '--' }}
        </a-descriptions-item>
        <a-descriptions-item label="收款总金额（¥）">{{
          billBasic.data.actualAmount
        }}</a-descriptions-item>
        <a-descriptions-item label="抽佣总金额（¥）">{{
          billBasic.data.amountReceived
        }}</a-descriptions-item>
      </a-descriptions>
      <div
        v-if="
          ![-1, 0].includes(billBasic.data.typeId) &&
          billBasic.data.collectRentWay !== 1
        "
      >
        <a-divider orientation="left">抽佣收款单</a-divider>
        <i-table
          v-model="billBasic.commissionSearch"
          :options="billBasic.commission"
          :api="cbdApiProjectAccountReceivableReceiptPageGet"
        >
          <template #statusCell="{ record }">
            {{ billAuditStatusHash[record.status] || '--' }}
          </template>
        </i-table>
      </div>
      <template v-if="billBasic.data.typeId !== -1">
        <a-divider orientation="left">合同基本信息</a-divider>
        <a-descriptions
          :data="contract.data"
          layout="inline-horizontal"
          :value-style="listItemStyle"
        >
          <descriptions-item
            v-for="(item, idx) in contractBasicItems"
            :key="idx"
            :label="item.label + '：'"
          >
            {{ useFormatDescription(contract.data, item) }}
          </descriptions-item>
        </a-descriptions>
      </template>
      <a-divider orientation="left">资产基本信息</a-divider>
      <a-descriptions
        v-for="(each, i) in welfareBasic.data"
        :key="i"
        :data="each"
        style="margin-bottom: 15px"
        :value-style="listItemStyle"
        layout="inline-horizontal"
      >
        <descriptions-item
          v-for="(item, idx) in welfareBasicItems"
          :key="idx"
          :label="item.label + '：'"
        >
          {{ useFormatDescription(each, item) }}
        </descriptions-item>
      </a-descriptions>
      <drawer v-model="billCount.showModal" title="查看收款单" :footer="false">
        <receipt-info :id="billCount.showBillId" />
      </drawer>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { formatTime } from '@/utils';
  import { reactive, watch } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import useFormatDescription from '@/hooks/useFormatDescription';
  import Drawer from '@/components/drawer/drawer.vue';
  import {
    cbdApiProjectAccountReceivableInfoIdGet,
    cbdApiProjectAccountReceivableReceiptPageGet,
    type CbdApiProjectAccountReceivableReceiptPageGetResponse
  } from '@/api';
  import {
    billAuditStatusHash,
    billStatusHash,
    contractStatusHash,
    ListDataType,
    paymentMethodHash,
    listItemStyle,
    collectRentsWayHash
  } from '@/utils/dic';
  import ReceiptInfo from '../receipt/receipt-info.vue';

  type TableItem =
    Required<CbdApiProjectAccountReceivableReceiptPageGetResponse>['rows'][0];
  const props = defineProps({
    billId: {
      type: String,
      default: ''
    },
    refresh: {
      type: Boolean,
      default: true
    }
  });
  const emits = defineEmits(['hide', 'show']);
  const billBasicItems: Array<ListDataType> = [
    {
      label: '收款类型',
      prop: 'typeName'
    },
    {
      label: '收租方式',
      prop: 'collectRentWay',
      isEnum: true,
      source: collectRentsWayHash
    },
    {
      label: '状态',
      prop: 'status',
      isEnum: true,
      source: billStatusHash
    },
    {
      label: '期数',
      prop: 'billCycleStr'
    },
    {
      label: '账单号',
      prop: 'code'
    },
    {
      label: '最后还款日',
      prop: 'billLastRepaymentDate'
    },
    {
      label: '优惠前金额（¥）',
      prop: 'totalAmount'
    },
    {
      label: '优惠后金额（¥）',
      prop: 'actualAmount'
    }
  ];
  const billBasicAmountItems: Array<ListDataType> = [
    {
      label: '应收总金额（¥）',
      prop: 'actualAmount'
    },
    {
      label: '已收总金额（¥）',
      prop: 'amountReceived'
    },
    {
      label: '待收总金额（¥）',
      prop: 'lastAmount'
    },
    {
      label: '已收滞纳金（¥）',
      prop: 'receivedDelayingPayment'
    }
  ];
  const billBasic = reactive<any>({
    followSearch: { id: props.billId, isTakeCommission: false },
    commissionSearch: { id: props.billId, isTakeCommission: true },
    data: {
      status: '',
      billLastRepaymentDate: ''
    },
    amountTable: {
      tableCard: false,
      menuOptions: {},
      columns: [
        {
          label: '支付方式',
          prop: 'payType'
        },
        {
          label: '流水号',
          prop: 'followCode'
        },
        {
          label: '类型',
          prop: 'amountTypeDesc'
        },
        {
          label: '收款金额（¥）',
          prop: 'amountReceived'
        },
        {
          label: '收款时间',
          prop: 'collectionDate',
          formatter: (record: TableItem) => record.collectionDate || '--'
        },
        {
          label: '状态',
          prop: 'status'
        }
      ],
      data: []
    },
    commission: {
      tableCard: false,
      menu: false,
      columns: [
        {
          label: '流水号',
          prop: 'followCode'
        },
        {
          label: '收款单号',
          prop: 'code'
        },
        {
          label: '抽佣金额（¥）',
          prop: 'amountReceived'
        },
        {
          label: '收款时间',
          prop: 'collectionDate',
          formatter: (record: TableItem) => record.collectionDate || '--'
        },
        {
          label: '状态',
          prop: 'status'
        }
      ],
      data: []
    }
  });
  const welfareBasicItems: Array<ListDataType> = [
    {
      label: '房源门牌号',
      prop: 'doorPlate'
    },
    {
      label: '项目名称',
      prop: 'projectName'
    },
    {
      label: ' 归属楼宇',
      prop: 'buildingName'
    },
    {
      label: '房源面积',
      prop: 'acreage',
      hasUnit: true,
      unit: '㎡'
    },
    {
      label: '房源类型',
      prop: 'categoryName'
    },
    {
      label: '房源编号',
      prop: 'code'
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
    }
  ];
  const welfareBasic = reactive<any>({
    data: []
  });
  const contractBasicItems: Array<ListDataType> = [
    {
      label: '合同甲方',
      prop: 'ascriptionCompanyName'
    },
    {
      label: '合同编号',
      prop: 'code'
    },
    {
      label: '状态',
      prop: 'status',
      isEnum: true,
      source: contractStatusHash
    },
    {
      label: '方案号',
      prop: 'schemeCode'
    },
    {
      label: '合同开始时间',
      prop: 'periodStart'
    },
    {
      label: '合同结束时间',
      prop: 'periodEnd'
    },
    {
      label: '商户 / 企业名称',
      prop: 'merchantCompanyName'
    },
    {
      label: '承租人 / 负责人姓名',
      prop: 'principal'
    }
  ];
  const contract = reactive<any>({
    data: {}
  });
  const billCount = reactive<any>({
    showBillId: undefined,
    showModal: false,
    data: {}
  });
  const showBillCount = (v: any) => {
    billCount.showModal = !billCount.showModal;
    billCount.showBillId = v.id;
  };
  const [getData, loading] = useFuncProxy(async () => {
    const res = await cbdApiProjectAccountReceivableInfoIdGet({
      id: props.billId
    });
    billBasic.data = res.baseInfo;
    billBasic.data.billLastRepaymentDate = formatTime(
      String(res.baseInfo!.billLastRepaymentDate!),
      'YYYY-MM-DD'
    );
    if (billBasic.data.collectRentWay === 3) {
      emits('hide');
    } else {
      if ([3, 5].includes(billBasic.data.status)) {
        emits('hide');
      } else {
        emits('show');
      }
    }
    welfareBasic.data = res.assetsInfoList;
    contract.data = res.contractInfo;
  });
  watch(
    () => props.billId,
    (v) => {
      if (v) {
        getData();
      }
    },
    { deep: true, immediate: true }
  );
  watch(
    () => props.refresh,
    () => {
      getData();
    },
    { deep: true }
  );
</script>

<style scoped></style>
