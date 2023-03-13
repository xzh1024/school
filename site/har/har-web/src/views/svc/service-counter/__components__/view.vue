<template>
  <div class="i-view">
    <!--        <a-tabs v-model:active-key="activeKey" class="i-view-tabs">-->
    <!--          <a-tab-pane :key="1" title="冻结/解冻"></a-tab-pane>-->
    <!--          <a-tab-pane :key="2" title="充值"></a-tab-pane>-->
    <!--          <a-tab-pane :key="3" title="退卡"></a-tab-pane>-->
    <!--          <a-tab-pane :key="4" title="消费明细"></a-tab-pane>-->
    <!--        </a-tabs>-->
    <i-tabs v-model="activeKey" class="i-view-tabs" :options="options" />
    <div class="padding-sm">
      <basic-info :info="info" :active-key="activeKey"> </basic-info>
    </div>
    <freeze-list v-if="activeKey === 1" :id="id" />
    <top-up v-else-if="activeKey === 2" :id="id" />
    <refund-card-list v-else-if="activeKey === 3" :id="id" />
    <expense-record v-else :id="id" />
  </div>
</template>
<script setup lang="ts">
  import { ref, onMounted, reactive } from 'vue';
  import ITabs from '@/components/i-tabs/index.vue';
  import BasicInfo from './basic-info.vue';
  import FreezeList from './freezeList.vue';
  import TopUp from './topUpList.vue';
  import RefundCardList from './refundCardList.vue';
  import ExpenseRecord from './expenseRecord.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    svcWebServiceCounterInfoMemberCardIdGet,
    SvcWebServiceCounterInfoMemberCardIdGetResponse
  } from '@/api/svc-web';

  const props = defineProps({
    id: {
      type: [String, Number],
      required: true
    }
  });

  onMounted(() => {
    getInfo();
  });

  const options = reactive([
    {
      label: '冻结/解冻',
      value: 1
    },
    {
      label: '充值',
      value: 2
    },
    {
      label: '退卡',
      value: 3
    },
    {
      label: '消费明细',
      value: 4
    }
  ]);

  const info = ref<SvcWebServiceCounterInfoMemberCardIdGetResponse>({});

  const [getInfo] = useFuncProxy(async () => {
    info.value = await svcWebServiceCounterInfoMemberCardIdGet({
      memberCardId: props.id + ''
    });
  });

  const activeKey = ref(1);
</script>
<style lang="less" scoped>
  .padding-sm {
    padding: 16px;
    background-color: #fff;
  }
  .i-view {
    width: 100%;
    padding-top: 48px;
    .i-view-tabs {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 10;
      background-color: #fff;
      :deep(.arco-tabs-content) {
        display: none;
      }
    }
  }
  .i-view-div {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
