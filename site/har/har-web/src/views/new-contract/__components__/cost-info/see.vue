<template>
  <div class="container-box">
    <div v-for="(item, index) in costInfoTable" :key="index" class="table-box">
      <div class="table-title flex align-center justify-between">
        <div class="flex align-center">
          <div class="margin-right-24">{{ item.expenseType }}</div>
          <div class="margin-right-24">{{ item.chargingMethodDesc }}</div>
          <div class="margin-right-24">{{ item.hasTaxDesc }}</div>
          <div v-if="item.chargingMethod === 1" class="margin-right-24">{{
            item.hasIncreaseDesc
          }}</div>
          <div class="margin-right-24">{{ item.hasFreeDesc }}</div>
        </div>
        <a-button type="text" @click="previewHandle(item)">预览</a-button>
      </div>
      <div class="table-content">
        <div
          v-for="(sub, i) in item.paySchemeStages"
          :key="`p_${i}`"
          class="content-box"
        >
          <div class="step-name">{{ `阶段${i + 1}` }}</div>
          <a-descriptions layout="vertical" :column="{ xs: 1, md: 3, lg: 4 }">
            <a-descriptions-item label="开始时间">{{
              sub.startDate
            }}</a-descriptions-item>
            <a-descriptions-item label="结束时间">{{
              sub.endDate
            }}</a-descriptions-item>
            <template v-if="item.chargingMethod === 2">
              <a-descriptions-item v-if="sub.schemeTypeDesc" label="抽成类型">{{
                sub.schemeTypeDesc
              }}</a-descriptions-item>
              <a-descriptions-item v-if="sub.schemeTypeDesc" label="抽成方式">{{
                sub.algMethodDesc
              }}</a-descriptions-item>
            </template>
            <template v-else>
              <a-descriptions-item label="费用计算方式">{{
                sub.algMethodDesc
              }}</a-descriptions-item>
              <a-descriptions-item
                v-if="[13, 14].includes(sub.algMethod)"
                label="计租面积"
                >{{
                  `${sub.calculateAreaMethodDesc}/${sub.calculateArea}m²`
                }}</a-descriptions-item
              >
              <a-descriptions-item
                v-if="item.hasIncrease"
                label="基础阶段及租金单价"
                >{{
                  `${sub.initPeriod}${sub.initPeriodMethodDesc}/${
                    sub.initPrice
                  }元/${sub.initPeriodMethodDesc} ${
                    [13, 14].includes(sub.algMethod) ? '/m²' : ''
                  }`
                }}</a-descriptions-item
              >
            </template>
            <a-descriptions-item label="收款调整(提前或延后)">{{
              `${sub.repaymentTypeDesc}${sub.repaymentScheme}个${sub.repaymentMethodDesc}`
            }}</a-descriptions-item>
            <template v-if="sub.schemeType === 0">
              <a-descriptions-item label="费用金额">{{
                `${sub.fixedPrice} 元/${sub.repaymentMethodDesc}`
              }}</a-descriptions-item>
              <a-descriptions-item label="不足月租金计算方式">{{
                sub.repairAlgMethodDesc
              }}</a-descriptions-item></template
            >
            <a-descriptions-item label="账期(支付方式)">{{
              `${sub.paymentScheme}${sub.paymentTypeDesc}支付一次`
            }}</a-descriptions-item>
            <a-descriptions-item v-if="sub.statementDay" label="账单生成日">{{
              sub.statementDay
            }}</a-descriptions-item>
            <a-descriptions-item label="租期(划分规则)">{{
              `${sub.leaseMethodDesc}/${
                sub.leaseMethod === 1 ? '自然日/月/年' : sub.startDate
              }`
            }}</a-descriptions-item>
            <a-descriptions-item v-if="item.hasIncrease" label="费用递增规则">{{
              `${sub.increasePeriod}${sub.increasePeriodMethodDesc}/${sub.increaseValue}${sub.increaseMethodDesc}`
            }}</a-descriptions-item>
            <a-descriptions-item label="税率">{{
              `${sub.taxRatio}%`
            }}</a-descriptions-item>
            <a-descriptions-item v-if="sub.commissionRatio" label="抽成比例">{{
              `${sub.commissionRatio}‰`
            }}</a-descriptions-item>
          </a-descriptions>
          <div
            v-for="(cur, indexF) in sub.freeList"
            :key="`f-${indexF}`"
            class=""
          >
            <div class="step-name">{{ `免租条款${indexF + 1}` }}</div>
            <a-descriptions layout="vertical" :column="{ xs: 1, md: 3, lg: 4 }">
              <a-descriptions-item label="免租方式">{{
                `${cur.freeValue}${cur.freeMethodDesc}`
              }}</a-descriptions-item>
              <a-descriptions-item label="免租期间">
                <div class="flex align-center">
                  <div
                    v-for="(it, ind) in cur.freePayments"
                    :key="`fr-${ind}`"
                    class="time-box"
                  >
                    {{ `${it.paymentPeriod};` }}
                  </div>
                </div>
              </a-descriptions-item>
              <!---占位--->
              <a-descriptions-item label="">{{ '' }}</a-descriptions-item>
              <a-descriptions-item label="">{{ '' }}</a-descriptions-item>
            </a-descriptions>
          </div>

          <i-table
            v-if="[22, 23].includes(sub.algMethod)"
            class="margin-top"
            :options="options2"
            :data="sub.commissionList"
          />
          <i-table
            v-if="sub.algMethod === 24"
            class="margin-top"
            :options="options1"
            :data="sub.commissionList"
          />
          <template v-if="[25, 26].includes(sub.algMethod)">
            <div
              v-for="(child, num) in sub.commissionList"
              :key="`co_${num}`"
              class="margin-top"
            >
              <div class="step-name">{{ child.groupName }}</div>
              <i-table :options="options2" :data="child.subCommissionList" />
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="f-bottom">
      <footer-btn
        :need-save="false"
        @on-pre="onPre"
        @on-cancel="onCancel"
        @on-next="onNext"
        @on-update="onUpdate"
      />
    </div>
    <i-drawer v-model="visible" title="预览明细" :footer="false">
      <fee-list
        :data="expenseInfoList"
        :expense-type="expenseType"
        :loading="tableLoading"
      ></fee-list>
    </i-drawer>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, reactive, ref } from 'vue';
  import { useContractStore } from '@/store/project/contract';
  import { useRequest } from '@har/use';
  import {
    cbdApiProjectFormalContractPayPaySchemeInfosGet,
    CbdApiProjectFormalContractPayPaySchemeInfosGetResponse,
    cbdApiProjectFormalContractPayPreviewPaymentInfosByIdPost,
    cbdApiProjectIntentionContractPayPreviewPaymentInfosByIdPost
  } from '@/api';
  import ITable from '@/components/i-table/index.vue';
  import FooterBtn from '@/views/new-contract/__components__/footer-btn.vue';
  import { previewTypeItem } from '@/views/new-contract/__components__/cost-info/index';
  import FeeList from './fee-list.vue';
  import IDrawer from '@/components/drawer/drawer.vue';

  const emits = defineEmits(['onCancel', 'onNext', 'onUpdate', 'onPre']);
  const visible = ref(false);
  const expenseType = ref('');
  const expenseInfoList = ref<previewTypeItem[]>([]);
  onMounted(() => {
    getCostInfo({ contractId: String(contractId.value) });
  });

  const costInfoTable =
    ref<CbdApiProjectFormalContractPayPaySchemeInfosGetResponse>([]);
  const { run: getCostInfo } = useRequest(
    cbdApiProjectFormalContractPayPaySchemeInfosGet,
    {
      manual: true,
      onSuccess(d) {
        costInfoTable.value = d;
      }
    }
  );

  const options1 = reactive({
    index: true,
    indexTitle: '序号',
    menu: false,
    pageShow: false,
    columns: [
      {
        label: '货品组别',
        prop: 'groupName'
      },
      {
        label: '抽成比例(%)',
        prop: 'commissionRatio'
      }
    ]
  });
  const options2 = reactive({
    index: true,
    indexTitle: '序号',
    menu: false,
    pageShow: false,
    columns: [
      {
        label: '开始销售额度（元）',
        prop: 'startVolume'
      },
      {
        label: '结束销售额度（元）',
        prop: 'endVolume',
        formatter: (record: any) => {
          return record.endVolume ? record.endVolume : '∞';
        }
      },
      {
        label: '抽成比例(%)',
        prop: 'commissionRatio'
      }
    ]
  });

  const contractStore = useContractStore();
  const contractId = computed(() => {
    return contractStore.contractInfo.contractId;
  });

  const onCancel = () => {
    emits('onCancel');
  };

  const onNext = () => {
    emits('onNext');
  };

  const onUpdate = () => {
    emits('onUpdate');
  };
  const onPre = () => {
    emits('onPre');
  };

  const contractType = computed(() => {
    return contractStore.contractInfo.contractType || 2;
  });

  // 通过配置ID预览账单
  const editPreviewInfoApi =
    contractType.value === 1
      ? cbdApiProjectIntentionContractPayPreviewPaymentInfosByIdPost
      : cbdApiProjectFormalContractPayPreviewPaymentInfosByIdPost;
  const { run: getEditPreviewInfo, loading: tableLoading } = useRequest(
    editPreviewInfoApi,
    {
      manual: true,
      onSuccess(data) {
        expenseInfoList.value = data;
      }
    }
  );

  function previewHandle(item: any) {
    getEditPreviewInfo({
      paySchemeSectionId: item.id
    });
    visible.value = true;
  }
</script>

<style scoped lang="less">
  .margin-right-24 {
    margin-right: 24px;
  }
  :deep(.i-card) {
    padding: 0;
  }
  .time-box {
    margin-right: 4px;
    &:last-child {
      margin-right: 0;
    }
  }
  .container-box {
    padding: 16px;
    .table-box {
      margin-bottom: 16px;
      padding: 16px 16px 8px 16px;
      background: #fff;
      user-select: none;
      .table-title {
        padding: 8px 12px;
        color: #333;
        font-size: 14px;
        background: #f2f2f4;
        border-bottom: 1px solid #d3d3d3;
      }
      .table-content {
        margin-top: 16px;
        .content-box {
          .step-name {
            margin: 8px 0;
            font-size: 16px;
          }
        }
      }
    }
  }
</style>
