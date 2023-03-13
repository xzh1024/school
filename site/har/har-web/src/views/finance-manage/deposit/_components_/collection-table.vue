<template>
  <div class="table-box">
    <div class="title">收款记录</div>
    <i-table :data="tableData" :options="options">
      <template #optionalCell="{ record }">
        <a-space>
          <div
            v-permission="['mis:payment:detail']"
            class="s-btn"
            @click="onSee(record)"
            >查看</div
          >
        </a-space>
      </template>
    </i-table>
  </div>
  <collect-detail
    v-if="showCollectDetail"
    :id="recordId"
    v-model="showCollectDetail"
  />
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import CollectDetail from '@/views/finance-manage/collect-pay/__components__/detail.vue';

  const props = defineProps({
    tableData: {
      type: Array,
      default: () => []
    }
  });

  const recordId = ref('');
  const showCollectDetail = ref(false);
  const onSee = (record: any) => {
    console.log(record, '---查看---');
    recordId.value = record.receiptBillId;
    showCollectDetail.value = true;
  };

  const options = reactive({
    menuOtherOptions: {
      scroll: {
        x: '140%'
      }
    },
    menu: false,
    menuSpan: 24,
    pageShow: false,
    tableCard: false,
    index: true,
    indexTitle: '序号',
    columns: [
      {
        label: '收款单号',
        prop: 'receiptNo'
      },
      {
        label: '费用项目',
        prop: 'expenseItemName'
      },
      {
        label: '支付金额',
        prop: 'receivedAmount'
      },
      {
        label: '到账日期',
        prop: 'paymentDay'
      },
      {
        label: '支付方式',
        prop: 'payMethodName'
      },
      {
        label: '操作人',
        prop: 'operationName'
      },
      {
        label: '操作时间',
        prop: 'operationDate'
      },
      {
        label: '操作',
        prop: 'optional',
        width: 100,
        fixed: 'right'
      }
    ]
  });
</script>

<style scoped lang="less">
  .s-btn {
    color: #4c8af7;
    font-size: 14px;
    cursor: pointer;
  }
  .table-box {
    //margin: 0 16px 16px 16px;
    margin-bottom: 16px;
    padding: 16px;
    background: #fff;
    .title {
      margin-bottom: 16px;
      font-size: 16px;
    }
  }
</style>
