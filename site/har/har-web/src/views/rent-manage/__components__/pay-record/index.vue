<template>
  <div>
    <a-empty v-if="!data.bondList.length && !data.billList.length" />
    <template v-else>
      <fund-type
        :config="page.bondConfig"
        :data-list="data.bondList"
        data-key="billList"
        btn-txt="查看收款单"
        @modal="showBill('bond', $event)"
      />
      <fund-type
        :config="page.typeListConfig"
        :data-list="data.billList"
        btn-txt="查看收款单"
        @modal="showBill('type', $event)"
      />
      <drawer
        v-model="page.showReceiveModal"
        :footer="false"
        title="查看收款单"
      >
        <receipt-detail :bill-id="Number(page.billId)" />
      </drawer>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { reactive, inject } from 'vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectLeaseRecordRecordGet,
    CbdApiProjectLeaseRecordRecordGetResponse
  } from '@/api';
  import Drawer from '@/components/drawer/drawer.vue';
  import ReceiptDetail from '@/views/revenue-expenditure/__components__/receipt/detail.vue';
  import FundType from '../common/fund-type.vue';

  const page = reactive({
    billId: '',
    showReceiveModal: false,
    bondConfig: {
      tableCard: false,
      pageShow: false,
      columns: [
        {
          label: '收款单号',
          prop: 'code'
        },
        // {
        //   label: '应收金额（¥）',
        //   prop: 'actualAmount'
        // },
        {
          label: '实收金额（¥）',
          prop: 'amountReceived'
        },
        {
          label: '应缴费日期',
          prop: 'billLastRepaymentDate'
        },
        {
          label: '实缴费日期',
          prop: 'paymentTime'
        }
      ]
    },
    typeListConfig: {
      tableCard: false,
      pageShow: false,
      columns: [
        {
          label: '账单号',
          prop: 'code'
        },
        {
          label: '期数',
          prop: 'billCycle'
        },
        // {
        //   label: '应收金额（¥）',
        //   prop: 'actualAmount'
        // },
        {
          label: '实收金额（¥）',
          prop: 'amountReceived'
        },
        {
          label: '应缴费日期',
          prop: 'billLastRepaymentDate'
        },
        {
          label: '实缴费日期',
          prop: 'paymentTime'
        }
      ]
    },
    modalInfo: {}
  });
  const data = reactive<Required<CbdApiProjectLeaseRecordRecordGetResponse>>({
    bondList: [],
    billList: []
  });
  const showBill = (type: string, a: any) => {
    page.showReceiveModal = !page.showReceiveModal;
    page.billId = a.id;
  };
  const [getRecord] = useFuncProxy(async () => {
    const houseId = inject<any>('houseId');
    const contractId = inject<any>('contractId');
    const { bondList = [], billList = [] } =
      await cbdApiProjectLeaseRecordRecordGet({
        id: houseId.value,
        contractId: contractId.value
      });
    data.bondList = bondList;
    data.billList = billList;
  });
  getRecord();
</script>
