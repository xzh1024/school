<template>
  <contract-container />
  <a-card :title="title" style="width: 100%">
    <i-table
      v-model="queryParams"
      :data="tableListData"
      :api="tableListApi"
      :options="options"
      :refresh-now="refresh"
      class="w100"
    >
      <template #statusCell="{ record }">
        <span>{{ filterStatus(record) }}</span>
      </template>
      <template #businessStatusCell="{ record }">
        <span>{{ filterBusinessStatus(record) }}</span>
      </template>
      <template #detailCell="{ record }">
        <a-button type="primary" @click="handleDetail(record)">查看</a-button>
      </template>
      <template #changeTypeCell="{ record }">
        <span>{{
          record.changeType === 1
            ? '合并'
            : record.changeType === 2
            ? '拆分'
            : ''
        }}</span>
      </template>
    </i-table>
  </a-card>
</template>

<script lang="ts" setup>
  import { PropType, ref, watch, computed } from 'vue';
  import { useContractStore } from '@/store/project/contract';
  import { CbdApiProjectEstateContractListGetResponse } from '@/api';
  import ContractContainer from '@/views/new-contract/__components__/contract-container.vue';

  const props = defineProps({
    title: String,
    // 1意向合同 2正式合同
    contractType: Number,
    estateId: Number,
    options: Object,
    tableData: [Function, Array] as PropType<Function | Array<any>>
  });
  const refresh = ref(false);
  const contractStore = useContractStore();
  const queryParams = ref({
    type: undefined as undefined | number,
    estateId: undefined as undefined | number
  });
  const tableListApi = computed(() =>
    typeof props.tableData === 'function' ? props.tableData : undefined
  );
  const tableListData = computed(() =>
    Array.isArray(props.tableData) ? props.tableData : undefined
  );

  watch(
    () => props.estateId,
    (v) => {
      if (v) {
        queryParams.value.estateId = v;
        refresh.value = true;
      }
    },
    { immediate: true }
  );

  watch(
    () => props.contractType,
    (v) => {
      queryParams.value.type = v;
    },
    { immediate: true }
  );

  function filterStatus(record: { status: string }) {
    const statusMap: Recordable = {
      '1': '审核中',
      '2': '已通过',
      '3': '已撤销',
      '4': '已驳回',
      '5': '不通过'
    };
    return statusMap[record.status] ? statusMap[record.status] : '-';
  }
  function filterBusinessStatus(record: {
    businessStatus: string;
    verifyStatus: string;
  }) {
    const businessStatusMap: Recordable = {
      '1': '草稿',
      '2': '待确认',
      '3': '已确认',
      '4': '已转正式合同',
      '5': '已作废',
      '6': '已终止',
      '7': '已清算'
    };
    const verifyStatusMap: Recordable = {
      '1': '未提交',
      '2': '审批中',
      '3': '已驳回',
      '4': '已撤销',
      '5': '已通过'
    };
    const text = [];
    if (businessStatusMap[record.businessStatus]) {
      text.push(businessStatusMap[record.businessStatus]);
    }
    if (verifyStatusMap[record.verifyStatus]) {
      text.push(verifyStatusMap[record.verifyStatus]);
    }
    return text.join('-');
  }

  function handleDetail(
    record: Required<CbdApiProjectEstateContractListGetResponse>['rows'][number]
  ) {
    contractStore.setContractInfo({
      contractType: props.contractType as number,
      handleType: 3,
      contractId: record.id,
      businessStatus: record.businessStatus,
      verifyStatus: record.verifyStatus,
      onlyShowDetail: true
    });
    contractStore.drawerVisibleChange();
  }
</script>
